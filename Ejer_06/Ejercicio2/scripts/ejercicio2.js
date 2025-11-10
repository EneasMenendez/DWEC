/**
 * Ejercicio 2 - Tabla dinámica: añadir filas desde un formulario
 * Conceptos: creación de elementos DOM, visibilidad de tabla, limpieza de inputs
 *
 * createElement / appendChild → construcción dinámica del DOM sin recargar la página
 * classList.remove('oculto') → muestra el encabezado de la tabla solo cuando hay datos,
 *   evitando que aparezca vacío al cargar la página
 * DOMContentLoaded → garantiza que los inputs se vacíen al recargar aunque el navegador
 *   rellene los campos automáticamente (autocomplete del navegador)
 */

document.querySelector('button').addEventListener('click', function () {

    //Quito el oculto al encabezado de la tabla al añadir una persona
    document.querySelector('thead').classList.remove('oculto');
    anadirPersona();

})

//Metodo para añadir una persona a la tabla
function anadirPersona() {

    //Creo la fila 
    const tbody = document.querySelector('tbody');
    const fila = document.createElement('tr');

    //Creo las celdas de la fila
    let celda = document.createElement('td');
    celda.textContent = document.querySelector('#nombre').value;

    let celda1 = document.createElement('td');
    celda1.textContent = document.querySelector('#apellidos').value;

    //Añado las celdas a la fila
    fila.appendChild(celda);
    fila.appendChild(celda1);

    //Añado la fila al cuerpo de la tabla
    tbody.appendChild(fila);
}

//Vacia los inputs cuando recarfo  la pagina
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#nombre').value = '';
    document.querySelector('#apellidos').value = '';
})




