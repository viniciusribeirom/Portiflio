/* ============================================
   PORTFÓLIO VINICIUS RIBEIRO - PARTICLES.JS
   ============================================
   Sistema de partículas animadas em canvas.
   Cria um efeito de partículas conectadas que
   seguem o mouse e reagem a movimentos.
   ============================================ */

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.isActive = true;

        // Configurações ajustáveis
        this.config = {
            particleCount: window.innerWidth < 768 ? 30 : 60,
            connectionDistance: 150,
            mouseDistance: 200,
            particleSize: { min: 1, max: 3 },
            speed: { min: -0.5, max: 0.5 },
            colors: [
                'rgba(0, 212, 255, ',    // Cyan
                'rgba(168, 85, 247, ',   // Purple
                'rgba(34, 197, 94, ',    // Green
                'rgba(236, 72, 153, '    // Pink
            ]
        };

        this.init();
    }

    /* Inicializa o sistema de partículas */
    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    /* Cria as partículas iniciais */
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    /* Cria uma partícula individual */
    createParticle() {
        const colorBase = this.config.colors[
            Math.floor(Math.random() * this.config.colors.length)
        ];

        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 
                (this.config.particleSize.max - this.config.particleSize.min) + 
                this.config.particleSize.min,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: colorBase,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    /* Redimensiona o canvas */
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /* Vincula eventos */
    bindEvents() {
        // Redimensionamento
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        // Movimento do mouse
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Mouse sai da tela
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Pausar quando aba não está visível (performance)
        document.addEventListener('visibilitychange', () => {
            this.isActive = !document.hidden;
        });
    }

    /* Atualiza posição das partículas */
    updateParticles() {
        this.particles.forEach(particle => {
            // Movimento base
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Interação com mouse
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.mouseDistance) {
                    const force = (this.config.mouseDistance - distance) / this.config.mouseDistance;
                    particle.x -= dx * force * 0.02;
                    particle.y -= dy * force * 0.02;
                }
            }

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }

    /* Desenha as partículas */
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.fill();

            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color + '0.3)';
        });
        this.ctx.shadowBlur = 0;
    }

    /* Desenha conexões entre partículas próximas */
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    const opacity = (1 - distance / this.config.connectionDistance) * 0.2;

                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    /* Loop de animação */
    animate() {
        if (!this.isActive) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updateParticles();
        this.drawConnections();
        this.drawParticles();

        requestAnimationFrame(() => this.animate());
    }
}

/* Inicializa quando DOM estiver pronto */
document.addEventListener('DOMContentLoaded', () => {
    // Só inicializa em dispositivos com mouse (não touch)
    if (window.matchMedia('(pointer: fine)').matches) {
        new ParticleSystem('particles-canvas');
    }
});
