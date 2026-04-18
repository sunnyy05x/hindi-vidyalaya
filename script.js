/* ============================================
   Hindi Prathmik / Madhyamik Vidyalaya
   Interactive Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Floating Particles ===
    createParticles();

    // === Navbar Scroll Effect ===
    initNavbar();

    // === Mobile Navigation ===
    initMobileNav();

    // === Scroll Reveal Animations ===
    initScrollReveal();

    // === Stats Counter ===
    initStatsCounter();

    // === Active Nav Link on Scroll ===
    initActiveNav();

    // === Back to Top Button ===
    initBackToTop();

    // === Smooth Scroll for anchor links ===
    initSmoothScroll();
});


// =============================================
// FLOATING PARTICLES
// =============================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = [
        '#c4b5e0', '#a8e6cf', '#ffcba4', '#f4b4c6',
        '#b5d8f7', '#fde68a', '#e8def8', '#c8f7e1'
    ];

    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 20 + 6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 20;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
        `;

        container.appendChild(particle);
    }
}


// =============================================
// NAVBAR
// =============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
}


// =============================================
// MOBILE NAVIGATION
// =============================================
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}


// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index within parent
                const siblings = entry.target.parentElement.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
                const index = Array.from(siblings).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.15}s`;

                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(el => observer.observe(el));
}


// =============================================
// STATS COUNTER ANIMATION
// =============================================
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-card');
    if (!statCards.length) return;

    const animateCounter = (element) => {
        const numberEl = element.querySelector('.stat-number');
        const target = parseInt(element.dataset.count, 10);
        const suffix = element.dataset.suffix || '';
        const duration = 2000;
        const fps = 60;
        const totalFrames = duration / (1000 / fps);
        let frame = 0;

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const counter = setInterval(() => {
            frame++;
            const progress = easeOutQuart(frame / totalFrames);
            const current = Math.round(target * progress);
            numberEl.textContent = current + suffix;

            if (frame >= totalFrames) {
                numberEl.textContent = target + suffix;
                clearInterval(counter);
            }
        }, 1000 / fps);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => observer.observe(card));
}


// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const onScroll = () => {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
}


// =============================================
// BACK TO TOP BUTTON
// =============================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// =============================================
// SMOOTH SCROLL
// =============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}


// =============================================
// GALLERY LIGHTBOX (optional enhancement)
// =============================================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 10000;
            background: rgba(0,0,0,0.85); display: flex;
            align-items: center; justify-content: center;
            cursor: pointer; animation: fadeIn 0.3s ease;
            padding: 40px;
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.cssText = `
            max-width: 90%; max-height: 85vh;
            border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            animation: scaleIn 0.3s ease;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute; top: 24px; right: 24px;
            background: rgba(255,255,255,0.2); border: none;
            color: white; font-size: 1.5rem; width: 44px; height: 44px;
            border-radius: 50%; cursor: pointer; display: flex;
            align-items: center; justify-content: center;
            backdrop-filter: blur(10px);
        `;

        overlay.appendChild(lightboxImg);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        const close = () => {
            overlay.style.opacity = '0';
            overlay.style.transition = '0.3s ease';
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            }, 300);
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === closeBtn) close();
        });

        document.addEventListener('keydown', function handler(e) {
            if (e.key === 'Escape') {
                close();
                document.removeEventListener('keydown', handler);
            }
        });
    });
});


// =============================================
// CSS ANIMATION INJECTION
// =============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);
