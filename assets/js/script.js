// Navbar Script Start
document.addEventListener("DOMContentLoaded", function() {
    var navbar = document.getElementById('navbar');

    function updateNavbar() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar);
});
// Navbar Script End


document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.count');
    const countersSection = document.getElementById('heroSection');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.unobserve(entry.target);
            }
        });
    }, options);

    observer.observe(countersSection);

    function startCounting() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;

            let count = 0;

            const updateCounter = () => {
                count += increment;
                counter.innerText = Math.floor(count);

                if (count < target) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    }
});




