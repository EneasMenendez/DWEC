/**
 * Ejercicio 7 - Tabla editable con doble clic sobre las celdas
 * Conceptos: creación dinámica de filas, edición inline con input, evento blur, replaceChild
 *
 * for...in sobre objetos → itera las claves del objeto usuario para crear una celda
 *   por cada propiedad sin hardcodear los nombres de columna
 * inputActivo → bandera booleana que impide abrir varios inputs simultáneamente;
 *   sin este control, cada doble clic crearía un input nuevo encima del anterior
 * evento 'blur' → se dispara cuando el input pierde el foco (el usuario hace clic fuera
 *   o pulsa Tab), momento natural para confirmar y guardar la edición
 * replaceChild → intercambia nodos en el DOM en una sola operación; se usa dos veces:
 *   primero para sustituir la celda por el input, y luego para restaurar la celda editada
 */

const tabla = document.querySelector('table');

//Creo un array de objetos con los usuarios que voya  añadir a la tabla
const Usuarios = [
    {
        nombre: 'Antonio',
        apellidos: 'Álvarez Menéndez',
        email: 'antonio@outlook.com'
    },
    {
        nombre: 'Alex',
        apellidos: 'Bernardos Gil',
        email: 'alex@gmail.com'
    },
    {
        nombre: 'Eneas de la Rosa',
        apellidos: 'Menéndez Pedrosa',
        email: 'eneas@outlook.com'
    },
    {
        nombre: 'Laura',
        apellidos: 'Vazquez Fernadez',
        email: 'laura@gmail.com'
    }
]

//Compuebo si hay algun input creado o no
let inputActivo = false;

//Recorro el array y creo una fila por cada uno de ellos
Usuarios.forEach(usuario => {
    let fila = crearFilas(usuario);
    tabla.appendChild(fila);
});


//Funcion que crea las filas 
function crearFilas(usuario) {
    let fila = document.createElement('tr');
    crearCeldas(usuario, fila);
    return fila;
}

//Funcion que crea las celdas
function crearCeldas(usuario, fila) {

    for (const param in usuario) {
        let celda = document.createElement('td');
        celda.classList.add('celdaDato');
        celda.textContent = usuario[param];
        fila.appendChild(celda);
    }
}

//Obtengo todas las celdas de los datos
document.querySelectorAll('.celdaDato').forEach((celda) => {
    //En la celda que hago doble click creo el input
    celda.addEventListener('dblclick', function () {

        if (inputActivo == false)
            crearInput(celda)
    })
})

//Funcion para crear el input con el valor actual de la celda
function crearInput(celda) {

    inputActivo = true;
    let nuevoValor = document.createElement('input');
    nuevoValor.type = 'text';
    nuevoValor.value = celda.textContent;

    realizarCambio(nuevoValor, celda);


}

//Función que realiza el cambio de valor al perder el foco
function realizarCambio(nuevoValor, celda) {

    nuevoValor.addEventListener('blur', function () {

        // Actualizo el contenido de la celda
        celda.textContent = nuevoValor.value;
        // Reemplazo el input por la celda con el nuevo valor
        nuevoValor.parentElement.replaceChild(celda, nuevoValor);

        inputActivo = false;
    })
    // Reemplazo la celda original por el input
    celda.parentNode.replaceChild(nuevoValor, celda);

}



