// ================================
// UNIQUE ANIMATIONS SYSTEM
// ================================

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initParallaxEffects();
    init3DTiltCards();
    initMagneticButtons();
    initInteractiveCursor();
    initTypingEffect();
    initScrollProgress();
    initFloatingShapes();
    initTextSplitReveal();
    initMorphingShapes();
});

// ================================
// SCROLL REVEAL ANIMATIONS
// ================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .stagger-children');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// ================================
// PARALLAX SCROLL EFFECTS
// ================================

function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ================================
// 3D TILT EFFECT ON CARDS
// ================================

function init3DTiltCards() {
    const cards = document.querySelectorAll('.tilt-3d, .card-3d-effect');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.05, 1.05, 1.05)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ================================
// MAGNETIC BUTTON EFFECT
// ================================

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-hover, .btn-ripple');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const translateX = x * strength * 0.3;
                const translateY = y * strength * 0.3;
                
                button.style.transform = `translate(${translateX}px, ${translateY}px)`;
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ================================
// INTERACTIVE LIQUID CURSOR EFFECT
// ================================

function initInteractiveCursor() {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    const cursorGlow = document.createElement('div');
    
    cursor.className = 'custom-cursor';
    cursorGlow.className = 'cursor-glow';
    
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease;
        mix-blend-mode: difference;
    `;
    
    cursorGlow.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(107, 33, 168, 0.4), transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
        filter: blur(10px);
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorGlow);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        cursorGlow.style.left = glowX - 20 + 'px';
        cursorGlow.style.top = glowY - 20 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Expand cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .feature-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.backgroundColor = 'rgba(107, 33, 168, 0.2)';
            cursorGlow.style.width = '80px';
            cursorGlow.style.height = '80px';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
            cursorGlow.style.width = '40px';
            cursorGlow.style.height = '40px';
        });
    });
}

// ================================
// TYPING EFFECT FOR TEXT
// ================================

function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing-text]');
    
    typingElements.forEach(element => {
        const text = element.dataset.typingText;
        const speed = parseInt(element.dataset.typingSpeed) || 100;
        let index = 0;
        
        element.textContent = '';
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ================================
// RIPPLE EFFECT ON CLICK
// ================================

document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ================================
// SMOOTH SCROLL WITH EASING
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            
            // Smooth scroll with custom easing
            const targetPosition = target.offsetTop - 100;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function
                const easeInOutCubic = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                window.scrollTo(0, startPosition + distance * easeInOutCubic);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// ================================
// FLOATING ELEMENTS
// ================================

function initFloatingElements() {
    const floatingElements = document.querySelectorAll('[data-float]');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.5;
        const duration = 3 + (index % 3);
        
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

initFloatingElements();

// ================================
// NUMBER COUNTER ANIMATION
// ================================

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe counter elements
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
});

// ================================
// PARTICLE SYSTEM FOR BACKGROUNDS
// ================================

function createParticleSystem(container) {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Initialize particles for sections with particles-bg class
document.querySelectorAll('.particles-bg').forEach(container => {
    createParticleSystem(container);
});

// ================================
// IMAGE LAZY LOAD WITH FADE IN
// ================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ================================
// SCROLL PROGRESS INDICATOR
// ================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(107, 33, 168, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ================================
// FLOATING SHAPES BACKGROUND
// ================================

function initFloatingShapes() {
    const shapesContainer = document.createElement('div');
    shapesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    document.body.prepend(shapesContainer);
    
    const shapes = [
        { size: 100, duration: 20, color: 'rgba(107, 33, 168, 0.1)' },
        { size: 150, duration: 25, color: 'rgba(139, 92, 246, 0.08)' },
        { size: 80, duration: 18, color: 'rgba(167, 139, 250, 0.1)' },
        { size: 120, duration: 22, color: 'rgba(107, 33, 168, 0.06)' },
        { size: 90, duration: 19, color: 'rgba(139, 92, 246, 0.08)' }
    ];
    
    shapes.forEach((shape, index) => {
        const shapeEl = document.createElement('div');
        shapeEl.style.cssText = `
            position: absolute;
            width: ${shape.size}px;
            height: ${shape.size}px;
            background: ${shape.color};
            border-radius: ${index % 2 === 0 ? '50%' : '30%'};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatShape ${shape.duration}s infinite ease-in-out;
            animation-delay: ${index * 2}s;
            filter: blur(20px);
        `;
        shapesContainer.appendChild(shapeEl);
    });
    
    // Add floating animation
    if (!document.getElementById('float-shapes-style')) {
        const style = document.createElement('style');
        style.id = 'float-shapes-style';
        style.textContent = `
            @keyframes floatShape {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(30px, -50px) rotate(90deg);
                }
                50% {
                    transform: translate(-20px, -30px) rotate(180deg);
                }
                75% {
                    transform: translate(40px, 20px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ================================
// TEXT SPLIT REVEAL ANIMATION
// ================================

function initTextSplitReveal() {
    const splitTextElements = document.querySelectorAll('.split-text-reveal');
    
    splitTextElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.display = 'inline-block';
        
        // Split into characters
        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(20px) rotateX(-90deg);
                animation: revealChar 0.6s forwards;
                animation-delay: ${index * 0.03}s;
            `;
            element.appendChild(span);
        });
    });
    
    // Add reveal animation
    if (!document.getElementById('reveal-char-style')) {
        const style = document.createElement('style');
        style.id = 'reveal-char-style';
        style.textContent = `
            @keyframes revealChar {
                to {
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ================================
// MORPHING SHAPES DECORATION
// ================================

function initMorphingShapes() {
    const sections = document.querySelectorAll('.services-section, .features-container, .resume-container');
    
    sections.forEach((section, sectionIndex) => {
        const morphShape = document.createElement('div');
        morphShape.style.cssText = `
            position: absolute;
            width: 300px;
            height: 300px;
            top: ${sectionIndex % 2 === 0 ? '10%' : '70%'};
            ${sectionIndex % 2 === 0 ? 'right: -100px;' : 'left: -100px;'}
            pointer-events: none;
            z-index: 0;
            opacity: 0.3;
        `;
        
        morphShape.innerHTML = `
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient${sectionIndex}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#6b21a8;stop-opacity:0.5" />
                        <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:0.5" />
                    </linearGradient>
                </defs>
                <path fill="url(#gradient${sectionIndex})" d="M40,-65C52.7,-58.5,64.5,-48.5,71.1,-35.8C77.7,-23.1,79.1,-7.7,77.3,6.9C75.5,21.5,70.5,35.3,61.8,45.8C53.1,56.3,40.7,63.5,27.5,68C14.3,72.5,0.3,74.3,-13.5,72.8C-27.3,71.3,-40.9,66.5,-52.2,58C-63.5,49.5,-72.5,37.3,-76.8,23.5C-81.1,9.7,-80.7,-5.7,-75.9,-19.5C-71.1,-33.3,-61.9,-45.5,-50.2,-52.5C-38.5,-59.5,-24.3,-61.3,-11,-59.7C2.3,-58.1,27.3,-71.5,40,-65Z" transform="translate(100 100)">
                    <animate attributeName="d" 
                        dur="10s" 
                        repeatCount="indefinite"
                        values="
                            M40,-65C52.7,-58.5,64.5,-48.5,71.1,-35.8C77.7,-23.1,79.1,-7.7,77.3,6.9C75.5,21.5,70.5,35.3,61.8,45.8C53.1,56.3,40.7,63.5,27.5,68C14.3,72.5,0.3,74.3,-13.5,72.8C-27.3,71.3,-40.9,66.5,-52.2,58C-63.5,49.5,-72.5,37.3,-76.8,23.5C-81.1,9.7,-80.7,-5.7,-75.9,-19.5C-71.1,-33.3,-61.9,-45.5,-50.2,-52.5C-38.5,-59.5,-24.3,-61.3,-11,-59.7C2.3,-58.1,27.3,-71.5,40,-65Z;
                            M43.3,-72.6C54.7,-65.5,61.7,-50.6,67.1,-36C72.5,-21.4,76.3,-7.1,74.8,6.5C73.3,20.1,66.5,33,56.9,42.8C47.3,52.6,34.9,59.3,21.3,63.7C7.7,68.1,-7.1,70.2,-21.4,67.9C-35.7,65.6,-49.5,59,-60.1,48.7C-70.7,38.4,-78.1,24.4,-79.2,9.9C-80.3,-4.6,-75.1,-19.6,-66.3,-31.5C-57.5,-43.4,-45.1,-52.2,-32,-58.4C-18.9,-64.6,-4.1,-68.2,9.8,-71.8C23.7,-75.4,31.9,-79.7,43.3,-72.6Z;
                            M40,-65C52.7,-58.5,64.5,-48.5,71.1,-35.8C77.7,-23.1,79.1,-7.7,77.3,6.9C75.5,21.5,70.5,35.3,61.8,45.8C53.1,56.3,40.7,63.5,27.5,68C14.3,72.5,0.3,74.3,-13.5,72.8C-27.3,71.3,-40.9,66.5,-52.2,58C-63.5,49.5,-72.5,37.3,-76.8,23.5C-81.1,9.7,-80.7,-5.7,-75.9,-19.5C-71.1,-33.3,-61.9,-45.5,-50.2,-52.5C-38.5,-59.5,-24.3,-61.3,-11,-59.7C2.3,-58.1,27.3,-71.5,40,-65Z"
                    />
                </path>
            </svg>
        `;
        
        if (section.style.position !== 'relative' && section.style.position !== 'absolute') {
            section.style.position = 'relative';
        }
        section.style.overflow = 'hidden';
        section.appendChild(morphShape);
    });
}

// ================================
// EXPORT FOR USE IN OTHER SCRIPTS
// ================================

window.animations = {
    initScrollAnimations,
    initParallaxEffects,
    init3DTiltCards,
    initMagneticButtons,
    initInteractiveCursor,
    initScrollProgress,
    initFloatingShapes,
    initTextSplitReveal,
    initMorphingShapes,
    animateCounter
};
