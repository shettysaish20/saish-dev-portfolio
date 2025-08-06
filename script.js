// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Fix scroll restoration issue on mobile
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // Ensure page starts at top on refresh
    window.scrollTo(0, 0);
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Scroll event listeners
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    
    // Initial calls
    updateActiveNav();
    updateNavbar();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .stat-item, .highlight-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Typing animation for hero text
    const heroTitle = document.querySelector('.name');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent = text.substring(0, i + 1) + '|';
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // After typing is complete, blink cursor for 2 seconds then remove it
                let blinkCount = 0;
                const blinkInterval = setInterval(() => {
                    if (heroTitle.textContent.endsWith('|')) {
                        heroTitle.textContent = text;
                    } else {
                        heroTitle.textContent = text + '|';
                    }
                    blinkCount++;
                    if (blinkCount > 5) { // Blink 5 times (2 seconds at 400ms intervals)
                        clearInterval(blinkInterval);
                        heroTitle.textContent = text; // Remove cursor
                    }
                }, 400);
            }
        }
        setTimeout(typeWriter, 1000);
    }


    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isPercentage = target.includes('%');
            const isPlus = target.includes('+');
            const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
            
            counter.textContent = '0';
            
            const increment = numericValue / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    let displayValue = Math.floor(current);
                    if (isPercentage) displayValue += '%';
                    if (isPlus) displayValue += '+';
                    counter.textContent = displayValue;
                }
            }, 30);
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Particles animation for hero background
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: -1;
        `;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite linear;
            `;
            particlesContainer.appendChild(particle);
        }
        
        hero.appendChild(particlesContainer);
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
});

// Project expansion functionality
function toggleProject(projectId) {
    const details = document.getElementById(`project-${projectId}-details`);
    const button = document.querySelector(`[data-project="${projectId}"] .expand-btn`);
    const icon = button.querySelector('i');
    
    if (details.classList.contains('expanded')) {
        details.classList.remove('expanded');
        button.classList.remove('active');
        button.querySelector('span').textContent = 'View Details';
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Close all other expanded projects
        document.querySelectorAll('.project-details').forEach(detail => {
            detail.classList.remove('expanded');
        });
        document.querySelectorAll('.expand-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.querySelector('span').textContent = 'View Details';
            btn.querySelector('i').style.transform = 'rotate(0deg)';
        });
        
        // Open current project
        details.classList.add('expanded');
        button.classList.add('active');
        button.querySelector('span').textContent = 'Hide Details';
        icon.style.transform = 'rotate(180deg)';
    }
}

// Skill tag hover effect
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Enhanced scroll-to-top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: var(--bg-primary);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0) scale(1)';
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTop);

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add loading styles
document.addEventListener('DOMContentLoaded', function() {
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: '';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 10000;
        }
        
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        body.loaded::before,
        body.loaded::after {
            display: none;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Cursor trail effect (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    let mouseX = 0;
    let mouseY = 0;
    let trailElements = [];
    
    // Create trail elements
    for (let i = 0; i < 6; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: ${8 - i}px;
            height: ${8 - i}px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${0.6 - i * 0.1};
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(trail);
        trailElements.push(trail);
    }
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate trail
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trailElements.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = x + 'px';
                trail.style.top = y + 'px';
            }, index * 50);
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Hide trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
        trailElements.forEach(trail => {
            trail.style.opacity = '0';
        });
    });
    
    document.addEventListener('mouseenter', () => {
        trailElements.forEach((trail, index) => {
            trail.style.opacity = 0.6 - index * 0.1;
        });
    });
});
