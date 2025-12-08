/**
 * Ejercicio 1 - Navegación SPA con History API
 * Conceptos: History API, pushState, popstate, navegación sin recarga, SPA (Single Page Application)
 *
 * history.pushState(estado, título, url) → cambia la URL en la barra del navegador sin recargar la página
 * popstate                               → evento que se dispara al pulsar el botón Atrás/Adelante del navegador
 * pages[link.split('/')[1]]              → extrae la clave del objeto pages desde la URL del enlace (p.ej. "/inicio" → "inicio")
 */

/*Crea un objeto JavaScript que almacene el contenido
(puede ser un simple string con HTML) para cada ruta.
Por ejemplo: */
const pages = {
    inicio: '<h1>Página de Inicio</h1><p>Bienvenido a nuestra web.</p>',
    productos: '<h1>Productos</h1><p>Descubre nuestra gama de productos...</p>',
    contacto: '<h1>Contacto</h1><p>Contacta con nosotros...</p>'
};

const enlaces = document.querySelectorAll('.navegacion a');
const contenidoMain = document.querySelector('main');
let ultimoEnlace = enlaces[0];

//Recorro todos los enlaces y obtengo en el que se hizo el click
enlaces.forEach((enlace) => {

    enlace.addEventListener('click', event => {
        event.preventDefault();
        cargarContenido(enlace);
    });
});

//Cargo el contenido de la pagina
function cargarContenido(enlace) {
    ultimoEnlace.classList.remove('active');
    ultimoEnlace = enlace;
    enlace.classList.add('active');
    let titulo = enlace.textContent
    let link = enlace.getAttribute('href');
    let estado = pages[link.split('/')[1]];


    // Se guarda el HTML del contenido como estado para poder recuperarlo al navegar con Atrás/Adelante
    history.pushState(estado, titulo, link);
    contenidoMain.innerHTML = estado;
}

//Implemento el popstate para moverme alante o atras
window.addEventListener('popstate', (event) => {
    contenidoMain.innerHTML = event.state;
});

//Obtengo de la lista de enlaces el primero y lo cargo
window.addEventListener('DOMContentLoaded', function () {
    cargarContenido(ultimoEnlace);
});

