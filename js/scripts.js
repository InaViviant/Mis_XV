// Cronómetro
function updateCountdown() {
    const targetDate = new Date('October 28, 2025 21:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        // Si ya pasó la fecha
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Cambiar el texto del cronómetro
        document.querySelector('.countdown-subtitle').textContent = '¡Es mi día especial! 🎉';
    }
}

// Actualizar el cronómetro cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecutar inmediatamente

// Carrusel de fotos
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    // Ocultar todas las slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Mostrar la slide seleccionada
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlideIndex = index;
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    showSlide(index - 1);
}

// Auto-play del carrusel
function autoSlide() {
    changeSlide(1);
}

// Cambiar slide cada 5 segundos
setInterval(autoSlide, 5000);

// Función para copiar al portapapeles
function copyToClipboard(text) {
    // Crear un elemento temporal para copiar el texto
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification('¡Copiado al portapapeles! ✓');
    } catch (err) {
        // Fallback para navegadores que no soportan execCommand
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyNotification('¡Copiado al portapapeles! ✓');
            }).catch(() => {
                showCopyNotification('No se pudo copiar. Selecciona y copia manualmente.');
            });
        } else {
            showCopyNotification('Selecciona y copia el texto manualmente.');
        }
    }
    
    document.body.removeChild(tempInput);
}

// Mostrar notificación de copiado
function showCopyNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover la notificación después de 2 segundos
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}

// Smooth scrolling para navegación
document.addEventListener('DOMContentLoaded', function() {
    // Agregar efecto de aparición cuando los elementos entran en pantalla
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos con animación
    const animatedElements = document.querySelectorAll('.section-title, .icon, .date-card, .time-card, .transfer-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
    
    // Efecto de partículas flotantes
    createFloatingParticles();
});

// Crear partículas flotantes decorativas
function createFloatingParticles() {
    const particles = ['✨', '💖', '🌸', '💎', '⭐'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '100vh';
        particle.style.fontSize = '1.5rem';
        particle.style.opacity = '0.7';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.animation = 'floatUp 8s linear forwards';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }, 3000);
}

// Agregar la animación CSS para las partículas flotantes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Agregar efectos de hover mejorados
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de ripple para botones
    const buttons = document.querySelectorAll('.copy-btn, .carousel-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Agregar estilo para el efecto ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .copy-btn, .carousel-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);