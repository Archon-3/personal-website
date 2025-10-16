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

// Form submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const sendAnother = document.getElementById('send-another');
const statusMessage = document.createElement('div');
statusMessage.className = 'status-message';
contactForm?.appendChild(statusMessage);

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate form
    const formData = new FormData(contactForm);
    const isValid = Array.from(formData.values()).every(value => value.trim() !== '');
    if (!isValid) {
        showStatus('Please fill in all fields', 'error');
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    showStatus('Sending message...', 'info');

    try {
        const res = await fetch('http://127.0.0.1/personal_website/contact.php', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const text = await res.text();
        console.log("Server response:", text);

        if (text.trim() === 'success') {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            contactForm.reset();
            showStatus('Message sent successfully!', 'success');
        } else {
            showStatus(`Failed to send message: ${text}`, 'error');
            console.error('Server response:', text);
        }
    } catch (error) {
        console.error('Error sending message:', error);
        showStatus('Connection error. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

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