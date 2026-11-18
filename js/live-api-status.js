/**
 * Live API Status Integration
 * Shows real-time status of your production APIs
 */

class LiveAPIStatus {
    constructor() {
        this.apis = [
            {
                name: 'IP Intelligence API',
                url: 'https://ip-intelligence-api-yaov.onrender.com/health',
                statsUrl: 'https://ip-intelligence-api-yaov.onrender.com/api/v1/stats',
                icon: '📡',
                metrics: {}
            },
            {
                name: 'Web Data Collection API',
                url: 'https://web-data-collection-api.onrender.com/health',
                statsUrl: 'https://web-data-collection-api.onrender.com/api/v1/stats',
                icon: '🌍',
                metrics: {}
            }
        ];
        
        this.updateInterval = 30000; // Update every 30 seconds
        this.init();
    }
    
    async init() {
        await this.checkAllAPIs();
        this.renderStatusCards();
        
        // Update periodically
        setInterval(() => this.checkAllAPIs(), this.updateInterval);
    }
    
    async checkAllAPIs() {
        const promises = this.apis.map(api => this.checkAPI(api));
        await Promise.all(promises);
    }
    
    async checkAPI(api) {
        try {
            const startTime = Date.now();
            const response = await fetch(api.url, { method: 'GET', mode: 'cors' });
            const responseTime = Date.now() - startTime;
            
            if (response.ok) {
                const data = await response.json();
                api.status = 'online';
                api.responseTime = responseTime;
                api.lastChecked = new Date();
                
                // Fetch additional stats
                await this.fetchStats(api);
            } else {
                api.status = 'error';
                api.responseTime = responseTime;
            }
        } catch (error) {
            api.status = 'offline';
            api.error = error.message;
        }
        
        this.updateStatusCard(api);
    }
    
    async fetchStats(api) {
        try {
            const response = await fetch(api.statsUrl, { method: 'GET', mode: 'cors' });
            if (response.ok) {
                const stats = await response.json();
                api.metrics = stats;
            }
        } catch (error) {
            console.warn(`Failed to fetch stats for ${api.name}:`, error);
        }
    }
    
    renderStatusCards() {
        const container = document.getElementById('live-api-status');
        if (!container) return;
        
        container.innerHTML = this.apis.map((api, index) => `
            <div class="api-status-card" id="api-card-${index}" data-status="checking">
                <div class="api-header">
                    <span class="api-icon">${api.icon}</span>
                    <h3 class="api-name">${api.name}</h3>
                    <span class="status-indicator">
                        <span class="status-dot"></span>
                        <span class="status-text">Checking...</span>
                    </span>
                </div>
                <div class="api-metrics" id="api-metrics-${index}">
                    <div class="metric-loading">Fetching metrics...</div>
                </div>
                <div class="api-footer">
                    <span class="response-time" id="response-time-${index}">-</span>
                    <span class="last-checked" id="last-checked-${index}">-</span>
                </div>
            </div>
        `).join('');
    }
    
    updateStatusCard(api) {
        const index = this.apis.indexOf(api);
        const card = document.getElementById(`api-card-${index}`);
        const metricsContainer = document.getElementById(`api-metrics-${index}`);
        const responseTimeEl = document.getElementById(`response-time-${index}`);
        const lastCheckedEl = document.getElementById(`last-checked-${index}`);
        
        if (!card) return;
        
        // Update status
        card.setAttribute('data-status', api.status);
        const statusText = card.querySelector('.status-text');
        const statusLabels = {
            online: 'Online',
            offline: 'Offline',
            error: 'Error'
        };
        statusText.textContent = statusLabels[api.status] || 'Unknown';
        
        // Update metrics
        if (api.metrics && Object.keys(api.metrics).length > 0) {
            metricsContainer.innerHTML = this.renderMetrics(api);
        }
        
        // Update footer
        if (api.responseTime) {
            responseTimeEl.textContent = `${api.responseTime}ms response`;
        }
        
        if (api.lastChecked) {
            const timeAgo = this.getTimeAgo(api.lastChecked);
            lastCheckedEl.textContent = `Updated ${timeAgo}`;
        }
    }
    
    renderMetrics(api) {
        const metrics = api.metrics;
        
        // Different metric displays based on API
        if (metrics.total_allocations !== undefined) {
            // IP Intelligence API
            return `
                <div class="metric-item">
                    <span class="metric-label">IP Allocations</span>
                    <span class="metric-value">${this.formatNumber(metrics.total_allocations)}</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">IP Addresses</span>
                    <span class="metric-value">${this.formatNumber(metrics.total_ip_addresses)}</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Countries</span>
                    <span class="metric-value">${metrics.countries_count}</span>
                </div>
            `;
        } else if (metrics.total_records !== undefined) {
            // Web Data Collection API
            return `
                <div class="metric-item">
                    <span class="metric-label">Records</span>
                    <span class="metric-value">${metrics.total_records}</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Sources</span>
                    <span class="metric-value">${metrics.total_sources}</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Collection Runs</span>
                    <span class="metric-value">${metrics.total_runs}</span>
                </div>
            `;
        }
        
        return '<div class="metric-loading">No metrics available</div>';
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('live-api-status')) {
        new LiveAPIStatus();
    }
});
