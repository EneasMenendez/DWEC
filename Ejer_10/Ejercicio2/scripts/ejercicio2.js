/**
 * Ejercicio 2 - Visor de documentos XML con navegación y historial
 * Conceptos: XMLHttpRequest, responseType 'document', navegación entre documentos XML,
 *            historial de visitas, dataset, eventos onclick dinámicos, manejo de error 404
 *
 * XMLHttpRequest       → petición HTTP asíncrona para cargar archivos XML bajo demanda
 * responseType document → el navegador convierte la respuesta XML en un árbol DOM navegable
 * dataset              → permite guardar datos arbitrarios en atributos data-* de un elemento
 * onclick dinámico     → reasignar el manejador onclick en cada carga actualiza el destino del botón
 * historial de visitas → array que evita añadir duplicados al registro de documentos visitados
 * nodo "anterior/siguiente" → valores "null" en el XML indican que no existe ese documento vecino
 */

document.addEventListener("DOMContentLoaded", () => {
   
    const titulo = document.getElementById("titulo");
    const fecha = document.getElementById("fecha");
    const imagen = document.getElementById("imagen");
    const descripcion = document.getElementById("descripcion");
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");
    const btnUltimo = document.getElementById("btnUltimo");
    const listaHistorial = document.getElementById("listaHistorial");

    // Ruta al doc xml
    let rutaDocumentoActual = "datos/documento_ultimo.xml"; 
    let documentosVisitados = []; 

    // Función que crea la petición 
    function crearPeticion(ruta) {
        const peticion = new XMLHttpRequest();
        peticion.open('GET', ruta);
        peticion.responseType = 'document';
        peticion.setRequestHeader('Accept', 'text/html');
        peticion.send();
        return peticion;
    }

  //Funcio para cargar el documento
    function cargarDocumento(rutaXML) {

        // Hago la petición 
        const peticionDocumento = crearPeticion(rutaXML);

        peticionDocumento.onload = () => {

            // Petición correcta
            if (peticionDocumento.status === 200) {

                // Obtengo la respuesta 
                const respuesta = peticionDocumento.response;

                mostrarDocumento(respuesta, rutaXML);

            } else if (peticionDocumento.status === 404) {
                // Error 404 
                console.error(`Error: No se pudo cargar ${rutaXML}. Comprueba la carpeta /datos.`);
            }
        };
    }


    // Función que muestra el contenido 
    function mostrarDocumento(respuesta, rutaXML) {

        
        const documento = respuesta.querySelector("documento");

        // Obtengo los datos del doc
        const tituloDocumento = documento.querySelector("titulo").textContent;
        const fechaDocumento = documento.querySelector("fecha").textContent;
        const imagenDocumento = documento.querySelector("imagen").textContent;
        const descripcionDocumento = documento.querySelector("descripcion").textContent;
        const anteriorDocumento = documento.querySelector("anterior").textContent;
        const siguienteDocumento = documento.querySelector("siguiente").textContent;

        // Muestro los datos por pantalal
        titulo.textContent = tituloDocumento;
        fecha.textContent = fechaDocumento;
        imagen.src = imagenDocumento;
        descripcion.textContent = descripcionDocumento;
        rutaDocumentoActual = rutaXML;

        
        // Agrego el documento al historial sino lo esta ya
        if (!documentosVisitados.includes(rutaXML)) {

            // Creo un nuevo <li> con el título y la fecha
            const elementoHistorial = document.createElement("li");
            elementoHistorial.textContent = `${tituloDocumento} (${fechaDocumento})`;

            // Guardo la ruta del archivo XML como atributo
            elementoHistorial.dataset.archivo = rutaXML;

            // Cuando hago clic en el historial, vuelvo a cargar ese documento
            elementoHistorial.addEventListener("click", () => {
                cargarDocumento(elementoHistorial.dataset.archivo);
            });

            // Añado el elemento a la lista <ul>
            listaHistorial.appendChild(elementoHistorial);

            // Guardo la ruta en el array 
            documentosVisitados.push(rutaXML);
        }

        
        // Desactivo botones si el XML indica "null" → no existe documento en esa dirección
        btnAnterior.disabled = (anteriorDocumento === "null");
        btnSiguiente.disabled = (siguienteDocumento === "null");

        // Botón Anterior
        btnAnterior.onclick = () => {
            if (anteriorDocumento !== "null") {
                cargarDocumento(`datos/${anteriorDocumento}`);
            }
        };

        // Botón Siguiente
        btnSiguiente.onclick = () => {
            if (siguienteDocumento !== "null") {
                cargarDocumento(`datos/${siguienteDocumento}`);
            }
        };

        // Botón Volver al último
        btnUltimo.onclick = () => {
            cargarDocumento("datos/documento_ultimo.xml");
        };
    }

    cargarDocumento(rutaDocumentoActual);
});
