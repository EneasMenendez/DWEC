/**
 * Ejercicio 5 - Filtrar lista de países en tiempo real
 * Conceptos: evento input, toLowerCase, startsWith, visibilidad con clases CSS
 *
 * evento 'input' → se dispara con cada pulsación de tecla (a diferencia de 'change',
 *   que solo se activa al perder el foco), ideal para búsqueda en tiempo real
 * toLowerCase + startsWith → normaliza mayúsculas/minúsculas en ambos lados para que
 *   la búsqueda no sea sensible a la capitalización del usuario
 * classList.add/remove('oculto') → más eficiente que eliminar y recrear nodos;
 *   solo cambia la visibilidad CSS manteniendo el DOM intacto
 */

const filtro = document.querySelector("input");

filtro.addEventListener("input", filtrarPaises);

function filtrarPaises(e) {

    document.querySelectorAll("li").forEach(pais => {

        if (!pais.textContent.toLowerCase().startsWith(e.target.value.toLowerCase()))
            pais.classList.add('oculto');
        else
            pais.classList.remove('oculto');

    });
}

//Vacia el input al cargar la ventana
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('input').value = "";
})
