document.addEventListener('DOMContentLoaded', function() {
    // 套餐详情导航平滑滚动
    const packageLinks = document.querySelectorAll('a[href^="#"][href*="-package"]');
    packageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 评估向导功能
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const wizardPrev = document.getElementById('wizard-prev');
    const wizardNext = document.getElementById('wizard-next');
    const wizardResults = document.getElementById('wizard-results');
    const wizardGetResults = document.getElementById('wizard-get-results');
    
    let currentStep = 0;
    
    // 显示指定步骤
    function showStep(stepIndex) {
        wizardSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        // 更新按钮状态
        wizardPrev.disabled = stepIndex === 0;
        wizardNext.style.display = stepIndex === wizardSteps.length - 1 ? 'none' : 'block';
        wizardGetResults.style.display = stepIndex === wizardSteps.length - 1 ? 'block' : 'none';
    }
    
    // 下一步
    wizardNext.addEventListener('click', function() {
        if (currentStep < wizardSteps.length - 1) {
            // 检查当前步骤是否已选择选项
            const currentStepElement = wizardSteps[currentStep];
            const selectedOption = currentStepElement.querySelector('input[type="radio"]:checked');
            
            if (!selectedOption) {
                alert('请先选择一个选项');
                return;
            }
            
            currentStep++;
            showStep(currentStep);
        }
    });
    
    // 上一步
    wizardPrev.addEventListener('click', function() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });
    
    // 获取推荐结果
    wizardGetResults.addEventListener('click', function() {
        // 检查最后一步是否已选择选项
        const lastStepElement = wizardSteps[currentStep];
        const selectedOption = lastStepElement.querySelector('input[type="radio"]:checked');
        
        if (!selectedOption) {
            alert('请先选择一个选项');
            return;
        }
        
        // 收集所有选择的答案
        const answers = {};
        wizardSteps.forEach(step => {
            const selected = step.querySelector('input[type="radio"]:checked');
            if (selected) {
                const name = selected.name;
                const value = selected.value;
                answers[name] = value;
            }
        });
        
        // 生成推荐结果（这里简化处理，实际应用中可能需要更复杂的逻辑）
        let recommendation = '';
        if (answers['ai-count'] === '10+') {
            recommendation = 'Enterprise Solution';
        } else if (answers['risk-level'] === 'high' || answers['budget'] === 'enterprise') {
            recommendation = 'Professional Suite';
        } else {
            recommendation = 'Core Assessment';
        }
        
        // 显示结果
        const recommendationContent = document.getElementById('wizard-recommendation-content');
        recommendationContent.innerHTML = `
            <div class="package-recommendation">
                <h4>我们推荐您选择</h4>
                <div class="recommended-package">${recommendation}</div>
                <p>根据您的需求，${recommendation}套餐最适合您的情况，能够为您提供最佳的风险保护和投资回报。</p>
            </div>
        `;
        
        wizardResults.style.display = 'block';
        
        // 滚动到结果区域
        wizardResults.scrollIntoView({ behavior: 'smooth' });
    });
    
    // 选项选择效果
    const wizardOptions = document.querySelectorAll('.wizard-option');
    wizardOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 清除同组其他选项的选中状态
            const groupName = this.querySelector('input[type="radio"]').name;
            const groupOptions = document.querySelectorAll(`input[name="${groupName}"]`);
            groupOptions.forEach(opt => {
                opt.closest('.wizard-option').classList.remove('selected');
            });
            
            // 选中当前选项
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            this.classList.add('selected');
        });
    });
    
    // 初始化第一步
    showStep(currentStep);
    
    // 滚动动画
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});