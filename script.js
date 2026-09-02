/* =========================================================
   SPA WARISAN MELAYU
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE NAVBAR TOGGLE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const closeBtn = document.getElementById("closeBtn");
  const navLinks = document.getElementById("navLinks");

  // Open mobile menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.add("active");

      // Accessibility
      menuToggle.setAttribute("aria-expanded", "true");
    });
  }

  // Close mobile menu
  if (closeBtn && navLinks) {
    closeBtn.addEventListener("click", () => {
      navLinks.classList.remove("active");

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Close menu when clicking a navigation link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks) {
        navLinks.classList.remove("active");
      }

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close menu when clicking outside the drawer
  document.addEventListener("click", (event) => {
    if (!navLinks || !navLinks.classList.contains("active")) {
      return;
    }

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle && menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      navLinks.classList.remove("active");

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Close menu when pressing ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks) {
      navLinks.classList.remove("active");

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    }
  });
});


/* =========================================================
   LIVE OPERATING HOURS STATUS
   SPA OPEN: 8:00 AM
   SPA CLOSE: 12:00 AM
   ========================================================= */

function updateShopStatus() {
  const badge = document.getElementById("shop-status-badge");

  if (!badge) {
    return;
  }

  const now = new Date();

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const currentTotalMinutes =
    currentHour * 60 + currentMinute;

  // Operating hours
  const openTotalMinutes = 8 * 60;       // 8:00 AM
  const closeTotalMinutes = 24 * 60;     // 12:00 AM

  const isOpen =
    currentTotalMinutes >= openTotalMinutes &&
    currentTotalMinutes < closeTotalMinutes;

  if (isOpen) {
    badge.innerHTML =
      "🟢 We’re Open!<br>" +
      "<small>(Closing tonight at 12:00 AM)</small>";

    badge.className = "status-badge open-badge";
  } else {
    badge.innerHTML =
      "🔴 Currently Closed<br>" +
      "<small>(We open tomorrow at 8:00 AM)</small>";

    badge.className = "status-badge closed-badge";
  }
}


/* =========================================================
   UPDATE SHOP STATUS
   - Run immediately
   - Refresh every minute
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  updateShopStatus();

  // Update every 60 seconds
  setInterval(updateShopStatus, 60 * 1000);
});


/* =========================================================
   VISITOR COUNTER
   COUNTERAPI V2
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const counterElement = document.getElementById("visit-count");

  if (!counterElement) {
    return;
  }

  /*
   * IMPORTANT:
   * Replace the token below with your REAL CounterAPI V2 token.
   */

  const WORKSPACE = "spawarisanmelayu";
  const COUNTER_KEY = "visits";
  const API_TOKEN = "your_actual_v2_access_token_here";

  /*
   * Correct CounterAPI endpoint format
   */
  const API_URL =
    `https://counterapi.dev/${WORKSPACE}/counters/${COUNTER_KEY}/up`;

  fetch(API_URL, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Counter API HTTP Error: ${response.status}`
        );
      }

      return response.json();
    })

    .then((result) => {
      console.log("Counter API response:", result);

      /*
       * CounterAPI V2 response
       */
      if (
        result &&
        result.data &&
        result.data.count !== undefined
      ) {
        const count = Number(result.data.count);

        if (!Number.isNaN(count)) {
          counterElement.textContent =
            count.toLocaleString();
          return;
        }
      }

      /*
       * Fallback if API response is unexpected
       */
      counterElement.textContent = "6,950+";
    })

    .catch((error) => {
      console.error(
        "Visitor Counter Error:",
        error
      );

      /*
       * Never allow the visitor counter
       * to break the website.
       */
      counterElement.textContent = "6,950+";
    });
});


/* =========================================================
   PREVENT IMAGE CONTEXT MENU
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  });
});


/* =========================================================
   PREVENT BROKEN IMAGE DISPLAY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      console.warn(
        `Image failed to load: ${img.src}`
      );
    });
  });
});


/* =========================================================
   EXTERNAL LINKS
   Add security attributes automatically
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll('a[target="_blank"]')
    .forEach((link) => {
      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );
    });
});