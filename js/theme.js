// ================================
// THEME SWITCHER WITH LIGHTING ANIMATION
// ================================

// Get or set initial theme (default is light mode)
const getTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
};

// Set theme
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getTheme();
    setTheme(currentTheme);
});

// Create theme toggle button
function createThemeToggle() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle theme');
    toggleButton.innerHTML = `
        <div class="theme-toggle-icons">
            <svg class="light-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 8a4 4 0 0 0 0 8" opacity="0.5"/>
            </svg>
            <svg class="dark-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                <path d="M21 12.79A9 9 0 0 1 11.21 3" opacity="0.3"/>
                <circle cx="17" cy="7" r="1.5"/>
                <circle cx="14" cy="5" r="1"/>
            </svg>
        </div>
    `;
    document.body.appendChild(toggleButton);
    return toggleButton;
}

// Create lighting overlay
function createLightingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'lighting-overlay';
    document.body.appendChild(overlay);
    return overlay;
}

// Create enhanced sparkles
function createSparkle(x, y, index = 0) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    // Random direction
    const angle = (Math.PI * 2 / 20) * index + (Math.random() * 0.3);
    const distance = 80 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    sparkle.style.setProperty('--tx', tx + 'px');
    sparkle.style.setProperty('--ty', ty + 'px');
    
    // Random size variation
    const size = 4 + Math.random() * 4;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    document.body.appendChild(sparkle);
    
    // Remove after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Circular wipe animation effect
function triggerLightingEffect(x, y) {
    const overlay = document.querySelector('.lighting-overlay');
    
    // Set position for circular wipe
    overlay.style.setProperty('--mouse-x', x + 'px');
    overlay.style.setProperty('--mouse-y', y + 'px');
    
    // Activate circular wipe
    overlay.classList.add('active');
    
    // Create more sparkles in a circular pattern
    const sparkleCount = 20;
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            createSparkle(x, y, i);
        }, i * 30);
    }
    
    // Deactivate after animation
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 800);
}

// Toggle theme with animation
function toggleTheme(event) {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Get button position for lighting effect
    const button = event.target.closest('.theme-toggle');
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Trigger circular wipe animation
    triggerLightingEffect(x, y);
    
    // Change theme after short delay for smooth transition
    setTimeout(() => {
        setTheme(newTheme);
    }, 150);
    
    // Add button spin animation
    button.style.transform = 'rotate(720deg) scale(1.3)';
    setTimeout(() => {
        button.style.transform = 'rotate(0deg) scale(1)';
    }, 600);
}

// Initialize theme system
function initThemeSystem() {
    const toggleButton = createThemeToggle();
    createLightingOverlay();
    
    // Add click event
    toggleButton.addEventListener('click', toggleTheme);
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        // Press 'T' to toggle theme
        if (e.key === 't' || e.key === 'T') {
            if (!e.target.matches('input, textarea')) {
                const rect = toggleButton.getBoundingClientRect();
                const fakeEvent = {
                    target: toggleButton,
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2
                };
                toggleTheme(fakeEvent);
            }
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSystem);
} else {
    initThemeSystem();
}

// Export for potential use in other scripts
window.themeToggle = {
    getTheme,
    setTheme,
    toggle: function() {
        const button = document.querySelector('.theme-toggle');
        if (button) {
            const rect = button.getBoundingClientRect();
            toggleTheme({
                target: button,
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2
            });
        }
    }
};
