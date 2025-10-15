// Map animation disabled - static map display only
// Simplified map + territory capture animation for the phone mockup
class MiniMap {
    constructor(canvasId, gridSize = 8) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        // Animation disabled - canvas is hidden
        return;
    }

    init() {
        // No initialization needed - static map only
    }

    resize() {
        // No resize needed
    }

    initTerritories() {
        // No territories needed
    }

    createPath() {
        // No path needed
        this.path = [];
        let x = 1, y = this.gridSize - 2;
        for (let i = 0; i < 220; i++) {
            x += 0.12 + (Math.sin(i * 0.12) * 0.18);
            y -= 0.06 + (Math.cos(i * 0.08) * 0.12);
            x += (Math.random() - 0.5) * 0.08;
            y += (Math.random() - 0.5) * 0.08;
            x = Math.max(0.3, Math.min(this.gridSize - 0.3, x));
            y = Math.max(0.3, Math.min(this.gridSize - 0.3, y));
            this.path.push({ x, y });
        }
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.runner.idx = 0;
        this.stats = { distance: 0, territory: 0 };
        this.lastFrame = performance.now();
        this.loop();
    }

    pause() { this.isRunning = false }

    reset() { this.isRunning = false; this.runner.idx = 0; this.initTerritories(); this.stats = { distance: 0, territory: 0 }; this.render(); }

    loop(now) {
        if (!this.isRunning) return;
        const dt = (now - this.lastFrame) / 1000;
        this.lastFrame = now;
        // advance some frames depending on dt
        const step = Math.max(1, Math.floor(30 * dt));
        for (let s = 0; s < step; s++) {
            this.step();
        }
        this.render();
        requestAnimationFrame((t) => this.loop(t));
    }

    step() {
        if (this.runner.idx < this.path.length - 1) {
            this.runner.idx++;
            this.stats.distance += 0.01; // incremental
            // capture territory
            const p = this.path[this.runner.idx];
            const tx = Math.floor(p.x), ty = Math.floor(p.y);
            const t = this.territories.find(tt => tt.x === tx && tt.y === ty);
            if (t && t.owner !== 'player') {
                t.progress += 0.08;
                if (t.progress >= 1) {
                    t.owner = 'player';
                    this.stats.territory += 0.1;
                }
            }
        } else {
            this.isRunning = false; // finish
        }
    }

    render() {
        // clear
        this.ctx.clearRect(0, 0, this.width, this.height);

        // subtle map-like background: gentle noise + river line
        this.drawMapBackground();

        // draw territories as semi-transparent cells
        this.drawCells();

        // draw path so far
        this.drawPath();

        // draw runner
        this.drawRunner();

        // draw subtle overlay vignette
        this.drawVignette();
    }

    drawMapBackground() {
        // fill with textured gradient
        const g = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        g.addColorStop(0, '#06202a');
        g.addColorStop(1, '#072734');
        this.ctx.fillStyle = g;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // simple river/path element
        this.ctx.strokeStyle = 'rgba(150,200,255,0.06)';
        this.ctx.lineWidth = 6; this.ctx.beginPath();
        this.ctx.moveTo(this.width * 0.05, this.height * 0.85);
        this.ctx.bezierCurveTo(this.width * 0.25, this.height * 0.6, this.width * 0.5, this.height * 0.4, this.width * 0.9, this.height * 0.2);
        this.ctx.stroke();
    }

    drawCells() {
        for (const t of this.territories) {
            const x = t.x * this.cell;
            const y = t.y * this.cell;
            const size = this.cell;
            // base neutral fill
            this.ctx.fillStyle = t.owner === 'player' ? 'rgba(52,211,153,0.7)' : (t.owner === 'enemy' ? 'rgba(251,113,133,0.6)' : 'rgba(100,116,139,0.18)');
            this.ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
            // capture progress overlay
            if (t.progress > 0 && t.progress < 1 && t.owner !== 'player') {
                const h = (size - 4) * t.progress;
                this.ctx.fillStyle = 'rgba(52,211,153,0.9)';
                this.ctx.fillRect(x + 2, y + 2 + (size - 4) - h, size - 4, h);
            }
            // grid lines
            this.ctx.strokeStyle = 'rgba(255,255,255,0.03)';
            this.ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
        }
    }

    drawPath() {
        if (this.runner.idx < 1) return;
        this.ctx.lineWidth = 3; this.ctx.lineCap = 'round';
        const grad = this.ctx.createLinearGradient(0,0,this.width,this.height);
        grad.addColorStop(0,'rgba(96,165,250,0.25)');
        grad.addColorStop(1,'rgba(96,165,250,0.9)');
        this.ctx.strokeStyle = grad;
        this.ctx.beginPath();
        const start = this.path[0];
        this.ctx.moveTo(start.x * this.cell + this.cell/2, start.y * this.cell + this.cell/2);
        for (let i = 1; i <= this.runner.idx; i++) {
            const p = this.path[i];
            this.ctx.lineTo(p.x * this.cell + this.cell/2, p.y * this.cell + this.cell/2);
        }
        this.ctx.stroke();
    }

    drawRunner() {
        const p = this.path[Math.min(this.runner.idx, this.path.length - 1)];
        const x = p.x * this.cell + this.cell/2;
        const y = p.y * this.cell + this.cell/2;
        // glow
        const g = this.ctx.createRadialGradient(x,y,0,x,y,30);
        g.addColorStop(0,'rgba(59,130,246,0.6)');
        g.addColorStop(1,'rgba(59,130,246,0)');
        this.ctx.fillStyle = g; this.ctx.fillRect(x-30,y-30,60,60);
        // dot
        this.ctx.beginPath(); this.ctx.fillStyle = '#3b82f6'; this.ctx.arc(x,y,6,0,Math.PI*2); this.ctx.fill();
        this.ctx.beginPath(); this.ctx.fillStyle = '#fff'; this.ctx.arc(x,y,3,0,Math.PI*2); this.ctx.fill();
    }

    drawVignette(){
        const g = this.ctx.createLinearGradient(0,0,0,this.height);
        g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(0,0,0,0.2)');
        this.ctx.fillStyle = g; this.ctx.fillRect(0,0,this.width,this.height);
    }
}

// Animation disabled - static map only
document.addEventListener('DOMContentLoaded', () => {
    // No map animation initialization
    const startBtn = document.getElementById('startAnimation');
    const resetBtn = document.getElementById('resetAnimation');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Button does nothing - static map only
            console.log('Animation disabled - displaying static map');
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Button does nothing - static map only
            console.log('Animation disabled - displaying static map');
        });
    }
});
// Grand Theft Cardio - Live Territory Conquest Animation (DISABLED)
class TerritoryMap {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        // Animation disabled
        return;
        this.setupCanvas();
        
        // Grid settings
        this.gridSize = 8; // 8x8 grid of territories
        this.territories = [];
        this.initTerritories();
        
        // Runner settings
        this.runner = {
            x: 0,
            y: 0,
            speed: 0.02, // Speed of movement
            path: [],
            pathIndex: 0
        };
        
        // Statistics
        this.stats = {
            distance: 0,
            territory: 0,
            pace: 5.5,
            time: 0
        };
        
        // Animation state
        this.isRunning = false;
        this.animationId = null;
        
        // Generate a realistic running path
        this.generateRunningPath();
        
        // Initial render
        this.render();
        
        // Setup controls
        this.setupControls();
    }
    
    setupCanvas() {
        // Set canvas size to match container
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        this.width = rect.width;
        this.height = rect.height;
        this.cellSize = Math.min(this.width, this.height) / this.gridSize;
    }
    
    initTerritories() {
        this.territories = [];
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const random = Math.random();
                let owner = 'neutral';
                
                // Create some pre-existing territories
                if (random < 0.15) {
                    owner = 'player';
                } else if (random < 0.3) {
                    owner = 'enemy';
                }
                
                this.territories.push({
                    x,
                    y,
                    owner,
                    captureProgress: owner === 'player' ? 1 : 0,
                    isHighValue: Math.random() < 0.1 // 10% chance of high-value territory
                });
            }
        }
    }
    
    generateRunningPath() {
        // Generate a realistic running path that crosses multiple territories
        const path = [];
        const numPoints = 300;
        
        // Start from bottom-left
        let currentX = 1;
        let currentY = this.gridSize - 2;
        
        path.push({ x: currentX, y: currentY });
        
        // Generate a winding path
        for (let i = 0; i < numPoints; i++) {
            const t = i / numPoints;
            
            // Move generally from left to right and bottom to top with some curves
            currentX += 0.15 + Math.sin(t * 12) * 0.3;
            currentY -= 0.08 + Math.cos(t * 8) * 0.2;
            
            // Add some randomness
            currentX += (Math.random() - 0.5) * 0.1;
            currentY += (Math.random() - 0.5) * 0.1;
            
            // Keep within bounds (with padding)
            currentX = Math.max(0.5, Math.min(this.gridSize - 0.5, currentX));
            currentY = Math.max(0.5, Math.min(this.gridSize - 0.5, currentY));
            
            path.push({ x: currentX, y: currentY });
        }
        
        this.runner.path = path;
    }
    
    setupControls() {
        const startBtn = document.getElementById('startAnimation');
        const resetBtn = document.getElementById('resetAnimation');
        const startRunBtn = document.getElementById('startRunButton');
        
        // External control buttons
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                if (!this.isRunning) {
                    this.start();
                    startBtn.textContent = '⏸ Pause Demo';
                    startBtn.classList.add('active');
                    if (startRunBtn) {
                        startRunBtn.querySelector('.btn-text').textContent = 'Running...';
                        startRunBtn.querySelector('.btn-icon').textContent = '⏸';
                        startRunBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    }
                } else {
                    this.pause();
                    startBtn.textContent = '▶ Resume Demo';
                    startBtn.classList.remove('active');
                    if (startRunBtn) {
                        startRunBtn.querySelector('.btn-text').textContent = 'Paused';
                        startRunBtn.querySelector('.btn-icon').textContent = '▶';
                    }
                }
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.reset();
                if (startBtn) {
                    startBtn.textContent = '▶ Simulate Run';
                    startBtn.classList.remove('active');
                }
                if (startRunBtn) {
                    startRunBtn.querySelector('.btn-text').textContent = 'Start Run';
                    startRunBtn.querySelector('.btn-icon').textContent = '🏃‍♂️';
                    startRunBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                }
            });
        }
        
        // In-app Start Run button
        if (startRunBtn) {
            startRunBtn.addEventListener('click', () => {
                if (!this.isRunning) {
                    this.start();
                    startRunBtn.querySelector('.btn-text').textContent = 'Running...';
                    startRunBtn.querySelector('.btn-icon').textContent = '⏸';
                    startRunBtn.querySelector('.btn-hint').textContent = 'Conquering territory';
                    startRunBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    if (startBtn) {
                        startBtn.textContent = '⏸ Pause Demo';
                        startBtn.classList.add('active');
                    }
                } else {
                    this.pause();
                    startRunBtn.querySelector('.btn-text').textContent = 'Resume';
                    startRunBtn.querySelector('.btn-icon').textContent = '▶';
                    startRunBtn.querySelector('.btn-hint').textContent = 'Tap to continue';
                }
            });
        }
    }
    
    start() {
        this.isRunning = true;
        this.animate();
    }
    
    pause() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    reset() {
        this.pause();
        this.runner.pathIndex = 0;
        this.stats = {
            distance: 0,
            territory: 0,
            pace: 5.5,
            time: 0
        };
        this.initTerritories();
        this.updateStatsDisplay();
        this.render();
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.update();
        this.render();
        this.updateStatsDisplay();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    update() {
        // Move runner along path
        if (this.runner.pathIndex < this.runner.path.length - 1) {
            this.runner.pathIndex += 1;
            const pos = this.runner.path[this.runner.pathIndex];
            this.runner.x = pos.x;
            this.runner.y = pos.y;
            
            // Update statistics
            this.stats.distance += 0.015; // km per frame
            this.stats.time += 0.3; // seconds per frame
            this.stats.pace = (this.stats.time / 60) / this.stats.distance || 5.5;
            
            // Check territory capture
            this.updateTerritoryCapture();
        } else {
            // Animation complete
            this.pause();
        }
    }
    
    updateTerritoryCapture() {
        const cellX = Math.floor(this.runner.x);
        const cellY = Math.floor(this.runner.y);
        
        this.territories.forEach(territory => {
            if (territory.x === cellX && territory.y === cellY) {
                if (territory.owner !== 'player') {
                    // Capture territory
                    territory.captureProgress += 0.05;
                    
                    if (territory.captureProgress >= 1) {
                        if (territory.owner !== 'player') {
                            territory.owner = 'player';
                            territory.captureProgress = 1;
                            
                            // Update territory stats
                            const area = territory.isHighValue ? 0.15 : 0.1;
                            this.stats.territory += area;
                            
                            // Visual feedback
                            this.createCaptureEffect(territory);
                        }
                    }
                }
            }
        });
    }
    
    createCaptureEffect(territory) {
        // Create a brief flash effect (handled in render)
        territory.justCaptured = true;
        setTimeout(() => {
            territory.justCaptured = false;
        }, 300);
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#1a1f2e';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw grid background
        this.drawGrid();
        
        // Draw territories
        this.drawTerritories();
        
        // Draw running path
        this.drawPath();
        
        // Draw runner
        this.drawRunner();
        
        // Draw legends
        this.drawLegend();
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#2a3142';
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= this.gridSize; x++) {
            const px = x * this.cellSize;
            this.ctx.beginPath();
            this.ctx.moveTo(px, 0);
            this.ctx.lineTo(px, this.gridSize * this.cellSize);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.gridSize; y++) {
            const py = y * this.cellSize;
            this.ctx.beginPath();
            this.ctx.moveTo(0, py);
            this.ctx.lineTo(this.gridSize * this.cellSize, py);
            this.ctx.stroke();
        }
    }
    
    drawTerritories() {
        this.territories.forEach(territory => {
            const x = territory.x * this.cellSize;
            const y = territory.y * this.cellSize;
            const size = this.cellSize;
            
            // Determine color
            let color;
            let alpha = 0.6;
            
            if (territory.owner === 'player') {
                color = '#10b981'; // Green
                alpha = territory.justCaptured ? 1 : 0.7;
            } else if (territory.owner === 'enemy') {
                color = '#ef4444'; // Red
                alpha = 0.5;
            } else {
                color = '#64748b'; // Gray
                alpha = 0.3;
            }
            
            // Draw territory fill
            this.ctx.fillStyle = this.hexToRGBA(color, alpha);
            this.ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
            
            // Draw capture progress for territories being captured
            if (territory.captureProgress > 0 && territory.captureProgress < 1 && territory.owner !== 'player') {
                const progressHeight = (size - 4) * territory.captureProgress;
                this.ctx.fillStyle = this.hexToRGBA('#10b981', 0.8);
                this.ctx.fillRect(x + 2, y + 2 + (size - 4) - progressHeight, size - 4, progressHeight);
            }
            
            // Highlight high-value territories
            if (territory.isHighValue) {
                this.ctx.strokeStyle = '#fbbf24';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x + 3, y + 3, size - 6, size - 6);
            }
            
            // Flash effect for just captured
            if (territory.justCaptured) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                this.ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
            }
        });
    }
    
    drawPath() {
        if (this.runner.pathIndex < 2) return;
        
        this.ctx.strokeStyle = '#60a5fa';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Draw the path with gradient
        const gradient = this.ctx.createLinearGradient(
            this.runner.path[0].x * this.cellSize,
            this.runner.path[0].y * this.cellSize,
            this.runner.x * this.cellSize,
            this.runner.y * this.cellSize
        );
        gradient.addColorStop(0, 'rgba(96, 165, 250, 0.3)');
        gradient.addColorStop(1, 'rgba(96, 165, 250, 0.9)');
        
        this.ctx.strokeStyle = gradient;
        this.ctx.beginPath();
        
        for (let i = 0; i <= this.runner.pathIndex; i++) {
            const point = this.runner.path[i];
            const x = point.x * this.cellSize;
            const y = point.y * this.cellSize;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
    }
    
    drawRunner() {
        const x = this.runner.x * this.cellSize;
        const y = this.runner.y * this.cellSize;
        
        // Draw runner glow
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 20);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x - 20, y - 20, 40, 40);
        
        // Draw runner marker
        this.ctx.fillStyle = '#3b82f6';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 8, 0, Math.PI * 2);
        this.ctx.fill();
        
        // White center
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Direction indicator
        if (this.runner.pathIndex > 0) {
            const prevPoint = this.runner.path[this.runner.pathIndex - 1];
            const dx = this.runner.x - prevPoint.x;
            const dy = this.runner.y - prevPoint.y;
            const angle = Math.atan2(dy, dx);
            
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(angle);
            
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.moveTo(6, 0);
            this.ctx.lineTo(-2, -3);
            this.ctx.lineTo(-2, 3);
            this.ctx.closePath();
            this.ctx.fill();
            
            this.ctx.restore();
        }
    }
    
    drawLegend() {
        // Smaller legend for the compact map view
        const legendX = 8;
        const legendY = this.height - 60;
        
        // Background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.ctx.fillRect(legendX, legendY, 100, 52);
        
        // Items
        const items = [
            { color: '#10b981', label: 'You' },
            { color: '#ef4444', label: 'Enemy' },
            { color: '#64748b', label: 'Neutral' }
        ];
        
        this.ctx.font = '10px -apple-system, sans-serif';
        
        items.forEach((item, index) => {
            const y = legendY + 12 + index * 16;
            
            // Color box
            this.ctx.fillStyle = item.color;
            this.ctx.fillRect(legendX + 8, y - 6, 10, 10);
            
            // Label
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(item.label, legendX + 24, y + 2);
        });
    }
    
    updateStatsDisplay() {
        // Update territory stat in the app
        const territoryEl = document.getElementById('yourTerritory');
        
        if (territoryEl) {
            const baseTerritory = 2.4;
            const newTerritory = baseTerritory + this.stats.territory;
            territoryEl.textContent = newTerritory.toFixed(1) + ' km²';
        }
    }
    
    hexToRGBA(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

// Initialize the map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const map = new TerritoryMap('mapCanvas');
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (map.canvas) {
                map.setupCanvas();
                map.render();
            }
        }, 250);
    });
    
    console.log('Territory conquest animation ready! 🗺️');
});
