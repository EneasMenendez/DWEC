/**
 * funciones.js - Utilidades para construir la interfaz de tabla de usuarios (Ejercicio 1)
 * Conceptos: módulos ES6 (export), fetch() POST, .then()/.catch(), creación dinámica del DOM
 *
 * export function → hace pública la función para que otros módulos puedan importarla
 * forEach         → recorre cada usuario y lanza un fetch POST individual por cada uno
 * .then()         → procesa la respuesta del servidor tras cada inserción exitosa
 * primeraVez      → bandera para mostrar el mensaje de éxito solo la primera vez
 * createElement   → crea elementos HTML dinámicamente sin tocar el HTML estático
 */

let primeraVez = false;
//Metodo para hacer el post de los usuarios,es decir, subo los datos a crud
export function uploadingInitialUsers(usuarios, url, displayUsers,divMensajes) {
    
    //Creo las opciones
    usuarios.forEach(usuario => {

        const opciones = {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                "Content-type": "application/json"
            }
        }

        //Realizo el fecth con las opciones que configure arriba
        fetch(url, opciones)

            //Respuesta que me devuelve el Servidor si todo fue bien
            .then(resultados => {
                //Lo decodificamos con json
                return resultados.json();
            })
            .then(objetoJSON => {
                displayUsers();
                //LLamar a la funcion que dibuja porque cargo todo bien y añadir mensaje de exito
                // displayUsers();
                //Me va a devolverel objeto json mas la id que le asigno crud
                // console.log(objetoJSON);
                // arrayObjetoJSON.push(objetoJSON);
                if (primeraVez===false) {
                    divMensajes.style.display = "block";
                    divMensajes.innerHTML = `<p class="mensajeBien">Usuarios cargados correctamente</p>`;
                    primeraVez = true;
                    setTimeout(() => divMensajes.style.display = "none", 2500);
                   
                }
            })
            .catch(error => {
                divMensajes.style.display = "block";
                divMensajes.innerHTML = `<p class="mensajeError">Error al subir usuarios: ${error}</p>`;
                setTimeout(() => divMensajes.style.display = "none", 2500);
               
            });

    });

}

//Metodo para crear la tabla
export function crearTabla() {
    const tabla = document.createElement('table');
    return tabla;
}

//Metodo para crear las filas
export function crearFila(tabla) {
    const fila = document.createElement('tr');
    tabla.appendChild(fila);
    return fila;

}

//Metodo para crear las celdas
export function crearCeldas() {
    const celda = document.createElement('td');
    return celda;
}

//Metodo para crear los botones
export function crearBotones(identificador, claseBoton, fila, celda) {
    const Boton = document.createElement('button');
    Boton.type = 'button';
    Boton.setAttribute('id', identificador);
    Boton.classList.add(claseBoton);
    Boton.textContent = claseBoton;
    celda.appendChild(Boton);
    fila.appendChild(celda);
}

//Metodo para crear los parrafos
export function crearParrafos(texto, fila, celda, nombreClase) {
    const Parrafo = document.createElement('p');
    Parrafo.textContent = texto;
    Parrafo.setAttribute('class', nombreClase)
    celda.appendChild(Parrafo);
    fila.appendChild(celda);
}

//Metodos para crear la imagen
export function crearImagen(enlace, celda, fila) {
    const Imagen = document.createElement('img');
    Imagen.src = enlace;
    Imagen.width = 50;
    celda.appendChild(Imagen);
    fila.appendChild(celda);
}






