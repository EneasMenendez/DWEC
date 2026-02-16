/**
 * Ejercicio 14-4 - Catálogo con caché en IndexedDB y botón de actualización forzada
 * Conceptos: async/await, fetch, IndexedDB, transacciones, caché local
 *
 * IndexedDB        → base de datos NoSQL en el navegador, ideal para grandes volúmenes de datos
 * indexedDB.open() → abre (o crea) la base de datos; onupgradeneeded se ejecuta la primera vez
 * objectStore      → colección de registros dentro de IndexedDB (equivalente a una tabla)
 * transacción      → operación atómica sobre IndexedDB; puede ser "readonly" o "readwrite"
 * async/await      → carga el JSON desde el servidor solo si la BD está vacía (caché)
 * almacen.getAll() → recupera todos los registros del almacén de una sola vez
 * almacen.clear()  → vacía el almacén para forzar una recarga desde el servidor
 */
let productos = [];
const categorias = [];

const selector = document.querySelector("#selector");
const contenedorPadre = document.querySelector("#padre");
const menorMayor = document.querySelector('#menorMayor');
const mayorMenor = document.querySelector('#mayorMenor');
const actualizar = document.querySelector('#actualizar');

let bd;
const nombreBD = "tiendaDB";
const almacenBD = "productos";

let cargando = document.createElement("p");
cargando.innerText = "Cargando...";
contenedorPadre.appendChild(cargando);

//Cuando se carga la pagina se llams a la funcion abrirBD
document.addEventListener("DOMContentLoaded", () => {
    abrirDB();
});

//Funcion que crea o abre la ndexedDB
function abrirDB() {

    // Abro la BD
    const respuesta = indexedDB.open(nombreBD, 1);

    respuesta.onupgradeneeded = (event) => {
        bd = event.target.result;
        // Creo el almacen si no existe
        if (!bd.objectStoreNames.contains(almacenBD)) {
            bd.createObjectStore(almacenBD, { keyPath: "id" });
        }
    };
    respuesta.onsuccess = (event) => {
        bd = event.target.result;
        comprobarProductos();
    };

    respuesta.onerror = () => {
        console.error("Error al abrir IndexedDB");
    };
}

//Funcion que comprueba si hay productos
function comprobarProductos() {

    //Hago una transaccion de lectura
    const transaccion = bd.transaction(almacenBD, "readonly");
    const almacen = transaccion.objectStore(almacenBD);

    // Obtenemos todos los productos
    const request = almacen.getAll();

    request.onsuccess = () => {

        // Hay datos en IndexedDB: los usamos directamente sin hacer fetch (caché local)
        if (request.result.length > 0) {
            productos = request.result;

            cargando.remove();
            verProductos(productos);
            cargarCategorias();

        } else {
            // No hay datos en IndexedDB por lo que lo cargo desde el JSON
            cargarDesdeJSON();
        }
    };
}

//Funcion que se encarga de de hacer un fetch al json y guardar en la BD
async function cargarDesdeJSON() {
    const respuesta = await fetch("./data/productos.json");
    const datos = await respuesta.json();

    productos = datos;

    // Transacción de escritura
    const transaccion = bd.transaction(almacenBD, "readwrite");
    const almacen = transaccion.objectStore(almacenBD);

    // Guardamos cada producto
    productos.forEach(producto => almacen.add(producto));

    transaccion.oncomplete = () => {
        cargando.remove();
        verProductos(productos);
        cargarCategorias();
    };
}

//Funcion que se encarga de mostrar los productos
function verProductos(listaProductos) {

    contenedorPadre.innerHTML = "";

    listaProductos.forEach(producto => {
        let div = crearDiv('hijo');

        crearH3(div, producto.nombre);
        crearP(div, "Precio: " + producto.precio);
        crearP(div, "Stock: " + producto.stock);
        crearP(div, "Categoría: " + producto.categoria);

        contenedorPadre.appendChild(div);
    });
}

//Funcion que se encarga de cargar las categorias 
function cargarCategorias() {

    productos.forEach(producto => {

        if (!categorias.includes(producto.categoria)) {
            categorias.push(producto.categoria);
            crearOpciones(selector, producto.categoria);
        }
    });
}

//Funcion que crea los div
function crearDiv(id) {
    const div = document.createElement('div');
    div.id = id;
    return div;
}

//Funcion que crea los p
function crearP(div, texto) {
    const p = document.createElement('p');
    p.textContent = texto;
    div.appendChild(p);
}

//Funcion que crea los h3
function crearH3(div, texto) {
    const h3 = document.createElement('h3');
    h3.textContent = texto;
    div.appendChild(h3);
}

//Funcion que crea las opciones
function crearOpciones(selector, texto) {
    const opcion = document.createElement('option');
    opcion.textContent = texto;
    selector.appendChild(opcion);
}

//Funcion que se encarga de aplicar los filtros
function aplicarFiltros(accion) {

    let productosFiltrados = [...productos];
    const categoriaSeleccionada = selector.value.toLowerCase();

    // Filtro por categoría
    if (categoriaSeleccionada !== "todas") {
        productosFiltrados = productosFiltrados.filter(
            producto => producto.categoria.toLowerCase() === categoriaSeleccionada
        );
    }

    // Ordeno por precio
    if (accion === "mayorMenor") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    } else if (accion === "menorMayor") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    }

    verProductos(productosFiltrados);
}

// Cambio de categoría
selector.addEventListener("change", () => {
    aplicarFiltros("");
});

// Ordenar de menor a mayor
menorMayor.addEventListener("click", () => {
    aplicarFiltros("menorMayor");
});

// Ordenar de mayor a menor
mayorMenor.addEventListener("click", () => {
    aplicarFiltros("mayorMenor");
});

// Fuerzo actualización del catálogo
actualizar.addEventListener("click", () => {

    // Borramos todos los registros del almacén para invalidar la caché local
    const transaccion = bd.transaction(almacenBD, "readwrite");
    const almacen = transaccion.objectStore(almacenBD);
    almacen.clear();

    transaccion.oncomplete = () => {
        // Reiniciamos la interfaz y volvemos a cargar desde el JSON remoto
        selector.innerHTML = "<option>Todas</option>";
        categorias.length = 0;
        contenedorPadre.innerHTML = "";
        cargarDesdeJSON();
    };
});
