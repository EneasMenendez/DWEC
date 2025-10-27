/**
 * Ejercicio 23 - Mostrar/ocultar elementos con classList.toggle
 * Conceptos: evento click, classList.toggle, lastElementChild
 *
 * classList.toggle('clase') → añade la clase si no existe y la quita si ya está,
 *                             ideal para alternar estados visibles/ocultos con un clic
 */

/*23. Hay información oculta en la tarjeta del curso de React. 
Implementa una funcionalidad para que, al hacer clic en el 
título de ESE curso, el párrafo oculto se vuelva visible.*/

const tarjeta = document.querySelector('#lista-cursos').lastElementChild;
const estado = document.querySelector('.oculto');

tarjeta.querySelector('.info h2').addEventListener('click', function () {

    estado.classList.toggle("oculto")

})