/**
 * Ejercicio 14 - Modificación de texto de un botón por ID
 * Conceptos: querySelector por ID, textContent
 *
 * '#btn-info-premium' → selector por ID; más específico que seleccionar por etiqueta
 *                       y más legible que encadenar varios selectores
 */

//14. El botón de “Más Información” en la tarjeta premium tiene
//  un texto poco llamativo. Cámbialo por ‘Ver Detalles Premium’.

document.querySelector('#btn-info-premium').textContent = 'Ver Detalles Premium';