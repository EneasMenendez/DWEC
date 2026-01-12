/**
 * Ejercicio 3 - Catálogo de productos con filtros dinámicos desde JSON
 * Conceptos: fetch API, async/await, JSON, Set para valores únicos, filtrado y ordenación de arrays
 *
 * fetch API         → alternativa moderna a XMLHttpRequest; devuelve una Promise
 * async/await       → sintaxis que permite escribir código asíncrono con apariencia síncrona
 * response.json()   → parsea el cuerpo de la respuesta HTTP como JSON (devuelve una Promise)
 * Set               → colección sin duplicados; ideal para extraer marcas y categorías únicas
 * spread operator   → [...productos] crea una copia del array para filtrar sin mutar el original
 * Array.filter()    → devuelve un nuevo array solo con los elementos que superan la condición
 * Array.sort()      → ordena el array en función del precio de forma ascendente o descendente
 */

let productos = [];
let marcas = new Set();
let categorias = new Set();

document.addEventListener('DOMContentLoaded', init);

function init() {
    cargarDatos();
    document.querySelector("#filtro-categoria").addEventListener('input', aplicarFiltros);
    document.querySelector("#filtro-marca").addEventListener('input', aplicarFiltros);
    document.querySelector("#filtro-precio").addEventListener('input', aplicarFiltros);
}

async function cargarDatos() {
    try {
        const response = await fetch('./data/products.json');
        if (!response.ok) throw new Error('Error en la respuesta de la API'); // response.ok es false si status >= 400
        productos = await response.json(); // Parsea el JSON y espera la Promise resultante
        document.querySelector(".error-conexion").hidden = true;
        extraerMarcasYCategorias();
        cargarSelects();
        aplicarFiltros();
    } catch (error) {
        document.querySelector(".error-conexion").hidden = false;
        console.error(error);
    }
}

function extraerMarcasYCategorias() {
    productos.forEach(producto => {
        marcas.add(producto.brand);
        categorias.add(producto.category);
    });
}

function cargarSelects() {
    const selectMarca = document.querySelector('#filtro-marca');
    marcas.forEach(marca => {
        selectMarca.innerHTML += `<option value="${marca}">${marca}</option>`;
    });

    const selectCategoria = document.querySelector('#filtro-categoria');
    categorias.forEach(cat => {
        selectCategoria.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}

function aplicarFiltros() {
    let filtrados = [...productos]; // Copia del array original para no modificar la fuente de datos

    const categoria = document.querySelector("#filtro-categoria").value;
    if (categoria !== "default") {
        filtrados = filtrados.filter(p => p.category === categoria);
    }

    const marca = document.querySelector("#filtro-marca").value;
    if (marca !== "default") {
        filtrados = filtrados.filter(p => p.brand === marca);
    }

    const orden = document.querySelector("#filtro-precio").value;
    if (orden === "asc") {
        filtrados.sort((a, b) => a.price - b.price);
    } else if (orden === "desc") {
        filtrados.sort((a, b) => b.price - a.price);
    }

    renderizarProductos(filtrados);
}

function renderizarProductos(lista) {
    const contenedor = document.querySelector("#product-list");
    contenedor.innerHTML = '';

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No hay productos para los filtros seleccionados.</p>";
        return;
    }

    lista.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${producto.imageUrl}" alt="Imagen de ${producto.name}">
                <h2>${producto.name}</h2>
                <p>${producto.description}</p>
                <p>Precio: $${producto.price}</p>
                <p>Categoría: ${producto.category}</p>
                <p>Marca: ${producto.brand}</p>
                <p>Valoraciones: ${producto.rating}</p>
                <p>Stock: ${producto.stock}</p>
            </div>
        `;
    });
}
