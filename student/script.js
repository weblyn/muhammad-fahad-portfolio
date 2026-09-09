/* =========================================================
   STUDENT HUB
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* ================= PRELOADER ================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 700);

    });


    /* ================= HEADER ================= */

    const header = document.getElementById("header");

    function handleHeader() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });


    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

        });

    });


    /* ================= DARK MODE ================= */

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const savedTheme = localStorage.getItem("studentHubTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeIcon.textContent = "☀";

    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "studentHubTheme",
            isDark ? "dark" : "light"
        );

        themeIcon.textContent =
            isDark ? "☀" : "☾";

    });


    /* ================= ACTIVE NAV ================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            threshold: 0.25
        }
    );

    sections.forEach(section => {

        observer.observe(section);

    });


    /* ================= COUNTERS ================= */

    const counters =
        document.querySelectorAll(".counter");

    let counterStarted = false;

    function startCounters() {

        if (counterStarted) return;

        const stats =
            document.querySelector(".stats");

        if (!stats) return;

        const position =
            stats.getBoundingClientRect().top;

        if (position < window.innerHeight - 100) {

            counterStarted = true;

            counters.forEach(counter => {

                const target =
                    Number(counter.dataset.target);

                let current = 0;

                const increment =
                    Math.max(1, Math.ceil(target / 40));

                const timer =
                    setInterval(() => {

                        current += increment;

                        if (current >= target) {

                            current = target;

                            clearInterval(timer);

                        }

                        counter.textContent = current;

                    }, 35);

            });

        }

    }

    window.addEventListener("scroll", startCounters);

    startCounters();


    /* ================= GPA CALCULATOR ================= */

    const gpaRows =
        document.getElementById("gpaRows");

    const addCourse =
        document.getElementById("addCourse");

    const calculateGPA =
        document.getElementById("calculateGPA");

    const gpaResult =
        document.getElementById("gpaResult");


    addCourse.addEventListener("click", () => {

        const row =
            document.createElement("div");

        row.className = "gpa-row";

        row.innerHTML = `

            <select class="grade">

                <option value="4">A</option>
                <option value="3.7">A-</option>
                <option value="3.3">B+</option>
                <option value="3">B</option>
                <option value="2.7">B-</option>
                <option value="2.3">C+</option>
                <option value="2">C</option>
                <option value="1">D</option>
                <option value="0">F</option>

            </select>

            <input
                type="number"
                class="credit"
                value="3"
                min="1"
                max="10"
            >

        `;

        gpaRows.appendChild(row);

    });


    calculateGPA.addEventListener("click", () => {

        const grades =
            document.querySelectorAll(".grade");

        const credits =
            document.querySelectorAll(".credit");

        let totalPoints = 0;

        let totalCredits = 0;


        grades.forEach((grade, index) => {

            const gradeValue =
                Number(grade.value);

            const creditValue =
                Number(credits[index].value);

            if (
                !Number.isNaN(gradeValue) &&
                creditValue > 0
            ) {

                totalPoints +=
                    gradeValue * creditValue;

                totalCredits +=
                    creditValue;

            }

        });


        if (totalCredits === 0) {

            gpaResult.textContent = "0.00";

            showToast("Please enter valid credit hours.");

            return;

        }


        const result =
            totalPoints / totalCredits;

        gpaResult.textContent =
            result.toFixed(2);

        showToast("GPA calculated successfully 🎓");

    });


    /* ================= PERCENTAGE ================= */

    const totalMarks =
        document.getElementById("totalMarks");

    const obtainedMarks =
        document.getElementById("obtainedMarks");

    const percentageResult =
        document.getElementById("percentageResult");

    document
        .getElementById("calculatePercentage")
        .addEventListener("click", () => {

            const total =
                Number(totalMarks.value);

            const obtained =
                Number(obtainedMarks.value);

            if (
                total <= 0 ||
                obtained < 0 ||
                obtained > total
            ) {

                percentageResult.textContent = "0%";

                showToast(
                    "Please enter valid marks."
                );

                return;
            }

            const result =
                (obtained / total) * 100;

            percentageResult.textContent =
                result.toFixed(2) + "%";

            showToast(
                "Percentage calculated successfully 📈"
            );

        });


    /* ================= ATTENDANCE ================= */

    const attendedClasses =
        document.getElementById("attendedClasses");

    const totalClasses =
        document.getElementById("totalClasses");

    const attendanceResult =
        document.getElementById("attendanceResult");


    document
        .getElementById("calculateAttendance")
        .addEventListener("click", () => {

            const attended =
                Number(attendedClasses.value);

            const total =
                Number(totalClasses.value);


            if (
                total <= 0 ||
                attended < 0 ||
                attended > total
            ) {

                attendanceResult.textContent =
                    "0%";

                showToast(
                    "Please enter valid attendance data."
                );

                return;
            }


            const result =
                (attended / total) * 100;

            attendanceResult.textContent =
                result.toFixed(2) + "%";


            if (result >= 75) {

                showToast(
                    "Great! Your attendance is good ✓"
                );

            } else {

                showToast(
                    "Your attendance is below 75%."
                );

            }

        });


    /* ================= POMODORO ================= */

    const timerDisplay =
        document.getElementById("timer");

    const startTimer =
        document.getElementById("startTimer");

    const pauseTimer =
        document.getElementById("pauseTimer");

    const resetTimer =
        document.getElementById("resetTimer");

    const focusStatus =
        document.getElementById("focusStatus");


    let timeLeft = 25 * 60;

    let timerInterval = null;


    function updateTimer() {

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;

        timerDisplay.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    }


    startTimer.addEventListener("click", () => {

        if (timerInterval !== null) return;

        focusStatus.textContent =
            "Focus mode is running 🔥";

        timerInterval =
            setInterval(() => {

                if (timeLeft > 0) {

                    timeLeft--;

                    updateTimer();

                } else {

                    clearInterval(timerInterval);

                    timerInterval = null;

                    focusStatus.textContent =
                        "Focus session completed 🎉";

                    showToast(
                        "Pomodoro session completed!"
                    );

                }

            }, 1000);

    });


    pauseTimer.addEventListener("click", () => {

        clearInterval(timerInterval);

        timerInterval = null;

        focusStatus.textContent =
            "Timer paused ⏸";

    });


    resetTimer.addEventListener("click", () => {

        clearInterval(timerInterval);

        timerInterval = null;

        timeLeft = 25 * 60;

        updateTimer();

        focusStatus.textContent =
            "Ready to focus 🚀";

    });


    /* ================= RESOURCE FILTER ================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const resourceCards =
        document.querySelectorAll(".resource-card");

    const resourceSearch =
        document.getElementById("resourceSearch");


    let activeFilter = "all";


    function filterResources() {

        const search =
            resourceSearch.value
                .toLowerCase()
                .trim();


        resourceCards.forEach(card => {

            const category =
                card.dataset.category;

            const title =
                card.dataset.title.toLowerCase();

            const text =
                card.textContent.toLowerCase();


            const matchesFilter =
                activeFilter === "all" ||
                category === activeFilter;

            const matchesSearch =
                title.includes(search) ||
                text.includes(search);


            if (
                matchesFilter &&
                matchesSearch
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            activeFilter =
                button.dataset.filter;

            filterResources();

        });

    });


    resourceSearch.addEventListener(
        "input",
        filterResources
    );


    /* ================= RESOURCE MODAL ================= */

    const resourceModal =
        document.getElementById("resourceModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalText =
        document.getElementById("modalText");

    const modalAction =
        document.getElementById("modalAction");


    const resourceDescriptions = {

        "C++ Programming":
            "Build strong C++ skills through variables, conditions, loops, functions, arrays and object-oriented programming.",

        "Database Systems":
            "Learn SQL, relational databases, ER diagrams, normalization and database design concepts.",

        "Web Development":
            "Learn HTML, CSS and JavaScript and build modern responsive websites from scratch.",

        "Mathematics":
            "Practice functions, limits, continuity, derivatives and other important mathematical concepts.",

        "Information Technology":
            "Explore operating systems, networking, software, hardware and core IT concepts.",

        "Programming Fundamentals":
            "Strengthen your programming logic with variables, loops, conditions, functions and problem solving."

    };


    document
        .querySelectorAll(".resource-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const resource =
                    button.dataset.resource;

                modalTitle.textContent =
                    resource;

                modalText.textContent =
                    resourceDescriptions[resource] ||
                    "Explore this learning resource and improve your skills.";

                resourceModal.classList.add("show");

            });

        });


    function closeModal() {

        resourceModal.classList.remove("show");

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    resourceModal.addEventListener(
        "click",
        event => {

            if (event.target === resourceModal) {

                closeModal();

            }

        }
    );


    modalAction.addEventListener("click", () => {

        closeModal();

        showToast(
            "Learning resource selected 📚"
        );

    });


    /* ================= CONTACT FORM ================= */

    const contactForm =
        document.getElementById("contactForm");


    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const subject =
                document.getElementById("subject").value.trim();

            const message =
                document.getElementById("message").value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showToast(
                    "Please complete all fields."
                );

                return;

            }


            showToast(
                "Message submitted successfully ✓"
            );


            contactForm.reset();

        }
    );


    /* ================= TOAST ================= */

    const toast =
        document.getElementById("toast");

    const toastText =
        toast.querySelector("p");

    let toastTimer;


    function showToast(message) {

        toastText.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    }


    /* ================= BACK TO TOP ================= */

    const backTop =
        document.getElementById("backTop");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    });


    backTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(
            ".feature-card, .tool-card, .resource-card, .about-feature, .contact-form"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* ================= ESCAPE MODAL ================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            resourceModal.classList.remove("show");

            navMenu.classList.remove("show");

        }

    });


    /* ================= INITIAL TIMER ================= */

    updateTimer();

});