/**
 * Ejercicio 4 (ventana emergente) - Comunicación Pop-up → Ventana Padre
 * Conceptos: window.opener, window.close(), comunicación entre ventanas, manipulación del DOM del padre
 *
 * window.opener → referencia a la ventana que abrió este pop-up; permite modificar su DOM directamente
 * window.close() → cierra la ventana actual (el pop-up); solo funciona si fue abierta por script
 * La línea al final se ejecuta al cargar el pop-up, modificando el h1 del padre como señal de que está activo
 */

/*Añade un `EventListener` de `click` al botón “Cerrar” de esta ventana.
Cuando se haga clic, la ventana debe cerrarse a sí misma usando `window.close()`.*/
document.querySelector('#cerrarPopUp').addEventListener('click', () => {
    // Antes de cerrar, se restaura el título de la ventana padre para indicar que el pop-up ya no está activo
    window.opener.document.querySelector('h1').innerHTML = “Página Principal”;

    window.close();
});

// Al abrirse el pop-up, notifica a la ventana padre cambiando su título
window.opener.document.querySelector('h1').innerHTML = “El pop-up te saluda”;