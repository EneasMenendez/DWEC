/**
 * Ejer_07 - Eventos avanzados en JavaScript
 * Conceptos: burbujeo (bubbling), delegación de eventos, preventDefault,
 *   evento scroll, CustomEvent, dispatchEvent
 *
 * Burbujeo (bubbling) → cuando un evento ocurre en un elemento hijo, asciende
 *   automáticamente por el árbol DOM hasta llegar a document; permite que un
 *   listener en el padre reaccione a eventos de cualquier descendiente
 * event.target → el elemento exacto que disparó el evento (el hijo clicado)
 * event.currentTarget → el elemento donde está registrado el listener (el padre)
 * preventDefault() → cancela el comportamiento nativo del navegador asociado al
 *   evento (seguir un enlace, enviar un formulario, etc.) sin detener su propagación
 * scrollY → propiedad de window que indica cuántos píxeles se ha desplazado la
 *   página verticalmente; útil para mostrar/ocultar elementos según la posición
 * CustomEvent → permite crear eventos propios con nombre personalizado y datos
 *   extra en la propiedad detail; separa la lógica de disparo de la de escucha
 * dispatchEvent() → lanza manualmente un evento sobre un nodo, como si el usuario
 *   lo hubiese generado; permite la comunicación entre componentes sin referencias directas
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---


    //EJERCICIO 1

    const contenedorPadre = document.querySelector('#outer-box');

    // Delegación de eventos: un único listener en el padre captura clics de todos sus hijos
    // gracias al burbujeo; event.target identifica cuál hijo fue pulsado exactamente
    contenedorPadre.addEventListener('click', function (event) {


        if (event.target) {

            event.target.classList.add('color');

            // event.target → hijo pulsado | event.currentTarget → contenedor con el listener
            console.log('ID Elemento pulsado:', event.target.id);
            console.log('ID Elemento Contenedor:', event.currentTarget.id);
        }

    });



    // --- Solución Ejercicio 2 ---

    document.querySelector("#test-link").addEventListener('click', function (event) {

        // preventDefault() impide que el navegador siga el href del enlace,
        // pero el evento sigue burbujeando hacia los ancestros
        event.preventDefault();
        console.log("Navegación prevenida")
    })


    // --- Solución Ejercicio 3 ---

    const botonVolverArriba = document.querySelector('#back-to-top');

    //Cuando hago scroll obtengo la posY, si es mayor de 250 muestro boton sino lo oculto
    window.addEventListener('scroll', function (event) {
        let distanciaTop = this.scrollY;

        // El botón solo es visible cuando el usuario ha bajado lo suficiente;
        // mostrar/ocultar con clase CSS es más eficiente que cambiar display directamente
        if (distanciaTop >= 250)
            botonVolverArriba.classList.remove('hidden')
        else
            botonVolverArriba.classList.add('hidden')
    })

    //Cuando pulso el boton vuelvo al principio de la hoja
    botonVolverArriba.addEventListener('click', function () { volverArriba() });

    //Funcion que me lleva arriba de manera suave
    function volverArriba() {
        // behavior: "smooth" delega la animación al navegador sin necesidad de
        // gestionar manualmente intervalos o requestAnimationFrame
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // --- Solución Ejercicio 5 ---

    const botonLanzarNoti = document.getElementById('notification-btn');
    const notArea = document.querySelector('#notification-area');

    let esPrimeraVez = true;

    botonLanzarNoti.addEventListener('click', function () {

        // CustomEvent crea un evento personalizado con nombre propio ('notification')
        // y datos adjuntos en 'detail'; desacopla el emisor del receptor
        const notification = new CustomEvent('notification', {
            detail: {
                mensaje: 'Hola Mundo',
                fecha: new Date()
            }
        });

        // dispatchEvent lanza el evento sobre body; cualquier listener registrado
        // para 'notification' en body o sus ancestros lo recibirá por burbujeo
        document.body.dispatchEvent(notification);

        // Solo la primera vez se elimina el párrafo de instrucciones del HTML;
        // a partir de entonces ya no existe ese nodo y se evita el error de removeChild
        if (esPrimeraVez === true) {
            const primerParrafo = notArea.querySelector('p');
            notArea.removeChild(primerParrafo);
        }

        esPrimeraVez = false;

    });


    // Este listener escucha el evento personalizado 'notification' que se emite arriba;
    // event.detail contiene los datos adjuntos definidos en el CustomEvent
    document.body.addEventListener('notification', function (event) {



        const parrafo = document.createElement('p');
        parrafo.textContent = `Notificación: ${event.detail.mensaje} - Fecha: ${event.detail.fecha.toLocaleString()}`;
        notArea.appendChild(parrafo);

    });




});
