const checkoutForm = document.getElementById("checkoutForm");
const orderMessage = document.getElementById("orderMessage");

checkoutForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const orderData = {
        fullName: document.getElementById("fullName").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        pincode: document.getElementById("pincode").value.trim()
    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify(orderData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Order failed");
        }

        orderMessage.innerHTML = `
            <p style="color:#22c55e;">
                🎉 Order placed successfully!
            </p>
            <p style="color:#aaa; margin-top:8px;">
                Order ID: ${data.order._id}
            </p>
        `;

        checkoutForm.reset();

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 3000);

    } catch (error) {

        console.error(error);

        orderMessage.innerHTML = `
            <p style="color:#ff3158;">
                ${error.message}
            </p>
        `;

    }

});