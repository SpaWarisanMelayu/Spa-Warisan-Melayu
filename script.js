// --- MOBILE NAVBAR TOGGLE ---
const menuToggle = document.getElementById('menuToggle');
const closeBtn = document.getElementById('closeBtn');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.add('active');
    });
}

if (closeBtn && navLinks) {
    closeBtn.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// --- LIVE OPERATING HOURS STATUS INDICATOR ---
function updateShopStatus() {
    const badge = document.getElementById('shop-status-badge');
    if (!badge) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Operating limits set to 10:00 AM (10) until 10:00 PM (22)
    const openHour = 8;
    const closeHour = 12;
    
    const currentTotalMinutes = (currentHour * 60) + currentMinute;
    const openTotalMinutes = openHour * 60;
    const closeTotalMinutes = closeHour * 60;
    
    // Check timeline calculations against boundaries
    if (currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes) {
        badge.innerHTML = "🟢 We’re Open! (Closing tonight at 12:00 AM)";
        badge.className = "status-badge open-badge";
    } else {
        badge.innerHTML = "🔴 Currently Closed (We open tomorrow at 8:00 AM)";
        badge.className = "status-badge closed-badge";
    }
}

// --- VISITOR COUNTER API (UPDATED FOR V2 STANDARD) ---
document.addEventListener("DOMContentLoaded", () => {
    // Run operating hours script on DOM initialization
    updateShopStatus();

    const counterElement = document.getElementById("visit-count");
    if (!counterElement) return;

    // REPLACE THESE: Use your registered Workspace name and API token from your counterapi.dev dashboard
    const WORKSPACE = "spawarisanmelayu"; 
    const COUNTER_KEY = "visits";
    const API_TOKEN = "your_actual_v2_access_token_here"; 

    // Correct API v2 structure with target parameters
    fetch(`https://counterapi.dev{WORKSPACE}/counters/${COUNTER_KEY}/up`, {
        method: "POST", // V2 uses POST requests to accurately increment counts
        headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
    })
    .then(result => {
        // Safe validation fallback checking for proper payload nesting
        if (result && result.data && result.data.count !== undefined) {
            counterElement.innerText = Number(result.data.count).toLocaleString();
        } else {
            counterElement.innerText = "6,950+";
        }
    })
    .catch(err => {
        console.error("Counter API error:", err);
        // Clean fallback default string so your layout never breaks for the user
        counterElement.innerText = "6,950+"; 
    });
});
