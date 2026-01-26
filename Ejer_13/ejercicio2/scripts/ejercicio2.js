/**
 * Ejercicio 2 - CRUD de usuarios con actualización optimista y buscador en tiempo real
 * Conceptos: async/await, fetch() con métodos REST, actualización optimista, filtrado dinámico
 *
 * async/await          → permite escribir el flujo asíncrono de forma secuencial y legible
 * try/catch            → en async/await sustituye a .catch() para capturar errores de red
 * actualización optimista → actualiza la UI antes de recibir confirmación del servidor para mayor fluidez;
 *                           si el servidor falla, se revierte el cambio
 * .filter() con texto  → filtra la lista de usuarios según el texto escrito en el buscador
 * "input" event        → se dispara en cada pulsación de tecla, ideal para búsquedas en tiempo real
 * marcarError/marcarBien → funciones auxiliares que añaden/quitan clases CSS para dar feedback visual
 */

import { usuarios } from '../datos/Usuarios.js';
import { uploadingInitialUsers, crearTabla, crearCeldas, crearFila, crearBotones, crearImagen, crearParrafos } from '../Funciones/funciones.js';

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

// Creo un input para realizar la búsqueda
let inputBuscar = document.createElement("input");
inputBuscar.placeholder = "Buscar usuario...";
inputBuscar.style.padding = "10px";
inputBuscar.style.width = "100%";
inputBuscar.style.marginBottom = "10px";
document.querySelector("#listaUsuarios").prepend(inputBuscar);

// URL 
const url = "https://crudcrud.com/api/d8d251766c36429a95a67971c1f3cfee/usuarios";

// Función que comprueba si hay datos anteriores
async function comprobarSiHayDatos() {
    try {
        const resp = await fetch(url);
        const datos = await resp.json();
        if (datos.length > 0) displayUsers();
    } catch (e) {
        mostrarMensaje("Error comprobando datos", true);
    }
}
comprobarSiHayDatos();

// Cuando pulso este botón subo los datos iniciales a CRUD
BotonUsuariosIniciales.addEventListener('click', async () => {
    await uploadingInitialUsers(usuarios, url, displayUsers, divMensajes);
});

// Función que muestra todos los usuarios
async function displayUsers(filtro = "") {
    try {
        BotonUsuariosIniciales.disabled = true;

        const resp = await fetch(url);
        let datos = await resp.json();

        // Filtro
        if (filtro.trim() !== "") {
            datos = datos.filter(u =>
                (u.firstName + " " + u.lastName).toLowerCase().includes(filtro.toLowerCase())
            );
        }

        // Creo la tabla y añado filas y celdas para todos los usuarios
        divUsuarios.innerHTML = "";
        tabla = crearTabla();
        divUsuarios.appendChild(tabla);

        datos.forEach(usuario => {
            let fila = crearFila(tabla);

            let celda = crearCeldas();
            crearImagen(usuario.picture, celda, fila);

            celda = crearCeldas();
            crearParrafos(`${usuario.firstName} ${usuario.lastName}`, fila, celda, "nombre");
            crearParrafos(usuario.email, fila, celda, "email");

            celda = crearCeldas();
            crearBotones(usuario._id, "Editar", fila, celda);
            crearBotones(usuario._id, "Eliminar", fila, celda);
        });

        editarUsuarios();
        borrarUsuarios();
    } catch (e) {
        mostrarMensaje("Error al cargar usuarios", true);
    }
}

BotonGuardarUsuario.addEventListener('click', async event => {
    event.preventDefault();

    const valido = validarFormulario();
    if (!valido) return mostrarMensaje("Los datos no son válidos", true);

    const usuario = {
        firstName: InputNombre.value,
        lastName: InputApellido.value,
        email: InputEmail.value,
        picture: InputImagen.value
    };

    BotonGuardarUsuario.disabled = true;

    if (esNuevo) {
        const tempId = "temp-" + Math.random();
        usuario._id = tempId;
        agregarUsuarioOptimista(usuario);

        try {
            await fetch(url, {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: { "Content-Type": "application/json" }
            });

            mostrarMensaje("Usuario añadido correctamente");
            limpiarInputs();
            await displayUsers();

        } catch (e) {
            eliminarUsuarioOptimista(tempId);
            mostrarMensaje("Error al añadir usuario", true);
        }
    } else {
        actualizarUsuarioOptimista(idBotonEditar, usuario);

        try {
            await fetch(url + "/" + idBotonEditar, {
                method: "PUT",
                body: JSON.stringify(usuario),
                headers: { "Content-Type": "application/json" }
            });

            mostrarMensaje("Usuario actualizado correctamente");

            limpiarInputs();
            esNuevo = true;
            await displayUsers();

        } catch (e) {
            mostrarMensaje("Error al actualizar usuario", true);
            await displayUsers();
        }
    }

    BotonGuardarUsuario.disabled = false;
});

// Función que valida los datos del formulario
function validarFormulario() {
    let valido = true;

    if (InputNombre.value.trim() === "") marcarError(InputNombre), valido = false;
    else marcarBien(InputNombre);

    if (InputApellido.value.trim() === "") marcarError(InputApellido), valido = false;
    else marcarBien(InputApellido);

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(InputEmail.value);
    if (!emailOk) marcarError(InputEmail), valido = false;
    else marcarBien(InputEmail);

    try {
        new URL(InputImagen.value);
        marcarBien(InputImagen);
    } catch {
        marcarError(InputImagen);
        valido = false;
    }

    return valido;
}

function marcarError(el) { el.classList.add("mal"); el.classList.remove("bien"); }
function marcarBien(el) { el.classList.add("bien"); el.classList.remove("mal"); }

// Cuando pulso un botón de editar cargo los datos del usuario en el formulario
function editarUsuarios() {
    document.querySelectorAll('.Editar').forEach(btn => {
        btn.onclick = () => {
            esNuevo = false;
            cargarUsuarioEnFormulario(btn.id);
        };
    });
}

// Función que carga el usuario seleccionado al formulario
async function cargarUsuarioEnFormulario(id) {
    try {
        const resp = await fetch(url);
        const datos = await resp.json();
        const u = datos.find(x => x._id === id);
        if (!u) return;

        idBotonEditar = id;
        InputNombre.value = u.firstName;
        InputApellido.value = u.lastName;
        InputEmail.value = u.email;
        InputImagen.value = u.picture;

    } catch (e) {
        mostrarMensaje("Error al cargar usuario", true);
    }
}

// Función para borrar un usuario
function borrarUsuarios() {
    document.querySelectorAll('.Eliminar').forEach(btn => {
        btn.onclick = () => eliminarUsuario(btn.id);
    });
}

async function eliminarUsuario(id) {
    if (!confirm("¿Seguro que quieres eliminarlo?")) return;

    const backup = await obtenerUsuario(id);
    eliminarUsuarioOptimista(id);

    try {
        await fetch(url + "/" + id, { method: "DELETE" });
        mostrarMensaje("Usuario eliminado");
        await displayUsers();
    } catch (e) {
        restaurarUsuarioOptimista(backup);
        mostrarMensaje("Error al eliminar usuario", true);
        await displayUsers();
    }
}

// Función para obtener un usuario
async function obtenerUsuario(id) {
    const resp = await fetch(url);
    const datos = await resp.json();
    return datos.find(u => u._id === id);
}

// Funciones optimistas simplemente llaman a displayUsers
function agregarUsuarioOptimista(u) { displayUsers(); }
function eliminarUsuarioOptimista(id) { displayUsers(); }
function actualizarUsuarioOptimista(id, datos) { displayUsers(); }
function restaurarUsuarioOptimista(usuario) { displayUsers(); }

inputBuscar.addEventListener("input", () => {
    displayUsers(inputBuscar.value);
});

// Función que muestra los mensajes
function mostrarMensaje(msg, error = false) {
    divMensajes.style.display = "block";
    divMensajes.innerHTML = `<p class="${error ? "mensajeError" : "mensajeBien"}">${msg}</p>`;
    setTimeout(() => divMensajes.style.display = "none", 2500);
}

// Vacío los inputs del formulario
function limpiarInputs() {
    InputNombre.value = "";
    InputApellido.value = "";
    InputEmail.value = "";
    InputImagen.value = "";
    esNuevo = true;
}
document.addEventListener('DOMContentLoaded', limpiarInputs);
