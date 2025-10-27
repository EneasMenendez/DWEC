/**
 * Ejercicio 4 - Colección de elementos con Set
 * Conceptos: querySelectorAll, forEach, Set
 *
 * Set    → estructura de datos que almacena valores únicos (no admite duplicados)
 * forEach → itera sobre cada elemento de una NodeList o array
 */

//4. Necesitamos hacer un inventario de todos los cursos. Genera una colección 
// con todos los elementos que representan una tarjeta de curso y muéstrala en la consola.

let cursos= new Set()
document.querySelectorAll('#lista-cursos .card').forEach((curso) => {
    cursos.add(curso)
});

console.log(cursos)