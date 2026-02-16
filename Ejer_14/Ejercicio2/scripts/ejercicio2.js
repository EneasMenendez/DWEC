/**
 * Ejercicio 14-2 - Catálogo con carrito de compra persistente en localStorage
 * Conceptos: async/await, fetch, localStorage, carrito de compra, renderizado dinámico
 *
 * async/await      → función asíncrona que espera la respuesta del fetch antes de continuar
 * fetch            → solicitud HTTP para obtener el JSON de productos desde el servidor
 * localStorage     → almacenamiento permanente en el navegador (sobrevive al cierre de pestaña)
 * JSON.parse/stringify → serialización del carrito para guardarlo y leerlo de localStorage
 * Array.find()     → devuelve el primer elemento que cumple la condición (busca producto por id)
 * Array.filter()   → filtra productos por categoría seleccionada
 * Array.sort()     → ordena los productos por precio ascendente o descendente
 */
let productos = [];

cargarProductos("./data/productos.json");
const categorias = [];
const selector = document.querySelector("#selector");
const contenedorPadre = document.querySelector("#padre");
const menorMayor = document.querySelector('#menorMayor');
const mayorMenor = document.querySelector('#mayorMenor');
const seccionCarrito = document.querySelector('#carrito');
// Intentamos recuperar el carrito guardado; si no existe usamos un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (carrito.length === 0)
    crearP(seccionCarrito, "El carrito está vacío");

let cargando = document.createElement("p");
cargando.innerText = "Cargando…";
contenedorPadre.appendChild(cargando);
//Función para cargar los productos
async function cargarProductos(ruta) {
    await fetch(ruta)
        .then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            productos = datos;
            setTimeout(() => {
                cargando.remove();
                verProductos(productos);
                cargarCategorias();
            }, 1000);

        })
        .catch((error) => {
            console.log(error);
        })

}

//Funcion para mostrar los productos 
function verProductos(productos) {

    productos.map((producto) => {
        let div = crearDiv('hijo');
        crearH3(div, producto.nombre);
        crearP(div, "Precio: " + producto.precio);
        crearP(div, "Stock: " + producto.stock);
        crearP(div, "Categoría: " + producto.categoria);
        crearBotones(div, producto.id, "Añadir al carrito");
        contenedorPadre.appendChild(div);
    });
}

//Función para cargar las categorias
function cargarCategorias() {
    productos.map((producto) => {

        if (!categorias.includes(producto.categoria)) {
            categorias.push(producto.categoria);
            crearOpciones(selector, producto.categoria);
        }

    });
}

//Función que crea los div
function crearDiv(id) {
    const div = document.createElement('div');
    div.id = id;
    return div;
}

//Función que crea los p
function crearP(contenedor, texto) {
    const p = document.createElement('p');
    p.textContent = texto;
    contenedor.appendChild(p);
}

//Función que crea los botones
function crearBotones(contenedor, id, texto) {
    const boton = document.createElement('button');
    boton.id = id;
    boton.className = "carrito";
    boton.textContent = texto;
    boton.addEventListener("click", () => {
        if (id === "vaciar") {
            vaciarCarrito();
        } else {
            agregarAlCarrito(id);
        }
    });
    contenedor.appendChild(boton);
}


//Funcion que crea los h3
function crearH3(contenedor, texto) {
    const h3 = document.createElement('h3');
    h3.textContent = texto;
    contenedor.appendChild(h3);
}

//Funcion para crear las opciones del select
function crearOpciones(selector, texto) {
    const opcion = document.createElement('option');
    opcion.textContent = texto;
    selector.appendChild(opcion);

}


//Aplico los filtros
function aplicarFiltros(accion) {
    contenedorPadre.innerHTML = "";
    let productosFiltrados = productos;
    const categoriaSeleccionada = selector.value.toLocaleLowerCase();

    if (categoriaSeleccionada !== '' && categoriaSeleccionada !== 'todas') {
        productosFiltrados = productosFiltrados.filter((producto) => {
            if (producto.categoria.toLocaleLowerCase() === categoriaSeleccionada)
                return producto;

        });
    }

    if (accion === "mayorMenor") {
        productosFiltrados = productosFiltrados.sort((a, b) => b.precio - a.precio);

    } else {
        productosFiltrados = productosFiltrados.sort((a, b) => a.precio - b.precio);
    }


    verProductos(productosFiltrados);
}
selector.addEventListener("change", function () {
    aplicarFiltros("");
});

menorMayor.addEventListener("click", function () {
    aplicarFiltros("menorMayor")
});
mayorMenor.addEventListener("click", function () {
    aplicarFiltros("mayorMenor")
});

//Funcion que añade los productos al carrito

function agregarAlCarrito(idProducto) {
    const producto = productos.find(producto => producto.id === idProducto);
    const productoEnCarrito = carrito.find(producto => producto.id === idProducto);

    if (productoEnCarrito) {
        // El producto ya está en el carrito: incrementamos cantidad si hay stock
        if (productoEnCarrito.cantidad < producto.stock) {
            productoEnCarrito.cantidad++;
        } else {
            alert("No hay más Stock de este producto");
            return;
        }
    } else {
        // El producto es nuevo en el carrito: lo añadimos con cantidad 1
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    // Persistimos el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}


//Funcion para mostar los datos del carrito

function mostrarCarrito() {
    seccionCarrito.innerHTML = "";
    if (carrito.length === 0) {
        crearP(seccionCarrito, "El carrito está vacío");
        return;
    }

    let total = 0;

    carrito.forEach(producto => {
        const div = crearDiv('productoCarrito');
        crearH3(div, producto.nombre);
        crearP(div, "Precio: " + producto.precio);
        crearP(div, "Cantidad: " + producto.cantidad);

        total += producto.precio * producto.cantidad;
        seccionCarrito.appendChild(div);
    });

    crearP(seccionCarrito, "Total: " + total);
    crearBotones(seccionCarrito, "vaciar", "Vaciar Carrito");
}


//Vaciar el carrito

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    seccionCarrito.innerHTML = "";
    crearP(seccionCarrito, "El carrito está vacío");
}