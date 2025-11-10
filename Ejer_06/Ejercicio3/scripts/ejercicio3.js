/**
 * Ejercicio 3 - Habilitar botón según checkbox de términos y condiciones
 * Conceptos: propiedad disabled, evento change, estado del checkbox, DOMContentLoaded
 *
 * boton.disabled → propiedad nativa del DOM que bloquea o habilita un botón;
 *   más semántico y accesible que ocultarlo con CSS
 * evento 'change' → se dispara cuando el valor de un input cambia, ideal para checkboxes
 * DOMContentLoaded → reinicia el estado del checkbox al recargar para evitar que el
 *   navegador restaure un valor previamente marcado (comportamiento de autocomplete)
 */

const estado = document.getElementById('condiciones');
const boton = document.querySelector('#enviar');

estado.addEventListener('change', function () {
    cambiarEstado();
})

//Cambio el estado del boton
function cambiarEstado() {
    if (estado.checked)
        boton.disabled = false;
    else
        boton.disabled = true;
}

//Pone el checkBox a false cuando se recarga la pagina
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#condiciones').checked = false;
})