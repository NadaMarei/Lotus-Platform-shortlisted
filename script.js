// ============================================
// LOTUS PLATFORM - MAIN JAVASCRIPT
// ============================================

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwLyKE747rTiKU0qyHE-ATcCiKsX-YT1O_zDXbIC7TCAM8JFZ58KlvkzpLB8fiMUNY-/exec';

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initForm();
    initCounterAnimation();
    
    // Initialize language system
    if (typeof initLanguage === 'function') {
        initLanguage();
    }
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            if (!this.classList.contains('cta-link')) {
                this.classList.add('active');
            }
        });
    });
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// Smooth Scroll & Active Link
// ============================================
function initScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` && !link.classList.contains('cta-link')) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// Animations (AOS alternative)
// ============================================
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay based on data-aos-delay attribute
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Counter Animation
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observerOptions = {
        root: null,
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    const isPercent = element.classList.contains('stat-percent');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        element.textContent = formatNumber(current, isPercent);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function formatNumber(num, isPercent = false) {
    if (isPercent) {
        return num.toString();
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num.toString();
}

// ============================================
// Form Handling
// ============================================
function initForm() {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // Handle "Other" option for academic status
    const academicStatusSelect = document.getElementById('academicStatus');
    const otherStatusGroup = document.getElementById('otherStatusGroup');
    const otherStatusInput = document.getElementById('otherStatus');
    
    if (academicStatusSelect && otherStatusGroup) {
        academicStatusSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherStatusGroup.style.display = 'block';
                otherStatusInput.required = true;
            } else {
                otherStatusGroup.style.display = 'none';
                otherStatusInput.required = false;
                otherStatusInput.value = '';
                otherStatusInput.classList.remove('error');
                const errorSpan = otherStatusGroup.querySelector('.error-message');
                if (errorSpan) errorSpan.textContent = '';
            }
        });
    }
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        // Validate terms checkbox
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            isValid = false;
            const errorSpan = termsCheckbox.closest('.form-group').querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = 'You must agree to the terms';
            }
        }
        
        if (!isValid) {
            showFormMessage('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Collect form data
        const academicStatusValue = document.getElementById('academicStatus').value;
        const otherStatusValue = document.getElementById('otherStatus').value.trim();
        
        const formData = {
            timestamp: new Date().toISOString(),
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            university: document.getElementById('university').value.trim(),
            company: document.getElementById('company').value.trim(),
            position: document.getElementById('position').value.trim(),
            academicStatus: academicStatusValue === 'other' ? `Other: ${otherStatusValue}` : academicStatusValue,
            experience: document.getElementById('experience').value,
            interests: document.getElementById('interests').value,
            newsletter: document.getElementById('newsletter').checked ? 'Yes' : 'No'
        };
        
        // Show loading state
        submitBtn.classList.add('loading');
        hideFormMessage();
        
        try {
            // Send data to Google Sheets
            await submitToGoogleSheets(formData);
            
            // Success
            submitBtn.classList.remove('loading');
            form.reset();
            showSuccessModal();
            
        } catch (error) {
            console.error('Submission error:', error);
            submitBtn.classList.remove('loading');
            showFormMessage('Something went wrong. Please try again later.', 'error');
        }
    });
}

// ============================================
// Field Validation
// ============================================
function validateField(field) {
    const errorSpan = field.closest('.form-group')?.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';
    
    // Skip if not required and empty
    if (!field.required && !field.value.trim()) {
        field.classList.remove('error');
        if (errorSpan) errorSpan.textContent = '';
        return true;
    }
    
    // Required field check
    if (field.required && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    // Email validation
    else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    // Phone validation
    else if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{8,20}$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    // Name validation (min length)
    else if ((field.id === 'firstName' || field.id === 'lastName') && field.value) {
        if (field.value.trim().length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters';
        }
    }
    
    // Update UI
    if (isValid) {
        field.classList.remove('error');
        if (errorSpan) errorSpan.textContent = '';
    } else {
        field.classList.add('error');
        if (errorSpan) errorSpan.textContent = errorMessage;
    }
    
    return isValid;
}

// ============================================
// Google Sheets Integration
// ============================================
async function submitToGoogleSheets(data) {
    // Check if URL is configured
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        console.warn('Google Apps Script URL not configured. Data:', data);
        // Simulate success for demo purposes
        return new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    return response;
}

// ============================================
// Form Messages
// ============================================
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
}

function hideFormMessage() {
    const formMessage = document.getElementById('formMessage');
    formMessage.className = 'form-message';
    formMessage.textContent = '';
}

// ============================================
// Success Modal
// ============================================
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Global function for modal close button
window.closeModal = closeModal;

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
