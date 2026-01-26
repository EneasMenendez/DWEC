/**
 * Ejercicio 3 - CRUD de usuarios con calificaciones por asignatura y ventana modal
 * Conceptos: async/await, fetch() REST completo, modal dinámico, optional chaining (?.), nullish coalescing (??)
 *
 * async/await           → simplifica la lectura del código asíncrono evitando cadenas largas de .then()
 * optional chaining (?.)→ accede a propiedades anidadas sin lanzar error si el objeto es null/undefined
 *                         Ej: usuario.calificaciones?.Matemáticas → no falla si calificaciones no existe
 * nullish coalescing (??)→ devuelve el valor de la derecha si el de la izquierda es null o undefined
 *                         Ej: cal?.Historia ?? "" → muestra "" si no hay nota de Historia
 * modal                 → capa superpuesta sobre la página para editar datos sin cambiar de vista
 * PUT con calificaciones → el objeto usuario se actualiza entero (incluidas las notas) en cada PUT
 * idUsuarioActualModal  → variable que guarda el _id del usuario cuyo modal está abierto
 */

import { usuarios } from '../datos/Usuarios.js';
import {
    uploadingInitialUsers, crearTabla, crearCeldas, crearFila,
    crearBotones, crearImagen, crearParrafos
} from '../Funciones/funciones.js';

const botonCargarUsuarios = document.querySelector('#botonCargar');
const botonGuardarUsuario = document.querySelector('#botonGuardar');
const contenedorUsuarios = document.querySelector('#usuarios');
const inputNombre = document.querySelector('#nombre');
const inputApellido = document.querySelector('#apellido');
const inputEmail = document.querySelector('#email');
const inputImagen = document.querySelector('#imagen');
const contenedorMensajes = document.querySelector('#mensajes');
const modalCalificaciones = document.querySelector('#modal');
const tituloModalCalificaciones = document.querySelector('#modalTitulo');
const botonCerrarModal = document.querySelector('#cerrarModal');
const inputNotaMatematicas = document.querySelector('#notaMatematicas');
const inputNotaHistoria = document.querySelector('#notaHistoria');
const inputNotaCiencia = document.querySelector('#notaCiencia');
const inputNotaIngles = document.querySelector('#notaIngles');
const inputNotaArte = document.querySelector('#notaArte');
const botonGuardarCalificaciones = document.querySelector('#guardarCalificaciones');
const botonBorrarCalificaciones = document.querySelector('#borrarCalificaciones');

let esNuevoUsuario = true;
let idUsuarioEditar = null;
let idUsuarioActualModal = null;

// Creo el input del buscador
let inputBuscarUsuario = document.createElement("input");
inputBuscarUsuario.placeholder = "Buscar usuarios...";
inputBuscarUsuario.style.padding = "10px";
inputBuscarUsuario.style.width = "100%";
inputBuscarUsuario.style.marginBottom = "10px";
document.querySelector("#listaUsuarios").prepend(inputBuscarUsuario);

// URL 
const urlAPI = "https://crudcrud.com/api/394d3d6cab8e4253bf9d38deb35d87c7/usuarios";

async function verificarUsuariosExistentes() {
    try {
        const res = await fetch(urlAPI);
        const datos = await res.json();
        if (datos.length > 0) displayUsers();
    } catch {
        mostrarMensaje("Error al verificar usuarios", true);
    }
}
verificarUsuariosExistentes();

// Cuando pulso este boton se cargan los usaurios iniciales
botonCargarUsuarios.addEventListener('click', async () => {
    await uploadingInitialUsers(usuarios, urlAPI, displayUsers, contenedorMensajes);
});

// con esta funcion muestro los uusarios que hay cargados en crud
async function displayUsers(filtroTexto = "") {
    try {
        botonCargarUsuarios.disabled = true;
        const res = await fetch(urlAPI);
        let listaUsuarios = await res.json();

        if (filtroTexto.trim() !== "") {
            listaUsuarios = listaUsuarios.filter(u =>
                (u.firstName + " " + u.lastName)
                    .toLowerCase()
                    .includes(filtroTexto.toLowerCase())
            );
        }

        contenedorUsuarios.innerHTML = "";
        const tabla = crearTabla();
        contenedorUsuarios.appendChild(tabla);

        listaUsuarios.forEach(usuario => {
            let fila = crearFila(tabla);

            // creo la celda con la imagen del usuario
            let celdaImg = crearCeldas();
            crearImagen(usuario.picture, celdaImg, fila);

            // creo una celda para el nombre y el email del usaurio
            let celdaInfo = crearCeldas();
            crearParrafos(`${usuario.firstName} ${usuario.lastName}`, fila, celdaInfo, "nombre");
            crearParrafos(usuario.email, fila, celdaInfo);

            // Creo una celda para las calificaciones
            let celdaCal = crearCeldas();
            celdaCal.style.marginLeft = "auto";

            crearParrafos("Calificaciones", fila, celdaCal, "tituloCalificaciones");

            if (!usuario.calificaciones) {
                crearParrafos("No hay calificaciones.", fila, celdaCal);
            } else {
                const cal = usuario.calificaciones;
                crearParrafos(`Matemáticas: ${cal["Matemáticas"]}`, fila, celdaCal);
                crearParrafos(`Historia: ${cal["Historia"]}`, fila, celdaCal);
                crearParrafos(`Ciencia: ${cal["Ciencia"]}`, fila, celdaCal);
                crearParrafos(`Inglés: ${cal["Inglés"]}`, fila, celdaCal);
                crearParrafos(`Arte: ${cal["Arte"]}`, fila, celdaCal);
            }

            // creo una celda para los botones
            let celdaBotones = crearCeldas();
            celdaBotones.style.display = "flex";
            celdaBotones.style.flexDirection = "column";
            celdaBotones.style.marginLeft = "20px";

            crearBotones(usuario._id, "Calificaciones", fila, celdaBotones);
            crearBotones(usuario._id, "Editar", fila, celdaBotones);
            crearBotones(usuario._id, "Eliminar", fila, celdaBotones);
        });

        asignarEventosBotones();
    } catch {
        mostrarMensaje("Error al cargar usuarios", true);
    }
}

/*Este boton lo que hace es que, si datos del formulario son validos,
actualiza o crea el usuario dependiendo de si existe ya o no*/
botonGuardarUsuario.addEventListener('click', async (e) => {
    e.preventDefault();

    const usuarioNuevo = {
        firstName: inputNombre.value,
        lastName: inputApellido.value,
        email: inputEmail.value,
        picture: inputImagen.value
    };

    if (esNuevoUsuario) {
        await fetch(urlAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarioNuevo)
        });
        mostrarMensaje("Usuario agregado");
    } else {
        await fetch(urlAPI + "/" + idUsuarioEditar, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarioNuevo)
        });
        mostrarMensaje("Usuario actualizado");
    }

    limpiarFormularioUsuario();
    esNuevoUsuario = true;
    displayUsers();
});

// Esta funcion lo que hace es asignar a cada boton los eventos
function asignarEventosBotones() {
    document.querySelectorAll('.Calificaciones').forEach(btn => {
        btn.onclick = () => abrirModalCalificaciones(btn.id);
    });
    document.querySelectorAll('.Editar').forEach(btn => {
        btn.onclick = () => cargarUsuarioEnFormulario(btn.id);
    });
    document.querySelectorAll('.Eliminar').forEach(btn => {
        btn.onclick = () => eliminarUsuario(btn.id);
    });
}
//Esta funcion carga los usuarios en el formulario
async function cargarUsuarioEnFormulario(id) {
    const usuario = await obtenerUsuarioPorId(id);
    if (!usuario) return;
    esNuevoUsuario = false;
    idUsuarioEditar = id;

    inputNombre.value = usuario.firstName;
    inputApellido.value = usuario.lastName;
    inputEmail.value = usuario.email;
    inputImagen.value = usuario.picture;
}

//Esta funcion elimina el usuario del formulario
async function eliminarUsuario(id) {
    await fetch(urlAPI + "/" + id, { method: "DELETE" });
    mostrarMensaje("Usuario eliminado");
    displayUsers();
}

//Esta funcion onbtiene el usaurio de acuerdo a la id
async function obtenerUsuarioPorId(id) {
    const res = await fetch(urlAPI);
    const lista = await res.json();
    return lista.find(u => u._id === id);
}

inputBuscarUsuario.addEventListener("input", () => {
    displayUsers(inputBuscarUsuario.value);
});

//Esta funcion se encarga de mostrar los diferentes mensajes
function mostrarMensaje(msg, error = false) {
    contenedorMensajes.style.display = "block";
    contenedorMensajes.innerHTML = `<p class="${error ? "mensajeError" : "mensajeBien"}">${msg}</p>`;
    setTimeout(() => contenedorMensajes.style.display = "none", 2500);
}

//Esta funcion limpia los inputs una vez que se edita el usuario, se crea un usuario o se recarga la pagian
function limpiarFormularioUsuario() {
    inputNombre.value = "";
    inputApellido.value = "";
    inputEmail.value = "";
    inputImagen.value = "";
}

// Este boton cierra la ventana modal 
botonCerrarModal.addEventListener('click', () => modalCalificaciones.style.display = "none");
modalCalificaciones.addEventListener('click', e => {
    if (e.target === modalCalificaciones) modalCalificaciones.style.display = "none";
});

//Este boton abre la ventana modal
async function abrirModalCalificaciones(id) {
    idUsuarioActualModal = id;

    const usuario = await obtenerUsuarioPorId(id);
    tituloModalCalificaciones.textContent = `Calificaciones de ${usuario.firstName} ${usuario.lastName}`;

    // ?. (optional chaining) evita el error si el usuario aún no tiene calificaciones registradas
    // ?? (nullish coalescing) pone "" como valor por defecto si la nota es null o undefined
    inputNotaMatematicas.value = usuario.calificaciones?.Matemáticas ?? "";
    inputNotaHistoria.value = usuario.calificaciones?.Historia ?? "";
    inputNotaCiencia.value = usuario.calificaciones?.Ciencia ?? "";
    inputNotaIngles.value = usuario.calificaciones?.Inglés ?? "";
    inputNotaArte.value = usuario.calificaciones?.Arte ?? "";

    modalCalificaciones.style.display = "flex";
}

//Este boton se encarga de guardar las calificaciones del usuario
botonGuardarCalificaciones.addEventListener('click', async () => {

    const calificaciones = {
        Matemáticas: Number(inputNotaMatematicas.value),
        Historia: Number(inputNotaHistoria.value),
        Ciencia: Number(inputNotaCiencia.value),
        Inglés: Number(inputNotaIngles.value),
        Arte: Number(inputNotaArte.value)
    };

    const usuario = await obtenerUsuarioPorId(idUsuarioActualModal);

    // Se reconstruye el objeto completo porque la API REST reemplaza el recurso entero con PUT
    const usuarioActualizado = {
        firstName: usuario.firstName,
        lastName: usuario.lastName,
        email: usuario.email,
        picture: usuario.picture,
        calificaciones // shorthand: equivalente a escribir calificaciones: calificaciones
    };

    await fetch(urlAPI + "/" + idUsuarioActualModal, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioActualizado)
    });

    mostrarMensaje("Calificaciones guardadas");
    modalCalificaciones.style.display = "none";
    displayUsers();
});

//Este boton se encarga de eliminar las calificaciones del usuario
botonBorrarCalificaciones.addEventListener('click', async () => {
    const usuario = await obtenerUsuarioPorId(idUsuarioActualModal);

    const usuarioSinCalificaciones = {
        firstName: usuario.firstName,
        lastName: usuario.lastName,
        email: usuario.email,
        picture: usuario.picture
    };

    await fetch(urlAPI + "/" + idUsuarioActualModal, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioSinCalificaciones)
    });

    mostrarMensaje("Calificaciones borradas");
    modalCalificaciones.style.display = "none";
    displayUsers();
});
