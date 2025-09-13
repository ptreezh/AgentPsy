// Interactive Animations for Applications Stories Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initScrollAnimations();
    initEmotionMeters();
    initComicPanels();
    initPersonalitySliders();
    initInteractiveElements();
});

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for different elements
                if (entry.target.classList.contains('comic-panel')) {
                    animateComicPanel(entry.target);
                }
                
                if (entry.target.classList.contains('emotion-meter')) {
                    animateEmotionMeter(entry.target);
                }
                
                if (entry.target.classList.contains('ai-personality-card')) {
                    animatePersonalityCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all story elements
    const storyElements = document.querySelectorAll('.story-card, .comic-panel, .emotion-meter, .ai-personality-card, .profile-card');
    storyElements.forEach(el => observer.observe(el));
}

// Comic panel animations
function initComicPanels() {
    const comicPanels = document.querySelectorAll('.comic-panel');
    
    comicPanels.forEach(panel => {
        // Add hover effects
        panel.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
        });
        
        panel.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
        
        // Add click sound effect (visual feedback)
        panel.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Add ripple effect
            createRippleEffect(this, event);
        });
    });
}

function animateComicPanel(panel) {
    // Bounce-in animation
    panel.style.animation = 'bounceIn 0.8s ease-out';
    
    // Animate character illustration
    const illustration = panel.querySelector('.character-illustration');
    if (illustration) {
        illustration.style.animation = 'characterBounce 1.2s ease-out';
    }
    
    // Animate quote bubbles
    const quoteBubbles = panel.querySelectorAll('.quote-bubble');
    quoteBubbles.forEach((bubble, index) => {
        setTimeout(() => {
            bubble.style.animation = 'fadeInUp 0.6s ease-out';
        }, index * 200);
    });
}

// Emotion meter animations
function initEmotionMeters() {
    const emotionMeters = document.querySelectorAll('.emotion-meter');
    
    emotionMeters.forEach(meter => {
        // Add hover effect
        meter.addEventListener('mouseenter', function() {
            const bars = this.querySelectorAll('.emotion-fill');
            bars.forEach(bar => {
                bar.style.transition = 'height 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                // Create pulsing effect
                setInterval(() => {
                    const currentHeight = parseInt(bar.style.height) || 0;
                    bar.style.height = (currentHeight + Math.sin(Date.now() * 0.001) * 5) + '%';
                }, 100);
            });
        });
    });
}

function animateEmotionMeter(meter) {
    const bars = meter.querySelectorAll('.emotion-fill');
    
    bars.forEach((bar, index) => {
        const targetHeight = bar.style.height || '50%';
        bar.style.height = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'height 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            bar.style.height = targetHeight;
            
            // Add glow effect when full
            if (parseInt(targetHeight) > 80) {
                bar.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.6)';
            }
        }, index * 300);
    });
}

// Personality card animations
function animatePersonalityCard(card) {
    // Entrance animation
    card.style.animation = 'slideInUp 0.8s ease-out';
    
    // Add floating animation
    setInterval(() => {
        const time = Date.now() * 0.001;
        const offset = Math.sin(time) * 3;
        card.style.transform = `translateY(${offset}px)`;
    }, 50);
}

// Interactive personality sliders
function initPersonalitySliders() {
    const traitSliders = document.querySelectorAll('.trait-slider');
    
    traitSliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const fill = slider.querySelector('.slider-fill');
        const value = slider.querySelector('.slider-value');
        
        let isDragging = false;
        
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag);
        
        function startDrag(e) {
            isDragging = true;
            e.preventDefault();
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('touchend', stopDrag);
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            const rect = slider.getBoundingClientRect();
            const clientX = e.clientX || e.touches[0].clientX;
            const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
            
            handle.style.left = percentage + '%';
            fill.style.width = percentage + '%';
            value.textContent = Math.round(percentage) + '%';
            
            // Update color based on value
            if (percentage > 70) {
                fill.style.background = 'linear-gradient(90deg, #28a745, #20c997)';
            } else if (percentage > 40) {
                fill.style.background = 'linear-gradient(90deg, #ffc107, #fd7e14)';
            } else {
                fill.style.background = 'linear-gradient(90deg, #dc3545, #e83e8c)';
            }
        }
        
        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend', stopDrag);
        }
    });
}

// Interactive elements
function initInteractiveElements() {
    // Add parallax effect to story sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const storySections = document.querySelectorAll('.story-section');
        
        storySections.forEach(section => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            section.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Add click-to-expand functionality for comic panels
    const expandablePanels = document.querySelectorAll('.comic-panel.expandable');
    expandablePanels.forEach(panel => {
        panel.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            if (this.classList.contains('expanded')) {
                this.style.maxHeight = 'none';
                this.style.transform = 'scale(1.05)';
                
                // Add more detailed content
                const extraContent = document.createElement('div');
                extraContent.className = 'expanded-content';
                extraContent.innerHTML = `
                    <div class="detailed-stats">
                        <h4>Detailed Analysis</h4>
                        <div class="metrics-grid">
                            <div class="metric">
                                <span class="metric-value">94%</span>
                                <span class="metric-label">Success Rate</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">1,247</span>
                                <span class="metric-label">Users Helped</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">8.7</span>
                                <span class="metric-label">User Rating</span>
                            </div>
                        </div>
                    </div>
                `;
                this.appendChild(extraContent);
            } else {
                this.style.transform = 'scale(1)';
                const expandedContent = this.querySelector('.expanded-content');
                if (expandedContent) {
                    expandedContent.remove();
                }
            }
        });
    });
    
    // Add typing animation for AI quotes
    const aiQuotes = document.querySelectorAll('.ai-quote');
    aiQuotes.forEach(quote => {
        const originalText = quote.textContent;
        quote.textContent = '';
        
        // Type out the quote
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < originalText.length) {
                quote.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    });
}

// Ripple effect for click interactions
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// CSS animations (added via JavaScript)
function addAnimationsCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes characterBounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
            60% { transform: translateY(-10px); }
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .comic-panel {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .comic-panel:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .character-illustration {
            transition: transform 0.3s ease;
        }
        
        .character-illustration:hover {
            transform: scale(1.1) rotate(5deg);
        }
        
        .emotion-fill {
            transition: all 0.3s ease;
        }
        
        .emotion-fill:hover {
            filter: brightness(1.2);
        }
        
        .quote-bubble {
            position: relative;
            animation: fadeInUp 0.6s ease-out;
        }
        
        .quote-bubble::before {
            content: """;
            font-size: 3em;
            color: #667eea;
            position: absolute;
            top: -10px;
            left: 10px;
            opacity: 0.3;
        }
        
        .story-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .story-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .ripple-effect {
            animation: ripple 0.6s linear;
        }
        
        .expanded-content {
            animation: fadeInUp 0.5s ease-out;
            margin-top: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            border: 1px solid #dee2e6;
        }
        
        .detailed-stats {
            text-align: center;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 20px;
        }
        
        .metric {
            text-align: center;
            padding: 15px;
            background: white;
            border-radius: 10px;
        }
        
        .metric-value {
            display: block;
            font-size: 2rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 5px;
        }
        
        .metric-label {
            color: #6c757d;
            font-size: 0.9rem;
        }
        
        .ai-quote {
            font-family: 'Courier New', monospace;
            position: relative;
            overflow: hidden;
        }
        
        .typing-cursor {
            display: inline-block;
            width: 2px;
            height: 1em;
            background: #667eea;
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addAnimationsCSS();
    initScrollAnimations();
    initEmotionMeters();
    initComicPanels();
    initPersonalitySliders();
    initInteractiveElements();
    
    console.log('🎭 AgentPsy Applications Stories Enhanced with Interactive Animations!');
});

// Export functions for external use
window.AgentPsyAnimations = {
    animateComicPanel,
    animateEmotionMeter,
    animatePersonalityCard,
    createRippleEffect
};