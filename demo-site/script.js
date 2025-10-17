// Tab Navigation System
document.addEventListener('DOMContentLoaded', () => {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const startRunBtn = document.getElementById('startAnimation');
    const stopRunBtn = document.getElementById('stopRun');
    
    let runInterval = null;
    let runData = {
        territory: 0,
        distance: 0,
        time: 0,
        pace: 0
    };

    // Tab Navigation
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all content sections
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show target content section
            const targetContent = document.getElementById(`${targetTab}-section`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Start Run Button
    if (startRunBtn) {
        startRunBtn.addEventListener('click', () => {
            // Hide map section
            const mapSection = document.getElementById('map-section');
            if (mapSection) {
                mapSection.classList.remove('active');
            }
            
            // Show run section
            const runSection = document.getElementById('run-section');
            if (runSection) {
                runSection.classList.add('active');
            }
            
            // Reset and start run simulation
            resetRunData();
            startRunSimulation();
        });
    }
    
    // Stop Run Button
    if (stopRunBtn) {
        stopRunBtn.addEventListener('click', () => {
            // Stop simulation
            stopRunSimulation();
            
            // Hide run section
            const runSection = document.getElementById('run-section');
            if (runSection) {
                runSection.classList.remove('active');
            }
            
            // Show map section
            const mapSection = document.getElementById('map-section');
            if (mapSection) {
                mapSection.classList.add('active');
            }
        });
    }
    
    function resetRunData() {
        runData = {
            territory: 1890000, // Start at 1.9 km² = 1,890,000 m² (2.7 km² - 30%)
            distance: 0,
            time: 0,
            pace: 0
        };
        updateRunDisplay();
    }
    
    function startRunSimulation() {
        // Start the video with loop
        const runVideo = document.getElementById('runVideo');
        if (runVideo) {
            runVideo.classList.add('active');
            runVideo.loop = false; // Disable loop so it stops naturally
            runVideo.play();
            
            // Monitor video time to stop counter 1.5 seconds before end
            const checkVideoTime = setInterval(() => {
                if (runVideo.duration && runVideo.currentTime >= runVideo.duration - 2) {
                    stopRunSimulation();
                    clearInterval(checkVideoTime);
                }
            }, 100); // Check every 100ms for accuracy
        }
        
        let secondsElapsed = 0;
        const targetTerritory = 4800000; // Target: 4.8 km² in m²
        const startTerritory = 1890000;  // Start: 1.9 km² in m²
        const territoryToGain = targetTerritory - startTerritory; // 2.91 km² to gain
        
        const baseIncrements = {
            distance: 0.8,      // km increment
            territory: territoryToGain / 13, // Distribute evenly over ~13 seconds to reach 4.8 km²
            time: 480           // seconds increment to reach 2 hours (7200s) in 15 seconds
        };
        
        runInterval = setInterval(() => {
            secondsElapsed += 1;
            
            // Calculate multiplier: 25% increase per second for first 4 seconds
            let multiplier = 1;
            if (secondsElapsed <= 4) {
                multiplier = 1 + (0.25 * secondsElapsed);
            } else {
                multiplier = 1 + (0.25 * 4); // Keep at 200% after 4 seconds
            }
            
            // Increment time (faster to reach 2 hours)
            runData.time += baseIncrements.time;
            
            // Increment distance (faster to match the time)
            runData.distance += baseIncrements.distance;
            
            // Calculate pace (min/km)
            if (runData.distance > 0) {
                runData.pace = runData.time / 60 / runData.distance;
            }
            
            // Increment territory gradually (no multiplier, steady increase to 4.8 km²)
            runData.territory += baseIncrements.territory;
            
            updateRunDisplay();
            
            // Stop automatically when reaching 10 km or 2 hours (7200 seconds)
            if (runData.distance >= 10 || runData.time >= 7200) {
                stopRunSimulation();
            }
        }, 1000); // Update every second
    }
    
    function stopRunSimulation() {
        // Keep video visible but don't hide it
        const runVideo = document.getElementById('runVideo');
        if (runVideo) {
            // Don't remove 'active' class or pause - let it stay on last frame
            runVideo.loop = false; // Disable loop so it stops at the end
        }
        
        if (runInterval) {
            clearInterval(runInterval);
            runInterval = null;
        }
    }
    
    function updateRunDisplay() {
        // Update Territory (most important!)
        const territoryEl = document.getElementById('runTerritory');
        const territoryKm2 = runData.territory / 1000000; // Convert m² to km²
        
        if (territoryEl) {
            territoryEl.textContent = `${territoryKm2.toFixed(2)} km²`;
        }
        
        // Update marker position on progress bar (0-7 km² scale)
        const markerEl = document.getElementById('yourMarker');
        const markerTerritoryEl = document.getElementById('markerTerritory');
        if (markerEl && territoryKm2 > 0) {
            const maxScale = 7; // 7 km² is 100% on the bar (reduced from 10)
            const percentage = Math.min((territoryKm2 / maxScale) * 100, 100);
            markerEl.style.left = `${percentage}%`;
            
            if (markerTerritoryEl) {
                markerTerritoryEl.textContent = `${territoryKm2.toFixed(1)} km²`;
            }
        }
        
        // Update Distance (format: X.Y km)
        const distanceEl = document.getElementById('runDistance');
        if (distanceEl) {
            distanceEl.textContent = `${runData.distance.toFixed(1)} km`;
        }
        
        // Update Time (format: ORE:MINUTI)
        const timeEl = document.getElementById('runTime');
        if (timeEl) {
            const hours = Math.floor(runData.time / 3600);
            const minutes = Math.floor((runData.time % 3600) / 60);
            timeEl.textContent = `${hours}:${minutes.toString().padStart(2, '0')}`;
        }
        
        // Update Pace
        const paceEl = document.getElementById('runPace');
        if (paceEl) {
            if (runData.pace > 0) {
                const paceMin = Math.floor(runData.pace);
                const paceSec = Math.floor((runData.pace - paceMin) * 60);
                paceEl.textContent = `${paceMin}:${paceSec.toString().padStart(2, '0')}/km`;
            } else {
                paceEl.textContent = '-:--/km';
            }
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .video-card, .theory-card, .step, .mode-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Video tracking (optional - for analytics)
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.addEventListener('play', function() {
        console.log('Video played:', this.parentElement.previousElementSibling.textContent);
    });
    
    video.addEventListener('ended', function() {
        console.log('Video completed:', this.parentElement.previousElementSibling.textContent);
    });
});

// Add loading state for videos
videos.forEach(video => {
    video.addEventListener('loadstart', function() {
        this.parentElement.style.background = 'linear-gradient(90deg, #334155 0%, #475569 50%, #334155 100%)';
        this.parentElement.style.backgroundSize = '200% 100%';
        this.parentElement.style.animation = 'shimmer 1.5s infinite';
    });
    
    video.addEventListener('loadeddata', function() {
        this.parentElement.style.animation = 'none';
        this.parentElement.style.background = '#000';
    });
});

// Add shimmer animation for loading
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;
document.head.appendChild(style);

// Stats counter animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger stats animation when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statValue = entry.target.querySelector('.stat-value');
            const text = statValue.textContent;
            
            if (text.includes('km²')) {
                animateValue(statValue, 0, 2.5, 2000);
                setTimeout(() => {
                    statValue.textContent = '2.5km²';
                }, 2000);
            }
            
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '☰';
        menuBtn.style.cssText = 'background: none; border: none; color: white; font-size: 2rem; cursor: pointer;';
        
        menuBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (navMenu.style.display === 'flex') {
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'rgba(15, 23, 42, 0.98)';
                navMenu.style.flexDirection = 'column';
                navMenu.style.padding = '2rem';
            }
        });
        
        document.querySelector('.nav-container').appendChild(menuBtn);
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Screenshot modal (optional enhancement)
document.querySelectorAll('.screenshot').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 12px;';
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

console.log('Grand Theft Cardio - Demo site loaded successfully! 🏃');
