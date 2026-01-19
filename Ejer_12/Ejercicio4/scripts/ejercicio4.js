/**
 * Ejercicio 4 - Panel de pedidos con datos combinados de tres fuentes JSON
 * Conceptos: Promise.all(), async/await, try/catch, .map(), .filter(), .reduce(), spread operator
 *
 * Promise.all()    → lanza varias peticiones fetch en paralelo y espera a que todas terminen
 * try/catch        → captura errores en código async/await (equivalente a .catch() en Promesas)
 * .map()           → transforma cada elemento de un array y devuelve un nuevo array
 * .filter()        → filtra los detalles que pertenecen al pedido actual
 * .reduce()        → acumula valores; aquí suma el precio total de cada pedido
 * spread (...)     → copia todas las propiedades de un objeto y añade las nuevas (detalles, total)
 */

let productos = [], pedidos = [], detallesPedido = [], pedidosActualizado = [];

let contenedorPadre = document.querySelector("#padre");
let cargando = document.createElement("p");
cargando.innerText = "Cargando datos del panel…";
document.body.appendChild(cargando);

//Funcion que se encarga de cargar los datos de los json
async function cargarPanel() {

    try {
        // Promise.all lanza los tres fetch a la vez; la desestructuración asigna cada respuesta a su variable
        const [respuesta1, respuesta2, respuesta3] = await Promise.all([
            fetch("./data/productos.json"),
            fetch("./data/pedidos.json"),
            fetch("./data/detalles_pedido.json")
        ]);
        // Cada .json() es también una Promesa; await convierte la respuesta HTTP en objeto JS
        productos = await respuesta1.json();
        pedidos = await respuesta2.json();
        detallesPedido = await respuesta3.json();
        setTimeout(() => {
            cargando.remove();
        }, 1000);
    } catch (error) {
        // Si cualquier fetch falla, Promise.all rechaza y el catch captura el error
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


        // .reduce() suma precio*cantidad de cada línea; el 0 es el valor inicial del acumulador
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
