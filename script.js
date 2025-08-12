// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menu mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animation des barres du hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });

    // Scroll smooth pour les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestion du scroll de la navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.transform = 'translateY(0)';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll vers le bas
            navbar.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll) {
            // Scroll vers le haut
            navbar.style.transform = 'translateY(0)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Animation des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.service-card, .about-text, .contact-info, .contact-form, .portfolio-item, .benefit-item, .step, .testimonial-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Animation des compteurs dans la section About
    const stats = document.querySelectorAll('.stat h3');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }

    function animateCounters() {
        stats.forEach(stat => {
            const originalText = stat.textContent;
            const numberMatch = originalText.match(/(\d+)/);
            if (numberMatch) {
                const target = parseInt(numberMatch[1]);
                const suffix = originalText.replace(/\d+/, '');
                let current = 0;
                const increment = Math.max(1, target / 50);
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + suffix;
                }, 40);
            }
        });
    }

    // Parallax pour les éléments flottants (optimisé avec throttle)
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    const handleParallax = throttle(function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
        });
    }, 16); // ~60fps
    
    window.addEventListener('scroll', handleParallax);

    // Effet de souris simple pour les cartes de service
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Réinitialiser les styles inline qui pourraient causer des problèmes
            card.style.transform = '';
            card.style.transition = '';
        });
        
        card.addEventListener('mouseleave', function() {
            // Réinitialiser complètement les styles
            card.style.transform = '';
            card.style.transition = '';
        });
    });

    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation du bouton de soumission
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            // Simuler l'envoi du formulaire
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
                submitBtn.style.background = '#10b981';
                
                // Reset après 3 secondes
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }

    // Animation des éléments visuels de la section About
    const visualElements = document.querySelectorAll('.visual-element');
    
    setInterval(() => {
        visualElements.forEach((element, index) => {
            const randomRotation = Math.random() * 10 - 5;
            const randomScale = 1 + (Math.random() * 0.1 - 0.05);
            
            element.style.transform += ` rotate(${randomRotation}deg) scale(${randomScale})`;
            
            setTimeout(() => {
                element.style.transform = element.style.transform.replace(/ rotate\([^)]*\) scale\([^)]*\)/g, '');
            }, 2000);
        });
    }, 5000);

    // Smooth scroll pour l'indicateur de scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Gestion du theme sombre (optionnel)
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        `;
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });
        
        document.body.appendChild(themeToggle);
    }

    // Activer le bouton de thème (décommenter si souhaité)
    // createThemeToggle();

    // Performance: Utiliser requestAnimationFrame pour les animations
    let ticking = false;
    
    function updateAnimations() {
        // Mettre à jour les animations ici si nécessaire
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    // Préloader les images de fond si nécessaire
    function preloadImages() {
        const imageUrls = [
            // Ajouter les URLs des images si nécessaire
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Démarrer le préchargement
    preloadImages();

    // Easter egg: Animation spéciale sur clic multiple du logo
    let logoClickCount = 0;
    const logo = document.querySelector('.logo h2');
    
    if (logo) {
        logo.addEventListener('click', function() {
            logoClickCount++;
            
            if (logoClickCount === 5) {
                // Animation spéciale
                document.body.style.animation = 'rainbow 2s ease-in-out';
                
                setTimeout(() => {
                    document.body.style.animation = '';
                    logoClickCount = 0;
                }, 2000);
            }
        });
    }

    // Ajout de l'animation rainbow pour l'easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Gestion du carrousel de témoignages
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Navigation par points
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-play du carrousel (seulement s'il y a des témoignages)
    if (testimonials.length > 1) {
        const autoPlay = setInterval(nextTestimonial, 5000);
        
        // Arrêter l'auto-play si l'utilisateur interagit
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                clearInterval(autoPlay);
                // Redémarrer après 10 secondes d'inactivité
                setTimeout(() => {
                    if (testimonials.length > 1) {
                        setInterval(nextTestimonial, 5000);
                    }
                }, 10000);
            });
        });
    }

    // Animation des statistiques CTA
    const ctaStats = document.querySelectorAll('.cta-stat strong');
    let hasAnimatedCTA = false;

    const ctaObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedCTA) {
                hasAnimatedCTA = true;
                animateCTAStats();
            }
        });
    }, { threshold: 0.5 });

    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaObserver.observe(ctaSection);
    }

    function animateCTAStats() {
        ctaStats.forEach(stat => {
            const text = stat.textContent.trim();
            const numberMatch = text.match(/\+?(\d+)/);
            
            if (numberMatch) {
                const targetNumber = parseInt(numberMatch[1]);
                const prefix = text.includes('+') ? '+' : '';
                const suffix = text.replace(/\+?\d+/, '');
                let current = 0;
                const increment = Math.max(1, targetNumber / 30);
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetNumber) {
                        current = targetNumber;
                        clearInterval(timer);
                    }
                    stat.textContent = prefix + Math.floor(current) + suffix;
                }, 50);
            }
        });
    }

    // Smooth scroll pour tous les liens internes (sauf ceux déjà gérés)
    document.querySelectorAll('a[href^="#"]:not(.nav-menu a)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Compte pour la navbar fixe
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Effet de typing pour le titre principal
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML; // Utiliser innerHTML pour préserver les balises
        heroTitle.innerHTML = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        let currentHtml = '';
        
        function typeWriter() {
            if (i < text.length) {
                currentHtml += text.charAt(i);
                heroTitle.innerHTML = currentHtml;
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Démarrer l'animation après un délai
        setTimeout(typeWriter, 1500);
    }
});

// Performance monitoring
let performanceMetrics = {
    loadTime: 0,
    interactionCount: 0
};

window.addEventListener('load', function() {
    performanceMetrics.loadTime = performance.now();
    console.log(`Site chargé en ${performanceMetrics.loadTime.toFixed(2)}ms`);
});

// Track user interactions
document.addEventListener('click', function() {
    performanceMetrics.interactionCount++;
});

// Lazy loading pour les images si nécessaire
function lazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Fonctions utilitaires
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}