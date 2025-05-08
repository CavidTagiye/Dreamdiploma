document.addEventListener('DOMContentLoaded', () => {
    // Initialize any necessary functionality
    console.log('Website loaded');

    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
    });
});

// Burger menyunun açılıb-bağlanması
document.getElementById('burgerMenu').addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    

});

// Example function for filtering universities
function filterUniversities(criteria) {
    // Add filtering logic here
}

// Example function for searching scholarships
function searchScholarships(query) {
    // Add search logic here
}

// Counter Animation
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50; // Adjust speed here

    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);
            setTimeout(updateCounter, 20);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};

// Animate counters when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));