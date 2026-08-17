function initializeCart() {

    let cartCount = localStorage.getItem("cartCount") || 0;

    const cartButton = document.getElementById("cartButton");

    if (cartButton) {
        cartButton.textContent = `🛒 Cart (${cartCount})`;
    }

}