/**
 * Ejercicio 5 - Vista maestra de usuarios con sus pedidos y detalles completos
 * Conceptos: Promise.all(), async/await, try/catch, fetch() encadenado, .then() en paralelo
 *
 * Promise.all()   → carga usuarios, productos y pedidos al mismo tiempo, reduciendo el tiempo de espera
 * await separado  → cargarDetallesPedidos se lanza independientemente, también con await
 * select dinámico → se construye en JS insertando <option> por cada usuario del JSON
 * .find()         → localiza el producto correspondiente a cada línea de detalle de pedido
 * precioTotal     → se acumula recorriendo los detalles con suma directa (alternativa a .reduce)
 * formatearFecha  → desestructura el string "YYYY-MM-DD" y lo reordena a "DD/MM/YYYY"
 */

let usuarios = [], productos = [], pedidos = [], select, detalles_Pedido = [];
let contenedorPadre = '', fieldsetDatosUsuario, fieldsetDatosPedido;

//Funcion que se encarga de cargar los datos de los json
async function cargarDatos() {
    document.body.innerHTML = "";
    let cargando = document.createElement("p");
    cargando.innerText = "Cargando datos del maestros";
    document.body.appendChild(cargando);
    try {
        // Promise.all carga las tres fuentes de datos en paralelo para optimizar el tiempo de carga
        const [respuesta1, respuesta2, respuesta3] = await Promise.all([
            fetch("./data/usuarios.json"),
            fetch("./data/productos.json"),
            fetch("./data/pedidos.json")
        ]);
        usuarios = await respuesta1.json();
        productos = await respuesta2.json();
        pedidos = await respuesta3.json();
        setTimeout(() => {
            cargando.remove();

        }, 1000);
    } catch (error) {
        // Si alguna de las tres peticiones falla, Promise.all rechaza y se captura aquí
        console.log(error);
    }
}

await cargarDatos();
select = crearSelect();
añadirOpcionesSelect(select);


//Función para cargar los detalles de los Pedidos
async function cargarDetallesPedidos(ruta) {
    // Aunque la función es async, aquí se usa .then() en lugar de await: ambos estilos son válidos
    fetch(ruta)
        .then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            detalles_Pedido = datos;
        })
        .catch((error) => {
            console.log(error);
        })
}
await cargarDetallesPedidos("./data/detalles_pedido.json");

//Funcion para añadir las opciones al Select
function añadirOpcionesSelect(select) {
    crearOpcionesSelect(select, "todas", "Selecciona un Usuario");
    usuarios.map((usuario) => {
        crearOpcionesSelect(select, usuario.id, usuario.nombre);
    });
}

//Cuando el select cambia se cargar los pedidos de dicho usuario
select.addEventListener('change', function () {
    if (contenedorPadre !== '')
        contenedorPadre.innerHTML = "";
    contenedorPadre = crearDiv("padre");
    if (select.selectedIndex !== 0) {

        mostrarDatosPedidoUsuario(this.value);
    }

});

//Funcion que muestra los datos del usuario junto con sus pedidos 
async function mostrarDatosPedidoUsuario(idUsuario) {
    let precioTotal = 0, cont = 0;

    //Recorro los datos del Usuario
    usuarios.map((usuario) => {

        if (usuario.id.toString() === idUsuario) {
            fieldsetDatosUsuario = crearFieldset();
            crearH2(fieldsetDatosUsuario, "Datos Usuario");
            crearP(fieldsetDatosUsuario, `Nombre: ${usuario.nombre}`);
            crearP(fieldsetDatosUsuario, `Email: ${usuario.email}`);
            crearP(fieldsetDatosUsuario, `Fecha Registro: ${formatearFecha(usuario.fechaRegistro)}`);

        }
    });

    fieldsetDatosPedido = crearFieldset();

    //Recorro los pedidos
    pedidos.map((pedido) => {
        if (pedido.usuarioId.toString() === idUsuario) {
            cont++;
            crearH2(fieldsetDatosPedido, "Datos Pedido "+cont);
            crearP(fieldsetDatosPedido, `ID Pedido: ${pedido.id}`);
            crearP(fieldsetDatosPedido, `Fecha: ${formatearFecha(pedido.fecha)}`);

            detalles_Pedido.map((detalle) => {
                if (detalle.pedidoId === pedido.id) {
                    crearH3(fieldsetDatosPedido, "Detalles");

                    let producto = productos.find((producto) => {
                        if (detalle.productoId === producto.id)
                            return producto;
                    });

                    precioTotal += detalle.precioUnitario * detalle.cantidad;

                    crearP(fieldsetDatosPedido, `Nombre: ${producto.nombre}`);
                    crearP(fieldsetDatosPedido, `Cantidad: ${detalle.cantidad}`);
                    crearP(fieldsetDatosPedido, `Precio Unitario: ${detalle.precioUnitario}`);
                    crearHr(fieldsetDatosPedido);

                }
            })
            crearHr(fieldsetDatosPedido);
        }
    });
    crearH3(fieldsetDatosPedido, "Gasto Total Pedido");
    crearP(fieldsetDatosPedido, `Total Pedido: ${precioTotal}`);

}

//Función que formatea las fechas
function formatearFecha(fecha) {
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
}

//Función que crea el select
function crearSelect() {
    const select = document.createElement('select');
    document.body.appendChild(select);
    return select;
}

//Funcion que crea las opciones del select
function crearOpcionesSelect(select, id, texto) {
    const opcion = document.createElement("option");
    opcion.textContent = texto;
    opcion.value = id;
    select.appendChild(opcion);
}

//Función que crea el fielset
function crearFieldset() {
    const fieldset = document.createElement('fieldset');
    contenedorPadre.appendChild(fieldset);
    return fieldset;
}

//Funcion que crea los h2
function crearH2(fieldset, texto) {
    const h2 = document.createElement('h2');
    h2.textContent = texto;
    fieldset.appendChild(h2);
}
//Funcion que crea los h3
function crearH3(fieldset, texto) {
    const h3 = document.createElement('h3');
    h3.textContent = texto;
    fieldset.appendChild(h3);
}

//Función que crea los p
function crearP(fieldset, texto) {
    const p = document.createElement('p');
    p.textContent = texto;
    fieldset.appendChild(p);
}
//Funcion que crea el div
function crearDiv(id) {
    const div = document.createElement('div');
    div.id = id;
    document.body.appendChild(div);
    return div;
}

//Función para crear hr
function crearHr(fieldset) {
    const Hr = document.createElement('hr');
    fieldset.appendChild(Hr);

}