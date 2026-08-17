document.addEventListener("DOMContentLoaded", async () => {

    await renderProducts();

    setupCartButtons();

    setupWishlist();

    setupSearch();

    updateCartDisplay();

});