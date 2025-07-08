// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Set minimum date for reservation form
    setMinimumDate();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Observe all contact cards
    document.querySelectorAll('.contact-card').forEach(card => {
        observer.observe(card);
    });

    // Observe all PDF cards
    document.querySelectorAll('.pdf-card').forEach(card => {
        observer.observe(card);
    });

    // Observe all highlight cards
    document.querySelectorAll('.highlight-card').forEach(card => {
        observer.observe(card);
    });
}

// Form Validation
function initFormValidation() {
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                showSuccessMessage();
                reservationForm.reset();
            }
        });
    }
}

function validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    const roomType = document.getElementById('roomType').value;
    const agreement = document.getElementById('agreement').checked;

    let isValid = true;
    let errorMessage = '';

    // Reset previous error states
    document.querySelectorAll('.form-control, .form-select').forEach(input => {
        input.classList.remove('is-invalid');
    });

    // Validate required fields
    if (!firstName) {
        document.getElementById('firstName').classList.add('is-invalid');
        errorMessage += 'Заполните поле "Имя"\n';
        isValid = false;
    }

    if (!lastName) {
        document.getElementById('lastName').classList.add('is-invalid');
        errorMessage += 'Заполните поле "Фамилия"\n';
        isValid = false;
    }

    if (!phone) {
        document.getElementById('phone').classList.add('is-invalid');
        errorMessage += 'Заполните поле "Телефон"\n';
        isValid = false;
    } else if (!validatePhone(phone)) {
        document.getElementById('phone').classList.add('is-invalid');
        errorMessage += 'Некорректный формат телефона\n';
        isValid = false;
    }

    if (!date) {
        document.getElementById('date').classList.add('is-invalid');
        errorMessage += 'Выберите дату\n';
        isValid = false;
    }

    if (!time) {
        document.getElementById('time').classList.add('is-invalid');
        errorMessage += 'Выберите время\n';
        isValid = false;
    }

    if (!guests) {
        document.getElementById('guests').classList.add('is-invalid');
        errorMessage += 'Выберите количество гостей\n';
        isValid = false;
    }

    if (!roomType) {
        document.getElementById('roomType').classList.add('is-invalid');
        errorMessage += 'Выберите тип зала\n';
        isValid = false;
    }

    if (!agreement) {
        document.getElementById('agreement').classList.add('is-invalid');
        errorMessage += 'Необходимо согласие с правилами\n';
        isValid = false;
    }

    if (!isValid) {
        showErrorMessage(errorMessage);
    }

    return isValid;
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function showSuccessMessage() {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show';
    alert.innerHTML = `
        <strong>Спасибо!</strong> Ваша заявка принята. Мы свяжемся с вами в течение 30 минут.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.querySelector('.reservation-form').insertBefore(alert, document.getElementById('reservationForm'));
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

function showErrorMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show';
    alert.innerHTML = `
        <strong>Ошибка!</strong> Пожалуйста, исправьте следующие ошибки:<br>
        ${message.replace(/\n/g, '<br>')}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.querySelector('.reservation-form').insertBefore(alert, document.getElementById('reservationForm'));
    
    // Auto-hide after 7 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 7000);
}

// Smooth Scrolling
function initSmoothScrolling() {
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
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Set Minimum Date for Reservation Form
function setMinimumDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
}



// Parallax Effect for Hero Section
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.slide-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize Parallax Effect
initParallaxEffect();

// Feature Card Hover Effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact Card Hover Effects
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contact-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Initialize tooltip for buttons
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error Handling for Images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Image failed to load:', this.src);
    });
});

// Mobile Menu Handling
document.addEventListener('click', function(e) {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    }
});

