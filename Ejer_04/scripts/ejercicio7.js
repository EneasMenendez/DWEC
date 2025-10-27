/**
 * Ejercicio 7 - Selector CSS compuesto (descendiente)
 * Conceptos: selector descendiente, querySelector anidado
 *
 * '#padre #hijo' → selector que busca #hijo solo dentro del contexto de #padre,
 *                  evitando seleccionar elementos con el mismo id fuera de ese contenedor
 */

//7. Dentro del formulario de contacto, encuentra el campo destinado a la dirección de correo electrónico.

console.log(document.querySelector('#formulario-contacto #email'))