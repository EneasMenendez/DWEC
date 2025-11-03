/**
 * Ejercicio 3 - Validación de formulario y generación dinámica de errores
 * Conceptos: value, validación de cadenas, createElement, appendChild, DOMContentLoaded
 *
 * innerHTML = ""       → vacía el informe previo antes de mostrar nuevos errores
 * arrayErrores         → acumula todos los fallos para luego renderizarlos todos juntos
 * DOMContentLoaded     → limpia los campos al cargar la página, evitando datos residuales del navegador
 */

//1. Escribe una función generarInformeDeValidacion.
function generarInformeValidacion() {
    //  a. Selecciona los input de nombre y email y obtén su value.
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;

    //b. Primero, vacía por completo el div#informe-errores para limpiar informes anteriores.

    const informe = document.querySelector('#informe-errores');
    informe.innerHTML = "";

    /* c. Comprueba las siguientes condiciones:
     el nombre debe tener más de 3 caracteres el email debe contener un @.*/

    let arrayErrores = [];

    //c. Comprueba las siguientes condiciones: el nombre debe tener más de 
    // 3 caracteres y el email debe contener un @.
    if (nombre.toString() == "") {
        arrayErrores.push("El nombre no puede estar vacio");
    }
    if (nombre.length <= 3) {
        arrayErrores.push("El nombre debe tener más de 3 caracteres");
    }
    if (email.toString() == "") {
        arrayErrores.push("El email no puede estar vacio");
    }
    if (!email.includes('@')) {
        arrayErrores.push("El email debe contener un @");
    }

    /*d. Por cada condición que no se cumpla, crea un nuevo elemento <p>, 
     asígnale un texto de error (ej: “El nombre es incorrecto”) y
     añádelo al div#informe-errores.*/

    if (arrayErrores.length > 0) {
        arrayErrores.forEach(error => {

            let parrafoError = document.createElement('p');
            parrafoError.className = 'error';
            parrafoError.textContent = error.toString();
            informe.appendChild(parrafoError);

        });

    } else {
        /*  e. Si ambas condiciones se cumplen, crea un único <p> 
        con el texto “Formulario válido” y añádelo al div*/
        let parrafo = document.createElement('p');
        parrafo.className = 'valido';
        parrafo.textContent = "Fomulario válido";
        informe.appendChild(parrafo);
    }

}

//Vaciar nombre y Email al cargar la ventana
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#nombre').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#informe-errores').innerHTML = ''; B
})

document.querySelector('button').addEventListener('click', function () { generarInformeValidacion() })