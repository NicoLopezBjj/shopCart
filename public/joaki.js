

/* SLIDES DEL SHOP */
let slider = document.querySelector(".slider-contenedor")
let sliderIndividual = document.querySelectorAll(".contenido-slider")
let contador = 1;
let width = 0; // Valor por defecto en caso de que no haya elementos
if (sliderIndividual.length > 0) {
  width = sliderIndividual[0].clientWidth;
}
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


function eliminarCarrito(productId) {
  fetch(`/carrito/eliminar`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log('Error:', error));
}





/* CARDS CARRUSEL HECHO CON SWIPER.JS */
const swiper = new Swiper('.swiper-container', {
	
	slidesPerView: 1,
	spaceBetween: 10,
	// init: false,
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true,
	},

  
	breakpoints: {
	  620: {
		slidesPerView: 1,
		spaceBetween: 20,
	  },
	  680: {
		slidesPerView: 2,
		spaceBetween: 40,
	  },
	  920: {
		slidesPerView: 3,
		spaceBetween: 40,
	  },
	  1240: {
		slidesPerView: 4,
		spaceBetween: 50,
	  },
	} 
    });