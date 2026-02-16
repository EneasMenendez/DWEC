/**
 * Ejercicio 14-1 - Catálogo de productos con filtros y persistencia de tema
 * Conceptos: async/await, fetch, renderizado dinámico, filtrado, ordenación, sessionStorage
 *
 * async/await     → permite escribir código asíncrono de forma secuencial y legible
 * fetch           → API del navegador para hacer peticiones HTTP (carga el JSON)
 * .then()/.catch()→ encadenamiento de promesas para manejar éxito y error
 * sessionStorage  → almacenamiento temporal que persiste solo durante la sesión del navegador
 * Array.filter()  → crea un nuevo array con los elementos que cumplan la condición
 * Array.sort()    → ordena el array según la función comparadora recibida (a-b o b-a)
 */
let productos = [];

cargarProductos("./data/productos.json");
const categorias = [];
const selector = document.querySelector("#selector");
const contenedorPadre = document.querySelector("#padre");
const menorMayor = document.querySelector('#menorMayor');
const mayorMenor = document.querySelector('#mayorMenor');
const temaClaro = document.querySelector("#claro");
const temaOscuro = document.querySelector("#oscuro");

// Recuperamos el tema guardado en la sesión anterior (si existe)
let temaSessionStorage = sessionStorage.getItem('tema');

// Aplicamos la clase CSS del tema al body antes de renderizar nada
if (temaSessionStorage !== null && temaSessionStorage !== '')
    document.body.classList.add(temaSessionStorage);



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

temaClaro.addEventListener('click', function () {
    cambiarTema('claro');
})
temaOscuro.addEventListener('click', function () {
    cambiarTema('oscuro');
})

function cambiarTema(tema) {
    // Guardamos el tema en sessionStorage para que persista durante la sesión
    sessionStorage.setItem('tema', tema);
    console.log(sessionStorage.getItem('tema'));
    // Intercambiamos las clases CSS para aplicar el tema visualmente
    if (tema === 'claro') {
        document.body.classList.remove("oscuro");
        document.body.classList.add("claro");
    } else {
        document.body.classList.remove("claro");
        document.body.classList.add("oscuro");
    }
}
