document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');

    // Elementlərin mövcudluğunu yoxlayırıq
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    } else {
        console.error('Burger menyu və ya naviqasiya linkləri tapılmadı.');
    }
});