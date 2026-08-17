const authArea = document.getElementById("authArea");

if (authArea) {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {

        authArea.innerHTML = `

            <span style="color:white;font-weight:600;">
                👋 Hi, ${user.name}
            </span>

            <button id="logoutBtn" class="login-btn">
                Logout
            </button>

        `;

        document
            .getElementById("logoutBtn")
            .addEventListener("click", () => {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href = "pages/login.html";

            });

    }

}