/* =========================================================
   FAHAD KHAN — PREMIUM PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

   
    /* =========================
       PRELOADER
    ========================= */

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("hide");
            }
        }, 600);
    });


    /* =========================
       MOBILE NAVIGATION
    ========================= */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                menuToggle.setAttribute(
                    "aria-label",
                    "Close menu"
                );

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );
            }

        });


        /* Close menu after clicking a link */

        document.querySelectorAll(".nav-link, .nav-contact").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            });

        });

    }


    /* =========================
       TYPING EFFECT
    ========================= */

    if (typingText) {

        const words = [
            "beautiful websites.",
            "modern experiences.",
            "responsive designs.",
            "digital experiences."
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typingSpeed = 80;
        const deletingSpeed = 45;
        const pauseAfterWord = 1600;


        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                characterIndex++;

                typingText.textContent =
                    currentWord.substring(0, characterIndex);

                if (characterIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        pauseAfterWord
                    );

                    return;
                }

            } else {

                characterIndex--;

                typingText.textContent =
                    currentWord.substring(0, characterIndex);

                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) % words.length;

                    setTimeout(
                        typeEffect,
                        400
                    );

                    return;
                }
            }

            setTimeout(
                typeEffect,
                deleting ? deletingSpeed : typingSpeed
            );
        }


        setTimeout(typeEffect, 900);
    }


    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        handleHeader,
        { passive: true }
    );

    handleHeader();


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");


    function updateActiveNav() {

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${sectionId}"]`
                    );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.offsetTop - headerHeight + 1;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = [
        ...document.querySelectorAll(".section-heading"),
        ...document.querySelectorAll(".about-image"),
        ...document.querySelectorAll(".about-content"),
        ...document.querySelectorAll(".skill-card"),
        ...document.querySelectorAll(".project-card"),
        ...document.querySelectorAll(".resume-box"),
        ...document.querySelectorAll(".contact-heading"),
        ...document.querySelectorAll(".contact-card")
    ];


    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("show");

                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("show");
        });

    }


    /* =========================
       STAGGERED ANIMATIONS
    ========================= */

    document
        .querySelectorAll(".skill-card")
        .forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        });


    document
        .querySelectorAll(".project-card")
        .forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 80}ms`;

        });


    document
        .querySelectorAll(".contact-card")
        .forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 100}ms`;

        });


    /* =========================
       PROJECT CARD 3D EFFECT
    ========================= */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth <= 900) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -1.5;

            const rotateY =
                ((x - centerX) / centerX) * 1.5;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =========================
       BUTTON RIPPLE EFFECT
    ========================= */

    document
        .querySelectorAll(".btn")
        .forEach(button => {

            button.addEventListener("click", function(event) {

                const ripple =
                    document.createElement("span");

                const rect =
                    this.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;

                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;

                ripple.classList.add("button-ripple");

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);

            });

        });


    /* =========================
       RIPPLE STYLE
    ========================= */

    const rippleStyle =
        document.createElement("style");

    rippleStyle.textContent = `

        .btn {
            position: relative;
            overflow: hidden;
        }

        .button-ripple {
            position: absolute;

            border-radius: 50%;

            background: rgba(255, 255, 255, 0.25);

            transform: scale(0);

            pointer-events: none;

            animation: buttonRippleAnimation 0.6s linear;
        }

        @keyframes buttonRippleAnimation {

            to {
                transform: scale(4);
                opacity: 0;
            }

        }

    `;

    document.head.appendChild(rippleStyle);


    /* =========================
       IMAGE FALLBACK
    ========================= */

    document
        .querySelectorAll(".project-image img")
        .forEach(image => {

            image.addEventListener("error", () => {

                image.style.display = "none";

                const parent =
                    image.closest(".project-image");

                if (!parent) return;

                parent.classList.add(
                    "image-not-found"
                );

            });

        });


    /* =========================
       KEYBOARD ESCAPE
    ========================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (
                navMenu &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");

                if (menuToggle) {

                    const icon =
                        menuToggle.querySelector("i");

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open menu"
                    );
                }

            }

        }

    });


    /* =========================
       CURRENT YEAR
    ========================= */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =========================
       ACTIVE PROJECT LINKS
    ========================= */

    document
        .querySelectorAll(".project-view, .project-bottom a")
        .forEach(link => {

            link.addEventListener("click", event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#" ||
                    href.trim() === ""
                ) {
                    event.preventDefault();
                }

            });

        });


    /* =========================
       CONSOLE MESSAGE
    ========================= */

    console.log(
        "%c Fahad Khan — Web Developer ",
        "background:#101828;color:#ffffff;padding:8px 14px;border-radius:6px;font-weight:bold;"
    );

    console.log(
        "%c Portfolio loaded successfully 🚀 ",
        "color:#635bff;font-weight:bold;"
    );

});