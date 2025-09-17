// Industries Page JavaScript
// Interactive ROI Calculator and Industry-specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize ROI Calculator
    initializeROICalculator();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize industry card interactions
    initializeIndustryCards();
});

// ROI Calculator Functionality
function initializeROICalculator() {
    const industrySelect = document.getElementById('industry-select');
    const aiSystemsInput = document.getElementById('ai-systems');
    const currentRiskRange = document.getElementById('current-risk');
    const riskValueDisplay = document.getElementById('risk-value');
    const annualCostInput = document.getElementById('annual-cost');
    const calculateButton = document.getElementById('calculate-roi');
    const resultsContainer = document.getElementById('roi-results');
    
    // Update risk value display
    currentRiskRange.addEventListener('input', function() {
        riskValueDisplay.textContent = this.value + '%';
    });
    
    // Calculate ROI on button click
    calculateButton.addEventListener('click', calculateROI);
    
    // Calculate ROI on Enter key in inputs
    [aiSystemsInput, annualCostInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateROI();
            }
        });
    });
}

function calculateROI() {
    const industry = document.getElementById('industry-select').value;
    const aiSystems = parseInt(document.getElementById('ai-systems').value) || 0;
    const currentRisk = parseInt(document.getElementById('current-risk').value);
    const annualCost = parseInt(document.getElementById('annual-cost').value) || 0;
    
    // Validate inputs
    if (!industry || aiSystems === 0 || annualCost === 0) {
        alert('Please fill in all fields to calculate ROI.');
        return;
    }
    
    // Industry-specific calculation parameters
    const industryParams = {
        financial: {
            riskReduction: 0.62,
            costSavingsMultiplier: 0.35,
            avgAssessmentCost: 4999,
            description: "Financial Services"
        },
        healthcare: {
            riskReduction: 0.58,
            costSavingsMultiplier: 0.42,
            avgAssessmentCost: 5999,
            description: "Healthcare & Medical"
        },
        enterprise: {
            riskReduction: 0.45,
            costSavingsMultiplier: 0.28,
            avgAssessmentCost: 3999,
            description: "Enterprise Technology"
        },
        education: {
            riskReduction: 0.38,
            costSavingsMultiplier: 0.25,
            avgAssessmentCost: 2999,
            description: "Education Technology"
        },
        cybersecurity: {
            riskReduction: 0.55,
            costSavingsMultiplier: 0.38,
            avgAssessmentCost: 4499,
            description: "Cybersecurity & Defense"
        },
        government: {
            riskReduction: 0.48,
            costSavingsMultiplier: 0.32,
            avgAssessmentCost: 3799,
            description: "Government & Public Sector"
        }
    };
    
    const params = industryParams[industry];
    
    // Calculate metrics
    const riskReduction = Math.round(currentRisk * params.riskReduction);
    const annualSavings = Math.round(annualCost * params.costSavingsMultiplier);
    const assessmentCost = params.avgAssessmentCost * aiSystems;
    const roiPercentage = Math.round((annualSavings / assessmentCost) * 100);
    const paybackMonths = Math.ceil(assessmentCost / (annualSavings / 12));
    
    // Display results
    displayROIResults({
        riskReduction: riskReduction,
        annualSavings: annualSavings,
        roiPercentage: roiPercentage,
        paybackMonths: paybackMonths,
        industry: params.description,
        assessmentCost: assessmentCost
    });
}

function displayROIResults(results) {
    const resultsContainer = document.getElementById('roi-results');
    const riskReductionEl = document.getElementById('risk-reduction');
    const costSavingsEl = document.getElementById('cost-savings');
    const roiPercentageEl = document.getElementById('roi-percentage');
    const paybackPeriodEl = document.getElementById('payback-period');
    const recommendationEl = document.getElementById('recommendation-text');
    
    // Update result values
    riskReductionEl.textContent = results.riskReduction + '%';
    costSavingsEl.textContent = '$' + results.annualSavings.toLocaleString();
    roiPercentageEl.textContent = results.roiPercentage + '%';
    paybackPeriodEl.textContent = results.paybackMonths + ' months';
    
    // Generate recommendation
    let recommendation = `Based on your ${results.industry} profile, we recommend our `;
    
    if (results.roiPercentage > 200) {
        recommendation += 'Enterprise Assessment Package with comprehensive multi-system evaluation and ongoing monitoring. ';
    } else if (results.roiPercentage > 100) {
        recommendation += 'Professional Assessment Suite with detailed cognitive stability and personality analysis. ';
    } else {
        recommendation += 'Core Assessment Package with essential personality and stability testing. ';
    }
    
    recommendation += `With a ${results.roiPercentage}% ROI and ${results.paybackMonths}-month payback period, this investment will deliver significant value to your organization.`;
    
    recommendationEl.textContent = recommendation;
    
    // Show results with animation
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Add animation class
    setTimeout(() => {
        resultsContainer.classList.add('fade-in', 'visible');
    }, 100);
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.industry-card, .case-study, .testimonial-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Smooth scrolling for anchor links
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
}

// Industry Card Interactions
function initializeIndustryCards() {
    const industryCards = document.querySelectorAll('.industry-card');
    
    industryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Auto-populate ROI calculator when industry card is clicked
        const industryLink = card.querySelector('.btn.outline');
        if (industryLink) {
            industryLink.addEventListener('click', function(e) {
                e.preventDefault();
                const industryType = card.getAttribute('data-industry');
                if (industryType) {
                    document.getElementById('industry-select').value = industryType;
                    document.getElementById('roi-calculator').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatPercentage(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
    }).format(value / 100);
}

// Form Validation and Error Handling
function validateInput(input, type) {
    const value = input.value.trim();
    
    if (type === 'number') {
        const numValue = parseInt(value);
        if (isNaN(numValue) || numValue < 0) {
            return false;
        }
    }
    
    if (type === 'required') {
        return value.length > 0;
    }
    
    return true;
}

function showError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div style="background: #ff6b6b; color: white; padding: 15px; border-radius: 10px; margin: 15px 0; text-align: center;">
            ${message}
        </div>
    `;
    
    // Insert after calculator
    const calculator = document.querySelector('.calculator-container');
    calculator.parentNode.insertBefore(errorDiv, calculator.nextSibling);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateROI,
        displayROIResults,
        formatCurrency,
        formatPercentage
    };
}