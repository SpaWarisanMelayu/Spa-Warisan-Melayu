
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
document.addEventListener("DOMContentLoaded", () => {
    const counterElement = document.getElementById("visit-count");

    // Abacus counts real hits server-side per website domain
    const namespace = "spawarisanmelayu.vercel.app";
    const key = "total_hits";

    fetch(`https://abacus.jasoncameron.dev/hit/${namespace}/${key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.value !== undefined) {
                // Format the number with commas (e.g. 1,234)
                counterElement.innerText = data.value.toLocaleString();
            } else {
                counterElement.innerText = "1";
            }
        })
        .catch(error => {
            console.error("Error fetching live visitor counter:", error);
            // Graceful UI fallback standard for live production sites
            counterElement.innerText = "Active";
        });
});