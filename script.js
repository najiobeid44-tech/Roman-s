// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Smooth Scrolling for navigation links
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

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('.lazyload');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazyload');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Run lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to service cards and other elements
document.querySelectorAll('.service-card, .why-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Gallery lightbox functionality
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', function() {
        openLightbox(this.src);
    });
});

function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-in-out;
    `;

    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 0 40px rgba(255, 107, 53, 0.3);
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: #ff6b35;
        color: white;
        border: none;
        font-size: 40px;
        cursor: pointer;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => lightbox.remove(), 300);
    });

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.background = '#e55a24';
        closeBtn.style.transform = 'scale(1.1)';
    });

    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.background = '#ff6b35';
        closeBtn.style.transform = 'scale(1)';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.animation = 'fadeOut 0.3s ease-in-out';
            setTimeout(() => lightbox.remove(), 300);
        }
    });

    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll animations for header
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Performance: Debounce scroll events
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

// Handle window resize with debounce
window.addEventListener('resize', debounce(() => {
    // Any resize handlers here
}, 250));

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1487881594565-86a88ebda66d?w=1920&h=1080&fit=crop'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

if (window.performance && window.performance.navigation.type === 1) {
    // Page was refreshed
} else {
    preloadImages();
}

// Service card hover animation enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Contact form validation (if form exists)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Form submitted');
    });
}

// Add smooth transitions to interactive elements
document.querySelectorAll('a, button').forEach(element => {
    element.style.transition = 'all 0.3s ease';
});

// Analytics tracking (optional)
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track link clicks
document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('contact_click', {
            'link_type': link.href.split(':')[0]
        });
    });
});

// Viewport Height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);

// Print page functionality
function printPage() {
    window.print();
}

console.log('Roman\'s Tire & Auto - Website loaded successfully');
