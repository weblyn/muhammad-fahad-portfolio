document.addEventListener("DOMContentLoaded", () => {

    /* ================= SELECTORS ================= */

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");

    const transactionForm =
        document.getElementById("transactionForm");

    const transactionList =
        document.getElementById("transactionList");

    const amountInput =
        document.getElementById("amountInput");

    const categoryInput =
        document.getElementById("categoryInput");

    const descriptionInput =
        document.getElementById("descriptionInput");

    const balanceAmount =
        document.getElementById("balanceAmount");

    const incomeAmount =
        document.getElementById("incomeAmount");

    const expenseAmount =
        document.getElementById("expenseAmount");

    const savingAmount =
        document.getElementById("savingAmount");

    const modal =
        document.getElementById("modal");

    const modalContent =
        document.getElementById("modalContent");

    const modalClose =
        document.getElementById("modalClose");

    const toast =
        document.getElementById("toast");

    const toastText =
        document.getElementById("toastText");


    /* ================= STATE ================= */

    let transactionType = "income";

    let transactions =
        JSON.parse(
            localStorage.getItem("fintrackTransactions")
        ) || [

            {
                id: 1,
                type: "income",
                amount: 4200,
                category: "Salary",
                description: "Monthly salary",
                date: "Sep 05"
            },

            {
                id: 2,
                type: "expense",
                amount: 85.50,
                category: "Food",
                description: "Dinner",
                date: "Sep 04"
            },

            {
                id: 3,
                type: "expense",
                amount: 120,
                category: "Shopping",
                description: "Clothing",
                date: "Sep 03"
            },

            {
                id: 4,
                type: "income",
                amount: 850,
                category: "Freelance",
                description: "Website project",
                date: "Sep 02"
            },

            {
                id: 5,
                type: "expense",
                amount: 55,
                category: "Transport",
                description: "Fuel",
                date: "Sep 01"
            }

        ];


    /* ================= MENU ================= */

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("active");

    });


    document
        .querySelectorAll(".side-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                document
                    .querySelectorAll(".side-link")
                    .forEach(item =>
                        item.classList.remove("active")
                    );

                link.classList.add("active");

                sidebar.classList.remove("active");

            });

        });


    /* ================= TRANSACTION TYPE ================= */

    document
        .querySelectorAll(".type-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".type-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                transactionType =
                    button.dataset.type;

            });

        });


    /* ================= FORM ================= */

    transactionForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const amount =
                Number(amountInput.value);

            const category =
                categoryInput.value;

            const description =
                descriptionInput.value.trim();


            if (
                !amount ||
                amount <= 0 ||
                !category ||
                !description
            ) {

                showToast(
                    "Please complete all fields"
                );

                return;
            }


            const transaction = {

                id: Date.now(),

                type: transactionType,

                amount: amount,

                category: category,

                description: description,

                date: "Today"

            };


            transactions.unshift(
                transaction
            );


            saveTransactions();

            renderTransactions();

            updateSummary();

            transactionForm.reset();

            showToast(
                transactionType === "income"
                    ? "Income added successfully"
                    : "Expense added successfully"
            );

        }
    );


    /* ================= RENDER TRANSACTIONS ================= */

    function renderTransactions(showAll = false) {

        transactionList.innerHTML = "";


        const list =
            showAll
                ? transactions
                : transactions.slice(0, 5);


        if (!list.length) {

            transactionList.innerHTML = `
                <div style="
                    text-align:center;
                    padding:30px;
                    color:#858895;
                    font-size:.7rem;
                ">
                    No transactions yet.
                </div>
            `;

            return;
        }


        list.forEach(transaction => {

            const item =
                document.createElement("div");

            item.className = "transaction";


            const icon =
                getCategoryIcon(
                    transaction.category
                );


            item.innerHTML = `

                <div class="transaction-icon
                    ${transaction.type === "income"
                        ? "green"
                        : "red"}">

                    <i class="${icon}"></i>

                </div>

                <div class="transaction-info">

                    <strong>
                        ${escapeHTML(
                            transaction.description
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            transaction.category
                        )}
                    </span>

                </div>

                <span class="transaction-date">
                    ${transaction.date}
                </span>

                <span class="transaction-amount
                    ${transaction.type}">

                    ${transaction.type === "income"
                        ? "+"
                        : "-"
                    }$${transaction.amount.toLocaleString(
                        "en-US",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }
                    )}

                </span>

            `;


            transactionList.appendChild(item);

        });

    }


    /* ================= SUMMARY ================= */

    function updateSummary() {

        const income =
            transactions
                .filter(t => t.type === "income")
                .reduce(
                    (sum, t) => sum + t.amount,
                    0
                );


        const expense =
            transactions
                .filter(t => t.type === "expense")
                .reduce(
                    (sum, t) => sum + t.amount,
                    0
                );


        const savings =
            income - expense;


        const balance =
            24680.50 + income - expense - 5050;


        incomeAmount.textContent =
            formatMoney(income);

        expenseAmount.textContent =
            formatMoney(expense);

        savingAmount.textContent =
            formatMoney(savings);

        balanceAmount.textContent =
            formatMoney(balance);

    }


    function formatMoney(amount) {

        return "$" +
            amount.toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

    }


    /* ================= CATEGORY ICON ================= */

    function getCategoryIcon(category) {

        const icons = {

            Salary:
                "fa-solid fa-money-bill-wave",

            Freelance:
                "fa-solid fa-laptop-code",

            Food:
                "fa-solid fa-utensils",

            Shopping:
                "fa-solid fa-bag-shopping",

            Transport:
                "fa-solid fa-car",

            Entertainment:
                "fa-solid fa-film",

            Bills:
                "fa-solid fa-file-invoice",

            Other:
                "fa-solid fa-circle-dollar-to-slot"

        };


        return (
            icons[category] ||
            "fa-solid fa-wallet"
        );

    }


    /* ================= LOCAL STORAGE ================= */

    function saveTransactions() {

        localStorage.setItem(
            "fintrackTransactions",
            JSON.stringify(transactions)
        );

    }


    /* ================= VIEW ALL ================= */

    const viewAllBtn =
        document.getElementById("viewAllBtn");


    viewAllBtn.addEventListener(
        "click",
        () => {

            const expanded =
                viewAllBtn.dataset.expanded === "true";


            renderTransactions(!expanded);


            viewAllBtn.dataset.expanded =
                String(!expanded);


            viewAllBtn.innerHTML =
                expanded
                    ? `
                        View all
                        <i class="fa-solid fa-arrow-right"></i>
                    `
                    : `
                        Show less
                        <i class="fa-solid fa-arrow-up"></i>
                    `;

        }
    );


    /* ================= MODAL ================= */

    function openModal(title, text) {

        modalContent.innerHTML = `

            <span class="panel-label">
                FINTRACK
            </span>

            <h2>
                ${title}
            </h2>

            <p>
                ${text}
            </p>

        `;

        modal.classList.add("active");

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeModal() {

        modal.classList.remove("active");

        document.body.classList.remove(
            "modal-open"
        );

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {
                closeModal();
            }

        }
    );


    /* ================= BUTTONS ================= */

    document
        .getElementById("upgradeBtn")
        .addEventListener(
            "click",
            () => {

                openModal(
                    "FinTrack Pro",
                    "Advanced analytics, custom budgets and intelligent financial insights would be available in the Pro experience."
                );

            }
        );


    document
        .getElementById("insightBtn")
        .addEventListener(
            "click",
            () => {

                openModal(
                    "Your Financial Insight",
                    "Your dining expenses are trending lower this month. Keeping this habit could increase your monthly savings."
                );

            }
        );


    document
        .getElementById("addBudgetBtn")
        .addEventListener(
            "click",
            () => {

                openModal(
                    "Create Budget",
                    "Budget creation is ready for integration with your preferred categories and monthly spending limits."
                );

            }
        );


    document
        .getElementById("addGoalBtn")
        .addEventListener(
            "click",
            () => {

                openModal(
                    "Create Saving Goal",
                    "Set a target amount and track your progress toward a new financial goal."
                );

            }
        );


    document
        .getElementById("notificationBtn")
        .addEventListener(
            "click",
            () => {

                showToast(
                    "You have 3 new financial notifications"
                );

            }
        );


    document
        .getElementById("dateBtn")
        .addEventListener(
            "click",
            () => {

                showToast(
                    "Date range selector opened"
                );

            }
        );


    document
        .getElementById("chartPeriod")
        .addEventListener(
            "change",
            event => {

                showToast(
                    `${event.target.value === "month"
                        ? "Monthly"
                        : "Weekly"
                    } view selected`
                );

            }
        );


    document
        .getElementById("logoutBtn")
        .addEventListener(
            "click",
            () => {

                showToast(
                    "Demo sign-out action"
                );

            }
        );


    /* ================= TOAST ================= */

    let toastTimer;

    function showToast(message) {

        toastText.textContent =
            message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2800);

    }


    /* ================= SECURITY ================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* ================= ESC KEY ================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeModal();
            }

        }
    );


    /* ================= INITIALIZE ================= */

    renderTransactions();

    updateSummary();

});