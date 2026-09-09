/* =========================================================
   SHOPSPHERE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= PRODUCTS ================= */

    const products = [

        {
            id: 1,
            name: "Classic Linen Shirt",
            category: "Fashion",
            price: 59,
            rating: 4.9,
            badge: "BESTSELLER",
            image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=80",
            description: "A timeless linen shirt crafted for effortless everyday style."
        },

        {
            id: 2,
            name: "Minimal Leather Bag",
            category: "Accessories",
            price: 89,
            rating: 4.8,
            badge: "NEW",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
            description: "A refined leather bag with a minimalist silhouette and spacious interior."
        },

        {
            id: 3,
            name: "Signature Fragrance",
            category: "Beauty",
            price: 75,
            rating: 4.9,
            badge: "POPULAR",
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80",
            description: "A sophisticated fragrance created for a confident modern presence."
        },

        {
            id: 4,
            name: "Modern Lounge Chair",
            category: "Lifestyle",
            price: 249,
            rating: 4.7,
            badge: "FEATURED",
            image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=700&q=80",
            description: "A modern statement chair designed to bring comfort and character to your space."
        },

        {
            id: 5,
            name: "Premium Sneakers",
            category: "Fashion",
            price: 110,
            rating: 4.8,
            badge: "NEW",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
            description: "Clean, comfortable sneakers designed for everyday movement."
        },

        {
            id: 6,
            name: "Classic Watch",
            category: "Accessories",
            price: 135,
            rating: 4.9,
            badge: "PREMIUM",
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",
            description: "A sophisticated timepiece with a clean and timeless design."
        },

        {
            id: 7,
            name: "Skincare Essentials",
            category: "Beauty",
            price: 65,
            rating: 4.8,
            badge: "POPULAR",
            image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=80",
            description: "A simple collection of everyday skincare essentials."
        },

        {
            id: 8,
            name: "Ceramic Table Lamp",
            category: "Lifestyle",
            price: 79,
            rating: 4.6,
            badge: "NEW",
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
            description: "A warm and elegant lamp designed for modern interiors."
        }

    ];


    /* ================= SELECTORS ================= */

    const preloader = document.getElementById("preloader");
    const header = document.getElementById("header");

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    const searchBtn = document.getElementById("searchBtn");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    const productsGrid = document.getElementById("productsGrid");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sortProducts = document.getElementById("sortProducts");

    const cartBtn = document.getElementById("cartBtn");
    const closeCart = document.getElementById("closeCart");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartOverlay = document.getElementById("cartOverlay");

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    const productModal = document.getElementById("productModal");
    const closeModal = document.getElementById("closeModal");
    const modalContent = document.getElementById("modalContent");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    const newsletterForm = document.getElementById("newsletterForm");

    const startShopping = document.getElementById("startShopping");
    const checkoutBtn = document.getElementById("checkoutBtn");


    /* ================= STATE ================= */

    let cart = JSON.parse(localStorage.getItem("shopsphereCart")) || [];

    let currentCategory = "all";


    /* ================= PRELOADER ================= */

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 700);

    });


    /* ================= HEADER SCROLL ================= */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* ================= MOBILE MENU ================= */

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (nav.classList.contains("active")) {
            icon.className = "fa-solid fa-xmark";
        } else {
            icon.className = "fa-solid fa-bars";
        }

    });


    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuBtn.querySelector("i").className =
                "fa-solid fa-bars";

        });

    });


    /* ================= RENDER PRODUCTS ================= */

    function renderProducts(list = products) {

        productsGrid.innerHTML = "";

        if (list.length === 0) {

            productsGrid.innerHTML = `
                <div style="
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px 20px;
                ">
                    <i class="fa-solid fa-box-open"
                       style="font-size:40px;color:#ccc;margin-bottom:15px;">
                    </i>

                    <h3>No products found</h3>

                    <p style="color:#777;">
                        Try another search or category.
                    </p>
                </div>
            `;

            return;
        }


        list.forEach(product => {

            const card = document.createElement("article");

            card.className = "product-card";

            card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                    <span class="product-badge">
                        ${product.badge}
                    </span>

                    <div class="product-actions">

                        <button
                            class="product-action view-product"
                            data-id="${product.id}"
                            aria-label="View product"
                        >
                            <i class="fa-regular fa-eye"></i>
                        </button>

                        <button
                            class="product-action wishlist-btn"
                            aria-label="Add to wishlist"
                        >
                            <i class="fa-regular fa-heart"></i>
                        </button>

                    </div>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>${product.name}</h3>

                    <div class="product-rating">
                        ${getStars(product.rating)}
                        <span> ${product.rating}</span>
                    </div>

                    <div class="product-bottom">

                        <span class="product-price">
                            $${product.price.toFixed(2)}
                        </span>

                        <button
                            class="add-cart"
                            data-id="${product.id}"
                            aria-label="Add to cart"
                        >
                            <i class="fa-solid fa-plus"></i>
                        </button>

                    </div>

                </div>
            `;

            productsGrid.appendChild(card);

        });

    }


    /* ================= STARS ================= */

    function getStars(rating) {

        const full = Math.floor(rating);

        let stars = "";

        for (let i = 0; i < full; i++) {
            stars += `<i class="fa-solid fa-star"></i>`;
        }

        return stars;

    }


    /* ================= PRODUCT CLICK ================= */

    productsGrid.addEventListener("click", event => {

        const addButton = event.target.closest(".add-cart");

        if (addButton) {

            const id = Number(addButton.dataset.id);

            addToCart(id);

            return;
        }


        const viewButton = event.target.closest(".view-product");

        if (viewButton) {

            const id = Number(viewButton.dataset.id);

            openProductModal(id);

            return;
        }


        const wishlist = event.target.closest(".wishlist-btn");

        if (wishlist) {

            const icon = wishlist.querySelector("i");

            icon.classList.toggle("fa-regular");
            icon.classList.toggle("fa-solid");

            showToast("Added to wishlist ❤️");

        }

    });


    /* ================= FILTER ================= */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentCategory = button.dataset.filter;

            applyFilters();

        });

    });


    function applyFilters() {

        let filtered = [...products];

        if (currentCategory !== "all") {

            filtered = filtered.filter(
                product => product.category === currentCategory
            );

        }

        const sort = sortProducts.value;

        if (sort === "low") {

            filtered.sort((a, b) => a.price - b.price);

        } else if (sort === "high") {

            filtered.sort((a, b) => b.price - a.price);

        } else if (sort === "rating") {

            filtered.sort((a, b) => b.rating - a.rating);

        }

        renderProducts(filtered);

    }


    sortProducts.addEventListener("change", applyFilters);


    /* ================= CATEGORY LINKS ================= */

    document.querySelectorAll("[data-category]").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const category = link.dataset.category;

            currentCategory = category;

            filterButtons.forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.filter === category
                );

            });

            applyFilters();

            document.querySelector("#shop").scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* ================= CART ================= */

    function addToCart(id) {

        const product = products.find(item => item.id === id);

        if (!product) return;

        const existing = cart.find(item => item.id === id);

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });

        }

        saveCart();

        updateCart();

        showToast(`${product.name} added to cart`);

    }


    function saveCart() {

        localStorage.setItem(
            "shopsphereCart",
            JSON.stringify(cart)
        );

    }


    function updateCart() {

        const totalQuantity = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        const totalPrice = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );


        cartCount.textContent = totalQuantity;

        cartTotal.textContent =
            `$${totalPrice.toFixed(2)}`;


        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <i class="fa-solid fa-bag-shopping"></i>

                    <h3>Your bag is empty</h3>

                    <p>
                        Add some beautiful products to get started.
                    </p>

                    <button
                        class="btn btn-primary"
                        id="startShopping"
                    >
                        Start Shopping
                    </button>

                </div>
            `;

            document
                .getElementById("startShopping")
                .addEventListener("click", closeCartSidebar);

            return;

        }


        cartItems.innerHTML = "";


        cart.forEach(item => {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <h4>${item.name}</h4>

                    <p>$${item.price.toFixed(2)}</p>

                    <div class="quantity">

                        <button
                            class="decrease"
                            data-id="${item.id}"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            class="increase"
                            data-id="${item.id}"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    data-id="${item.id}"
                    aria-label="Remove item"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            `;

            cartItems.appendChild(cartItem);

        });

    }


    cartItems.addEventListener("click", event => {

        const increase = event.target.closest(".increase");
        const decrease = event.target.closest(".decrease");
        const remove = event.target.closest(".remove-item");


        if (increase) {

            const id = Number(increase.dataset.id);

            const item = cart.find(item => item.id === id);

            if (item) item.quantity++;

        }


        if (decrease) {

            const id = Number(decrease.dataset.id);

            const item = cart.find(item => item.id === id);

            if (item) {

                item.quantity--;

                if (item.quantity <= 0) {

                    cart = cart.filter(
                        item => item.id !== id
                    );

                }

            }

        }


        if (remove) {

            const id = Number(remove.dataset.id);

            cart = cart.filter(
                item => item.id !== id
            );

            showToast("Product removed");

        }


        saveCart();

        updateCart();

    });


    /* ================= CART OPEN / CLOSE ================= */

    function openCartSidebar() {

        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");

        document.body.classList.add("no-scroll");

    }


    function closeCartSidebar() {

        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }


    cartBtn.addEventListener("click", openCartSidebar);

    closeCart.addEventListener("click", closeCartSidebar);

    cartOverlay.addEventListener("click", closeCartSidebar);


    /* ================= PRODUCT MODAL ================= */

    function openProductModal(id) {

        const product = products.find(
            item => item.id === id
        );

        if (!product) return;


        modalContent.innerHTML = `

            <div class="modal-product">

                <div class="modal-product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>

                <div class="modal-product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h2>${product.name}</h2>

                    <div class="product-rating">
                        ${getStars(product.rating)}
                        ${product.rating}
                    </div>

                    <div class="modal-price">
                        $${product.price.toFixed(2)}
                    </div>

                    <p class="modal-description">
                        ${product.description}
                    </p>

                    <button
                        class="btn btn-primary modal-add"
                        data-id="${product.id}"
                    >
                        Add to Cart
                        <i class="fa-solid fa-bag-shopping"></i>
                    </button>

                </div>

            </div>

        `;


        productModal.classList.add("active");

        document.body.classList.add("no-scroll");


        document
            .querySelector(".modal-add")
            .addEventListener("click", () => {

                addToCart(product.id);

                closeProductModal();

                openCartSidebar();

            });

    }


    function closeProductModal() {

        productModal.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }


    closeModal.addEventListener(
        "click",
        closeProductModal
    );


    productModal.addEventListener("click", event => {

        if (event.target === productModal) {
            closeProductModal();
        }

    });


    /* ================= SEARCH ================= */

    searchBtn.addEventListener("click", () => {

        searchOverlay.classList.add("active");

        document.body.classList.add("no-scroll");

        setTimeout(() => {
            searchInput.focus();
        }, 300);

    });


    closeSearch.addEventListener("click", closeSearchOverlay);


    function closeSearchOverlay() {

        searchOverlay.classList.remove("active");

        document.body.classList.remove("no-scroll");

        searchInput.value = "";

        searchResults.innerHTML = "";

    }


    searchInput.addEventListener("input", () => {

        const query =
            searchInput.value.trim().toLowerCase();


        if (!query) {

            searchResults.innerHTML = "";

            return;

        }


        const results = products.filter(product =>

            product.name
                .toLowerCase()
                .includes(query)

            ||

            product.category
                .toLowerCase()
                .includes(query)

        );


        if (results.length === 0) {

            searchResults.innerHTML =
                "No products found.";

            return;

        }


        searchResults.innerHTML = results.map(product => `

            <div
                class="search-result"
                data-id="${product.id}"
                style="
                    display:flex;
                    align-items:center;
                    gap:15px;
                    padding:12px 0;
                    border-bottom:1px solid #333;
                    cursor:pointer;
                "
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    style="
                        width:55px;
                        height:60px;
                        object-fit:cover;
                        border-radius:6px;
                    "
                >

                <div>

                    <strong>${product.name}</strong>

                    <div style="
                        font-size:12px;
                        color:#888;
                    ">
                        ${product.category}
                        · $${product.price}
                    </div>

                </div>

            </div>

        `).join("");

    });


    searchResults.addEventListener("click", event => {

        const result =
            event.target.closest(".search-result");

        if (!result) return;

        const id = Number(result.dataset.id);

        closeSearchOverlay();

        openProductModal(id);

    });


    /* ================= NEWSLETTER ================= */

    newsletterForm.addEventListener("submit", event => {

        event.preventDefault();

        const email =
            document.getElementById("emailInput").value.trim();

        if (!email) return;

        showToast("Thanks for subscribing! ✨");

        newsletterForm.reset();

    });


    /* ================= CHECKOUT ================= */

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your cart is empty");

            return;

        }

        showToast(
            "Checkout demo — payment integration coming soon."
        );

    });


    /* ================= TOAST ================= */

    let toastTimer;

    function showToast(message) {

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2800);

    }


    /* ================= ESC KEY ================= */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        closeSearchOverlay();
        closeProductModal();
        closeCartSidebar();

    });


    /* ================= INITIALIZE ================= */

    renderProducts();

    updateCart();

});