/**
 * Ejercicio 8 - Navegación por hijos con children[]
 * Conceptos: children, acceso por índice
 *
 * children   → colección HTMLCollection con los hijos directos de un elemento
 * children[1] → los índices empiezan en 0, por lo que [1] es el segundo hijo
 */

//8.El segundo enlace del menú de navegación es importante. 
// Selecciónalo directamente (sin iterar una lista) y muestra su texto en la consola.

console.log(document.querySelector('.navegacion').children[1].textContent)