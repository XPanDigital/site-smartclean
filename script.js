document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'var(--shadow-sm)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.7)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Auto-Scroll Reviews Logic
    const scroller = document.querySelector('.reviews-marquee-wrapper');
    if (scroller) {
        let isPaused = false;

        // Auto Scroll Function
        const autoScroll = () => {
            if (!isPaused) {
                scroller.scrollLeft += 1;
                // Infinite Loop Effect (roughly)
                // When we reach near the end, we can arguably jump back if we had duplicated content
                // For now, let's simply reset if it hits the end to simulate loop if content is duplicated enough
                // Or just let it scroll. Given the request "maintain sliding alone", a simple increment is best.
                // To make it truly infinite without jump requires precise content duplication.
                // Assuming content is duplicated in HTML as seen before.
                if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
                     // If we have 2 sets of identical items, jumping back to 0 when halfway is a common trick
                     // provided the scrollWidth/2 is exactly the width of one set.
                     // A safer check is:
                     if (scroller.scrollLeft >= (scroller.scrollWidth - scroller.clientWidth - 1)) {
                        scroller.scrollLeft = 0; 
                     }
                }
            }
        };

        // Run auto scroll
        let scrollInterval = setInterval(autoScroll, 20); // 50fps approx

        // Interaction Handling
        scroller.addEventListener('mouseenter', () => isPaused = true);
        scroller.addEventListener('mouseleave', () => isPaused = false);
        scroller.addEventListener('touchstart', () => isPaused = true);
        scroller.addEventListener('touchend', () => {
             setTimeout(() => isPaused = false, 2000); // Resume after 2s of no touch
        });
    }

    // Parallax Effect for Hero (Safe check)
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.5}px) scale(1.05)`;
            }
        });
    }
});
