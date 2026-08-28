
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Toggle menu open/close
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking any nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});


// Function to update and display total website visits
async function updateVisitCount() {
    const countElement = document.getElementById('visit-count');
    
    // Safety check: exit if the counter element isn't on the current page
    if (!countElement) return;

    try {
        // Namespace: spawarisanmelayu.com | Key: visits
        const response = await fetch('https://api.countapi.xyz/hit/spawarisanmelayu.com/visits');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Update text with formatted number (e.g., 1,234)
        countElement.textContent = data.value.toLocaleString();
    } catch (error) {
        console.error('CountAPI Error:', error);
        // Fallback display if API request fails
        countElement.textContent = 'Unavailable';
    }
}

// Mobile Menu Toggle (Existing Logic)
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Run visit counter as soon as the DOM content is ready
document.addEventListener('DOMContentLoaded', updateVisitCount);