/**
 * Animated Statistics Counter
 * Counts up numbers with smooth animation
 */

class AnimatedCounter {
    constructor(element, targetValue, duration = 2000, suffix = '') {
        this.element = element;
        this.targetValue = targetValue;
        this.duration = duration;
        this.suffix = suffix;
        this.currentValue = 0;
        this.startTime = null;
        this.animationId = null;
    }
    
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    formatValue(value) {
        if (this.suffix === 'M') {
            return (value / 1000000).toFixed(1) + 'M';
        } else if (this.suffix === 'K') {
            return (value / 1000).toFixed(1) + 'K';
        } else if (this.suffix === '+') {
            return Math.floor(value) + '+';
        } else if (this.suffix === '$') {
            return '$' + Math.floor(value);
        }
        return Math.floor(value).toLocaleString();
    }
    
    animate(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        const elapsed = timestamp - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        
        const easedProgress = this.easeOutQuart(progress);
        this.currentValue = this.targetValue * easedProgress;
        
        this.element.textContent = this.formatValue(this.currentValue);
        
        if (progress < 1) {
            this.animationId = requestAnimationFrame((t) => this.animate(t));
        } else {
            this.element.textContent = this.formatValue(this.targetValue);
        }
    }
    
    start() {
        this.animationId = requestAnimationFrame((t) => this.animate(t));
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Auto-initialize counters
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const targetValue = parseFloat(entry.target.dataset.target);
                const suffix = entry.target.dataset.suffix || '';
                const duration = parseFloat(entry.target.dataset.duration) || 2000;
                
                const counter = new AnimatedCounter(entry.target, targetValue, duration, suffix);
                counter.start();
                
                entry.target.dataset.animated = 'true';
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-animate-counter
    document.querySelectorAll('[data-animate-counter]').forEach(el => {
        observer.observe(el);
    });
});
