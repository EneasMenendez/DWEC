/**
 * Ejercicio 18 - Navegación hacia atrás con previousElementSibling y classList
 * Conceptos: previousElementSibling, classList.add
 *
 * previousElementSibling → hermano anterior en el DOM; permite llegar a un elemento
 *                          conociendo solo el que hay después de él
 */

/*18.Partiendo desde el pie de página (footer), localiza el contenedor 
 principal que está justo antes y aplícale un borde de 2px 
 de color rojo para destacarlo.*/

 document.querySelector('#footer-principal').previousElementSibling.classList.add('contenedor');
 //document.querySelector('#footer-principal').previousElementSibling.style.border = '2px red solid';
