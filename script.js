document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. Services Image Switcher
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceImgDisplay = document.getElementById('service-img-display');

    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            serviceItems.forEach(i => i.classList.remove('active'));
            
            // Add active to clicked
            item.classList.add('active');
            
            // Change image
            const newImgSrc = item.getAttribute('data-image');
            
            // Add slight fade effect
            serviceImgDisplay.style.opacity = '0';
            setTimeout(() => {
                serviceImgDisplay.src = newImgSrc;
                serviceImgDisplay.style.opacity = '1';
            }, 300);
        });
    });

    // 4. Scroll Animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-up, .fade-in, .fade-in-right, .zoom-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 5. Portfolio Carousel Logic
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-inner img');
        const nextBtn = carousel.querySelector('.next');
        const prevBtn = carousel.querySelector('.prev');
        let currentIndex = 0;

        function updateCarousel(newIndex) {
            images[currentIndex].classList.remove('active');
            currentIndex = newIndex;
            // Wrap around logic
            if (currentIndex >= images.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = images.length - 1;
            images[currentIndex].classList.add('active');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateCarousel(currentIndex + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateCarousel(currentIndex - 1);
            });
        }
    });
    // 6. Cookie Consent Banner (LGPD)
    const cookieBanner = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (cookieBanner && acceptCookiesBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000); // Mostra 1 segundo após entrar
        }

        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }
});
