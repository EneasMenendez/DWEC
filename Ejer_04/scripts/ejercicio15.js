/**
 * Ejercicio 15 - Navegación lateral entre elementos hermanos
 * Conceptos: nextElementSibling
 *
 * nextElementSibling → devuelve el siguiente hermano que es un elemento HTML,
 *                      ignorando nodos de texto o comentarios intermedios
 */

//15. Partiendo de la primera tarjeta de curso, localiza y 
// trabaja sobre su tarjeta vecina, la que le sigue inmediatamente.

console.log(document.querySelector('.card').nextElementSibling);
