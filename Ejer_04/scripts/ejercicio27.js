/**
 * Ejercicio 27 - Filtrado negativo con classList.contains
 * Conceptos: forEach, classList.contains, classList.add
 *
 * !classList.contains('premium') → el operador ! invierte la condición;
 *                                   solo se actúa sobre tarjetas que NO son premium
 */

/*
Queremos aplicar un estilo especial a los cursos estándar. 
Filtra la lista de tarjetas para obtener solo aquellas que NO son ‘premium’.
A las tarjetas resultantes, aplícales un borde punteado de 2px de color negro.
*/

document.querySelectorAll('.card').forEach((tarjeta) => {

    if(!tarjeta.classList.contains('premium'))
        tarjeta.classList.add('tarjetas');

})