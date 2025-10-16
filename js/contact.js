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

// Form submission with FormSubmit
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const sendAnother = document.getElementById('send-another');

// Form submission handler
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Validate form
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Show loading state
    if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
    }
    
    try {
        // Send to FormSubmit
        const response = await fetch('https://formsubmit.co/abebeabenezer808@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message,
                _subject: 'New Contact Form Submission',
                _template: 'table',
                _captcha: 'false'
            })
        });
        
        if (response.ok) {
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            contactForm.reset();
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again or email me directly at abebeabenezer808@gmail.com');
        
        // Reset button state
        if (submitBtn) {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    }
});

// Send another message button
sendAnother?.addEventListener('click', () => {
    if (formSuccess && contactForm) {
        formSuccess.style.display = 'none';
        contactForm.style.display = 'flex';
        contactForm.reset();
        
        // Reset button state
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    }
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

// Initialize on page load
window.addEventListener('load', () => {
    // Initialize input states
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