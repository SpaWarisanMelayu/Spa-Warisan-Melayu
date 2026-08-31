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

// --- LIVE OPERATING HOURS STATUS BADGE ---
function updateShopStatus() {
    const statusBadge = document.getElementById("shop-status-badge");
    if (!statusBadge) return;

    // Get current time in Malaysia (UTC+8)
    const now = new Date();
    const options = { timeZone: "Asia/Kuala_Lumpur", hour12: false, hour: "numeric", minute: "numeric" };
    const timeString = new Intl.DateTimeFormat([], options).format(now);
    const [hour, minute] = timeString.split(":").map(Number);
    const currentDecimalTime = hour + minute / 60;

    // Define operating hours (e.g., 9:00 AM to 7:00 PM)
    const openTime = 9.0;
    const closeTime = 19.0;

    if (currentDecimalTime >= openTime && currentDecimalTime < closeTime) {
        statusBadge.className = "status-badge open-badge";
        statusBadge.innerHTML = '<i class="fas fa-circle" style="font-size: 8px;"></i> Buka Sekarang (Open)';
    } else {
        statusBadge.className = "status-badge closed-badge";
        statusBadge.innerHTML = '<i class="fas fa-circle" style="font-size: 8px;"></i> Tutup (Closed)';
    }
}

// --- VISITOR COUNTER & INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Operating Hours Badge
    updateShopStatus();

    // 2. Mobile Navbar Toggle Setup
    const menuToggle = document.getElementById("menuToggle");
    const closeBtn = document.getElementById("closeBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => navLinks.classList.add("active"));
    }
    if (closeBtn && navLinks) {
        closeBtn.addEventListener("click", () => navLinks.classList.remove("active"));
    }
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => navLinks && navLinks.classList.remove("active"));
    });

    // 3. Visitor Counter API (Public V1 API - No Token Required)
    const counterElement = document.getElementById("visit-count");
    if (!counterElement) return;

    const WORKSPACE = "spawarisanmelayu";
    const COUNTER_KEY = "visits";

    fetch(`https://api.counterapi.dev/v1/${WORKSPACE}/${COUNTER_KEY}/up`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            if (data && data.count !== undefined) {
                counterElement.innerText = Number(data.count).toLocaleString();
            } else {
                counterElement.innerText = "6,950+";
            }
        })
        .catch(err => {
            console.error("Counter API error:", err);
            counterElement.innerText = "6,950+";
        });
});
