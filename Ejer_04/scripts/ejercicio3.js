/**
 * Ejercicio 3 - Selección por clase y lectura de innerHTML
 * Conceptos: querySelector por clase, innerHTML
 *
 * querySelector('.clase') → selecciona el primer elemento con esa clase CSS
 * innerHTML               → devuelve el HTML interno completo (etiquetas incluidas)
 */

/*3.El equipo de diseño ha marcado un curso como “premium” para destacarlo. 
Localiza ese elemento y muestra su contenido en la consola para verificarlo.*/

console.log(document.querySelector('.premium').innerHTML)