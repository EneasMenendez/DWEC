/**
 * Ejercicio 21 - Gestión de eventos con addEventListener y funciones nombradas
 * Conceptos: addEventListener, evento click, alert
 *
 * addEventListener('click', fn) → registra una función que se ejecuta al hacer clic;
 *                                  separar la lógica en una función nombrada mejora la legibilidad
 */

/*El botón de la tarjeta premium debe tener una funcionalidad. 
Haz que, al pulsarlo, se dispare una alerta del navegador con 
el mensaje: ‘Accediendo a información exclusiva para miembros premium’. */

document.querySelector('#btn-info-premium').addEventListener('click', function () { mostrarMensaje() })

function mostrarMensaje() {
    alert('Accediendo a información exclusiva para miembros premium')
}