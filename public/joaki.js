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




    document.addEventListener("DOMContentLoaded", function() { /* asegura que el codigo js se ejecute después de que el dom este cargado */
     
 
    // Selecciona todos los contenedores de carruseles
var swiperContainers = document.querySelectorAll('.swiper-container');

// Recorre cada contenedor 
swiperContainers.forEach(function (container) {
  var swiper = new Swiper(container, {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: container.querySelector('.swiper-pagination'),
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
});

});


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



// Cargar jQuery desde CDN y utilizar el modo sin conflicto
document.addEventListener("DOMContentLoaded", function() {
  // Agregar jQuery desde CDN
  var script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
  script.type = 'text/javascript';
  script.async = true;
  document.head.appendChild(script);

  script.onload = function() {
    // Modo sin conflicto de jQuery
    jQuery.noConflict();
    (function($) {
      // Tu código jQuery aquí
      console.log("joaki.js cargado correctamente");

      $(".B-AddCart").text("Añadir al Carrito");

      // Oculta todos los elementos con clase "contenido" excepto el de categoría "ropa"
      $(".contenido").not("#ropa").hide();

      // Manejo de clic en botones de categoría
      $("#categorias button").click(function() {
        const targetId = $(this).data("target");

        // Oculta todos los elementos con clase "contenido"
        $(".contenido").hide();

        // Remueve la clase "selected" de todos los botones
        $("#categorias button").removeClass("selected");

        // Muestra el elemento con el ID correspondiente
        $("#" + targetId).show();

        // Agrega la clase "selected" al botón seleccionado
        $(this).addClass("selected");
      });
    })(jQuery);
  };
});

// Logica del contador del carrito

async function cambiarCantidad(productId, accion) {
  try {
    // Actualiza la cantidad en la interfaz de usuario antes de enviar la solicitud
    const cantidadElement = document.querySelector(`#cantidad-${productId}`);
    
    if (cantidadElement) {
      cantidadElement.innerText = accion === 'sumar' ? parseInt(cantidadElement.innerText, 10) + 1 : parseInt(cantidadElement.innerText, 10) - 1;
    } else {
      console.error('Elemento de cantidad no encontrado en el DOM');
      return;
    }

    // Realiza la solicitud al servidor para actualizar la cantidad
    const response = await fetch(`/carrito/cambiarCantidad/${productId}/${accion}`, { method: 'POST' });
    const data = await response.json();

    // Actualiza el precio total en la interfaz de usuario
    const precioTotalElement = document.querySelector('#precioTotal');
    precioTotalElement.innerText = `$${data.precioTotal}`;

  } catch (error) {
    console.error('Error:', error);
  }
}

