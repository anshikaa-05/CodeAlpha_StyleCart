const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            // Save login information
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("🎉 Login Successful!");

            // Redirect to home page
            window.location.href = "../index.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);
        alert("Server Error");

    }

});