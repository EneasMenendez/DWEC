/**
 * Ejercicio 24 - Iteración y modificación masiva de contenido
 * Conceptos: querySelectorAll, forEach, template literals, textContent
 *
 * Template literal con `${variable}` → permite construir cadenas dinámicas de forma legible;
 * aquí se usa para anteponer el prefijo sin perder el texto original del elemento
 */

/*
24.Para estandarizar los títulos de los cursos, recorre todos los h2 
que están dentro de las tarjetas y añade el prefijo “[CURSO]” al principio de su texto.
*/

document.querySelectorAll('.card h2').forEach((curso) => {
    curso.textContent = `[CURSO] ${curso.textContent}`;
})
