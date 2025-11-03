/**
 * Ejercicio 8 - Ordenación de una lista del DOM con Array.from y localeCompare
 * Conceptos: Array.from, sort, localeCompare, innerHTML, appendChild
 *
 * Array.from(NodeList) → convierte la NodeList (sin método sort) en un array real
 *                        para poder aplicar el método de ordenación
 * localeCompare        → compara cadenas respetando el idioma y los caracteres especiales
 *                        (tildes, ñ, etc.) correctamente
 * vaciar + reinsertar  → se limpia la lista y se vuelven a añadir los nodos ya ordenados
 */

//1. Al hacer clic en “Ordenar”:
document.querySelector('button').addEventListener('click', function () { ordenarLista() });

function ordenarLista() {
    // 2. Selecciona todos los <li> con querySelectorAll.
    /*3. Como querySelectorAll devuelve una NodeList y no un Array, 
    conviértela a un Array (ej: Array.from(...)). */
    const elementos = Array.from(document.querySelectorAll('li'));

    // 4. Usa el método .sort() del array para ordenar los elementos 
    // basándote en su textContent.
    elementos.sort((a, b) => a.textContent.localeCompare(b.textContent));

    const lista = document.querySelector('ul');

    // 5. Vacía la lista <ul> original.
    lista.innerHTML = "";

    //  6. Añade los elementos ya ordenados de vuelta a la lista.
    elementos.map((elemento) => {
        lista.appendChild(elemento);
    })

}


