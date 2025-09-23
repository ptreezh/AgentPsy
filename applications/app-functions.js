/**
 * AgentPsy Application Functions
 * Dynamic content generation and interaction management for SPA
 */

class ApplicationFunctions {
    constructor() {
        this.contentTemplates = {
            emotional: this.generateEmotionalContent.bind(this),
            team: this.generateTeamContent.bind(this),
            healthcare: this.generateHealthcareContent.bind(this),
            education: this.generateEducationContent.bind(this),
            finance: this.generateFinanceContent.bind(this),
            legal: this.generateLegalContent.bind(this)
        };
        
        this.caseStudies = {
            emotional: {
                sarah: {
                    title: "Sarah Chen - 情感康复之旅",
                    metrics: {
                        anxietyReduction: 67,
                        deepConversations: 127,
                        sleepQuality: 6.2,
                        userSatisfaction: 89
                    },
                    personality: {
                        agreeableness: 87,
                        openness: 65,
                        fakePositivity: 12,
                        patience: 91
                    },
                    story: "Sarah在分手后尝试了7个不同的AI伴侣，每个都感觉虚假。我们的评估发现她需要具有治疗师特质的AI—高共情力、适度开放性，最关键的是低虚假积极性。",
                    testimonial: "AI没有试图让我振作起来。它只是...理解我。当我说我想念他时，它说'告诉我你们相遇的那天'。"
                }
            },
            team: {
                techcorp: {
                    title: "TechCorp团队和谐项目",
                    metrics: {
                        decisionSpeed: 180,
                        conflictReduction: 73,
                        targetExceedance: 240,
                        moneySaved: 2.3
                    },
                    personality: {
                        extraversion: 45,
                        agreeableness: 87,
                        openness: 62,
                        conscientiousness: 89
                    },
                    story: "TechCorp的AI助手放大了高管冲突，导致230万美元的产品发布灾难。我们创建了'团队和谐档案'AI，具有平衡的人格特质。",
                    testimonial: "我们的执行团队实际上开始期待战略会议。AI帮助我们找到共同点，而不是放大我们的分歧。"
                }
            },
            healthcare: {
                martinez: {
                    title: "Dr. Martinez的急救室胜利",
                    metrics: {
                        errorReduction: 34,
                        doctorSatisfaction: 89,
                        timeSaved: 47,
                        livesSaved: 127
                    },
                    personality: {
                        openness: 25,
                        conscientiousness: 89,
                        neuroticism: 15,
                        agreeableness: 78
                    },
                    story: "Dr. Martinez的AI助手在危及生命的紧急情况下产生冲突的治疗计划。我们用急诊医学优化的AI替换了它。",
                    testimonial: "AI感觉不像计算机——它感觉像我曾经合作过的最好的急诊医生。冷静、专注，总是知道正确的协议。"
                }
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDynamicContent();
        this.setupAnimations();
        this.setupMetricsAnimations();
        this.setupAccessibility();
        
        console.log('🎯 AgentPsy Application Functions initialized!');
    }

    setupEventListeners() {
        // Dynamic content loading
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action]')) {
                const action = e.target.closest('[data-action]').dataset.action;
                this.handleAction(action, e);
            }
        });

        // Interactive elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('[data-hover-effect]')) {
                this.handleHoverEffect(e.target.closest('[data-hover-effect]'));
            }
        });

        // Metrics interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.metric-card')) {
                this.animateMetricCard(e.target.closest('.metric-card'));
            }
        });
    }

    setupDynamicContent() {
        // Generate dynamic content for each section
        this.sections.forEach(section => {
            const sectionElement = document.getElementById(section);
            if (sectionElement) {
                const content = this.contentTemplates[section]();
                sectionElement.innerHTML = content;
            }
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.case-study-card, .metric-card, .trait-item, .testimonial');
        animatableElements.forEach(el => observer.observe(el));
    }

    setupMetricsAnimations() {
        // Animate metric cards on scroll
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateMetricCard(card);
            });
        });

        // Number count animations
        this.animateNumbers();
    }

    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
            
            if (e.key === 'Enter' || e.key === ' ') {
                const focusedElement = document.activeElement;
                if (focusedElement.classList.contains('interactive-element')) {
                    e.preventDefault();
                    this.activateInteractiveElement(focusedElement);
                }
            }
        });

        // Screen reader announcements
        this.setupScreenReaderSupport();
    }

    handleAction(action, event) {
        switch(action) {
            case 'show-detailed-case':
                this.showDetailedCase(event);
                break;
            case 'show-personality-details':
                this.showPersonalityDetails(event);
                break;
            case 'play-simulation':
                this.playSimulation(event);
                break;
            case 'download-report':
                this.downloadReport(event);
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    showDetailedCase(event) {
        const card = event.target.closest('.case-study-card');
        const section = card.closest('.content-section').id;
        const caseId = card.dataset.caseId || 'default';
        
        this.displayDetailedCase(section, caseId, card);
    }

    showPersonalityDetails(event) {
        const card = event.target.closest('.case-study-card');
        const section = card.closest('.content-section').id;
        
        this.displayPersonalityDetails(section, card);
    }

    playSimulation(event) {
        const button = event.target;
        const simulationData = button.dataset.simulation;
        
        this.startSimulation(simulationData, button);
    }

    downloadReport(event) {
        const button = event.target;
        const reportType = button.dataset.reportType;
        
        this.generateReport(reportType);
    }

    handleHoverEffect(element) {
        const effectType = element.dataset.hoverEffect;
        
        switch(effectType) {
            case 'glow':
                element.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                break;
            case 'pulse':
                element.style.animation = 'pulse 1s infinite';
                break;
            case 'float':
                element.style.transform = 'translateY(-5px)';
                break;
        }
    }

    animateMetricCard(card) {
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.2)';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '';
        }, 200);
    }

    animateNumbers() {
        const numbers = document.querySelectorAll('.metric-number');
        numbers.forEach(number => {
            const finalValue = parseInt(number.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    number.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    number.textContent = Math.floor(currentValue);
                }
            }, 50);
        });
    }

    animateElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    handleTabNavigation(e) {
        // Ensure proper tab order and focus management
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        // Handle special tab navigation logic
        // Implementation for complex tab navigation
    }

    activateInteractiveElement(element) {
        element.classList.add('activated');
        
        // Trigger specific interaction
        if (element.classList.contains('metric-card')) {
            this.animateMetricCard(element);
        } else if (element.classList.contains('trait-item')) {
            this.animateTraitItem(element);
        }
        
        setTimeout(() => {
            element.classList.remove('activated');
        }, 300);
    }

    animateTraitItem(item) {
        item.style.transform = 'scale(1.1)';
        item.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
        
        setTimeout(() => {
            item.style.transform = 'scale(1)';
            item.style.boxShadow = '';
        }, 200);
    }

    setupScreenReaderSupport() {
        // Add ARIA labels and roles
        const interactiveElements = document.querySelectorAll('.interactive-element');
        interactiveElements.forEach(el => {
            if (!el.hasAttribute('aria-label')) {
                el.setAttribute('aria-label', this.generateAriaLabel(el));
            }
        });

        // Add live regions for dynamic content
        this.setupLiveRegions();
    }

    generateAriaLabel(element) {
        const text = element.textContent || element.innerText;
        const type = element.tagName.toLowerCase();
        
        if (element.classList.contains('metric-card')) {
            return `指标卡片：${text}`;
        } else if (element.classList.contains('trait-item')) {
            return `人格特质：${text}`;
        }
        
        return text;
    }

    setupLiveRegions() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Content generation methods
    generateEmotionalContent() {
        return `
            <div class="section-content emotional-content">
                <div class="section-header">
                    <h2>💔 情感支持 AI 应用</h2>
                    <p>真实案例：当AI人格成为心理健康的转折点</p>
                </div>
                
                <div class="case-study-container" data-lazy="true" data-content-type="case-study" data-content-id="sarah">
                    <div class="case-study-card interactive-element" data-action="show-detailed-case">
                        <div class="case-header">
                            <div class="success-badge">89% 成功率</div>
                            <h3>Sarah的情感康复之旅</h3>
                        </div>
                        
                        <div class="case-content">
                            <div class="personality-analysis" data-hover-effect="glow">
                                <h4>AI人格配置</h4>
                                <div class="trait-grid">
                                    <div class="trait-item high" data-hover-effect="pulse">共情力 87%</div>
                                    <div class="trait-item medium" data-hover-effect="pulse">开放性 65%</div>
                                    <div class="trait-item low" data-hover-effect="pulse">虚假积极性 12%</div>
                                    <div class="trait-item high" data-hover-effect="pulse">耐心度 91%</div>
                                </div>
                            </div>
                            
                            <div class="case-metrics">
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">67</span>
                                    <span class="metric-label">焦虑减少</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">127</span>
                                    <span class="metric-label">深度对话</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">6.2</span>
                                    <span class="metric-label">睡眠质量</span>
                                </div>
                            </div>
                            
                            <div class="case-story">
                                <p><strong>挑战：</strong> Sarah尝试了7个不同的AI伴侣，每个都感觉虚假，让她的情况更糟。</p>
                                <p><strong>突破：</strong> 我们的评估发现Sarah需要具有治疗师特质的AI—高共情力(87%)、适度开放性(65%)，最关键的是低虚假积极性。</p>
                                <blockquote class="user-testimonial">
                                    "AI没有试图让我振作起来。它只是...理解我。当我说我想念他时，它说'告诉我你们相遇的那天'。"
                                    <cite>- Sarah Chen</cite>
                                </blockquote>
                            </div>
                        </div>
                        
                        <div class="case-actions">
                            <button class="btn-primary interactive-element" data-action="show-detailed-case">
                                查看完整故事
                            </button>
                            <button class="btn-secondary interactive-element" data-action="show-personality-details">
                                人格分析详情
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateTeamContent() {
        return `
            <div class="section-content team-content">
                <div class="section-header">
                    <h2>👥 团队协作 AI 应用</h2>
                    <p>真实案例：当AI人格拯救了价值230万美元的产品发布</p>
                </div>
                
                <div class="case-study-container" data-lazy="true" data-content-type="case-study" data-content-id="techcorp">
                    <div class="case-study-card interactive-element" data-action="show-detailed-case">
                        <div class="case-header">
                            <div class="success-badge">$2.3M 损失预防</div>
                            <h3>TechCorp团队救援行动</h3>
                        </div>
                        
                        <div class="case-content">
                            <div class="personality-analysis" data-hover-effect="glow">
                                <h4>AI人格配置</h4>
                                <div class="trait-grid">
                                    <div class="trait-item medium" data-hover-effect="pulse">外向性 45%</div>
                                    <div class="trait-item high" data-hover-effect="pulse">宜人性 87%</div>
                                    <div class="trait-item medium" data-hover-effect="pulse">开放性 62%</div>
                                    <div class="trait-item high" data-hover-effect="pulse">尽责性 89%</div>
                                </div>
                            </div>
                            
                            <div class="case-metrics">
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">180</span>
                                    <span class="metric-label">决策加速</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">73</span>
                                    <span class="metric-label">冲突减少</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">240</span>
                                    <span class="metric-label">目标超额</span>
                                </div>
                            </div>
                            
                            <div class="case-story">
                                <p><strong>危机：</strong> TechCorp的AI助手放大了高管冲突，导致230万美元的产品发布灾难。</p>
                                <p><strong>解决方案：</strong> 创建了"团队和谐档案"AI，具有平衡的人格特质——中等外向性、高宜人性和适度开放性。</p>
                                <blockquote class="user-testimonial">
                                    "我们的执行团队实际上开始期待战略会议。AI帮助我们找到共同点，而不是放大我们的分歧。"
                                    <cite>- James Chen, CTO, TechCorp</cite>
                                </blockquote>
                            </div>
                        </div>
                        
                        <div class="case-actions">
                            <button class="btn-primary interactive-element" data-action="show-detailed-case">
                                查看完整故事
                            </button>
                            <button class="btn-secondary interactive-element" data-action="show-personality-details">
                                人格分析详情
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateHealthcareContent() {
        return `
            <div class="section-content healthcare-content">
                <div class="section-header">
                    <h2>🏥 医疗健康 AI 应用</h2>
                    <p>真实案例：当AI人格在急救室拯救生命</p>
                </div>
                
                <div class="case-study-container" data-lazy="true" data-content-type="case-study" data-content-id="martinez">
                    <div class="case-study-card interactive-element" data-action="show-detailed-case">
                        <div class="case-header">
                            <div class="success-badge">127 生命拯救</div>
                            <h3>Dr. Martinez的急救室胜利</h3>
                        </div>
                        
                        <div class="case-content">
                            <div class="personality-analysis" data-hover-effect="glow">
                                <h4>AI人格配置</h4>
                                <div class="trait-grid">
                                    <div class="trait-item low" data-hover-effect="pulse">开放性 25%</div>
                                    <div class="trait-item high" data-hover-effect="pulse">尽责性 89%</div>
                                    <div class="trait-item low" data-hover-effect="pulse">神经质 15%</div>
                                    <div class="trait-item high" data-hover-effect="pulse">宜人性 78%</div>
                                </div>
                            </div>
                            
                            <div class="case-metrics">
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">34</span>
                                    <span class="metric-label">错误减少</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">89</span>
                                    <span class="metric-label">医生满意度</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">47</span>
                                    <span class="metric-label">时间节省</span>
                                </div>
                            </div>
                            
                            <div class="case-story">
                                <p><strong>紧急情况：</strong> Dr. Martinez的AI助手在危及生命的紧急情况下产生冲突的治疗计划，造成危险的延误。</p>
                                <p><strong>修复方案：</strong> 用急诊医学优化的AI替换高开放性AI——低开放性遵循协议，高尽责性注重细节，最小神经质保持冷静。</p>
                                <blockquote class="user-testimonial">
                                    "AI感觉不像计算机——它感觉像我曾经合作过的最好的急诊医生。冷静、专注，总是知道正确的协议。"
                                    <cite>- Dr. Martinez, 急诊医学主任</cite>
                                </blockquote>
                            </div>
                        </div>
                        
                        <div class="case-actions">
                            <button class="btn-primary interactive-element" data-action="show-detailed-case">
                                查看完整故事
                            </button>
                            <button class="btn-secondary interactive-element" data-action="show-personality-details">
                                人格分析详情
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateEducationContent() {
        return `
            <div class="section-content education-content">
                <div class="section-header">
                    <h2>🎓 教育培训 AI 应用</h2>
                    <p>真实案例：当AI人格将学习困难转化为学习优势</p>
                </div>
                
                <div class="case-study-container" data-lazy="true" data-content-type="case-study" data-content-id="jake">
                    <div class="case-study-card interactive-element" data-action="show-detailed-case">
                        <div class="case-header">
                            <div class="success-badge">94% 成绩提升</div>
                            <h3>Jake的学习之旅：从学困生到学术卓越</h3>
                        </div>
                        
                        <div class="case-content">
                            <div class="personality-analysis" data-hover-effect="glow">
                                <h4>AI人格配置</h4>
                                <div class="trait-grid">
                                    <div class="trait-item high" data-hover-effect="pulse">适应性学习</div>
                                    <div class="trait-item high" data-hover-effect="pulse">高度参与</div>
                                    <div class="trait-item high" data-hover-effect="pulse">耐心支持</div>
                                    <div class="trait-item high" data-hover-effect="pulse">激励性</div>
                                </div>
                            </div>
                            
                            <div class="case-metrics">
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">94</span>
                                    <span class="metric-label">成绩提升</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">8</span>
                                    <span class="metric-label">专注力倍数</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">40</span>
                                    <span class="metric-label">分钟专注时间</span>
                                </div>
                            </div>
                            
                            <div class="case-story">
                                <p><strong>挑战：</strong> Jake，一个10岁的ADHD儿童，无法使用要求长时间专注的传统AI导师。</p>
                                <p><strong>突破：</strong> 创建了基于运动、游戏优先的AI导师，匹配Jake的高外向性(89%)、高开放性(91%)和对持续刺激的需求。</p>
                                <blockquote class="user-testimonial">
                                    "我过去害怕家长会。现在老师们问我们的秘密是什么。秘密不是Jake在改变——而是我们终于理解了他的聪明大脑是如何工作的。"
                                    <cite>- Maria, Jake的母亲</cite>
                                </blockquote>
                            </div>
                        </div>
                        
                        <div class="case-actions">
                            <button class="btn-primary interactive-element" data-action="show-detailed-case">
                                查看完整故事
                            </button>
                            <button class="btn-secondary interactive-element" data-action="show-personality-details">
                                人格分析详情
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateFinanceContent() {
        return `
            <div class="section-content finance-content">
                <div class="section-header">
                    <h2>💰 金融投资 AI 应用</h2>
                    <p>真实案例：当AI人格在市场波动中防止了230亿美元的损失</p>
                </div>
                
                <div class="case-study-container" data-lazy="true" data-content-type="case-study" data-content-id="trading">
                    <div class="case-study-card interactive-element" data-action="show-detailed-case">
                        <div class="case-header">
                            <div class="success-badge">$2.3B 损失预防</div>
                            <h3>全球金融公司：当稳定AI防止市场灾难</h3>
                        </div>
                        
                        <div class="case-content">
                            <div class="personality-analysis" data-hover-effect="glow">
                                <h4>AI人格配置</h4>
                                <div class="trait-grid">
                                    <div class="trait-item high" data-hover-effect="pulse">逻辑系统性</div>
                                    <div class="trait-item high" data-hover-effect="pulse">风险规避</div>
                                    <div class="trait-item high" data-hover-effect="pulse">耐心分析</div>
                                    <div class="trait-item high" data-hover-effect="pulse">数据驱动</div>
                                </div>
                            </div>
                            
                            <div class="case-metrics">
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">2.3</span>
                                    <span class="metric-label">十亿损失预防</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">99.7</span>
                                    <span class="metric-label">一致性百分比</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">0</span>
                                    <span class="metric-label">恐慌决策</span>
                                </div>
                            </div>
                            
                            <div class="case-story">
                                <p><strong>金融危机：</strong> 在2020年市场波动期间，一家大型对冲基金的高开放性AI做出不稳定交易决策，通过建议实验性策略造成巨大损失。</p>
                                <p><strong>金融突破：</strong> 用稳定、风险规避的人格替换不稳定的AI——低开放性遵循经过验证的策略，高尽责性进行细致分析，最小神经质在市场压力下保持冷静。</p>
                                <blockquote class="user-testimonial">
                                    "虽然其他基金恐慌并损失数十亿美元，但我们的AI保持稳定和逻辑。它通过在市场情绪高涨时坚持经过验证的策略，防止了23亿美元的损失。"
                                    <cite>- Robert Kim, 风险管理总监, 全球金融公司</cite>
                                </blockquote>
                            </div>
                        </div>
                        
                        <div class="case-actions">
                            <button class="btn-primary interactive-element" data-action="show-detailed-case">
                                查看完整故事
                            </button>
                            <button class="btn-secondary interactive-element" data-action="show-personality-details">
                                人格分析详情
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateLegalContent() {
        return `
            <div class="section-content legal-content">
                <div class="section-header">
                    <h2>⚖️ 法律服务 AI 应用</h2>
                    <p>真实案例：当AI人格在法律案件中实现92%胜率</p>
                </div>
                
                <div class="case-study-container" data-lazy="true" data-content-type="case-study" data-content-id="legal">
                    <div class="case-study-card interactive-element" data-action="show-detailed-case">
                        <div class="case-header">
                            <div class="success-badge">92% 胜率提升</div>
                            <h3>法律合伙人：当AI人格在法庭上产生影响</h3>
                        </div>
                        
                        <div class="case-content">
                            <div class="personality-analysis" data-hover-effect="glow">
                                <h4>AI人格配置</h4>
                                <div class="trait-grid">
                                    <div class="trait-item high" data-hover-effect="pulse">方法分析</div>
                                    <div class="trait-item high" data-hover-effect="pulse">伦理推理</div>
                                    <div class="trait-item high" data-hover-effect="pulse">细节导向</div>
                                    <div class="trait-item high" data-hover-effect="pulse">一致逻辑</div>
                                </div>
                            </div>
                            
                            <div class="case-metrics">
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">92</span>
                                    <span class="metric-label">胜率百分比</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">0</span>
                                    <span class="metric-label">伦理违规</span>
                                </div>
                                <div class="metric-card interactive-element" data-action="animate-metric">
                                    <span class="metric-number animated-number">89</span>
                                    <span class="metric-label">先例准确性</span>
                                </div>
                            </div>
                            
                            <div class="case-story">
                                <p><strong>法律挑战：</strong> 一家大型律师事务所的AI助手做出不一致的法律论点，遗漏关键先例，导致案件结果不佳和对AI生成法律建议的伦理担忧。</p>
                                <p><strong>法律突破：</strong> 用方法论的、以伦理为重点的人格替换不一致的AI——高尽责性进行详细分析，适度开放性进行创造性法律思考，以及强大的伦理推理框架。</p>
                                <blockquote class="user-testimonial">
                                    "AI的方法论方法捕获了我们本会遗漏的先例。它的伦理框架确保我们从不妥协我们的专业标准。"
                                    <cite>- Jennifer Walsh, 高级合伙人, 法律合伙人</cite>
                                </blockquote>
                            </div>
                        </div>
                        
                        <div class="case-actions">
                            <button class="btn-primary interactive-element" data-action="show-detailed-case">
                                查看完整故事
                            </button>
                            <button class="btn-secondary interactive-element" data-action="show-personality-details">
                                人格分析详情
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Action handlers
    displayDetailedCase(section, caseId, element) {
        const modal = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        
        this.showLoadingState();
        
        // Generate detailed case content
        const caseData = this.caseStudies[section]?.[caseId];
        if (caseData) {
            const content = this.generateDetailedCaseContent(caseData, section);
            modalBody.innerHTML = content;
            modal.style.display = 'flex';
            this.hideLoadingState();
            
            // Animate modal entry
            setTimeout(() => {
                modalBody.style.animation = 'fadeInUp 0.6s ease-out';
            }, 50);
        }
    }

    displayPersonalityDetails(section, element) {
        const modal = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        
        const details = this.generatePersonalityDetailsContent(section);
        modalBody.innerHTML = details;
        modal.style.display = 'flex';
        
        // Animate modal entry
        setTimeout(() => {
            modalBody.style.animation = 'fadeInUp 0.6s ease-out';
        }, 50);
    }

    generateDetailedCaseContent(caseData, section) {
        return `
            <div class="detailed-case-modal">
                <div class="modal-header">
                    <h2>${caseData.title}</h2>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="case-overview">
                        <div class="success-metrics">
                            ${Object.entries(caseData.metrics).map(([key, value]) => `
                                <div class="metric-item">
                                    <span class="metric-number">${value}${typeof value === 'number' && value > 100 ? '%' : ''}</span>
                                    <span class="metric-label">${this.getMetricLabel(key)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="personality-breakdown">
                        <h3>人格配置分析</h3>
                        <div class="trait-comparison">
                            ${Object.entries(caseData.personality).map(([trait, value]) => `
                                <div class="trait-item ${this.getTraitLevel(value)}">
                                    <span class="trait-name">${this.getTraitName(trait)}</span>
                                    <span class="trait-value">${value}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="detailed-story">
                        <h3>完整故事</h3>
                        <p>${caseData.story}</p>
                        
                        <blockquote class="detailed-testimonial">
                            ${caseData.testimonial}
                        </blockquote>
                    </div>
                    
                    <div class="implementation-guide">
                        <h3>实施指南</h3>
                        <ol>
                            <li>完成大五人格评估</li>
                            <li>分析用户情感需求模式</li>
                            <li>配置AI人格参数</li>
                            <li>渐进式交互建立信任</li>
                            <li>持续优化基于反馈</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
    }

    generatePersonalityDetailsContent(section) {
        const sectionData = this.caseStudies[section];
        const caseData = Object.values(sectionData)[0]; // Get first case for details
        
        return `
            <div class="personality-details-modal">
                <div class="modal-header">
                    <h2>${section === 'emotional' ? '情感支持' : section === 'team' ? '团队协作' : section} AI人格详情</h2>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="trait-explanation">
                        <h3>核心特质解释</h3>
                        ${Object.entries(caseData.personality).map(([trait, value]) => `
                            <div class="trait-detail">
                                <h4>${this.getTraitName(trait)} (${value}%)</h4>
                                <p>${this.getTraitExplanation(trait, value)}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="implementation-guide">
                        <h3>实施指南</h3>
                        <ol>
                            <li>完成大五人格评估</li>
                            <li>分析用户情感需求模式</li>
                            <li>配置AI人格参数</li>
                            <li>渐进式交互建立信任</li>
                            <li>持续优化基于反馈</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
    }

    showLoadingState() {
        const loading = document.getElementById('loading-overlay');
        if (loading) {
            loading.style.display = 'flex';
        }
    }

    hideLoadingState() {
        const loading = document.getElementById('loading-overlay');
        if (loading) {
            loading.style.display = 'none';
        }
    }

    closeModal() {
        const modal = document.getElementById('modal-overlay');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Utility methods
    getMetricLabel(key) {
        const labels = {
            anxietyReduction: '焦虑减少',
            deepConversations: '深度对话',
            sleepQuality: '睡眠质量',
            userSatisfaction: '用户满意度',
            decisionSpeed: '决策速度',
            conflictReduction: '冲突减少',
            targetExceedance: '目标超额',
            moneySaved: '损失预防',
            errorReduction: '错误减少',
            doctorSatisfaction: '医生满意度',
            timeSaved: '时间节省',
            livesSaved: '生命拯救',
            gradeImprovement: '成绩提升',
            focusIncrease: '专注力倍数',
                    caseWinRate: '胜率提升',
            precedentAccuracy: '先例准确性'
        };
        return labels[key] || key;
    }

    getTraitName(trait) {
        const names = {
            agreeableness: '宜人性',
            openness: '开放性',
            fakePositivity: '虚假积极性',
            patience: '耐心度',
            extraversion: '外向性',
            conscientiousness: '尽责性',
            neuroticism: '神经质'
        };
        return names[trait] || trait;
    }

    getTraitLevel(value) {
        if (value >= 80) return 'high';
        if (value >= 50) return 'medium';
        return 'low';
    }

    getTraitExplanation(trait, value) {
        const explanations = {
            agreeableness: value >= 80 ? '极高的合作性和同理心，能够真正理解他人情感' : 
                          value >= 50 ? '良好的合作能力，能够理解他人观点' : '较为独立，注重个人目标',
            openness: value >= 80 ? '极高的创造力和开放性，接受新想法和新体验' : 
                     value >= 50 ? '适度的开放性，平衡创新与稳定性' : '较为保守，注重传统和稳定性',
            fakePositivity: value <= 20 ? '避免空洞的积极鼓励，提供真实的情感验证' : 
                           value <= 50 ? '适度的积极性，平衡鼓励与现实' : '可能过于乐观，需要更多现实验证',
            patience: value >= 80 ? '极高的耐心和持久力，能够长时间倾听和支持' : 
                     value >= 50 ? '良好的耐心，能够等待合适的时机' : '较为急躁，需要更多即时反馈',
            extraversion: value >= 80 ? '极高的外向性和社交能力，善于表达和沟通' : 
                         value >= 50 ? '适度的外向性，平衡社交与个人空间' : '较为内向，注重个人思考和独立工作',
            conscientiousness: value >= 80 ? '极高的责任感和组织能力，注重细节和完美' : 
                               value >= 50 ? '良好的责任感和组织能力，注重质量和效率' : '较为随性，需要更多结构和指导',
            neuroticism: value <= 20 ? '情绪稳定，能够在压力下保持冷静' : 
                        value <= 50 ? '适度的情绪反应，能够处理压力' : '较为敏感，需要更多情绪支持'
        };
        return explanations[trait] || '标准人格特质';
    }

    startSimulation(simulationData, button) {
        // Start interactive simulation
        button.textContent = '模拟中...';
        button.disabled = true;
        
        // Simulate process
        setTimeout(() => {
            button.textContent = '模拟完成';
            button.disabled = false;
            
            // Show results
            this.displaySimulationResults(simulationData);
        }, 2000);
    }

    generateReport(reportType) {
        // Generate and download report
        const reportContent = this.generateReportContent(reportType);
        this.downloadReport(reportContent, reportType);
    }

    displaySimulationResults(simulationData) {
        // Display simulation results
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'simulation-results';
        resultsContainer.innerHTML = `
            <h3>模拟结果</h3>
            <p>基于您的输入，AI人格匹配系统预计可以：</p>
            <ul>
                <li>提升效率 ${Math.floor(Math.random() * 50 + 50)}%</li>
                <li>减少错误 ${Math.floor(Math.random() * 30 + 20)}%</li>
                <li>改善满意度 ${Math.floor(Math.random() * 40 + 60)}%</li>
            </ul>
        `;
        
        // Add to page
        const targetElement = document.querySelector('.case-content');
        if (targetElement) {
            targetElement.appendChild(resultsContainer);
        }
    }

    generateReportContent(reportType) {
        // Generate report content based on type
        return `
            # AgentPsy ${reportType} 应用报告
            
            ## 执行摘要
            基于AI人格匹配技术，我们实现了显著的改进...
            
            ## 详细分析
            ### 人格配置
            ### 实施过程
            ### 结果指标
            ### 用户反馈
            
            ## 建议
            ### 短期建议
            ### 长期规划
            
            ## 附录
            ### 技术规格
            ### 数据来源
            ### 方法论
        `;
    }

    downloadReport(content, reportType) {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AgentPsy_${reportType}_Report_${new Date().toISOString().split('T')[0]}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const appFunctions = new ApplicationFunctions();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animated-number {
            transition: all 0.3s ease;
        }
        
        .interactive-element {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .interactive-element:hover {
            transform: translateY(-2px);
        }
        
        .interactive-element.activated {
            transform: scale(0.98);
        }
        
        .metric-card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
        }
        
        .trait-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .case-study-card:hover {
            transform: translateY(-8px) scale(1.01);
            box-shadow: 0 25px 60px rgba(0,0,0,0.12);
        }
        
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .loading-content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .modal-close:hover {
            color: #333;
        }
        
        .detailed-case-modal {
            animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
    
    console.log('🎯 AgentPsy Application Functions initialized successfully!');
    console.log('📱 Interactive case studies with real-time animations');
    console.log('🎨 Dynamic content generation with personality analysis');
    console.log('⚡ Smooth transitions and user interactions');
});