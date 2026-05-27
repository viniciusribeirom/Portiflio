/* ============================================
   PORTFÓLIO VINICIUS RIBEIRO - MAIN.JS
   ============================================
   JavaScript principal com funções utilitárias,
   efeitos adicionais e integrações.
   ============================================ */

/* --------------------------------------------
   1. UTILITÁRIOS GLOBAIS
   -------------------------------------------- */

/* Debounce para eventos de scroll/resize */
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

/* Throttle para eventos frequentes */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* --------------------------------------------
   2. EFEITO DE DIGITAÇÃO PARA ELEMENTOS ESPECÍFICOS
   -------------------------------------------- */
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

/* --------------------------------------------
   3. EFEITO DE GLITCH PARA TÍTULOS
   -------------------------------------------- */
class GlitchEffect {
    constructor(element, options = {}) {
        this.element = element;
        this.originalText = element.textContent;
        this.chars = '!<>-_\/[]{}—=+*^?#________';
        this.options = {
            speed: options.speed || 50,
            iterations: options.iterations || 3,
            ...options
        };
    }

    scramble() {
        let iteration = 0;
        const interval = setInterval(() => {
            this.element.textContent = this.originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');

            if (iteration >= this.originalText.length) {
                clearInterval(interval);
                this.element.textContent = this.originalText;
            }

            iteration += 1 / this.options.iterations;
        }, this.options.speed);
    }
}

/* --------------------------------------------
   4. EFEITO DE PARTÍCULAS NO CLIQUE
   -------------------------------------------- */
class ClickParticles {
    constructor() {
        this.colors = ['#00d4ff', '#a855f7', '#22c55e', '#ec4899', '#f97316'];
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            this.createParticles(e.clientX, e.clientY);
        });
    }

    createParticles(x, y) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            const size = Math.random() * 6 + 2;
            const angle = (Math.PI * 2 * i) / 8;
            const velocity = Math.random() * 100 + 50;

            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 10px ${color};
            `;

            document.body.appendChild(particle);

            const destinationX = x + Math.cos(angle) * velocity;
            const destinationY = y + Math.sin(angle) * velocity;

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${destinationX - x}px, ${destinationY - y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => particle.remove();
        }
    }
}

/* --------------------------------------------
   5. EFEITO DE REVEAL PARA TEXTO
   -------------------------------------------- */
class TextReveal {
    constructor(element) {
        this.element = element;
        this.text = element.textContent;
        this.init();
    }

    init() {
        this.element.innerHTML = '';
        this.text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? ' ' : char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s ease;
                transition-delay: ${index * 0.03}s;
            `;
            this.element.appendChild(span);
        });

        // Observer para ativar
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.reveal();
                    observer.unobserve(this.element);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.element);
    }

    reveal() {
        const spans = this.element.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }
}

/* --------------------------------------------
   6. EFEITO DE MAGNET BUTTON
   -------------------------------------------- */
class MagnetButton {
    constructor(element) {
        this.element = element;
        this.strength = 0.3;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.element.style.transform = `translate(${x * this.strength}px, ${y * this.strength}px)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'translate(0, 0)';
        });
    }
}

/* --------------------------------------------
   7. EFEITO DE PARALLAX PARA MOUSE
   -------------------------------------------- */
class MouseParallax {
    constructor() {
        this.elements = document.querySelectorAll('[data-mouse-parallax]');
        if (this.elements.length === 0) return;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', throttle((e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            this.elements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-mouse-parallax')) || 20;
                const x = mouseX * speed;
                const y = mouseY * speed;

                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        }, 16)); // ~60fps
    }
}

/* --------------------------------------------
   8. EFEITO DE HOVER PARA CARDS 3D
   -------------------------------------------- */
class Card3DEffect {
    constructor() {
        this.cards = document.querySelectorAll('[data-3d-card]');
        if (this.cards.length === 0) return;

        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
}

/* --------------------------------------------
   9. EFEITO DE ONDA PARA BOTÕES
   -------------------------------------------- */
class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-ripple');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                    left: ${x}px;
                    top: ${y}px;
                `;

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}

/* Adiciona keyframe do ripple */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* --------------------------------------------
   10. EFEITO DE CONTAGEM REGRESSIVA
   -------------------------------------------- */
class CountUp {
    constructor(element, start = 0, end = 100, duration = 2000) {
        this.element = element;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.startTime = null;
    }

    animate(currentTime) {
        if (!this.startTime) this.startTime = currentTime;

        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);

        // Ease out expo
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(this.start + (this.end - this.start) * easeOut);

        this.element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame((time) => this.animate(time));
        }
    }

    start() {
        requestAnimationFrame((time) => this.animate(time));
    }
}

/* --------------------------------------------
   11. EFEITO DE SCROLL SNAP PARA SEÇÕES
   -------------------------------------------- */
class ScrollSnap {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.isScrolling = false;
        this.init();
    }

    init() {
        // Desabilitado por padrão - ativar se desejado
        // window.addEventListener('wheel', (e) => this.handleScroll(e), { passive: false });
    }

    handleScroll(e) {
        if (this.isScrolling) return;

        const direction = e.deltaY > 0 ? 1 : -1;
        const currentSection = this.getCurrentSection();
        const nextSection = direction > 0 
            ? currentSection.nextElementSibling 
            : currentSection.previousElementSibling;

        if (nextSection && nextSection.tagName === 'SECTION') {
            e.preventDefault();
            this.isScrolling = true;

            nextSection.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                this.isScrolling = false;
            }, 1000);
        }
    }

    getCurrentSection() {
        const scrollY = window.scrollY;
        let current = this.sections[0];

        this.sections.forEach(section => {
            if (section.offsetTop <= scrollY + 100) {
                current = section;
            }
        });

        return current;
    }
}

/* --------------------------------------------
   12. EFEITO DE TILT PARA IMAGENS
   -------------------------------------------- */
class TiltEffect {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
}

/* --------------------------------------------
   13. NOTIFICAÇÃO TOAST
   -------------------------------------------- */
class ToastNotification {
    constructor(message, type = 'info', duration = 3000) {
        this.message = message;
        this.type = type;
        this.duration = duration;
        this.create();
    }

    create() {
        const toast = document.createElement('div');
        const colors = {
            info: '#00d4ff',
            success: '#22c55e',
            error: '#ef4444',
            warning: '#f97316'
        };

        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            background: var(--bg-card);
            border: 1px solid ${colors[this.type]};
            border-radius: 12px;
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-size: 0.9rem;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            max-width: 350px;
        `;

        const icon = this.type === 'success' ? '✓' : 
                     this.type === 'error' ? '✕' : 
                     this.type === 'warning' ? '!' : 'ℹ';

        toast.innerHTML = `
            <span style="color: ${colors[this.type]}; font-weight: bold; font-size: 1.2rem;">${icon}</span>
            <span>${this.message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, this.duration);
    }
}

/* Adiciona keyframes para toast */
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(toastStyle);

/* --------------------------------------------
   14. EFEITO DE MATRIX RAIN (OPCIONAL)
   -------------------------------------------- */
class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / this.fontSize;
        this.drops = Array(Math.floor(this.columns)).fill(1);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00d4ff';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

/* --------------------------------------------
   15. EFEITO DE DIGITAÇÃO PARA CÓDIGO
   -------------------------------------------- */
class CodeTypewriter {
    constructor(element, code, speed = 50) {
        this.element = element;
        this.code = code;
        this.speed = speed;
        this.index = 0;
        this.init();
    }

    init() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.code.length) {
            this.element.textContent += this.code.charAt(this.index);
            this.index++;

            // Varia a velocidade para parecer mais natural
            const randomSpeed = this.speed + (Math.random() * 50 - 25);
            setTimeout(() => this.type(), randomSpeed);
        }
    }
}

/* --------------------------------------------
   16. EFEITO DE SCANLINE (ESTILO RETRO)
   -------------------------------------------- */
function addScanlineEffect() {
    const scanline = document.createElement('div');
    scanline.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: rgba(0, 212, 255, 0.1);
        z-index: 9999;
        pointer-events: none;
        animation: scanline 8s linear infinite;
    `;

    const scanlineStyle = document.createElement('style');
    scanlineStyle.textContent = `
        @keyframes scanline {
            0% { top: 0%; }
            100% { top: 100%; }
        }
    `;

    document.head.appendChild(scanlineStyle);
    document.body.appendChild(scanline);
}

/* --------------------------------------------
   17. EFEITO DE GLITCH PARA IMAGENS
   -------------------------------------------- */
class GlitchImage {
    constructor(imageElement) {
        this.image = imageElement;
        this.init();
    }

    init() {
        this.image.addEventListener('mouseenter', () => {
            this.image.style.animation = 'glitch 0.3s ease';
        });

        this.image.addEventListener('animationend', () => {
            this.image.style.animation = '';
        });
    }
}

/* --------------------------------------------
   18. EFEITO DE AURA PARA CARDS
   -------------------------------------------- */
class CardAura {
    constructor() {
        this.cards = document.querySelectorAll('[data-aura]');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
}

/* --------------------------------------------
   INICIALIZAÇÃO DOS EFEITOS ADICIONAIS
   -------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    // Efeito de partículas no clique
    new ClickParticles();

    // Efeito de parallax para mouse
    new MouseParallax();

    // Efeito 3D para cards
    new Card3DEffect();

    // Efeito de ripple para botões
    new RippleEffect();

    // Efeito de aura para cards
    new CardAura();

    // Efeito de tilt para imagens com data-tilt
    document.querySelectorAll('[data-tilt]').forEach(el => {
        new TiltEffect(el);
    });

    // Efeito de magnet para botões com data-magnet
    document.querySelectorAll('[data-magnet]').forEach(el => {
        new MagnetButton(el);
    });

    // Efeito de glitch para títulos com data-glitch
    document.querySelectorAll('[data-glitch]').forEach(el => {
        const glitch = new GlitchEffect(el);
        el.addEventListener('mouseenter', () => glitch.scramble());
    });

    // Text reveal para elementos com data-reveal
    document.querySelectorAll('[data-reveal]').forEach(el => {
        new TextReveal(el);
    });

    // Adiciona scanline se body tiver data-scanline
    if (document.body.hasAttribute('data-scanline')) {
        addScanlineEffect();
    }

    // Console easter egg
    console.log('%c🔒 Vinicius Ribeiro - Portfolio', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
    console.log('%cComputer Science Student | Web Developer | QA | Pentest Enthusiast', 'font-size: 14px; color: #a855f7;');
    console.log('%cContact: viniciusgg502@gmail.com', 'font-size: 12px; color: #22c55e;');
});

/* --------------------------------------------
   FUNÇÕES UTILITÁRIAS GLOBAIS
   -------------------------------------------- */

/* Copiar para clipboard */
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        new ToastNotification('Copiado para a área de transferência!', 'success');
    }).catch(() => {
        new ToastNotification('Erro ao copiar. Tente manualmente.', 'error');
    });
};

/* Abrir link externo */
window.openExternal = function(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
};

/* Scroll para topo */
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* Toggle classe */
window.toggleClass = function(selector, className) {
    document.querySelectorAll(selector).forEach(el => {
        el.classList.toggle(className);
    });
};
