// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      navList.classList.toggle('nav-list--visible');
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navList.classList.remove('nav-list--visible');
    });
  });

  // Projects tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const projectLists = document.querySelectorAll('.projects-list');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all project lists
      projectLists.forEach(list => list.classList.remove('active'));
      
      // Show target project list
      const targetList = document.getElementById(targetTab);
      if (targetList) {
        targetList.classList.add('active');
      }
    });
  });

  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      // Email validation
      const emailFields = this.querySelectorAll('input[type="email"]');
      emailFields.forEach(email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
          isValid = false;
          email.classList.add('error');
        }
      });
      
      // Phone validation (basic)
      const phoneFields = this.querySelectorAll('input[type="tel"]');
      phoneFields.forEach(phone => {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (phone.value && !phoneRegex.test(phone.value)) {
          isValid = false;
          phone.classList.add('error');
        }
      });

      // File upload validation
      const fileFields = this.querySelectorAll('input[type="file"]');
      fileFields.forEach(file => {
        if (file.files && file.files[0]) {
          const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
          const maxSize = 1024 * 1024; // 1MB
          
          if (!allowedTypes.includes(file.files[0].type)) {
            isValid = false;
            file.classList.add('error');
            alert('Please upload only PDF, DOC, DOCX, or TXT files.');
          }
          
          if (file.files[0].size > maxSize) {
            isValid = false;
            file.classList.add('error');
            alert('File size must be less than 1MB.');
          }
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Please fill all required fields correctly.');
      }
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Image lazy loading (basic implementation)
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  images.forEach(img => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });

  // Contact form enhancement
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        alert('Thank you for your inquiry! We will get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Career form enhancement
  const careerForm = document.querySelector('.apply-form');
  if (careerForm) {
    careerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Uploading...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        alert('Thank you for your application! We will review your resume and get back to you.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    });
  }

  // Auto-update current year in footer
  const currentYear = new Date().getFullYear();
  const footerText = document.querySelector('.footer-bottom p');
  if (footerText && currentYear > 2019) {
    footerText.innerHTML = footerText.innerHTML.replace('© 2019', `© 2019-${currentYear}`);
  }

  // Add loading animation for buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.type !== 'submit' && this.tagName === 'BUTTON') {
        this.classList.add('loading');
        setTimeout(() => {
          this.classList.remove('loading');
        }, 1000);
      }
    });
  });

  // Sticky header on scroll
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Project cards hover effects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Form field focus effects
  const formInputs = document.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      if (this.value) {
        this.parentElement.classList.add('filled');
      } else {
        this.parentElement.classList.remove('filled');
      }
    });
  });

  // Statistics counter animation (for homepage)
  const statNumbers = document.querySelectorAll('.stat-item h2');
  const animateNumbers = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        
        if (number > 0) {
          let current = 0;
          const increment = number / 100;
          const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
              current = number;
              clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString() + (text.includes('+') ? '+' : '') + (text.includes('Sq') ? ' Sq. Ft.' : '');
          }, 20);
        }
        observer.unobserve(element);
      }
    });
  };

  const numberObserver = new IntersectionObserver(animateNumbers);
  statNumbers.forEach(stat => {
    numberObserver.observe(stat);
  });
});

// Utility functions
function showMessage(message, type = 'info') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
    color: white;
    border-radius: 5px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  
  .error {
    border-color: #dc3545 !important;
    box-shadow: 0 0 5px rgba(220, 53, 69, 0.3);
  }
  
  .loading {
    pointer-events: none;
    opacity: 0.7;
  }
  
  .loading::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 8px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .form-group.focused label {
    color: #004499;
  }
  
  .form-group.filled label {
    font-weight: 600;
  }
  
  header {
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(style);