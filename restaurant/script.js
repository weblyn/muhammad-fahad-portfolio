document.addEventListener("DOMContentLoaded", () => {

    /* ================= PROPERTY DATA ================= */

    const properties = [

        {
            id: 1,
            title: "The Glass House",
            location: "Beverly Hills, California",
            type: "Villa",
            price: 2450000,
            beds: 4,
            baths: 4,
            area: "3,850 sq ft",
            tag: "FEATURED",
            image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=85",
            description:
                "A striking contemporary residence designed around light, space and seamless indoor-outdoor living."
        },

        {
            id: 2,
            title: "Park Avenue Residence",
            location: "Manhattan, New York",
            type: "Apartment",
            price: 875000,
            beds: 2,
            baths: 2,
            area: "1,420 sq ft",
            tag: "NEW",
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
            description:
                "An elegant city apartment offering refined interiors and a prime Manhattan location."
        },

        {
            id: 3,
            title: "Oakwood Estate",
            location: "Austin, Texas",
            type: "House",
            price: 695000,
            beds: 4,
            baths: 3,
            area: "2,950 sq ft",
            tag: "POPULAR",
            image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1000&q=85",
            description:
                "A warm modern family home surrounded by mature trees and generous outdoor spaces."
        },

        {
            id: 4,
            title: "Azure Penthouse",
            location: "Miami, Florida",
            type: "Penthouse",
            price: 1850000,
            beds: 3,
            baths: 3,
            area: "2,800 sq ft",
            tag: "EXCLUSIVE",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
            description:
                "A sophisticated penthouse with panoramic city views, premium finishes and private terraces."
        },

        {
            id: 5,
            title: "Serenity Villa",
            location: "Malibu, California",
            type: "Villa",
            price: 3200000,
            beds: 5,
            baths: 5,
            area: "4,600 sq ft",
            tag: "LUXURY",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85",
            description:
                "A private coastal retreat combining sophisticated architecture with breathtaking surroundings."
        },

        {
            id: 6,
            title: "The Willow House",
            location: "Portland, Oregon",
            type: "House",
            price: 485000,
            beds: 3,
            baths: 2,
            area: "2,100 sq ft",
            tag: "VALUE",
            image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
            description:
                "A charming contemporary home with comfortable interiors and a peaceful neighborhood setting."
        }

    ];


    /* ================= SELECTORS ================= */

    const preloader =
        document.getElementById("preloader");

    const header =
        document.getElementById("header");

    const nav =
        document.getElementById("nav");

    const menuBtn =
        document.getElementById("menuBtn");

    const propertyGrid =
        document.getElementById("propertyGrid");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const sortProperties =
        document.getElementById("sortProperties");

    const locationSearch =
        document.getElementById("locationSearch");

    const typeSearch =
        document.getElementById("typeSearch");

    const priceSearch =
        document.getElementById("priceSearch");

    const searchBtn =
        document.getElementById("searchBtn");

    const favoriteCount =
        document.getElementById("favoriteCount");

    const propertyModal =
        document.getElementById("propertyModal");

    const modalContent =
        document.getElementById("modalContent");

    const modalClose =
        document.getElementById("modalClose");

    const contactForm =
        document.getElementById("contactForm");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* ================= STATE ================= */

    let activeType = "all";

    let favorites =
        JSON.parse(
            localStorage.getItem("laMaisonFavorites")
        ) || [];


    /* ================= PRELOADER ================= */

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 700);

    });


    /* ================= HEADER ================= */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* ================= MOBILE MENU ================= */

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        const icon =
            menuBtn.querySelector("i");

        icon.className =
            nav.classList.contains("active")
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";

    });


    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuBtn.querySelector("i").className =
                "fa-solid fa-bars";

        });

    });


    /* ================= RENDER PROPERTIES ================= */

    function renderProperties(list) {

        propertyGrid.innerHTML = "";

        if (!list.length) {

            propertyGrid.innerHTML = `
                <div style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:70px 20px;
                ">
                    <i class="fa-solid fa-house-circle-xmark"
                       style="
                           font-size:40px;
                           color:#c0b59e;
                           margin-bottom:15px;
                       ">
                    </i>

                    <h3>No properties found</h3>

                    <p style="color:#777;">
                        Try changing your search filters.
                    </p>
                </div>
            `;

            return;
        }


        list.forEach(property => {

            const isFavorite =
                favorites.includes(property.id);

            const card =
                document.createElement("article");

            card.className = "property-card";

            card.innerHTML = `

                <div class="property-image">

                    <img
                        src="${property.image}"
                        alt="${property.title}"
                        loading="lazy"
                    >

                    <span class="property-tag">
                        ${property.tag}
                    </span>

                    <button
                        class="favorite-property
                        ${isFavorite ? "active" : ""}"
                        data-id="${property.id}"
                        aria-label="Favorite"
                    >
                        <i class="${
                            isFavorite
                                ? "fa-solid"
                                : "fa-regular"
                        } fa-heart"></i>
                    </button>

                </div>


                <div class="property-info">

                    <span class="property-location">
                        ${property.location}
                    </span>

                    <h3>${property.title}</h3>

                    <p>${property.type}</p>

                    <div class="property-meta">

                        <span>
                            <i class="fa-solid fa-bed"></i>
                            ${property.beds} Beds
                        </span>

                        <span>
                            <i class="fa-solid fa-bath"></i>
                            ${property.baths} Baths
                        </span>

                        <span>
                            <i class="fa-solid fa-maximize"></i>
                            ${property.area}
                        </span>

                    </div>

                    <div class="property-bottom">

                        <strong class="property-price">
                            ${formatPrice(property.price)}
                        </strong>

                        <button
                            class="view-property"
                            data-id="${property.id}"
                            aria-label="View property"
                        >
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>

                    </div>

                </div>
            `;

            propertyGrid.appendChild(card);

        });

    }


    /* ================= PRICE ================= */

    function formatPrice(price) {

        return "$" +
            new Intl.NumberFormat("en-US").format(price);

    }


    /* ================= FILTERING ================= */

    function applyFilters() {

        let result = [...properties];


        if (activeType !== "all") {

            result =
                result.filter(
                    property =>
                        property.type === activeType
                );

        }


        const location =
            locationSearch.value
                .trim()
                .toLowerCase();


        if (location) {

            result =
                result.filter(property =>
                    property.location
                        .toLowerCase()
                        .includes(location)
                );

        }


        const price =
            priceSearch.value;


        if (price === "low") {

            result =
                result.filter(
                    property =>
                        property.price < 500000
                );

        }

        if (price === "mid") {

            result =
                result.filter(
                    property =>
                        property.price >= 500000 &&
                        property.price <= 1000000
                );

        }

        if (price === "high") {

            result =
                result.filter(
                    property =>
                        property.price > 1000000
                );

        }


        const sort =
            sortProperties.value;


        if (sort === "low") {

            result.sort(
                (a, b) => a.price - b.price
            );

        }

        if (sort === "high") {

            result.sort(
                (a, b) => b.price - a.price
            );

        }


        renderProperties(result);

    }


    /* ================= FILTER BUTTONS ================= */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            activeType =
                button.dataset.type;

            applyFilters();

        });

    });


    sortProperties.addEventListener(
        "change",
        applyFilters
    );


    /* ================= SEARCH ================= */

    searchBtn.addEventListener(
        "click",
        () => {

            applyFilters();

            document
                .getElementById("properties")
                .scrollIntoView({
                    behavior: "smooth"
                });

            showToast("Properties updated");

        }
    );


    /* ================= PROPERTY ACTIONS ================= */

    propertyGrid.addEventListener(
        "click",
        event => {

            const favorite =
                event.target.closest(
                    ".favorite-property"
                );

            const view =
                event.target.closest(
                    ".view-property"
                );


            if (favorite) {

                const id =
                    Number(favorite.dataset.id);

                toggleFavorite(id);

                return;
            }


            if (view) {

                const id =
                    Number(view.dataset.id);

                openProperty(id);

            }

        }
    );


    /* ================= FAVORITES ================= */

    function toggleFavorite(id) {

        if (favorites.includes(id)) {

            favorites =
                favorites.filter(
                    item => item !== id
                );

            showToast("Removed from favorites");

        } else {

            favorites.push(id);

            showToast("Added to favorites");

        }


        localStorage.setItem(
            "laMaisonFavorites",
            JSON.stringify(favorites)
        );


        updateFavoriteCount();

        applyFilters();

    }


    function updateFavoriteCount() {

        favoriteCount.textContent =
            favorites.length;

    }


    /* ================= MODAL ================= */

    function openProperty(id) {

        const property =
            properties.find(
                item => item.id === id
            );

        if (!property) return;


        modalContent.innerHTML = `

            <div class="modal-property">

                <div class="modal-property-image">

                    <img
                        src="${property.image}"
                        alt="${property.title}"
                    >

                </div>

                <div class="modal-property-info">

                    <span class="property-location">
                        ${property.location}
                    </span>

                    <h2>
                        ${property.title}
                    </h2>

                    <strong class="modal-price">
                        ${formatPrice(property.price)}
                    </strong>

                    <div class="modal-meta">

                        <span>
                            <i class="fa-solid fa-house"></i>
                            ${property.type}
                        </span>

                        <span>
                            <i class="fa-solid fa-bed"></i>
                            ${property.beds} Bedrooms
                        </span>

                        <span>
                            <i class="fa-solid fa-bath"></i>
                            ${property.baths} Bathrooms
                        </span>

                        <span>
                            <i class="fa-solid fa-maximize"></i>
                            ${property.area}
                        </span>

                    </div>

                    <p>
                        ${property.description}
                    </p>

                    <a
                        href="#contact"
                        class="submit-btn"
                        style="
                            display:inline-flex;
                            align-items:center;
                            gap:10px;
                        "
                        id="modalInquiry"
                    >
                        Request Information
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>

                </div>

            </div>
        `;


        propertyModal.classList.add("active");

        document.body.classList.add(
            "no-scroll"
        );


        const inquiry =
            document.getElementById(
                "modalInquiry"
            );

        inquiry.addEventListener(
            "click",
            closePropertyModal
        );

    }


    function closePropertyModal() {

        propertyModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    modalClose.addEventListener(
        "click",
        closePropertyModal
    );


    propertyModal.addEventListener(
        "click",
        event => {

            if (
                event.target === propertyModal
            ) {
                closePropertyModal();
            }

        }
    );


    /* ================= CONTACT FORM ================= */

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            showToast(
                "Thank you! Your inquiry has been received."
            );

            contactForm.reset();

        }
    );


    /* ================= TOAST ================= */

    let toastTimer;

    function showToast(message) {

        toastMessage.textContent =
            message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2800);

    }


    /* ================= ESC ================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closePropertyModal();
            }

        }
    );


    /* ================= INITIALIZE ================= */

    renderProperties(properties);

    updateFavoriteCount();

});