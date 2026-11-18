/**
 * Animated Data Pipeline Flow Visualization
 * Shows live data flowing through your systems
 */

class DataFlowVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.nodes = [];
        this.connections = [];
        this.animationId = null;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.initializeNodes();
        this.startAnimation();
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    
    initializeNodes() {
        const centerY = this.height / 2;
        const nodeSpacing = this.width / 5;
        
        // Define pipeline stages
        this.nodes = [
            { x: nodeSpacing * 0.5, y: centerY, label: 'RAW DATA', icon: '📊', color: '#3b82f6' },
            { x: nodeSpacing * 1.5, y: centerY, label: 'ETL', icon: '⚙️', color: '#8b5cf6' },
            { x: nodeSpacing * 2.5, y: centerY, label: 'ML/AI', icon: '🧠', color: '#ec4899' },
            { x: nodeSpacing * 3.5, y: centerY, label: 'API', icon: '🚀', color: '#10b981' },
            { x: nodeSpacing * 4.5, y: centerY, label: 'PRODUCTION', icon: '✓', color: '#f59e0b' }
        ];
        
        // Create connections
        for (let i = 0; i < this.nodes.length - 1; i++) {
            this.connections.push({
                from: this.nodes[i],
                to: this.nodes[i + 1]
            });
        }
    }
    
    createParticle() {
        return {
            x: this.nodes[0].x,
            y: this.nodes[0].y,
            targetNodeIndex: 1,
            progress: 0,
            speed: 0.005 + Math.random() * 0.01,
            size: 3 + Math.random() * 3,
            color: `hsl(${Math.random() * 60 + 180}, 80%, 60%)`,
            alpha: 1
        };
    }
    
    updateParticles() {
        // Add new particles periodically
        if (Math.random() < 0.05 && this.particles.length < 30) {
            this.particles.push(this.createParticle());
        }
        
        // Update existing particles
        this.particles.forEach((particle, index) => {
            particle.progress += particle.speed;
            
            if (particle.progress >= 1) {
                particle.targetNodeIndex++;
                particle.progress = 0;
                
                // Remove particle at the end
                if (particle.targetNodeIndex >= this.nodes.length) {
                    this.particles.splice(index, 1);
                    return;
                }
            }
            
            // Interpolate position
            const fromNode = this.nodes[particle.targetNodeIndex - 1];
            const toNode = this.nodes[particle.targetNodeIndex];
            
            particle.x = fromNode.x + (toNode.x - fromNode.x) * particle.progress;
            particle.y = fromNode.y + (toNode.y - fromNode.y) * particle.progress;
        });
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw connections
        this.connections.forEach(conn => {
            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            // Glow effect
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, 40
            );
            gradient.addColorStop(0, node.color + '40');
            gradient.addColorStop(1, 'transparent');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(node.x - 40, node.y - 40, 80, 80);
            
            // Node circle
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
            this.ctx.fillStyle = '#0f172a';
            this.ctx.fill();
            this.ctx.strokeStyle = node.color;
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Icon
            this.ctx.font = '24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(node.icon, node.x, node.y);
            
            // Label
            this.ctx.font = 'bold 12px Inter, sans-serif';
            this.ctx.fillStyle = '#94a3b8';
            this.ctx.fillText(node.label, node.x, node.y + 45);
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    animate() {
        this.updateParticles();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    startAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.animate();
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const dataFlowCanvas = document.getElementById('data-flow-canvas');
    if (dataFlowCanvas) {
        new DataFlowVisualization('data-flow-canvas');
    }
});
