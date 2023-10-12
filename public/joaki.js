
document.addEventListener("DOMContentLoaded", function() {
   

    const cardsContainer = document.getElementById("cards");
    const cantidadTarjetas = 11;

    
    const cardSample = document.querySelector(".B-todoCard");

    
    for (let i = 0; i < cantidadTarjetas; i++) {
    

        const clonedCard = cardSample.cloneNode(true);

        
        cardsContainer.appendChild(clonedCard);
    }
});
