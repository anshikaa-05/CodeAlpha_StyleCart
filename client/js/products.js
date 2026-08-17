const productContainer = document.getElementById("productContainer");

let allProducts = [];

async function loadProducts() {

    try {

        const response = await fetch("http://localhost:5000/api/products");

        allProducts = await response.json();

        renderProducts(allProducts);

    } catch (error) {

        console.error("Error loading products:", error);

    }

}

function renderProducts(products) {

    productContainer.innerHTML = "";

    if (products.length === 0) {

        productContainer.innerHTML = `
            <p style="color:white; text-align:center; width:100%;">
                No products found in this category.
            </p>
        `;

        return;
    }

    products.forEach(product => {

        productContainer.innerHTML += `

            <div class="card"
                 onclick="openProduct('${product._id}')">

                <span class="sale-badge">30% OFF</span>

                <span class="wishlist">♡</span>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <button
                    class="add-cart"
                    data-id="${product._id}">
                    Add To Cart
                </button>

            </div>

        `;

    });

    // Add to cart buttons
    document.querySelectorAll(".add-cart").forEach(button => {

        button.addEventListener("click", (e) => {

            e.stopPropagation();

            addToCart(button.dataset.id);

        });

    });

    if (typeof initializeCart === "function") {
        initializeCart();
    }

    if (typeof initializeWishlist === "function") {
        initializeWishlist();
    }

    if (typeof initializeSearch === "function") {
        initializeSearch();
    }

}

function filterCategory(category) {

    const filteredProducts = allProducts.filter(product =>
    product.category &&
    product.category
        .toLowerCase()
        .split(",")
        .map(cat => cat.trim())
        .includes(category.toLowerCase())
);

    renderProducts(filteredProducts);

    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });

}

function showAllProducts() {

    renderProducts(allProducts);

    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });

}

function openProduct(id) {

    window.location.href = `pages/product.html?id=${id}`;

}

loadProducts();