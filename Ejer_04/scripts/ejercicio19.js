/**
 * Ejercicio 19 - Combinación de ascenso y descenso en el árbol DOM
 * Conceptos: parentElement, firstElementChild, forEach
 *
 * firstElementChild → primer hijo que es un elemento HTML (ignora nodos de texto)
 * Subir con parentElement y bajar con firstElementChild permite navegar
 * al primer hijo de cualquier contenedor sin conocer su selector directo
 */

/*19.Comienza en el primer div de información (.info). 
Desde ahí, sube a su elemento padre (la tarjeta) y, 
una vez ahí, desciende para encontrar el primer elemento 
hijo de esa tarjeta, que debería ser la imagen.*/
console.log("Ejercicio 19: Forma 1")
console.log(document.querySelector('.info').parentElement.firstElementChild)

console.log("Ejercicio 19: Forma 2")
document.querySelectorAll('.info').forEach((claseInfo) => {
    console.log(claseInfo.parentElement.firstElementChild)
});





