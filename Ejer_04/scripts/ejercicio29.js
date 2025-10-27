/**
 * Ejercicio 29 - Asignación masiva de atributos data-*
 * Conceptos: forEach, setAttribute, data attributes
 *
 * setAttribute en un bucle → permite enriquecer múltiples elementos con metadatos
 *                             que luego pueden usarse para selectores CSS o JS
 */

/*29. Para mejorar la accesibilidad y el rastreo, 
recorre todos los enlaces de la navegación y 
asígnales un atributo data-tipo con el valor enlace-nav.
*/

document.querySelectorAll('.navegacion a').forEach((enlace) => {
    enlace.setAttribute('data-tipo', 'enlace-nav');
    console.log(enlace);
})


