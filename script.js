// --- MOBILE NAVBAR TOGGLE ---
const menuToggle = document.getElementById('menuToggle');
const closeBtn = document.getElementById('closeBtn');
const navLinks = document.getElementById('navLinks');

// Open menu via hamburger button
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.add('active');
    });
}

// Close menu via 'X' button inside drawer
if (closeBtn && navLinks) {
    closeBtn.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
}

// Automatically close menu when clicking any link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// --- VISITOR COUNTER API ---
document.addEventListener("DOMContentLoaded", () => {
    const counterElement = document.getElementById("visit-count");
    if (!counterElement) return;

    // Fetch live visit count from Counter API
    fetch("https://api.counterapi.dev/v1/spawarisanmelayu/visits/up")
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            if (data && data.count !== undefined) {
                counterElement.innerText = Number(data.count).toLocaleString();
            } else {
                counterElement.innerText = "1";
            }
        })
        .catch(err => {
            console.error("Counter API error:", err);
            counterElement.innerText = "1,050+";
        });
});