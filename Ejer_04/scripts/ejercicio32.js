/**
 * Ejercicio 32 - Aplicación de clases a imágenes seleccionadas con selector compuesto
 * Conceptos: querySelectorAll, forEach, classList.add
 *
 * '.card img' → selecciona directamente las imágenes de las tarjetas sin necesidad
 *               de iterar por las tarjetas primero; más conciso que un doble bucle
 */

/*32. Se necesita una clase específica para las imágenes
de los cursos. Recorre todas las tarjetas y, para cada una, 
encuentra su imagen y aplícale la clase ‘imagen-curso’. */

document.querySelectorAll('.card img').forEach((imagen) => {
    imagen.classList.add('imagen-curso');
})