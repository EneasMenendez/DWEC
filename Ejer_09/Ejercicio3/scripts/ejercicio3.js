/**
 * Ejercicio 3 - Barra de Progreso de Scroll y Botón "Volver Arriba"
 * Conceptos: evento scroll, window.scrollY, scrollHeight, clientHeight, scrollTo con comportamiento suave
 *
 * scrollHeight - clientHeight → altura máxima desplazable; excluye la parte visible para calcular el 100%
 * window.scrollY              → píxeles desplazados desde la parte superior del documento
 * porcentaje = scrollY / max  → normaliza la posición actual al rango [0, 100] para actualizar la barra <progress>
 * behavior: 'smooth'          → delega la animación al navegador, más eficiente que animar con JavaScript
 * innerHeight como umbral     → el botón aparece cuando el usuario ha bajado al menos una pantalla completa
 */

const barraProgreso = document.getElementById("barraProgreso");
const boton = document.getElementById("botonArriba");

//Añade un EventListener para el evento scroll en window
window.addEventListener('scroll', actualizarDesplazamiento);


function actualizarDesplazamiento() {

    /*Calcula la altura total del documento que se puede desplazar: 
    document.documentElement.scrollHeight - document.documentElement.clientHeight.*/
    const alturaTotalDocumento = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    //Obtén la posición actual del scroll: window.scrollY.
    const posicionActualScroll = window.scrollY;

    //Calcula el porcentaje de scroll y actualiza el valor de la barra (o div) de progreso.
    const porcentajeDesplazamiento = (posicionActualScroll / alturaTotalDocumento) * 100;
    barraProgreso.value = porcentajeDesplazamiento;

    /*Dentro del mismo manejador, comprueba si window.scrollY es mayor que, 
    por ejemplo, la altura de la ventana (window.innerHeight). 
    Si lo es, muestra el botón; si no, ocúltalo.*/
    if (posicionActualScroll > window.innerHeight) {
        boton.classList.add("visible"); 
    } else {
        boton.classList.remove("visible"); 
    }

}


/*Añade un EventListener de click al botón. Cuando se pulse, 
 utiliza window.scrollTo() para volver al inicio de la página.*/

boton.addEventListener("click", function () {

    /*El desplazamiento debe ser suave. Para ello, en lugar de 
    scrollTo(0, 0), usa window.scrollTo({ top: 0, behavior: 'smooth' })*/
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});