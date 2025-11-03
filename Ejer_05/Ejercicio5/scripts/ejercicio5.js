/**
 * Ejercicio 5 - Lista dinámica con añadir y eliminar elementos
 * Conceptos: createElement, appendChild, delegación de eventos, e.target
 *
 * delegación de eventos → el listener se pone en el <ul> padre en lugar de en cada botón;
 *                         así funciona también para los botones añadidos dinámicamente
 * e.target.classList.contains → identifica qué elemento concreto disparó el evento
 *                               dentro del contenedor para actuar solo sobre el botón correcto
 */

//Evento que llama al metodo añadirTexto para crear dentro del ul el li
document.querySelector('button').addEventListener('click', function () { añadirTexto() });
//Evento para eliminar el li
document.querySelector('ul').addEventListener('click', function (e) { eliminarElemento(e) });



function añadirTexto() {

    const texto = document.querySelector('#texto');

    if (texto.value.toString() != "") {

        //Creo el li y le añado el texto
        let listado = document.createElement('li');
        listado.textContent = texto.value.toString();
        document.querySelector('ul').appendChild(listado);
        texto.value = "";

        //Creo el boton eliminar dentro del li
        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('eliminar');
        listado.appendChild(btnEliminar);


    }
}
//Metodo para elimiar el li cuando se hace clik en el boton de eliminar
function eliminarElemento(e) {
    if (e.target && e.target.classList.contains('eliminar')) {
        e.target.parentNode.remove();
    }
}

