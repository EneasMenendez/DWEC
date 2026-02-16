/**
 * Ejercicio 14-3 - Panel de pedidos con carga paralela y cookies de visita
 * Conceptos: async/await, Promise.all, try/catch, combinación de datos, cookies
 *
 * async/await      → permite escribir operaciones asíncronas de forma secuencial
 * Promise.all()    → lanza varias peticiones fetch en paralelo y espera a que todas terminen
 * try/catch        → captura errores en bloques async para evitar que la app se rompa
 * Array.map()      → transforma cada pedido añadiéndole sus detalles y el total calculado
 * Array.filter()   → selecciona los detalles que pertenecen a cada pedido concreto
 * Array.reduce()   → acumula el total del pedido sumando precio × cantidad de cada línea
 * cookies          → almacenamiento en el navegador para guardar la fecha de última visita
 * document.cookie  → API nativa para leer y escribir cookies con fecha de expiración
 */
let productos = [], pedidos = [], detallesPedido = [], pedidosActualizado = [];

let contenedorPadre = document.querySelector("#padre");
let cargando = document.createElement("p");
cargando.innerText = "Cargando datos del panel…";
document.body.appendChild(cargando);
let botonCerrar;
let divMensaje;

//Obtengo la cookie 
const ultimaVisita = obtenerCookie("ultimaVisita");
if (ultimaVisita) {
    mostrarMensajeBienvenida(ultimaVisita);
}
const fechaActual = new Date();
crearActualizarCookie("ultimaVisita", fechaActual.toLocaleString(), 30)

//Funcion que se encarga de cargar los datos de los json
async function cargarPanel() {

    try {
        // Promise.all lanza las tres peticiones al mismo tiempo (en paralelo)
        // y devuelve un array con las tres respuestas cuando todas han terminado
        const [respuesta1, respuesta2, respuesta3] = await Promise.all([
            fetch("./data/productos.json"),
            fetch("./data/pedidos.json"),
            fetch("./data/detalles_pedido.json")
        ]);
        productos = await respuesta1.json();
        pedidos = await respuesta2.json();
        detallesPedido = await respuesta3.json();
        setTimeout(() => {
            cargando.remove();
        }, 1000);
    } catch (error) {
        // Si cualquiera de las peticiones falla, el error se captura aquí
        console.log(error);
    }
}

await cargarPanel();
combinarDatos();
verPedidos(pedidosActualizado);

//Funcion que combina los datos
function combinarDatos() {
    //Recorro todos los pedisos
    pedidosActualizado = pedidos.map((pedido) => {

        //Usando el filter obtego los detalles para el pedido que se esta pasando en este moemento
        let detallesFiltrados = detallesPedido.filter((detalle) => {

            if (pedido.id === detalle.pedidoId)
                return detalle;
        });

        //Recorro los detalles productos, añadiendoles el nombre del producto
        let detallesCompletos = detallesFiltrados.map((detalle) => {
            let producto = productos.find((producto) => {
                if (detalle.productoId === producto.id)
                    return producto;
            });
            return {
                cantidad: detalle.cantidad,
                precioUnitario: detalle.precioUnitario,
                nombreProducto: producto.nombre
            }
        });


        //Calculo el total del pedido
        let totalPedido = detallesCompletos.reduce((acumulador, detalle) => {
            return acumulador + detalle.precioUnitario * detalle.cantidad;
        }, 0);


        //Devuelvo los pedidos
        return {
            ...pedido,
            detalles: detallesCompletos,
            total: totalPedido
        }


    });

}



//Funcion para mostrar los productos 
function verPedidos(pedidosActualizado) {

    pedidosActualizado.map((pedido) => {

        let div = crearDiv('hijo');
        crearP(div, "ID Pedido: " + pedido.id);
        crearP(div, "Fecha: " + formatearFecha(pedido.fecha));
        crearP(div, "Estado: " + pedido.estado);
        crearP(div, "Total Pedido: " + pedido.total + "€");


        crearH2(div, "Detalles Pedido");
        let ul = crearUl(div, "lista");

        pedido.detalles.map((detalle) => {

            crearLi(ul, `${detalle.cantidad} x ${detalle.nombreProducto} - ${detalle.precioUnitario} €`);

        });



        contenedorPadre.appendChild(div);

    });

}

//Función que formatea las fechas
function formatearFecha(fecha) {
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
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

//Funcion para crear las listas
function crearUl(div, id) {
    const ul = document.createElement('ul');
    ul.id = id;
    div.appendChild(ul);
    return ul;
}
//Funcion que crea los h4
function crearH2(div, texto) {
    const h2 = document.createElement('h2');
    h2.textContent = texto;
    div.appendChild(h2);
}
//Función que crea los items
function crearLi(ul, texto) {
    const li = document.createElement('li');
    li.textContent = texto;
    ul.appendChild(li);
}

//Función para obtener el valor de una cookie por su nombre
function obtenerCookie(nombre) {
    const valor = document.cookie.split('; ').find(row => row.startsWith(nombre + '='));
    return valor ? decodeURIComponent(valor.split('=')[1]) : null;
}

//Funcion que crea o actualiza una cookie
function crearActualizarCookie(nombre, valor, dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${fecha.toUTCString()}; path=/`;
}

//Funcion para mostrar el mensaje de Bienvenida

function mostrarMensajeBienvenida(fechaUltimaVisita) {
    divMensaje = crearDiv('mensajeBienvenida');

    crearP(divMensaje, "Bienvenido de nuevo. Tu última visita fue el " + fechaUltimaVisita);
    crearBotones(divMensaje, "cerrar", "Cerrar");
    document.body.appendChild(divMensaje);
    botonCerrar = document.querySelector("#cerrar");
}

botonCerrar.addEventListener('click', function () {
    divMensaje.style.display = "none";
})
//Función que crea los botones
function crearBotones(contenedor, id, texto) {
    const boton = document.createElement('button');
    boton.id = id;
    boton.textContent = texto;
    contenedor.appendChild(boton);
}
