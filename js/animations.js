/* ============================================
   PORTFÓLIO VINICIUS RIBEIRO - ANIMATIONS.JS
   ============================================
   Animações com Intersection Observer, contadores
   animados, efeito typing e scroll progress.
   ============================================ */

/* --------------------------------------------
   1. INTERSECTION OBSERVER - ANIMAÇÕES DE SCROLL
   -------------------------------------------- */
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.init();
    }

    init() {
        const animatedElements = document.querySelectorAll('.animate');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Se for um skill bar, anima a largura
                    const skillBar = entry.target.querySelector('.skill-progress');
                    if (skillBar) {
                        const width = skillBar.getAttribute('data-width');
                        if (width) {
                            setTimeout(() => {
                                skillBar.style.width = width;
                            }, 300);
                        }
                    }

                    // Se for um stat card, inicia o contador
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber && !statNumber.classList.contains('counted')) {
                        this.animateCounter(statNumber);
                        statNumber.classList.add('counted');
                    }

                    // Para de observar depois de animar
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        animatedElements.forEach(el => observer.observe(el));
    }

    /* Anima contador numérico */
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutQuart)
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    }
}

/* --------------------------------------------
   2. EFEITO TYPING
   -------------------------------------------- */
class TypeWriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;

        this.options = {
            typeSpeed: options.typeSpeed || 100,
            deleteSpeed: options.deleteSpeed || 50,
            pauseTime: options.pauseTime || 2000,
            ...options
        };

        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.options.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

/* --------------------------------------------
   3. SCROLL PROGRESS BAR
   -------------------------------------------- */
class ScrollProgress {
    constructor() {
        this.progressBar = document.querySelector('.scroll-progress');
        if (!this.progressBar) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;

            this.progressBar.style.width = progress + '%';
        });
    }
}

/* --------------------------------------------
   4. PARALLAX EFFECT
   -------------------------------------------- */
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        if (this.elements.length === 0) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            this.elements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

/* --------------------------------------------
   5. CURSOR PERSONALIZADO
   -------------------------------------------- */
class CustomCursor {
    constructor() {
        // Só ativa em dispositivos com mouse
        if (window.matchMedia('(pointer: coarse)').matches) return;

        this.cursor = document.querySelector('.custom-cursor');
        this.cursorDot = document.querySelector('.cursor-dot');

        if (!this.cursor || !this.cursorDot) return;

        this.init();
    }

    init() {
        // Esconde cursor padrão
        document.body.style.cursor = 'none';

        // Movimento do cursor
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';

            // Dot segue com delay menor
            setTimeout(() => {
                this.cursorDot.style.left = e.clientX + 'px';
                this.cursorDot.style.top = e.clientY + 'px';
            }, 50);
        });

        // Hover em elementos interativos
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .tech-card, .project-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });

        // Esconder quando mouse sai da janela
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                this.cursor.style.opacity = '0';
                this.cursorDot.style.opacity = '0';
            }
        });

        document.addEventListener('mouseover', () => {
            this.cursor.style.opacity = '1';
            this.cursorDot.style.opacity = '1';
        });
    }
}

/* --------------------------------------------
   6. SMOOTH SCROLL PARA LINKS INTERNOS
   -------------------------------------------- */
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    const offsetTop = target.offsetTop - 80; // Altura da navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

/* --------------------------------------------
   7. LOADER
   -------------------------------------------- */
class PageLoader {
    constructor() {
        this.loader = document.querySelector('.loader');
        if (!this.loader) return;

        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loader.classList.add('hidden');

                // Remove do DOM depois da transição
                setTimeout(() => {
                    this.loader.style.display = 'none';
                }, 500);
            }, 1500); // Mostra loader por 1.5s
        });
    }
}

/* --------------------------------------------
   8. NAVBAR SCROLL EFFECT
   -------------------------------------------- */
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        if (!this.navbar) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

/* --------------------------------------------
   9. MOBILE MENU
   -------------------------------------------- */
class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileNav = document.querySelector('.mobile-nav');
        this.overlay = document.querySelector('.mobile-overlay');
        this.mobileLinks = document.querySelectorAll('.mobile-nav a');

        if (!this.menuBtn) return;

        this.init();
    }

    init() {
        // Toggle menu
        this.menuBtn.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Fechar ao clicar no overlay
        if (this.overlay) {
            this.overlay.addEventListener('click', () => {
                this.closeMenu();
            });
        }

        // Fechar ao clicar em link
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.menuBtn.classList.toggle('active');
        this.mobileNav.classList.toggle('active');
        this.overlay.classList.toggle('active');

        // Previne scroll do body
        document.body.style.overflow = this.mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        this.menuBtn.classList.remove('active');
        this.mobileNav.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* --------------------------------------------
   10. TEMA DARK/LIGHT
   -------------------------------------------- */
class ThemeToggle {
    constructor() {
        this.toggleBtn = document.querySelector('.theme-toggle');
        this.html = document.documentElement;

        if (!this.toggleBtn) return;

        this.init();
    }

    init() {
        // Verifica preferência salva ou do sistema
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            this.html.setAttribute('data-theme', savedTheme);
            this.updateIcon(savedTheme);
        } else if (!systemPrefersDark) {
            this.html.setAttribute('data-theme', 'dark');
            this.updateIcon('dark');
        }

        // Toggle click
        this.toggleBtn.addEventListener('click', () => {
            const currentTheme = this.html.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Adiciona classe de transição
            document.body.classList.add('theme-transitioning');

            this.html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateIcon(newTheme);

            // Remove classe de transição depois
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 500);
        });
    }

    updateIcon(theme) {
        const icon = this.toggleBtn.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

/* --------------------------------------------
   11. FORMULÁRIO DE CONTATO
   -------------------------------------------- */
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        if (!this.form) return;

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            // Validação básica
            if (!data.name || !data.email || !data.message) {
                this.showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            if (!this.isValidEmail(data.email)) {
                this.showMessage('Por favor, insira um email válido.', 'error');
                return;
            }

            // Simula envio (substituir por backend real)
            this.showMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            this.form.reset();

            // Aqui você integraria com EmailJS, Formspree, ou backend próprio
            console.log('Form data:', data);
        });
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showMessage(text, type) {
        // Remove mensagem anterior
        const existing = this.form.querySelector('.form-message');
        if (existing) existing.remove();

        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        message.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            text-align: center;
            animation: fadeInUp 0.3s ease;
            ${type === 'success' 
                ? 'background: rgba(34, 197, 94, 0.1); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.2);' 
                : 'background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2);'
            }
        `;

        this.form.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

/* --------------------------------------------
   12. ACTIVE NAV LINK BASEADO NA SEÇÃO
   -------------------------------------------- */
class ActiveNavLink {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

        if (this.sections.length === 0) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            let current = '';

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

/* --------------------------------------------
   INICIALIZAÇÃO DE TODOS OS MÓDULOS
   -------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa todos os sistemas
    new ScrollAnimations();
    new ScrollProgress();
    new ParallaxEffect();
    new CustomCursor();
    new SmoothScroll();
    new PageLoader();
    new NavbarScroll();
    new MobileMenu();
    new ThemeToggle();
    new ContactForm();
    new ActiveNavLink();

    // Inicializa TypeWriter se existir
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = [
            'Computer Science Student',
            'Web Developer',
            'QA Engineer',
            'Pentest Enthusiast',
            'Java Developer',
            'Cybersecurity Student'
        ];
        new TypeWriter(typingElement, texts, {
            typeSpeed: 80,
            deleteSpeed: 40,
            pauseTime: 2000
        });
    }
});
