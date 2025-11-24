/**
 * Ejercicio 3 - Planificador de Itinerario de Actividades con Validación de Formulario
 * Conceptos: import nombrado, generación dinámica de checkboxes, filter + reduce, validación con regex, formularios
 *
 * import { actividades } → import nombrado: el módulo exporta la constante con ese nombre exacto
 * reduce               → acumula duraciones y precios del itinerario en una sola pasada sobre el array
 * /^[A-Z]{4}\d{2}$/    → regex que valida código de descuento: exactamente 4 mayúsculas + 2 dígitos
 * checkBoxSeguro.required → se activa dinámicamente cuando el precio supera 1000€, forzando la confirmación del seguro
 * innerHTML = ''       → forma rápida de vaciar un contenedor antes de repintarlo (alternativa a removeChild en bucle)
 */
import { actividades } from "../datos/Actividades.js";

const selectDestino = document.querySelector("#destino");
const contenedorCheckboxTipo = document.querySelector("#tipoActividad");
const inputPrecio = document.querySelector('#rango');
const mostrarPrecio = document.querySelector('#valorRango');
const contenedorTarjetas = document.querySelector('#actividades');
const lista = document.querySelector('#lista');
const TotalActividades = document.querySelector('#totalActividades');
const DuracionTotal = document.querySelector('#duracion');
const precioTotal = document.querySelector('#total-precio');
const formularioReserva = document.querySelector('#formularioReserva');
const divSeguro = document.querySelector('#divSeguro');
const checkBoxSeguro = document.querySelector('#seguro');
const Errores = document.querySelector('#errores');


let destinosArray = [];
let tiposArray = [];
let itinerarioArray = [];

// Funcion para inicializar los filtros
function inicializarFiltros() {
    const opcionTodas = document.createElement('option');
    opcionTodas.textContent = "Todas";
    selectDestino.appendChild(opcionTodas);

    actividades.forEach(actividad => {
        crearOpcionesSelect(actividad);
        crearCheckboxes(actividad);
        cargarRango(actividad);
    });
}

// Crear opciones del select
function crearOpcionesSelect(actividad) {
    if (!destinosArray.includes(actividad.destino)) {
        destinosArray.push(actividad.destino);
        const opcion = document.createElement('option');
        opcion.textContent = actividad.destino;
        selectDestino.appendChild(opcion);
    }
}

// Crear checkboxes
function crearCheckboxes(actividad) {
    if (!tiposArray.includes(actividad.tipo)) {
        tiposArray.push(actividad.tipo);

        const div = document.createElement('div');
        const input = document.createElement('input');
        input.type = "checkbox";
        input.value = actividad.tipo;
        input.classList.add('actividad-checkbox');

        input.addEventListener('change', crearTarjetas);

        const label = document.createElement('label');
        label.textContent = actividad.tipo;
        label.classList.add('ms-2');

        div.appendChild(input);
        div.appendChild(label);
        contenedorCheckboxTipo.appendChild(div);
    }
}

// Cargar rango 
function cargarRango(actividad) {
    let precioMax = 0;
    if (precioMax < actividad.precio) precioMax = actividad.precio;
    inputPrecio.setAttribute('max', precioMax);
    inputPrecio.value = precioMax;
    mostrarPrecio.textContent = precioMax;
}

// Funcion para crear las tarjetas 
function crearTarjetas() {
    contenedorTarjetas.innerHTML = '';

    let destinoSeleccionado = selectDestino.value;

    // Obtener checkboxes marcados 
    let todosCheckboxes = document.querySelectorAll('.actividad-checkbox');
    let arrayCheckboxes = Array.from(todosCheckboxes);
    let checkboxesMarcados = arrayCheckboxes.filter(checkbox => checkbox.checked);
    let tiposSeleccionados = checkboxesMarcados.map(checkbox => checkbox.value);

    let precioMax = parseFloat(inputPrecio.value);

    // Filtrar actividades segun los filtros
    let actividadesFiltradas = actividades.filter(actividad => {

        // Comprobar destino
        if (destinoSeleccionado !== "Todas" && actividad.destino !== destinoSeleccionado) {
            return false;
        }

        // Comprobar tipo
        if (tiposSeleccionados.length > 0 && !tiposSeleccionados.includes(actividad.tipo)) {
            return false;
        }
        // Comprobar precio
        if (actividad.precio > precioMax) {
            return false;
        }

        // añado el  Producto
        return true;
    });


    if (actividadesFiltradas.length === 0) {

        const mensaje = document.createElement('p');
        mensaje.textContent = "No hay actividades disponibles con los filtros seleccionados.";
        mensaje.classList.add('text-center', 'fw-bold', 'mt-3');
        contenedorTarjetas.appendChild(mensaje);
        return;
    }

    // Crear tarjetas si hay actividades
    actividadesFiltradas.forEach(actividad => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card', 'mb-3');

        tarjeta.innerHTML = `
            <img src="${actividad.imagen}" class="card-img-top" alt="${actividad.nombre}">
            <div class="card-body">
                <h5 class="card-title">${actividad.nombre}</h5>
                <p class="card-text">Destino: ${actividad.destino}</p>
                <p class="card-text">Precio: €${actividad.precio}</p>
                <p class="card-text">Duración: ${actividad.duracionHoras}h</p>
                <button class="btn btn-primary agregar-btn" data-id="${actividad.id}">Añadir al Itinerario</button>
            </div>
        `;
        contenedorTarjetas.appendChild(tarjeta);
    });


    document.querySelectorAll('.agregar-btn').forEach(boton => {
        boton.addEventListener('click', () => {
            let idActividad = parseInt(boton.dataset.id);
            agregarAlItinerario(idActividad);
        });
    });
}
// Funcion para agregar actividad 
function agregarAlItinerario(idActividad) {
    let actividadSeleccionada = actividades.find(a => a.id === idActividad);
    if (!itinerarioArray.includes(actividadSeleccionada)) {
        itinerarioArray.push(actividadSeleccionada);
        actualizarItinerario();
    }
}

// Funcion para quitar actividad 
function quitarDelItinerario(idActividad) {
    itinerarioArray = itinerarioArray.filter(a => a.id !== idActividad);
    actualizarItinerario();
}

// Funcion para actualizar la lista y los totales 
function actualizarItinerario() {
    lista.innerHTML = '';

    itinerarioArray.forEach(actividad => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            ${actividad.nombre} - €${actividad.precio}
            <button class="btn btn-sm btn-danger quitar-btn" data-id="${actividad.id}">Quitar</button>`;
        lista.appendChild(li);
    });

    let totalActividades = itinerarioArray.length;
    let duracionTotal = itinerarioArray.reduce((acc, a) => acc + a.duracionHoras, 0);
    let precioTotal = itinerarioArray.reduce((acc, a) => acc + a.precio, 0);

    TotalActividades.textContent = totalActividades;
    DuracionTotal.textContent = duracionTotal;
    precioTotal.textContent = precioTotal;

    // El seguro solo es obligatorio al superar 1000€: se muestra/oculta el div y se marca o no como required
    if (precioTotal > 1000) {
        checkBoxSeguro.required = true;
        divSeguro.style.display = 'block';
    } else {
        checkBoxSeguro.required = false;
        // Se desmarca explícitamente para que no quede marcado si el usuario reduce el precio
        checkBoxSeguro.checked = false;
        divSeguro.style.display = 'none';
    }


    document.querySelectorAll('.quitar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            let idActividad = parseInt(btn.dataset.id);
            quitarDelItinerario(idActividad);
        });
    });
}


formularioReserva.addEventListener('submit', (event) => {
    event.preventDefault();
    Errores.innerHTML = '';
    let errores = [];

    if (itinerarioArray.length === 0) errores.push("El itinerario no puede estar vacío.");

    let fechaInicio = new Date(document.querySelector('#fecha-inicio').value);
    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaInicio < hoy) errores.push("La fecha de inicio no puede ser pasada.");

    let codigo = document.querySelector('#codigo-descuento').value;
    // La condición `codigo &&` evita validar si el campo está vacío (el código es opcional)
    if (codigo && !/^[A-Z]{4}\d{2}$/.test(codigo)) errores.push("El código de descuento debe tener 4 letras + 2 números");

    if (parseFloat(precioTotal.textContent) > 1000 && !checkBoxSeguro.checked) errores.push("Debe seleccionar el seguro de viaje al superar los 1000€.");

    if (errores.length > 0) {
        Errores.innerHTML = errores.map(e => `<p>${e}</p>`).join('');
    } else {
        alert("Reserva confirmada. ¡Gracias!");
        formularioReserva.reset();
        itinerarioArray = [];
        actualizarItinerario();
    }
});


selectDestino.addEventListener('change', crearTarjetas);
inputPrecio.addEventListener('input', () => {
    mostrarPrecio.textContent = inputPrecio.value;
    crearTarjetas();
});


inicializarFiltros();
crearTarjetas();
