// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Sticky header
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 100);
});

// Back to top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const sendAnother = document.getElementById('send-another');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    try {
        const res = await fetch('/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message }),
        });

        if (res.ok) {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            contactForm.reset();
        } else {
            alert('Failed to send message. Please try again later.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Something went wrong. Please try again.');
    }
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

// Highlight filled inputs on load
window.addEventListener('load', () => {
    formInputs.forEach(input => {
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Smooth scroll for in-page links
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

// Input border feedback
contactForm.addEventListener('input', (e) => {
    const input = e.target;
    input.style.borderColor = input.checkValidity() ? '#4CAF50' : '#ff1f6b';
});
