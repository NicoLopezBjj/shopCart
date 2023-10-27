/* 
document.addEventListener("DOMContentLoaded", function() {
   

    const cardsContainer = document.getElementById("cards");
    const cantidadTarjetas = 11;

    
    const cardSample = document.querySelector(".B-todoCard");

    
    for (let i = 0; i < cantidadTarjetas; i++) {
    

        const clonedCard = cardSample.cloneNode(true);

        
        cardsContainer.appendChild(clonedCard);
    }
}); */

/* SLIDES DEL SHOP */
let slider = document.querySelector(".slider-contenedor")
let sliderIndividual = document.querySelectorAll(".contenido-slider")
let contador = 1;
let width = sliderIndividual[0].clientWidth;
let intervalo = 5000; /* tiempo de pasarlo */

window.addEventListener("resize", function(){
    width = sliderIndividual[0].clientWidth;
}) /* para q se adapte a los tamaños */

setInterval(function(){
    slides();
},intervalo);



function slides(){
    slider.style.transform = "translate("+(-width*contador)+"px)";
    slider.style.transition = "transform .8s";
    contador++;

    if(contador == sliderIndividual.length){
        setTimeout(function(){
            slider.style.transform = "translate(0px)";
            slider.style.transition = "transform 0s";
            contador=1;
        },1500)
    }
}

// Logica del Carrito del lado del cliente (frontEND)

// async function agregarAlCarrito() {
//     try {
//       const response = await fetch('/carrito/agregar', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({}), // Envio informacion del producto
//       });
  
//       const data = await response.json();
//       console.log('Producto agregado al carrito:', data);
//     } catch (error) {
//       console.error('Error al agregar producto al carrito:', error);
//     }
//   }