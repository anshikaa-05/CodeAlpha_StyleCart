const container = document.getElementById("productDetails");

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadProduct() {

    try {

        const response = await fetch(
            `http://localhost:5000/api/products/${id}`
        );

        if (!response.ok) {
            throw new Error("Product not found");
        }

        const product = await response.json();

        container.innerHTML = `

            <img src="../${product.image}" alt="${product.name}">

            <div class="info">

                <h1>${product.name}</h1>

                <p class="price">₹${product.price}</p>

                <p class="desc">
                    Premium quality fashion product from StyleCart.
                    Comfortable, stylish and perfect for everyday wear.
                </p>

                <button onclick="addToCart('${product.name}')">
                    Add To Cart
                </button>

            </div>

        `;

    } catch (error) {

        container.innerHTML = `
            <h2>Product not found.</h2>
        `;

        console.error(error);

    }

}

function addToCart(name){

    alert(name + " added to cart!");

    // Later we'll connect this to the real cart
}

loadProduct();