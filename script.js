// --- MOBILE NAVBAR TOGGLE ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
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
}

// --- REAL-TIME VISITOR COUNTER ---
document.addEventListener("DOMContentLoaded", () => {
    const counterElement = document.getElementById("visit-count");

    if (!counterElement) return;

    // Fast, CORS-enabled public endpoint for live hit tracking
    fetch("https://counterapi.dev/v1/spawarisanmelayu-vercel-app/visits/up")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.count !== undefined) {
                counterElement.innerText = Number(data.count).toLocaleString();
            } else {
                counterElement.innerText = "1";
            }
        })
        .catch(error => {
            console.error("Visitor Counter API error:", error);
            // Fallback value so users never get stuck seeing "Loading..."
            counterElement.innerText = "100+";
        });
});