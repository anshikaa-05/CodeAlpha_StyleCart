// ==============================
// WISHLIST
// ==============================

function setupWishlist(){

    const hearts = document.querySelectorAll(".wishlist");

    hearts.forEach(heart=>{

        heart.addEventListener("click",()=>{

            heart.classList.toggle("active");

            if(heart.classList.contains("active")){

                heart.innerHTML="❤";

            }

            else{

                heart.innerHTML="♡";

            }

        });

    });

}