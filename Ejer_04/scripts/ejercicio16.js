/**
 * Ejercicio 16 - Ascenso en el árbol DOM con parentElement
 * Conceptos: parentElement
 *
 * parentElement → sube un nivel en el árbol DOM; útil para llegar al contenedor
 *                 de un elemento cuando no se puede seleccionar directamente
 */

//16.El botón en la tarjeta premium es nuestro punto de partida. 
// Desde él, navega por el DOM hacia arriba hasta encontrar el 
// contenedor que agrupa toda su información (un div con la clase ‘info’).

console.log(document.querySelector('#btn-info-premium').parentElement);