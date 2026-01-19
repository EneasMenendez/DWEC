/**
 * Ejercicio 1 - Catálogo de productos con filtros y ordenación
 * Conceptos: fetch(), Promesas, cadenas .then(), .catch(), async/await, manipulación del DOM
 *
 * fetch()      → realiza una petición HTTP y devuelve una Promesa
 * .then()      → se ejecuta cuando la Promesa se resuelve con éxito
 * .catch()     → captura cualquier error que ocurra en la cadena de Promesas
 * async/await  → sintaxis alternativa a .then() para escribir código asíncrono más legible
 * setTimeout   → retrasa la ejecución de una función un número de milisegundos
 * .filter()    → devuelve un nuevo array solo con los elementos que cumplen la condición
 * .sort()      → ordena un array; con función comparadora (a,b) => a-b ordena de menor a mayor
 */

let productos = [];

cargarProductos("./data/productos.json");
const categorias = [];
const selector = document.querySelector("#selector");
const contenedorPadre = document.querySelector("#padre");
const menorMayor = document.querySelector('#menorMayor');
const mayorMenor = document.querySelector('#mayorMenor');


let cargando = document.createElement("p");
cargando.innerText = "Cargando…";
contenedorPadre.appendChild(cargando);
//Función para cargar los productos
async function cargarProductos(ruta) {
    // Se mezcla async/await con .then(): el await espera a que toda la cadena .then()/.catch() resuelva
    await fetch(ruta)
        .then((respuesta) => {
            return respuesta.json(); // convierte el stream HTTP en objeto JS
        }).then((datos) => {
            productos = datos;
            // setTimeout simula un retardo de carga para mostrar el mensaje "Cargando…" al menos 1 segundo
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

//Funcion para crear las opciones del select
function crearOpciones(selector, texto) {
    const opcion = document.createElement('option');
    opcion.textContent = texto;
    selector.appendChild(opcion);

}


//Aplico los filtros
function aplicarFiltros(accion) {
    contenedorPadre.innerHTML = "";
    let productosFiltrados = productos; // copia de referencia; se filtra/ordena sin mutar el array original
    const categoriaSeleccionada = selector.value.toLocaleLowerCase();

    if (categoriaSeleccionada !== '' && categoriaSeleccionada !== 'todas') {
        productosFiltrados = productosFiltrados.filter((producto) => {
            if (producto.categoria.toLocaleLowerCase() === categoriaSeleccionada)
                return producto;

        });
    }

    // .sort() con función comparadora: b-a ordena descendente (mayor a menor precio)
    if (accion === "mayorMenor") {
        productosFiltrados = productosFiltrados.sort((a, b) => b.precio - a.precio);

    } else {
        // a-b ordena ascendente (menor a mayor precio)
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