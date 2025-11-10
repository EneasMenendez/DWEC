/**
 * Ejercicio 10 - Carrito de compra dinámico
 * Conceptos: array de objetos, Array.find, Array.reduce, actualización del DOM en tiempo real
 *
 * Array.find() → busca el primer elemento que cumpla la condición; devuelve el objeto
 *   directamente (por referencia), de modo que modificar productoExistente.cantidad
 *   actualiza el array original sin necesidad de splice ni índices
 * Array.reduce() → acumula el total sumando precio × cantidad de cada ítem en una sola
 *   pasada por el array; más declarativo que un bucle forEach con variable externa
 * innerHTML = '' → vaciado rápido del contenedor antes de re-renderizar todo el carrito;
 *   alternativa sencilla a llevar un diff del estado (suficiente para arrays pequeños)
 * toFixed(2) → formatea el total a dos decimales para evitar errores de coma flotante
 *   visibles al sumar precios decimales (ej: 0.1 + 0.2 = 0.30000000000000004)
 */

// Creo el array carrito vacio
const miCarrito = [];

//Selecciono los botones y elementos donde voy a mostrar el total y la lista
const botonesAgregar = document.querySelectorAll('.boton');
const listaDelCarrito = document.getElementById('lista-carrito');
const elementoTotal = document.getElementById('total');

// Recorro todos los botones y obtengo en cual se hizo el click
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        // Obtengo la informacion dle producto a agregar
        const tarjetaProducto = boton.parentElement;
        const nombreProducto = tarjetaProducto.querySelector('.nombre').textContent;
        const precioProducto = parseFloat(tarjetaProducto.querySelector('.precio span').textContent);

        // Compruebo si el producto ya esta en el carrito
        const productoExistente = miCarrito.find(item => item.nombre === nombreProducto);

        if (productoExistente) {
            // Si existe en el carrito aumento al cantidad
            productoExistente.cantidad++;
        } else {
            // Si no existe añadimos el nuevo articulo
            miCarrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
        }

        // Actualizar la lista del carrito y el total en pantalla
        mostrarCarrito();
        actualizarTotal();
    });
});

//Función para mostrar los productos en el carrito
function mostrarCarrito() {
    // vacio la lista
    listaDelCarrito.innerHTML = '';

    // Recorro los productos del carrito los agrgo a ala lista
    miCarrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} (x${item.cantidad}) - ${item.precio * item.cantidad} €`;
        listaDelCarrito.appendChild(li);
    });
}

// Función para calcular y mostrar el total del carrito
function actualizarTotal() {
    const totalCarrito = miCarrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
    elementoTotal.textContent = totalCarrito.toFixed(2);
}
