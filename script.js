/* =========================
   NAVBAR SCROLL BEHAVIOR
========================= */
const navbar = document.getElementById("navbar");
const heroSection = document.getElementById("hero") || document.querySelector("header");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function handleNavbarScroll() {
    if (!navbar || !heroSection) return;

    const triggerPoint = heroSection.offsetHeight - 120;

    if (window.scrollY > triggerPoint) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleNavbarScroll);
window.addEventListener("load", handleNavbarScroll);
window.addEventListener("resize", handleNavbarScroll);

/* =========================
   MOBILE MENU TOGGLE
========================= */
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });
}

/* =========================
   REVEAL ON SCROLL
========================= */
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
}

/* =========================
   3D TILT INTERACTION
========================= */
const cardWrappers = document.querySelectorAll(".card-3d-wrapper");

cardWrappers.forEach((wrapper) => {
    const card = wrapper.querySelector(".card-3d-inner");
    if (!card) return;

    wrapper.addEventListener("mousemove", (e) => {
        if (window.innerWidth <= 768) return;

        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 7;
        const rotateX = -((y - centerY) / centerY) * 7;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    wrapper.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
});

/* =========================
   STATS COUNT-UP ANIMATION
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const statsSection = document.querySelector(".stats-section");
    const statNumbers = document.querySelectorAll(".stat-number");

    const animateCount = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 1800;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easedProgress * target);

            el.textContent = currentValue.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target.toLocaleString() + suffix;
            }
        };

        requestAnimationFrame(updateCount);
    };

    if (statsSection) {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !statsSection.dataset.animated) {
                        statsSection.dataset.animated = "true";
                        statNumbers.forEach((stat, index) => {
                            setTimeout(() => animateCount(stat), index * 120);
                        });
                        observer.unobserve(statsSection);
                    }
                });
            },
            { threshold: 0.4 }
        );

        observer.observe(statsSection);
    }
});

/* =========================
   OPTIONAL: CLOSE MOBILE MENU
   WHEN WINDOW RESIZES TO DESKTOP
========================= */
window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && mobileMenu) {
        mobileMenu.classList.add("hidden");
    }
});
