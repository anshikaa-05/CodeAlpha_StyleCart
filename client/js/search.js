// ==============================
// SEARCH
// ==============================

function setupSearch(){

    const searchInput=document.querySelector(".nav-right input");

    if(!searchInput) return;

    searchInput.addEventListener("keyup",()=>{

        const value=searchInput.value.toLowerCase();

        const cards=document.querySelectorAll(".card");

        cards.forEach(card=>{

            const name=card.querySelector("h3").textContent.toLowerCase();

            card.style.display=name.includes(value) ? "block" : "none";

        });

    });

}