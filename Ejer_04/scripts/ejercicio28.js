/**
 * Ejercicio 28 - Extracción de datos del DOM a un array
 * Conceptos: forEach, push, console.table
 *
 * array.push(valor) → añade un elemento al final del array en cada iteración
 * console.table     → muestra el array como tabla en la consola, más legible que console.log
 */

/*28. Necesitamos una lista limpia con los nombres de las
 categorías para nuestro sistema de analítica. Genera un array
  que contenga únicamente el texto de cada párrafo de categoría 
  y muéstralo en la consola. */

  let categorias=[];

  document.querySelectorAll('.card .categoria').forEach((curso) => {
        categorias.push(curso.textContent);
})

console.table(categorias);