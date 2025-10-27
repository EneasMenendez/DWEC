/**
 * Ejercicio 13 - Cambio dinámico del atributo src de una imagen
 * Conceptos: querySelector, propiedad src
 *
 * img.src = 'ruta' → modifica la propiedad src directamente como propiedad JS,
 *                    equivalente a setAttribute('src', ...) pero más conciso
 */

/*
El departamento de marketing ha notado que la imagen del primer curso, 
el de JavaScript Moderno, tiene una tasa de clics muy baja. Han proporcionado
 una nueva imagen en la ruta ‘img/hacer4.jpg’ que debemos usar como reemplazo. 
 Actualiza la imagen de ese curso en específico.
*/

const imagen = document.querySelector('.card img');

imagen.src = 'img/hacer4.jpg';