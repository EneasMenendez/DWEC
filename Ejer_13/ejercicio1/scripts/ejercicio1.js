/**
 * Ejercicio 1 - CRUD de usuarios contra API REST (crudcrud.com)
 * Conceptos: fetch() con métodos HTTP, Promesas .then()/.catch(), módulos ES6, validación de formularios
 *
 * fetch() + method POST   → crea un nuevo recurso en el servidor enviando JSON en el body
 * fetch() + method PUT    → actualiza un recurso existente identificado por su _id en la URL
 * fetch() + method DELETE → elimina un recurso del servidor por su _id
 * JSON.stringify()        → convierte un objeto JS a cadena JSON para enviarlo en el body del fetch
 * import/export (ES6)     → separa el código en módulos reutilizables
 * RegExp.test()           → comprueba si un string cumple un patrón de expresión regular (email)
 * URL.canParse()          → método nativo que valida si una cadena es una URL correcta
 * esNuevo                 → bandera booleana para distinguir entre crear (POST) y editar (PUT)
 */

import { usuarios } from '../datos/Usuarios.js';
import { uploadingInitialUsers, crearTabla, crearCeldas, crearFila, crearBotones, crearImagen, crearParrafos } from '../Funciones/funciones.js';
//const BotonSubirDatos = document.querySelector('#botonSubir');
const BotonUsuariosIniciales = document.querySelector('#botonCargar');
const BotonGuardarUsuario = document.querySelector('#botonGuardar');
const divUsuarios = document.querySelector('#usuarios');
const InputNombre = document.querySelector('#nombre');
const InputApellido = document.querySelector('#apellido');
const InputEmail = document.querySelector('#email');
const InputImagen = document.querySelector('#imagen');
const divMensajes = document.querySelector('#mensajes');
let tabla;
let esNuevo = true;
let idBotonEditar;

//URL
const url = "https://crudcrud.com/api/75b0d8a44e2d41949adcad38a4c35d3d/usuarios";
//Compruebo si hay datos cargados
comprobarSiHayDatos();

//Cargo los datos a Crud 
BotonUsuariosIniciales.addEventListener('click', function () {
    uploadingInitialUsers(usuarios, url, displayUsers,divMensajes);

});

//Metodo que comprueba si ya hay datos cargados en crud y en el caso afirmativo los carga
function comprobarSiHayDatos() {

    fetch(url)
        .then(resultados => {
            return resultados.json();
        })
        .then(objetoJSON => {
            if (objetoJSON.length > 0) {
                displayUsers();

            }

        });
}
//Metodo para obtener los datos de crud
function displayUsers() {

    //Si en crud ya hay datos, desactivo el boton para que no me deje cargar mas
    BotonUsuariosIniciales.disabled = true;
    fetch(url)
        .then(resultados => {
            return resultados.json();
        })
        .then(objetoJSON => {
            //Elimino el contenido del div
            divUsuarios.innerHTML = "";
            //Creo la tabla en la cual voy a cargar los datos
            tabla = crearTabla();
            //Añado la tabla al div
            divUsuarios.appendChild(tabla);
            for (const usuario of objetoJSON) {
                //Creo la fila para cada usuario
                let fila = crearFila(tabla);

                //Creo las celdas para las imagenes
                let celda = crearCeldas();
                crearImagen(usuario.picture, celda, fila);

                //Creo las celdas para el nombre, apellidos y email del usuario
                celda = crearCeldas();
                crearParrafos(usuario.firstName + " " + usuario.lastName, fila, celda, "nombre");
                crearParrafos(usuario.email, fila, celda, "email");

                //Creo las celdas para los botones
                celda = crearCeldas();
                crearBotones(usuario._id, "Editar", fila, celda);
                crearBotones(usuario._id, "Eliminar", fila, celda);
                //Llamo a la función editarUsuarios para obtener todos los botones de Editar
            }
            editarUsuarios();
            borrarUsuarios();

        }).catch(error => {
            divMensajes.style.display = "block";
            divMensajes.innerHTML = `<p class="mensajeError">Error al cargar usuarios: ${error}</p>`;
            setTimeout(() => divMensajes.style.display = "none", 2500);


        });

}


//Creo un nuevo usuario, lo subo al curl y lo cargo en la lista
BotonGuardarUsuario.addEventListener('click', event => {
    //Compruebo los datos del formulario si son validos
    const esValido = validarFormulario();
    event.preventDefault();

    //Si es 
    if (esValido != true) {
        divMensajes.style.display = "block";
        divMensajes.innerHTML = `<p class="mensajeError">Los datos del formulario no son validos</p>`;
        setTimeout(() => divMensajes.style.display = "none", 2500);

    } else {

        //Compruebo si el usuario es nuevo
        if (esNuevo === true) {
            //Creo un array con el usuario y lo paso a la funcion de actualizar
            const nuevoUsuario = [
                {
                    "firstName": InputNombre.value,
                    "lastName": InputApellido.value,
                    "email": InputEmail.value,
                    "picture": InputImagen.value
                }
            ]
            //Llamo al metodo en el qeu hago el POST y le paso el array de nuevo usuario
            uploadingInitialUsers(nuevoUsuario, url, displayUsers,divMensajes);

            divMensajes.style.display = "block";
            divMensajes.innerHTML = `<p class="mensajeBien">Usuario añadido correctamente</p>`;
            setTimeout(() => divMensajes.style.display = "none", 2500);
 
            limpiarInputs();

        } else {

            //El usuario no es nuevo asi que obtengo los datos nuevos para el
            const nuevosDatosUsuario = {
                firstName: InputNombre.value,
                lastName: InputApellido.value,
                email: InputEmail.value,
                picture: InputImagen.value
            };

            // Configuración del PUT: method indica la operación REST, body lleva el JSON serializado
            const opcionesPut = {
                method: "PUT",
                body: JSON.stringify(nuevosDatosUsuario), // convierte el objeto JS a cadena JSON
                headers: {
                    "Content-type": "application/json"   // informa al servidor del formato del body
                }
            };

            // La URL incluye el _id del usuario para que el servidor sepa qué recurso actualizar
            fetch(url + "/" + idBotonEditar, opcionesPut)
                .then(() => {
                    esNuevo = true;
                    displayUsers();
                    limpiarInputs();
                    divMensajes.style.display = "block";
                    divMensajes.innerHTML = `<p class="mensajeBien">Usuario editado correctamente</p>`;
                    setTimeout(() => divMensajes.style.display = "none", 2500);


                })
                .catch(error => {
                    divMensajes.style.display = "block";
                    divMensajes.innerHTML = `<p class="mensajeError">Error al editar usuario: ${error}</p>`;
                    setTimeout(() => divMensajes.style.display = "none", 2500);


                });
        }

    }

});

//Valido los datos del usuario que se esta intentado añadir para comprobar que son correctos
function validarFormulario() {

    let esValido = true;
    const expresion = '[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}';
    const expresionValidarEmail = new RegExp(expresion);

    //Compuebo el nombre
    if (InputNombre.value === null || InputNombre.value === "") {
        InputNombre.classList.remove('bien');
        InputNombre.classList.add('mal');
        esValido = false;
    } else {
        InputNombre.classList.remove('mal');
        InputNombre.classList.add('bien');
    }

    //Compuebo los apellidos
    if (InputApellido.value === null || InputApellido.value === "") {
        InputApellido.classList.remove('bien');
        InputApellido.classList.add('mal');
        esValido = false;
    } else {
        InputApellido.classList.remove('mal');
        InputApellido.classList.add('bien');
    }

    //Compuebo el email
    if (expresionValidarEmail.test(InputEmail.value) != true) {
        InputEmail.classList.remove('bien');
        InputEmail.classList.add('mal');
        esValido = false;
    } else {
        InputEmail.classList.remove('mal');
        InputEmail.classList.add('bien');
    }

    //Compuebo la URL
    if (URL.canParse(InputImagen.value) != true) {
        InputImagen.classList.remove('bien');
        InputImagen.classList.add('mal');
        esValido = false;
    } else {
        InputImagen.classList.remove('mal');
        InputImagen.classList.add('bien');

    }

    return esValido;
}


//Compuebo si el valor del input cambia
InputNombre.addEventListener('input', validarFormulario);
InputApellido.addEventListener('input', validarFormulario);
InputEmail.addEventListener('input', validarFormulario);
InputImagen.addEventListener('input', validarFormulario);

//Vacio los inputs al recargar la pagina
document.addEventListener('DOMContentLoaded', limpiarInputs);

//Funcion para limpiar los Inputs
function limpiarInputs() {
    InputNombre.value = "";
    InputNombre.classList.remove('bien');
    InputEmail.value = "";
    InputEmail.classList.remove('bien');
    InputApellido.value = "";
    InputApellido.classList.remove('bien');
    InputImagen.value = "";
    InputImagen.classList.remove('bien');
    esNuevo = true;
}

//Pulso el boton editar
function editarUsuarios() {
    document.querySelectorAll('.Editar').forEach(botonEditar => {

        botonEditar.addEventListener('click', function () {
            añadirInformacionUsuarioFormulario(botonEditar);
            esNuevo = false;
        })
    });

}

//Añado la informacion del usuario al formulario para editarlo
function añadirInformacionUsuarioFormulario(botonEditar) {
    fetch(url)
        .then(resultados => {
            return resultados.json();
        })
        .then(objetoJSON => {
            idBotonEditar = botonEditar.getAttribute('id');
            for (const usuario of objetoJSON) {

                if (usuario._id === idBotonEditar) {
                    InputNombre.value = usuario.firstName;
                    InputApellido.value = usuario.lastName;
                    InputEmail.value = usuario.email;
                    InputImagen.value = usuario.picture;
                }
            }
        })
        .catch(error => {
            divMensajes.style.display = "block";
            divMensajes.innerHTML = `<p class="mensajeError">Error al cargar datos del usuario: ${error}</p>`;
            setTimeout(() => divMensajes.style.display = "none", 2500);

        });
}

//Pulso el boton eliminar
function borrarUsuarios() {
    document.querySelectorAll('.Eliminar').forEach(botonEliminar => {

        botonEliminar.addEventListener('click', function () {

            let respuesta = confirm("¿Estás Seguro?");
            if (respuesta === true) {

                // DELETE no necesita body; solo el método y la URL con el _id del usuario
                const opcionesDelete = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    }
                };

                // El _id se obtiene del atributo id del botón, que se asignó al crear la fila
                fetch(url + "/" + botonEliminar.getAttribute('id'), opcionesDelete)
                    .then(() => {
                        displayUsers();
                        divMensajes.style.display = "block";
                        divMensajes.innerHTML = `<p class="mensajeBien">Usuario eliminado correctamente</p>`;
                        setTimeout(() => divMensajes.style.display = "none", 2500);
                       

                    })
                    .catch(error => {
                        divMensajes.style.display = "block";
                        divMensajes.innerHTML = `<p class="mensajeError">No se pudo eliminar: ${error}</p>`;
                        setTimeout(() => divMensajes.style.display = "none", 2500);
                       
                    });
            }
        })
    });

}
