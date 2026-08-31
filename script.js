// --- MOBILE NAVBAR TOGGLE ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    // Toggle mobile navigation menu open/close
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu automatically when clicking any navigation link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

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

document.addEventListener("DOMContentLoaded", () => {
    const counterElement = document.getElementById("visit-count");
    if (!counterElement) return;

    // Direct endpoint using api.counterapi.dev
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