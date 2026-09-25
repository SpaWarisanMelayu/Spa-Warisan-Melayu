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

  const openHour = 8;
  const closeHour = 24;

  const currentTotalMinutes =
    currentHour * 60 + currentMinute;

  const openTotalMinutes = openHour * 60;
  const closeTotalMinutes = closeHour * 60;

  if (
    currentTotalMinutes >= openTotalMinutes &&
    currentTotalMinutes < closeTotalMinutes
  ) {
    badge.innerHTML =
      "🟢 We’re Open! <br> (Closing tonight at 12:00 AM)";

    badge.className = "status-badge open-badge";
  } else {
    badge.innerHTML =
      "🔴 Currently Closed <br> (We open tomorrow at 8:00 AM)";

    badge.className = "status-badge closed-badge";
  }
}


// --- VISITOR COUNTER - COUNTERAPI V2 ---
document.addEventListener("DOMContentLoaded", () => {
  updateShopStatus();

  const counterElement = document.getElementById("visit-count");

  if (!counterElement) return;

  const counter = new Counter({
    workspace: "spawarisanmelayu",
    accessToken: "ut_qx1MZUaZ8V4sx3eoErIO0T31ILtFPyOWPIyfb7T6"
  });

  counter
    .up("visits")
    .then((result) => {
      if (result && result.value !== undefined) {
        counterElement.textContent =
          Number(result.value).toLocaleString();
      } else {
        throw new Error("Invalid counter response");
      }
    })
    .catch((error) => {
      console.error("Visitor counter error:", error);

      // Keep the website looking normal if CounterAPI is unavailable
      counterElement.textContent = "69,050+";
    });
});


// --- PREVENT IMAGE CONTEXT MENU ---
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
});
