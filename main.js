/* ===== BUNTY GROUP PROFESSIONAL WEBSITE JAVASCRIPT ===== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initImageLazyLoading();
    initFormHandling();
    initSmoothScrolling();
    initWhatsAppIntegration();

    console.log('🏢 Bunty Group Website Loaded Successfully!');
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Active link highlighting based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger counter animation if element has counter
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.project-card, .feature-card, .stat-card, .section-header'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    function animateCounter(element) {
        const counter = element.querySelector('h3');
        if (!counter) return;
        
        const text = counter.textContent;
        const numberMatch = text.match(/[\d,]+/);
        if (!numberMatch) return;
        
        const finalNumber = parseInt(numberMatch[0].replace(/,/g, ''));
        const suffix = text.replace(numberMatch[0], '');
        
        let currentNumber = 0;
        const increment = finalNumber / 60; // Animation duration control
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            
            // Format number with commas
            const formattedNumber = Math.floor(currentNumber).toLocaleString('en-IN');
            counter.textContent = formattedNumber + suffix;
        }, 30);
    }

    // Make animateCounter available globally for intersection observer
    window.animateCounter = animateCounter;
}

// Lazy loading for images
function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading state
                    img.style.filter = 'blur(5px)';
                    
                    // Load image
                    const tempImg = new Image();
                    tempImg.onload = function() {
                        img.src = this.src;
                        img.style.filter = 'blur(0px)';
                        img.style.transition = 'filter 0.5s ease';
                    };
                    tempImg.src = img.dataset.src || img.src;
                    
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src], img');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Form handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                return false;
            }
            
            // Show loading state
            showFormLoading(this);
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Clear previous errors
    form.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('error');
                isValid = false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                field.classList.add('error');
                isValid = false;
            }
        }
    });
    
    if (!isValid) {
        showNotification('Please fill all required fields correctly', 'error');
    }
    
    return isValid;
}

function showFormLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.innerHTML = '⏳ Submitting...';
        
        // Reset after 3 seconds if still loading
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.innerHTML = 'Submit';
        }, 3000);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// WhatsApp integration
function initWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track WhatsApp clicks (you can integrate with analytics)
            console.log('WhatsApp button clicked');
        });
    });
    
    // Auto-generate WhatsApp message
    const phoneNumber = '919975570020';
    const defaultMessage = 'Hi! I\'m interested in Bunty Group projects. Please share more details.';
    
    whatsappButtons.forEach(button => {
        if (!button.href.includes('text=')) {
            const separator = button.href.includes('?') ? '&' : '?';
            button.href += `${separator}text=${encodeURIComponent(defaultMessage)}`;
        }
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '300px',
        animation: 'slideInRight 0.3s ease'
    });
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '1.2rem';
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Page-specific functionality
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'projects.html':
            initProjectsPage();
            break;
        case 'contact-us.html':
            initContactPage();
            break;
    }
}

function initHomePage() {
    // Hero section parallax effect
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroImage.style.transform = `translateY(${parallax}px)`;
        });
    }
}

function initProjectsPage() {
    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initContactPage() {
    // Initialize map if present
    initGoogleMap();
    
    // Contact form enhancements
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            showNotification('Thank you! We\'ll get back to you within 24 hours.', 'success');
            
            // Submit to Formspree
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    window.location.href = 'thank-you.html';
                } else {
                    showNotification('There was an issue sending your message. Please try again.', 'error');
                }
            }).catch(error => {
                showNotification('Please check your internet connection and try again.', 'error');
            });
        });
    }
}

function initGoogleMap() {
    // This would initialize Google Maps if API key is available
    const mapContainer = document.querySelector('#map');
    if (mapContainer) {
        // Placeholder for Google Maps integration
        console.log('Map container found - integrate Google Maps API');
    }
}

// Performance optimizations
function optimizePerformance() {
    // Preload critical resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
        'https://img.icons8.com/color/48/real-estate.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
    });
    
    // Lazy load non-critical JavaScript
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            initPageSpecific();
        });
    } else {
        setTimeout(initPageSpecific, 500);
    }
}

// Initialize performance optimizations
optimizePerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can integrate with error reporting service here
});

// Analytics integration (placeholder)
function trackPageView() {
    // Integrate with Google Analytics or other analytics service
    console.log('Page view tracked:', window.location.pathname);
}

function trackEvent(category, action, label) {
    // Track custom events
    console.log('Event tracked:', { category, action, label });
}

// Export functions for global access
window.BuntyGroup = {
    showNotification,
    trackEvent,
    trackPageView
};

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
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

console.log('🚀 Bunty Group Website JavaScript Initialized!');
