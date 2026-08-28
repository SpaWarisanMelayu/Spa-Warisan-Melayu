// Mobile menu toggle logic (with null checks)
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

// Function to track and display site visitors
function trackVisitors() {
    const countElement = document.getElementById("visitor-count");
    if (!countElement) return; // Exit cleanly if element is not on current page

    const namespace = "spawarisanmelayu-website"; // Unique key for your website
    const key = "visits";

    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            if (data && data.value) {
                // Formats numbers neatly with commas (e.g., 1,250)
                countElement.innerText = data.value.toLocaleString();
            }
        })
        .catch(error => {
            console.error("Error updating visitor count:", error);
            countElement.innerText = "Unavailable";
        });
}

// Trigger count on page load
document.addEventListener("DOMContentLoaded", trackVisitors);