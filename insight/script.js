/* =========================================================
   INSIGHT — AI DATA INTELLIGENCE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const mobileMenu = document.getElementById("mobileMenu");
    const mobileNav = document.getElementById("mobileNav");

    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");

    const closeModal = document.getElementById("closeModal");
    const modalOk = document.getElementById("modalOk");

    /* ================= MOBILE MENU ================= */

    mobileMenu.addEventListener("click", () => {

        mobileNav.classList.toggle("show");

        const icon = mobileMenu.querySelector("i");

        if (mobileNav.classList.contains("show")) {
            icon.className = "fa-solid fa-xmark";
        } else {
            icon.className = "fa-solid fa-bars";
        }

    });

    /* ================= MOBILE LINKS ================= */

    document.querySelectorAll(".mobile-nav a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("show");

            mobileMenu.querySelector("i").className =
                "fa-solid fa-bars";

        });

    });

    /* ================= MODAL ================= */

    function openModal(title, text) {

        modalTitle.textContent = title;
        modalText.textContent = text;

        modal.classList.add("show");

    }

    function hideModal() {

        modal.classList.remove("show");

    }

    closeModal.addEventListener("click", hideModal);
    modalOk.addEventListener("click", hideModal);

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            hideModal();
        }

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            hideModal();
            mobileNav.classList.remove("show");
        }

    });

    /* ================= DEMO BUTTONS ================= */

    document.getElementById("demoBtn").addEventListener("click", () => {

        openModal(
            "Welcome to Insight",
            "Your AI-powered data intelligence workspace is ready to explore."
        );

    });

    document.getElementById("mobileDemo").addEventListener("click", () => {

        mobileNav.classList.remove("show");

        openModal(
            "Welcome to Insight",
            "Your AI-powered data intelligence workspace is ready to explore."
        );

    });

    document.getElementById("exploreBtn").addEventListener("click", () => {

        document.getElementById("intelligence").scrollIntoView({
            behavior: "smooth"
        });

    });

    document.getElementById("watchBtn").addEventListener("click", () => {

        openModal(
            "How Insight Works",
            "Insight connects your data, detects patterns, predicts trends and turns complex information into actionable intelligence."
        );

    });

    /* ================= ANALYSIS ================= */

    document.getElementById("analysisBtn").addEventListener("click", () => {

        openModal(
            "Real-Time Analysis",
            "Your live signals are being analyzed for trends, anomalies and future opportunities."
        );

    });

    /* ================= DATASETS ================= */

    document.getElementById("datasetBtn").addEventListener("click", () => {

        document.getElementById("datasets").scrollIntoView({
            behavior: "smooth"
        });

    });

    document.querySelectorAll(".dataset-card").forEach(card => {

        card.addEventListener("click", () => {

            const title = card.querySelector("h3").textContent;

            openModal(
                title,
                `${title} dataset selected. Advanced analysis and visualization tools are available here.`
            );

        });

    });

    /* ================= CTA ================= */

    document.getElementById("ctaBtn").addEventListener("click", () => {

        openModal(
            "Start Exploring",
            "Connect your data and let Insight uncover the signals hiding inside it."
        );

    });

    /* ================= SCROLL REVEAL ================= */

    const revealItems = document.querySelectorAll(
        ".feature-card, .dataset-card, .analysis-card, .metric"
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity .7s ease, transform .7s ease";

        observer.observe(item);

    });

    /* ================= NODE INTERACTION ================= */

    document.querySelectorAll(".node").forEach(node => {

        node.addEventListener("click", () => {

            openModal(
                "Data Signal Detected",
                "Insight identified a meaningful relationship within your connected data."
            );

        });

    });

});