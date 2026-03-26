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
   OPTIONAL: CLOSE MOBILE MENU
   WHEN WINDOW RESIZES TO DESKTOP
========================= */
window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && mobileMenu) {
        mobileMenu.classList.add("hidden");
    }
});