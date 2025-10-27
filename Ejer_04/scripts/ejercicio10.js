/**
 * Ejercicio 10 - Modificación de atributos con setAttribute
 * Conceptos: setAttribute, atributos HTML
 *
 * setAttribute(‘attr’, ‘valor’) → cambia o crea un atributo en el elemento;
 *                                  equivale a escribir attr="valor" en el HTML
 */

//10. El primer enlace del menú de navegación está roto. Asegúrate de que apunte a ‘https://www.google.com’.

document.querySelector('.navegacion').children[0].setAttribute("href", "https://www.google.com")