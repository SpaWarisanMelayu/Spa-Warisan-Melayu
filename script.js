// --- MOBILE NAVBAR TOGGLE ---
const menuToggle = document.getElementById("menuToggle");
const closeBtn = document.getElementById("closeBtn");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.add("active");
  });
}

if (closeBtn && navLinks) {
  closeBtn.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("active");
    }
  });
});

// --- LIVE OPERATING HOURS STATUS INDICATOR ---
function updateShopStatus() {
  const badge = document.getElementById("shop-status-badge");
  if (!badge) return;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Operating limits set to 8:00 AM (8) until 12:00 AM (00)
  const openHour = 8;
  const closeHour = 24;

  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const openTotalMinutes = openHour * 60;
  const closeTotalMinutes = closeHour * 60;

  // Check timeline calculations against boundaries
  if (
    currentTotalMinutes >= openTotalMinutes &&
    currentTotalMinutes < closeTotalMinutes
  ) {
    badge.innerHTML = "🟢 We’re Open! <br> (Closing tonight at 12:00 AM)";
    badge.className = "status-badge open-badge";
  } else {
    badge.innerHTML = "🔴 Currently Closed <br> (We open tomorrow at 8:00 AM)";
    badge.className = "status-badge closed-badge";
  }
}

// --- VISITOR COUNTER ---
document.addEventListener("DOMContentLoaded", () => {
  updateShopStatus();

  const counterElement = document.getElementById("visit-count");
  if (!counterElement) return;

  const counter = new Counter({
    workspace: "spawarisanmelayu"
  });

  counter
    .up("visits")
    .then((result) => {
      counterElement.textContent = Number(result.value).toLocaleString();
    })
    .catch((error) => {
      console.error("Visitor counter error:", error);
      counterElement.textContent = "69,050+";
    });
});
