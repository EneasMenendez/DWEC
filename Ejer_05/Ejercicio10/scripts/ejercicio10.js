/**
 * Ejercicio 10 - Generación masiva de párrafos con DocumentFragment
 * Conceptos: DocumentFragment, createElement, bucle for, DOMContentLoaded
 *
 * DocumentFragment → acumula todos los párrafos en memoria y los inserta de una sola vez,
 *                    lo que evita un repintado del navegador por cada iteración del bucle
 * validación previa → se comprueba que el número sea válido antes de generar contenido
 *                     para evitar bucles infinitos o resultados inesperados
 */

//1. Al hacer clic en “Generar”:
document.querySelector('button').addEventListener('click', function () {

    //2.Obtener el numero del input
    const numero = Number(document.querySelector('#numero').value);

    //3. Primero, vacía el div#resultado por si ya tenía contenido.
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = "";

    //Compruebo que el numero que introducimos sea major o igual a 1
    if (!numero || numero < 1) {
        resultado.textContent = "Introduce un número válido.";
        return;
    }

    //6.Usa DocumentFragment para mejorar el rendimiento si se van a generar muchos párrafos
    const fragmento = document.createDocumentFragment();

    /*4. Inicia un bucle que se repita tantas veces como el número introducido.
      5. En cada iteración, crea un nuevo elemento <p>, asígnale un texto de “Lorem ipsum…” 
      y añádelo al div#resultado.*/
    for (let i = 0; i < numero; i++) {
        const p = document.createElement('p');
        p.textContent = 'Lorem ipsum...';
        fragmento.appendChild(p);
    }
    resultado.appendChild(fragmento);
})
//Limpiar el input
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#numero').value = '';
})

