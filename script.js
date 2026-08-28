
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
    // Replace 'spa-warisan-melayu-unique-key' with any unique identifier for your website
    const namespace = "spawarisanmelayu.vercel.app";
    const key = "pageviews";

    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("visit-count").innerText = data.value;
        })
        .catch(error => {
            console.error("Error fetching visitor count:", error);
            document.getElementById("visit-count").innerText = "N/A";
        });
});