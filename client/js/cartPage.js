const cartItemsContainer = document.getElementById("cartItems");
const cartSummary = document.getElementById("cartSummary");

async function loadCart() {

    const token = localStorage.getItem("token");

    if (!token) {
        cartItemsContainer.innerHTML = `
            <p class="empty-cart">
                Please login to view your cart.
            </p>
        `;
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/api/cart", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const cart = await response.json();

        if (!response.ok) {
            throw new Error(cart.message || "Failed to load cart");
        }

        if (cart.length === 0) {

            cartItemsContainer.innerHTML = `
                <p class="empty-cart">
                    Your cart is empty.
                </p>
            `;

            cartSummary.innerHTML = "";
            return;
        }

        cartItemsContainer.innerHTML = "";

        let total = 0;

        cart.forEach(item => {

            const product = item.product;

            const itemTotal = product.price * item.quantity;

            total += itemTotal;

            cartItemsContainer.innerHTML += `

                <div class="cart-item">

                    <img
                        src="../${product.image}"
                        alt="${product.name}"
                    >

                    <div class="cart-info">

                        <h3>${product.name}</h3>

                        <p class="cart-price">
                            ₹${product.price}
                        </p>

                        <p class="cart-quantity">
                            Quantity: ${item.quantity}
                        </p>

                    </div>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart('${item._id}')">
                        Remove
                    </button>

                </div>
            `;

        });

        cartSummary.innerHTML = `

            <div class="cart-total">
                Total: ₹${total}
            </div>

            <button
                class="checkout-btn"
                onclick="checkout()">
                Proceed to Checkout
            </button>
        `;

    } catch (error) {

        console.error(error);

        cartItemsContainer.innerHTML = `
            <p class="empty-cart">
                Unable to load cart.
            </p>
        `;

    }
}

async function removeFromCart(cartItemId) {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            `http://localhost:5000/api/cart/${cartItemId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        loadCart();

    } catch (error) {

        console.error(error);
        alert("Unable to remove item.");

    }
}

function checkout() {
    window.location.href = "checkout.html";
}

loadCart();