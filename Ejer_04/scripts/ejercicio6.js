/**
 * Ejercicio 6 - Selección por atributo data-* y acceso al dataset
 * Conceptos: selector de atributo, dataset, data attributes
 *
 * [data-*]       → selector CSS que localiza elementos con un atributo de datos concreto
 * dataset.precio → acceso a data-precio mediante la API dataset del elemento
 */

//6. Hay un párrafo en la página que contiene información sobre el precio en un atributo de datos. 
// Encuéntralo usando ese atributo y muestra su contenido.

console.log(document.querySelector("[data-precio]").textContent)
console.log(document.querySelector("[data-precio]").dataset.precio)