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

function agregarAlCarrito(productId) {
    const cantidad = 1
    fetch('/carrito/agregar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, cantidad} ),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.mensaje);
    })
    .catch(error => console.error('Error:', error));
  }

// Logica para eliminar carrito del lado del front


document.getElementById('eliminarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    fetch(this.action, {
      method: 'DELETE',
      body: new FormData(this),
    })
    .then(response => response.json())
    .then(data => {
      // Maneja la respuesta del servidor si es necesario
      console.log(data);
      // Redirige a la página de carrito
      window.location.href = '/carrito';
    })
    .catch(error => console.error('Error:', error));
  });

  