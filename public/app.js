/* SLIDES DEL SHOP */
let slide = document.querySelector(".slider-contenedor")
let sliderIndividual = document.querySelectorAll(".contenido-slider")
let contador = 1;
let width = 0;  /* valor por defecto en caso de que no haya elementos */
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
    slide.style.transform = "translate("+(-width*contador)+"px)";
    slide.style.transition = "transform .8s";
    contador++;

    if(contador == sliderIndividual.length){
        setTimeout(function(){
            slide.style.transform = "translate(0px)";
            slide.style.transition = "transform 0s";
            contador=1;
        },1500)
    }
}


/* carrusel */
document.addEventListener("DOMContentLoaded", function () {
  const swiperContainers = document.querySelectorAll('.swiper-container');

  swiperContainers.forEach(function (container) {
    const swiper = new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: container.querySelector('.swiper-pagination'),
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      breakpoints: {
        620: { slidesPerView: 1, spaceBetween: 20 },
        680: { slidesPerView: 2, spaceBetween: 40 },
        920: { slidesPerView: 3, spaceBetween: 40 },
        1240: { slidesPerView: 4, spaceBetween: 50 },
      },
      on: {
       
      },
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
    body: JSON.stringify({ productId, cantidad }),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.mensaje);
      actualizarContadorCarrito(); // Llama a la función para actualizar el contador
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

// Logica para contador del header en carrito 

function actualizarContadorCarrito() {
  const contador = document.getElementById('contadorCarrito');
  
  // Verificar si el contador está presente en la página
  if (contador) {
    fetch('/carrito/cantidad') // Endpoint para obtener la cantidad de productos en el carrito
      .then(response => response.json())
      .then(data => {
        if (data && data.cantidad > 0) {
          contador.innerText = data.cantidad;
          contador.style.display = 'inline-block'; // Muestra el contador si hay productos en el carrito
        } else {
          contador.style.display = 'none'; // Oculta el contador si no hay productos en el carrito
        }
      })
      .catch(error => console.error('Error:', error));
  }
}

actualizarContadorCarrito();

// Logica para eliminar todos los productos juntos 
function eliminarTodo() {

  fetch('/carrito/eliminarTodos', {
    method: 'DELETE'
   
  })
  .then(response => {

    window.location.href = '/carrito'; // Cambia la URL a la página del carrito
  })
  .catch(error => {
    // Manejo de errores
    console.log('Error al eliminar todos los productos del carrito:', error);
  });
}





// minishop
document.addEventListener("DOMContentLoaded", function() {
  
  const script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
  script.type = 'text/javascript';
  script.async = true;
  document.head.appendChild(script);

  script.onload = function() {
    /* arrgelue el jquery */
    jQuery.noConflict();
    (function($) {
     

      $(".B-AddCart").text("Añadir al Carrito");

      // oculta todos los elementos con clase "contenido" excepto el de categoría "ropa"
      $(".contenido").not("#ropa").hide();

      // manejo de clic en botones de categoría
      $("#categorias button").click(function() {
        const targetId = $(this).data("target");

        // oculta todos los elementos con clase "contenido"
        $(".contenido").hide();

        // remueve la clase "selected" de todos los botones
        $("#categorias button").removeClass("selected");

        // muestra el elemento con el ID correspondiente
        $("#" + targetId).show();

        // agrega la clase "selected" al botón seleccionado (la categoria ropa que es la primera)
        $(this).addClass("selected");
        console.log(product.ropa)
      });
    })(jQuery);
  };
});






// Logica del contador del carrito

async function cambiarCantidad(productId, accion, cantidad) {
  try {
    if (accion === 'restar') {
      const cantidadElement = document.querySelector(`#cantidad-${productId}`);
      const currentCantidad = parseInt(cantidadElement.innerText);

       // Evita que la cantidad sea negativa
       if (currentCantidad - cantidad <= 0) {
        // Deshabilita el botón de "Añadir al carrito" cuando la cantidad es cero
        const addCartButton = document.querySelector(`button[data-id='${productId}'][class='D-AddCart']`);
        if (addCartButton) {
          addCartButton.disabled = true;
        }
        return;
      }
    }

    // Realiza la solicitud al servidor para actualizar la cantidad
    const response = await fetch(`/carrito/cambiarCantidad/${productId}/${accion}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cantidad }), // Envía la cantidad en el cuerpo de la solicitud
    });

    const data = await response.json();
    

     // Actualiza la cantidad en la interfaz de usuario con la cantidad devuelta por el servidor
     const cantidadElement = document.querySelector(`#cantidad-${productId}`);
     if (cantidadElement) {
       cantidadElement.innerText = data.cantidad;
     } else {
       console.log('Elemento de cantidad no encontrado en el DOM');
       return;
     }
 
     // Deshabilita el botón de restar si la cantidad es cero
     const restarButton = document.querySelector(`button[data-action='restar'][data-id='${productId}']`);
     if (restarButton) {
       restarButton.disabled = data.cantidad === 0;
     }
 

    // Actualiza el precio total en la interfaz de usuario
    const precioTotalGlobalElement = document.querySelector('#precioTotalCarrito');
    precioTotalGlobalElement.innerText = `$${data.precioTotal}`;
    console.log(precioTotalCarrito);
  } catch (error) {
    console.error('Error:', error);
  }
}


/* check */
function mostrarOpcion(opcion) {
  // oculta todos las opciones de los checks
  document.querySelectorAll('.opcion-check').forEach(function (opcionDiv) {
    opcionDiv.style.display = 'none';
  });

  // muestra la opcion seleccionada
  document.getElementById(opcion).style.display = 'block';


}



