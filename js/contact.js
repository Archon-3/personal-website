// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');

mobileToggle?.addEventListener('click', () => {
    nav?.classList.toggle('active');
});

// Sticky header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 100);
});

// Back to top button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 300);
});
backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form submission with FormSubmit (no backend needed)
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const sendAnother = document.getElementById('send-another');
const statusMessage = document.createElement('div');
statusMessage.className = 'status-message';
contactForm?.appendChild(statusMessage);

// Set up FormSubmit redirect dynamically
if (contactForm) {
    // Add hidden field for redirect after successful submission
    const redirectField = document.createElement('input');
    redirectField.type = 'hidden';
    redirectField.name = '_next';
    redirectField.value = new URL('sent.html', window.location.href).href;
    contactForm.appendChild(redirectField);

    // Simple validation before letting browser submit to FormSubmit
    contactForm.addEventListener('submit', (e) => {
        // Only validate visible required fields (name, email, subject, message)
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const subject = document.getElementById('subject')?.value || '';
        const message = document.getElementById('message')?.value || '';

        const isValid = name.trim() !== '' && email.trim() !== '' && 
                       subject.trim() !== '' && message.trim() !== '';

        if (!isValid) {
            e.preventDefault();
            showStatus('Please fill in all fields', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }
        showStatus('Sending message...', 'info');

        // Allow default form submission to FormSubmit
        // FormSubmit will handle the email and redirect to sent.html
    });
}

// Show status message function
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    statusMessage.style.display = 'block';

    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000);
    }
}

sendAnother?.addEventListener('click', () => {
    formSuccess.style.display = 'none';
    contactForm.style.display = 'flex';
    statusMessage.style.display = 'none';
});

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement?.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement?.classList.remove('focused');
        }
    });

    // Add validation feedback
    input.addEventListener('input', () => {
        const isValid = input.value.trim() !== '';
        input.style.borderColor = isValid ? '#4CAF50' : '#ff1f6b';

        // Email-specific validation
        if (input.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            input.style.borderColor = emailPattern.test(input.value) ? '#4CAF50' : '#ff1f6b';
        }
    });
});

// Initialize input states on load
window.addEventListener('load', () => {
    formInputs.forEach(input => {
        if (input.value) {
            input.parentElement?.classList.add('focused');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});