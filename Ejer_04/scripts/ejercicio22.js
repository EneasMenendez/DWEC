/**
 * Ejercicio 22 - Interceptar el envío de formulario y leer valores de inputs
 * Conceptos: evento submit, preventDefault, value, formulario.reset()
 *
 * preventDefault()  → cancela el comportamiento por defecto del navegador (recarga de página)
 * formulario.reset() → al cargar la página se limpian los campos para evitar datos residuales
 */

/*
22. El formulario de contacto debe ser funcional.
 Evita que la página se recargue al enviarlo y, 
 en su lugar, captura los valores de los campos 
 de nombre y mensaje y muéstralos en la consola.
*/
const formulario = document.querySelector('#formulario-contacto');

formulario.addEventListener('submit', function () {
    let nombre = formulario.querySelector('#nombre').value;
    let mensaje = formulario.querySelector('#mensaje').value;
    event.preventDefault();
    console.log(`Nombre: ${nombre}`);
    console.log('Contenido del Mensaje:');
    console.log(mensaje)

})
window.addEventListener('load', () => formulario.reset());
