/**
 * Ejercicio 2 - Catálogo de Productos con Filtros Combinados y Ordenamiento
 * Conceptos: import ES6, filtrado dinámico de arrays, radio buttons, select, input range, manipulación del DOM
 *
 * import          → carga el array de productos definido en un módulo externo
 * spread [...arr] → copia superficial del array original para no mutar la fuente al filtrar/ordenar
 * localeCompare   → comparación de strings en orden alfabético respetando el idioma
 * DOMContentLoaded → garantiza que el DOM está listo antes de limpiar inputs residuales del navegador
 */
import productos from '../datos/Productos.js';

const listaOpciones = document.querySelector('#listaOpciones');
const seccion = document.querySelector('#productos');
const TodosInputsRadio = document.querySelectorAll('#botonesOrdenar input');
const ElSelect = document.querySelector('select');
const inputNombre = document.querySelector('#inputNombreProducto');
const inputRango = document.querySelector('#rango');
const valorRango = document.querySelector('#valorRango');

let inputSeleccionado;

let categorias = [];
crearOpcionesSelect();
cargarRango();
cargarProductos();

// Filtrar por nombre
inputNombre.addEventListener('input', () => {
    cargarProductos();
});

// Filtrar por categoría
ElSelect.addEventListener('change', () => {
    cargarProductos();
});

// Filtrar por precio
inputRango.addEventListener('input', () => {
    valorRango.textContent = inputRango.value;
    cargarProductos();
});

// Ordenamiento
TodosInputsRadio.forEach(unInput => {
    unInput.addEventListener('change', () => {
        cargarProductos();
    });
});


function cargarProductos() {
    seccion.innerHTML = "";
    // Copia del array original: así cada llamada parte de la lista completa sin acumular filtros anteriores
    let productosFiltrados = [...productos];

    // Filtrar por nombre
    if (inputNombre.value.trim() !== "") {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.nombre.toLowerCase().startsWith(inputNombre.value.toLowerCase())
        );
    }

    // Filtrar por categoría
    if (ElSelect.value !== "Todas") {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.categoria === ElSelect.value
        );
    }

    // Filtrar por precio
    productosFiltrados = productosFiltrados.filter(producto =>
        producto.precio <= parseFloat(inputRango.value)
    );

    // Ordenar según radio seleccionado
    // find() devuelve el primer radio marcado; si ninguno está marcado, inputSeleccionado es undefined
    inputSeleccionado = Array.from(TodosInputsRadio).find(input => input.checked);

    if (inputSeleccionado) {
        switch (inputSeleccionado.id) {
            case "asc":
                // Precio ascendente: resta positiva si b > a → b va después
                productosFiltrados.sort((a, b) => a.precio - b.precio);
                break;
            case "desc":
                // Precio descendente: invierte el orden de la resta
                productosFiltrados.sort((a, b) => b.precio - a.precio);
                break;
            case "az":
                // Orden alfabético usando localeCompare para manejar tildes correctamente
                productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
        }
    }

    // Mostrar productos
    if (productosFiltrados.length === 0) {
        const sinProductos = document.createElement('p');
        sinProductos.textContent = "No se encontraron productos.";
        sinProductos.className = "text-danger text-center mt-3";
        seccion.appendChild(sinProductos);
    } else {
        productosFiltrados.forEach(producto => {
            crearDivProducto(producto)
        });
    }
}

//Funcion para crear las opciones del Select
function crearOpcionesSelect() {
    let opcion = document.createElement('option');
    opcion.textContent = "Todas";
    listaOpciones.appendChild(opcion);

    productos.forEach(producto => {
        if (!categorias.includes(producto.categoria)) {
            categorias.push(producto.categoria);
            opcion = document.createElement('option');
            opcion.textContent = producto.categoria;
            listaOpciones.appendChild(opcion);
        }
    });
}

//Funcion para crear el div con las imagenes del producto
function crearDivImagenes(linkImagen) {
    const divImagenes = document.createElement('div');
    divImagenes.className = "imagenes text-center";
    const imagen = document.createElement('img');
    imagen.src = linkImagen;
    imagen.className = "img-fluid rounded";
    divImagenes.appendChild(imagen);
    return divImagenes;
}

//Funcion para crear los productos y añadirlos al html
function crearDivProducto(producto) {
    const divCompleto = document.createElement('div');
    divCompleto.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    const contenedorImagenes = crearDivImagenes(producto.imagen);
    contenedorImagenes.classList.add("card-img-top", "p-3");
    divCompleto.appendChild(contenedorImagenes);

    const divContenido = document.createElement('div');
    divContenido.className = "card-body text-center";

    const nombreProducto = document.createElement('h2');
    nombreProducto.className = "h5 card-title text-primary";
    nombreProducto.textContent = producto.nombre;
    divContenido.appendChild(nombreProducto);

    const precio = document.createElement('p');
    precio.className = "card-text fw-bold text-success mb-1";
    precio.textContent = `$${producto.precio}`;
    divContenido.appendChild(precio);

    const categoria = document.createElement('p');
    categoria.className = "card-text text-muted small";
    categoria.textContent = producto.categoria;
    divContenido.appendChild(categoria);

    divCompleto.appendChild(divContenido);
    seccion.appendChild(divCompleto);
}

function cargarRango() {
    let valorMaximo = 0;
    productos.forEach(producto => {
        if (valorMaximo < producto.precio)
            valorMaximo = producto.precio;
    });
    inputRango.setAttribute('max', valorMaximo);
    inputRango.value = valorMaximo;
    valorRango.textContent = valorMaximo;

}

//Limpiar el input
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#inputNombreProducto').value = '';
    cargarRango();
    cargarProductos();
})

