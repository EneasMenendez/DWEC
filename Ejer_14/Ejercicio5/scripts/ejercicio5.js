/**
 * Ejercicio 14-5 - Carrito de compra persistente con IndexedDB
 * Conceptos: async/await, fetch, IndexedDB, transacciones readwrite, carrito persistente
 *
 * IndexedDB         → base de datos del navegador que persiste entre sesiones del usuario
 * objectStore       → almacén de objetos indexado por clave (aquí "productoId")
 * almacen.get()     → recupera un registro concreto por su clave primaria
 * almacen.add()     → inserta un nuevo registro (falla si la clave ya existe)
 * almacen.put()     → actualiza un registro existente (upsert)
 * almacen.delete()  → elimina un registro por su clave primaria
 * transaccion.oncomplete → callback que se dispara cuando la transacción termina con éxito
 * async/await       → carga asíncrona del catálogo de productos desde el JSON
 */
let productos = [];
let categorias = [];

const selector = document.querySelector("#selector");
const contenedorPadre = document.querySelector("#padre");
const menorMayor = document.querySelector("#menorMayor");
const mayorMenor = document.querySelector("#mayorMenor");
const seccionCarrito = document.querySelector("#carrito");

let db;

let cargando = document.createElement("p");
cargando.textContent = "Cargando...";
contenedorPadre.appendChild(cargando);

//Inicializo IndexedDb
const request = indexedDB.open("tiendaDB", 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;

    // Creo el almacen 
    if (!db.objectStoreNames.contains("carrito")) {
        db.createObjectStore("carrito", {
            keyPath: "productoId"
        });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
    mostrarCarrito();
};

request.onerror = () => {
    console.error("Error al abrir IndexedDB");
};


cargarProductos("./data/productos.json");
//Funcion que se encarga de cargar los productos del json
async function cargarProductos(ruta) {
    await fetch(ruta)
        .then(respuesta => respuesta.json())
        .then(datos => {
            productos = datos;

            setTimeout(() => {
                cargando.remove();
                verProductos(productos);
                cargarCategorias();
            }, 1000);
        })
        .catch(error => console.log(error));
}

//Funcion que se encarga de mostrar los productos
function verProductos(listaProductos) {
    contenedorPadre.innerHTML = "";

    listaProductos.forEach(producto => {
        const div = crearDiv("hijo");

        crearH3(div, producto.nombre);
        crearP(div, "Precio: " + producto.precio);
        crearP(div, "Stock: " + producto.stock);
        crearP(div, "Categoría: " + producto.categoria);

        crearBotones(div, "agregar", "Añadir al carrito", producto.id);

        contenedorPadre.appendChild(div);
    });
}

//Funcion que se encarga de cargar las categorías
function cargarCategorias() {
    productos.forEach(producto => {
        if (!categorias.includes(producto.categoria)) {
            categorias.push(producto.categoria);
            crearOpciones(selector, producto.categoria);
        }
    });
}

//Funcion que se encarga de crear los div
function crearDiv(id) {
    const div = document.createElement("div");
    div.id = id;
    return div;
}

//Funcion que se encarga de crear los p
function crearP(contenedor, texto) {
    const p = document.createElement("p");
    p.textContent = texto;
    contenedor.appendChild(p);
}

//Funciones que se encarga de crear los H3
function crearH3(contenedor, texto) {
    const h3 = document.createElement("h3");
    h3.textContent = texto;
    contenedor.appendChild(h3);
}

//Funcion que se encarga de crear las opciones
function crearOpciones(selector, texto) {
    const opcion = document.createElement("option");
    opcion.textContent = texto;
    selector.appendChild(opcion);
}

//Funcion que se encarga de crear los borones
function crearBotones(contenedor, accion, texto, idProducto = null) {
    const boton = document.createElement("button");
    boton.textContent = texto;

    boton.addEventListener("click", () => {

        if (accion === "agregar") {
            agregarAlCarrito(idProducto);
        }

        if (accion === "sumar") {
            modificarCantidad(idProducto, 1);
        }

        if (accion === "restar") {
            modificarCantidad(idProducto, -1);
        }

        if (accion === "eliminar") {
            eliminarProducto(idProducto);
        }

    });

    contenedor.appendChild(boton);
}

//Funcion que se encarga de aplicar los filtros y ordenar los productos
function aplicarFiltros(accion) {
    let productosFiltrados = [...productos];
    const categoriaSeleccionada = selector.value.toLowerCase();

    if (categoriaSeleccionada !== "todas") {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.categoria.toLowerCase() === categoriaSeleccionada
        );
    }

    if (accion === "menorMayor") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    }

    if (accion === "mayorMenor") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    verProductos(productosFiltrados);
}

selector.addEventListener("change", () => aplicarFiltros(""));
menorMayor.addEventListener("click", () => aplicarFiltros("menorMayor"));
mayorMenor.addEventListener("click", () => aplicarFiltros("mayorMenor"));

//Funcion que se encarga de añadir los productos al carrito
function agregarAlCarrito(idProducto) {
    const transaccion = db.transaction(["carrito"], "readwrite");
    const almacen = transaccion.objectStore("carrito");

    // Buscamos si el producto ya existe en el carrito de IndexedDB
    const peticion = almacen.get(idProducto);

    peticion.onsuccess = () => {
        const producto = peticion.result;

        if (!producto) {
            // El producto no estaba en el carrito: lo añadimos con cantidad 1
            almacen.add({
                productoId: idProducto,
                cantidad: 1
            });
        } else {
            // El producto ya existe: incrementamos su cantidad y actualizamos el registro
            producto.cantidad++;
            almacen.put(producto);
        }
    };

    // Cuando la transacción termina, actualizamos la vista del carrito
    transaccion.oncomplete = () => mostrarCarrito();
}

//Funcion que se encarga de mostrar los productos del carrito
function mostrarCarrito() {
    seccionCarrito.innerHTML = "";

    const transaccion = db.transaction(["carrito"], "readonly");
    const almacen = transaccion.objectStore("carrito");
    const peticion = almacen.getAll();

    peticion.onsuccess = () => {
        const carrito = peticion.result;

        if (carrito.length === 0) {
            crearP(seccionCarrito, "El carrito está vacío");
            return;
        }

        let total = 0;

        carrito.forEach(item => {
            const producto = productos.find(p => p.id === item.productoId);
            if (!producto) return;

            const div = crearDiv("productoCarrito");

            crearH3(div, producto.nombre);
            crearP(div, "Precio: " + producto.precio);
            crearP(div, "Cantidad: " + item.cantidad);

            total += producto.precio * item.cantidad;

            crearBotones(div, "sumar", "+", item.productoId);
            crearBotones(div, "restar", "-", item.productoId);
            crearBotones(div, "eliminar", "X", item.productoId);

            seccionCarrito.appendChild(div);
        });

        crearP(seccionCarrito, "Total: " + total);
    };
}

//Funcion que se encarga de mostrar la cantidad de los productos del carrito
function modificarCantidad(idProducto, cambio) {
    const transaccion = db.transaction(["carrito"], "readwrite");
    const almacen = transaccion.objectStore("carrito");

    const peticion = almacen.get(idProducto);

    peticion.onsuccess = () => {
        const producto = peticion.result;
        if (!producto) return;

        // cambio es +1 (sumar) o -1 (restar)
        producto.cantidad += cambio;

        // Si la cantidad llega a 0 o menos, eliminamos el producto del carrito
        if (producto.cantidad <= 0) {
            almacen.delete(idProducto);
        } else {
            almacen.put(producto);
        }
    };

    transaccion.oncomplete = () => mostrarCarrito();
}

//Funcion que e encarga de eliminar un producto
function eliminarProducto(idProducto) {
    const transaccion = db.transaction(["carrito"], "readwrite");
    const almacen = transaccion.objectStore("carrito");

    almacen.delete(idProducto);

    transaccion.oncomplete = () => mostrarCarrito();
}
