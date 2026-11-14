document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

    // 1. Barra de progreso de lectura
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
        
        // 2. Navbar Background on Scroll
        const navbar = document.querySelector('.navbar');
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Animaciones al hacer Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    // Respetar preferencias del usuario (reduced motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealOptions = {
            threshold: 0.15, // Se activa cuando el 15% del elemento es visible
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Solo animar una vez
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    } else {
        // Si el usuario prefiere movimiento reducido, mostrar todo inmediatamente
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 4. Smooth Scroll para Enlaces Internos
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para el navbar fijo
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Botón Volver al inicio
    const btnTop = document.getElementById('btn-top');
    if (btnTop) {
        btnTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});