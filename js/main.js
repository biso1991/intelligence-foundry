// THE INTELLIGENCE FOUNDRY - Main Application
// Orchestrates all engineering experiences

class IntelligenceFoundry {
    constructor() {
        this.init();
    }

    init() {
        this.initParticles();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupProjects();
        this.setupInteractions();
        console.log('🔥 THE INTELLIGENCE FOUNDRY - Initialized');
    }

    initParticles() {
        const canvas = document.getElementById('hero-canvas');
        if (canvas && typeof ParticleSystem !== 'undefined') {
            this.particleSystem = new ParticleSystem(canvas);
            console.log('✨ Particle System - Activated');
        }
    }

    setupNavigation() {
        const nav = document.getElementById('main-nav');
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.getElementById('nav-links');

        // Scroll effect for navigation
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Close mobile menu
                navLinks.classList.remove('active');
            });
        });
    }

    setupScrollEffects() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all scroll-triggered elements
        document.querySelectorAll('.scroll-fade-in, .scroll-scale-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupProjects() {
        const projectsData = [
            {
                title: 'TikTok Influencer Intelligence Platform',
                category: 'Data Engineering',
                description: 'Distributed data acquisition platform with Kafka-based orchestration, distributed workers, and comprehensive observability. Built for large-scale influencer marketing intelligence.',
                technologies: ['FastAPI', 'Apache Kafka', 'Redis', 'Docker', 'Playwright', 'PostgreSQL', 'Prometheus', 'Grafana', 'Jaeger'],
                achievements: [
                    'Kafka-based job orchestration with priority queues',
                    'Redis-backed coordination using atomic Lua scripts',
                    'Distributed worker pools with session-based partitioning',
                    'Complete observability stack integration'
                ],
                status: 'production',
                github: null,
                live: null
            },
            {
                title: 'NLP Model Fine-Tuning SaaS Platform',
                category: 'AI Engineering',
                description: 'Production platform for ML teams to fine-tune language models using Haystack framework. Built 20+ REST API endpoints for document management, QA, and training workflows.',
                technologies: ['Django', 'Haystack', 'PyTorch', 'Celery', 'Redis', 'Elasticsearch', 'AWS EC2', 'Docker'],
                achievements: [
                    '30% improvement in ML workflow efficiency',
                    'Integrated BM25 retrieval with FARM reader models',
                    'Active learning workflows for iterative fine-tuning',
                    '25% reduction in deployment time with CI/CD'
                ],
                status: 'production',
                github: null,
                live: null
            },
            {
                title: 'Real-Time Sales Analytics Dashboard',
                category: 'Data Engineering',
                description: 'ETL pipeline using Airflow orchestration, Kafka stream processing, and Spark transformations. WebSocket-based live dashboard for business intelligence.',
                technologies: ['Django', 'Apache Airflow', 'Apache Kafka', 'Spark', 'PostgreSQL', 'Redis', 'WebSocket'],
                achievements: [
                    'Real-time streaming data processing',
                    'Automated ETL workflows with Airflow',
                    'Live analytics dashboard with WebSocket',
                    'Scalable distributed architecture'
                ],
                status: 'production',
                github: null,
                live: null
            }
        ];

        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = projectsData.map(project => `
            <div class="project-card scroll-fade-in">
                <div class="project-header">
                    <span class="project-category">${project.category}</span>
                    ${project.status === 'production' ? '<span class="project-status">Production</span>' : ''}
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                
                <div class="project-achievements">
                    ${project.achievements.map(achievement => `
                        <div class="achievement-item">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M13 4L6 11 3 8"/>
                            </svg>
                            <span>${achievement}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                ${project.github || project.live ? `
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" class="project-link" target="_blank">GitHub →</a>` : ''}
                        ${project.live ? `<a href="${project.live}" class="project-link" target="_blank">Live Demo →</a>` : ''}
                    </div>
                ` : '<div class="project-note">Private project - Available upon request</div>'}
            </div>
        `).join('');

        // Add project card styles dynamically
        this.addProjectStyles();
    }

    addProjectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .projects-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: var(--space-8);
                margin-top: var(--space-12);
            }

            .project-card {
                padding: var(--space-8);
                background: var(--bg-surface);
                border: 1px solid var(--border-medium);
                border-radius: var(--radius-xl);
                transition: all var(--duration-base) var(--ease-out);
            }

            .project-card:hover {
                border-color: var(--accent-primary);
                transform: translateY(-4px);
                box-shadow: var(--shadow-xl);
            }

            .project-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: var(--space-4);
            }

            .project-category {
                font-size: var(--text-xs);
                font-weight: var(--font-semibold);
                color: var(--accent-primary);
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .project-status {
                padding: var(--space-1) var(--space-3);
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: var(--radius-full);
                font-size: var(--text-xs);
                color: var(--success);
            }

            .project-title {
                font-size: var(--text-xl);
                font-weight: var(--font-bold);
                color: var(--text-primary);
                margin-bottom: var(--space-4);
                line-height: var(--leading-tight);
            }

            .project-description {
                font-size: var(--text-base);
                color: var(--text-secondary);
                line-height: var(--leading-relaxed);
                margin-bottom: var(--space-6);
            }

            .project-achievements {
                margin-bottom: var(--space-6);
                display: flex;
                flex-direction: column;
                gap: var(--space-3);
            }

            .achievement-item {
                display: flex;
                align-items: start;
                gap: var(--space-2);
                font-size: var(--text-sm);
                color: var(--text-secondary);
            }

            .achievement-item svg {
                flex-shrink: 0;
                margin-top: 2px;
                color: var(--success);
            }

            .project-tech {
                display: flex;
                flex-wrap: wrap;
                gap: var(--space-2);
                margin-bottom: var(--space-6);
            }

            .tech-tag {
                padding: var(--space-1) var(--space-3);
                background: rgba(0, 212, 255, 0.1);
                border: 1px solid rgba(0, 212, 255, 0.2);
                border-radius: var(--radius-md);
                font-size: var(--text-xs);
                color: var(--accent-primary);
            }

            .project-links {
                display: flex;
                gap: var(--space-4);
            }

            .project-link {
                color: var(--accent-primary);
                text-decoration: none;
                font-size: var(--text-sm);
                font-weight: var(--font-semibold);
                transition: color var(--duration-base);
            }

            .project-link:hover {
                color: var(--flow-cyan);
            }

            .project-note {
                font-size: var(--text-sm);
                color: var(--text-tertiary);
                font-style: italic;
            }

            .section-header {
                text-align: center;
                margin-bottom: var(--space-16);
            }

            .section-title {
                font-size: var(--text-4xl);
                font-weight: var(--font-bold);
                margin-bottom: var(--space-4);
            }

            .section-subtitle {
                font-size: var(--text-lg);
                color: var(--text-secondary);
            }

            .contact-content {
                max-width: 600px;
                margin: 0 auto;
                text-align: center;
            }

            .contact-content h2 {
                font-size: var(--text-3xl);
                font-weight: var(--font-bold);
                margin-bottom: var(--space-4);
            }

            .contact-content p {
                font-size: var(--text-lg);
                color: var(--text-secondary);
                margin-bottom: var(--space-8);
            }

            .contact-details {
                display: flex;
                flex-direction: column;
                gap: var(--space-4);
                align-items: center;
            }

            .contact-item {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                font-size: var(--text-base);
                color: var(--text-primary);
                text-decoration: none;
                transition: color var(--duration-base);
            }

            .contact-item:hover {
                color: var(--accent-primary);
            }

            .contact-icon {
                font-size: var(--text-2xl);
            }

            @media (max-width: 768px) {
                .projects-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupInteractions() {
        // Add hover effects to flow nodes
        document.querySelectorAll('.flow-node').forEach(node => {
            node.addEventListener('mouseenter', () => {
                node.style.borderColor = 'var(--accent-primary)';
                node.style.transform = 'translateY(-4px) scale(1.05)';
            });

            node.addEventListener('mouseleave', () => {
                node.style.borderColor = 'var(--border-medium)';
                node.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new IntelligenceFoundry();
    });
} else {
    new IntelligenceFoundry();
}
