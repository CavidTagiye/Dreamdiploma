document.addEventListener('DOMContentLoaded', () => {
    const scholarshipCards = document.querySelectorAll('.scholarship-card');
    
    scholarshipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('learn-more')) {
                const link = card.querySelector('.learn-more');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    });
});