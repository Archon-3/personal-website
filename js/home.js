// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.getElementById('nav');

mobileToggle?.addEventListener('click', () => {
    nav?.classList.toggle('active');
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
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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
 
 // Animation on page load
 document.addEventListener('DOMContentLoaded', () => {
     const heroText = document.querySelector('.hero-text');
     const heroImage = document.querySelector('.hero-image');
     
     setTimeout(() => {
         heroText.style.opacity = '1';
         heroText.style.transform = 'translateX(0)';
     }, 300);
     
     setTimeout(() => {
         heroImage.style.opacity = '1';
         heroImage.style.transform = 'translateX(0)';
     }, 600);
 });