/**
 * Ejercicio 2 - Selección múltiple con querySelectorAll y conteo de elementos
 * Conceptos: querySelectorAll, NodeList, length
 *
 * querySelectorAll → devuelve una NodeList con TODOS los elementos que coinciden
 * NodeList.length  → propiedad que indica cuántos elementos contiene la lista
 */

//2.Selecciona todos los enlaces (‘a’) de la barra de navegación y muestra cuántos hay.

const nav = document.querySelectorAll('.navegacion a')
console.log(nav.length)
