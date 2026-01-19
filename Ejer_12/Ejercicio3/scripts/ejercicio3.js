/**
 * Ejercicio 3 - Formulario de alta de producto con validación de SKU asíncrona
 * Conceptos: fetch(), async/await, validación de formularios, .some(), manejo de estados
 *
 * fetch()      → carga el catálogo de productos para comprobar si el SKU ya existe
 * async/await  → permite esperar la respuesta del servidor antes de continuar la validación
 * .some()      → comprueba si al menos un elemento del array cumple la condición (SKU repetido)
 * .blur event  → se dispara cuando un campo pierde el foco, ideal para validar al salir del input
 * skuValido    → bandera booleana que indica si el SKU pasó la validación asíncrona
 * validandoSKU → bandera que evita enviar el formulario mientras la validación está en curso
 */

const nombreProducto = document.querySelector('#nombre');
const sku = document.querySelector('#sku');
const precio = document.querySelector('#precio');
const stock = document.querySelector('#stock');
const categoria = document.querySelector('#categoria');
const boton = document.querySelector('#guardar');
const mensaje = document.querySelector('#mensaje');

let errores = [];
let productos = [];
let skuValido = false;
let validandoSKU = false;

nombreProducto.addEventListener('blur', comprobarInputs);
precio.addEventListener('blur', comprobarInputs);
stock.addEventListener('blur', comprobarInputs);
categoria.addEventListener('blur', comprobarInputs);
sku.addEventListener('blur', validarSKU);

//Funcion para validar los inputs
function comprobarInputs() {
    errores = [];
    mensaje.innerHTML = "";

    if (nombreProducto.value === "") {
        errores.push("El nombre no puede ser nulo");
    }

    if (precio.value === "" || Number(precio.value) <= 0) {
        errores.push("El precio debe ser mayor que 0");
    }

    if (stock.value === "" || Number(stock.value) < 0) {
        errores.push("El stock debe ser 0 o mayor");
    }

    if (categoria.value === "") {
        errores.push("La categoría no puede ser nula");
    }

    errores.forEach(error => {
        crearP(error, "error");
    });

    boton.disabled = errores.length > 0 || !skuValido || validandoSKU;
}

//Funcion para validar SKU
async function validarSKU() {
    skuValido = false;

    if (sku.value.trim() === "") {
        errores.push("El SKU no puede ser nulo");
        //crearP("", "error");
        boton.disabled = true;
        return;
    }

    if (sku.value.length < 5) {
        crearP("La longitud del SKU debe ser al menos 5 caracteres", "error");
        boton.disabled = true;
        return;
    }

    crearP("Validando SKU...");
    validandoSKU = true;  // bloquea el botón mientras se espera la respuesta
    boton.disabled = true;

    // Solo carga el JSON la primera vez; las siguientes validaciones reutilizan el array en memoria
    if (productos.length === 0) {
        await cargarProductos('../data/productos.json');
    }

    mensaje.innerHTML = "";

    // .some() devuelve true en cuanto encuentra un SKU que coincida; más eficiente que .filter()
    const existe = productos.some(p => p.sku === sku.value);

    if (existe) {
        crearP("El SKU ya existe", "error");
        skuValido = false;
    } else {
        skuValido = true;
    }

    validandoSKU = false;
    comprobarInputs();
}

//Función para crear los productos
async function cargarProductos(ruta) {

    await fetch(ruta)
        .then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            productos = datos;
        })
        .catch((error) => {
            console.log(error);
        })

}

//Funcion para crear p
function crearP(texto, id) {
    const p = document.createElement('p');
    p.textContent = texto;
    p.id = id;
    mensaje.appendChild(p);
}

boton.addEventListener('click', (event) => {
    event.preventDefault();
    mensaje.innerHTML = "";
    if (skuValido === true) {
        limpiarInputs();
        crearP(`Producto ${nombreProducto.value} guardado correctamente`, "guardado");
    }
})

//Funcion  para limpiar los inputs
function limpiarInputs() {
    nombreProducto.value = "";
    precio.value = "";
    stock.value = "";
    categoria.value = "";
    sku.value = "";
}