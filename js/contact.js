// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Sticky header
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const sendAnother = document.getElementById('send-another');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For this example, we'll just simulate a successful submission
    
    // Show success message after a brief delay to simulate processing
    setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Clear form fields
        contactForm.reset();
    }, 1000);
});

// Send another message button
sendAnother.addEventListener('click', () => {
    formSuccess.style.display = 'none';
    contactForm.style.display = 'flex';
});

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Initialize any input that might have values (e.g., after page refresh)
window.addEventListener('load', () => {
    formInputs.forEach(input => {
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form validation visual feedback
contactForm.addEventListener('input', (e) => {
    const input = e.target;
    const isValid = input.checkValidity();
    
    if (isValid) {
        input.style.borderColor = '#4CAF50';
    } else {
        input.style.borderColor = '#ff1f6b';
    }
});