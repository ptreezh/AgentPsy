// Main JavaScript file for AgentPsy website

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-toggle');
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');
    
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    // Insert mobile menu button before nav menu
    if (navContainer && navMenu) {
        navContainer.insertBefore(mobileMenuButton, navMenu);
        
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Change button text based on state
            if (navMenu.classList.contains('active')) {
                mobileMenuButton.innerHTML = '✕';
            } else {
                mobileMenuButton.innerHTML = '☰';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && mobileMenuButton) {
            const isClickInsideNav = navContainer.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuButton.innerHTML = '☰';
                }
            }
        });
    });
    
    // Dropdown菜单功能 - 简化版本，只添加视觉提示，不干扰CSS hover效果
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropbtn && dropdownContent) {
            // 只在有下拉菜单项的dropdown上添加视觉提示
            const menuLinks = dropdownContent.querySelectorAll('a');
            const hasValidMenuItems = menuLinks.length > 0;
            
            if (hasValidMenuItems) {
                // 添加下拉箭头指示器
                if (!dropbtn.querySelector('.dropdown-arrow')) {
                    const arrow = document.createElement('span');
                    arrow.className = 'dropdown-arrow';
                    arrow.innerHTML = ' ▼';
                    arrow.style.fontSize = '0.8em';
                    arrow.style.marginLeft = '4px';
                    dropbtn.appendChild(arrow);
                }
            }
            // 完全依赖CSS的:hover规则，不添加任何JavaScript事件处理
        }
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    // Create error message if not exists
                    if (!field.parentNode.querySelector('.error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.style.color = '#dc3545';
                        errorMessage.style.fontSize = '0.875rem';
                        errorMessage.style.marginTop = '0.25rem';
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMessage);
                    }
                } else {
                    field.classList.remove('error');
                    // Remove error message if exists
                    const errorMessage = field.parentNode.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.classList.add('error');
                    if (!this.parentNode.querySelector('.error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.style.color = '#dc3545';
                        errorMessage.style.fontSize = '0.875rem';
                        errorMessage.style.marginTop = '0.25rem';
                        errorMessage.textContent = 'This field is required';
                        this.parentNode.appendChild(errorMessage);
                    }
                } else {
                    this.classList.remove('error');
                    const errorMessage = this.parentNode.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
        });
    });
    
    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.dimension, .framework, .stage, .area, .institution, .team-member, .resource-card, .support-option');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.dimension, .framework, .stage, .area, .institution, .team-member, .resource-card, .support-option');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load in case elements are already in view
    animateOnScroll();
    
    // Search functionality for resource center
    const searchBoxes = document.querySelectorAll('.search-box input');
    searchBoxes.forEach(searchBox => {
        searchBox.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const resourceItems = this.closest('.resource-library').querySelectorAll('.resource-item');
            
            resourceItems.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                if (itemText.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Cookie consent functionality
    const cookieConsent = document.getElementById('cookie-consent');
    if (cookieConsent) {
        const consentButton = cookieConsent.querySelector('.consent-button');
        const consentStatus = localStorage.getItem('cookieConsent');
        
        if (!consentStatus) {
            cookieConsent.style.display = 'block';
        }
        
        if (consentButton) {
            consentButton.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieConsent.style.display = 'none';
            });
        }
    }
});

// Utility function to toggle element visibility
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
}

// Utility function to set active navigation
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call setActiveNav when page loads
document.addEventListener('DOMContentLoaded', setActiveNav);

// Function to handle CTA button clicks
function handleCTAClick(action) {
    // Log the action (in a real implementation, this might send data to analytics)
    console.log('CTA clicked:', action);
    
    // Example actions based on the CTA
    switch(action) {
        case 'start-assessment':
            // Scroll to assessment section or navigate to assessment page
            window.location.href = './assessment/index.html';
            break;
        case 'view-sample-report':
            // Open a modal or navigate to sample report
            alert('Sample report would be displayed here in a modal or new page');
            break;
        case 'contact-specialist':
            // Scroll to contact form or open contact modal
            window.location.href = './contact.html';
            break;
        default:
            console.log('Unknown CTA action');
    }
}

// Function to initialize any charts or data visualizations
function initializeCharts() {
    // This would be implemented if we had charting libraries
    // For now, we'll just log that it was called
    console.log('Initializing charts...');
}

// Function to handle form submissions
function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    if (form) {
        // Prevent default submission
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // In a real implementation, you would send this data to a server
        console.log('Form data:', data);
        
        // Show success message
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you! Your message has been sent.';
            successMessage.style.color = '#28a745';
            successMessage.style.marginTop = '1rem';
            successMessage.style.fontWeight = 'bold';
            
            form.appendChild(successMessage);
            
            // Reset form after a delay
            setTimeout(() => {
                form.reset();
                successMessage.remove();
            }, 3000);
        }, 1500);
    }
}