const sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-250px";
}

// Typing effect for roles
const roles = ["Full Stack Developer", "AI Explorer", "Lifelong Learner"];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const roleElement = document.getElementById("role");
const typingSpeed = 150, erasingSpeed = 100, delayBetweenRoles = 1000;

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenRoles);
            return;
        }
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
}
typeEffect();

// Contact form submission
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('https://script.google.com/macros/s/AKfycbwzkUJEnE0qFwX4c_hXW3W5yY77wUh_bxHuKMF5MADOY9y_NTox_LbpDjKk9j_vXn6Dwg/exec', {
        method: 'POST',
        body: new FormData(form)
    })
    .then(() => {
        msg.innerHTML = "Message sent successfully!";
        msg.style.color = "#61b752";
        form.reset();
        setTimeout(() => msg.innerHTML = "", 4000);
    })
    .catch(err => {
        console.error(err);
        msg.innerHTML = "Oops! Something went wrong.";
        msg.style.color = "red";
    });
});

// 🌗 Dark/Light Theme Toggle
// Theme Toggle Button
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    // Toggle icon dynamically
    if (document.body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});