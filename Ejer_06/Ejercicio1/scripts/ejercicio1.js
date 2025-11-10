/**
 * Ejercicio 1 - Modal básico: mostrar y ocultar un elemento
 * Conceptos: manipulación de clases CSS, eventos de clic, querySelector
 *
 * classList.remove / classList.add → permiten cambiar clases CSS en tiempo de ejecución
 *   para controlar la visibilidad sin tocar el CSS directamente desde JS
 * nextElementSibling → permite acceder al siguiente elemento hermano en el DOM
 *   sin necesidad de conocer su id o clase, útil cuando la estructura HTML es fija
 * parentElement → sube un nivel en el árbol DOM para alcanzar el contenedor del modal
 */

//Mostrar Div
document.querySelectorAll('#modal').forEach(boton => {
    boton.addEventListener('click', function (event) {
        boton.nextElementSibling.classList.remove('oculto');
        boton.nextElementSibling.classList.add('bloque');
    })
})

//Ocultar Div
document.querySelectorAll('#cerrar').forEach(boton => {
    boton.addEventListener('click', function (event) {
        boton.parentElement.classList.remove('bloque');
        boton.parentElement.classList.add('oculto');
    })
})


