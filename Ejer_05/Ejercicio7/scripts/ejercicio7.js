/**
 * Ejercicio 7 - Carrito de la compra con clonación de nodos y cálculo de total
 * Conceptos: cloneNode, dataset.price, parseFloat, toFixed, createElement, remove
 *
 * cloneNode(true)  → copia el elemento <li> del producto con todos sus hijos incluidos
 * dataset.price    → almacena el precio en el propio nodo para poder sumarlo sin
 *                    consultar de nuevo el DOM al recalcular el total
 * toFixed(2)       → formatea el total con siempre dos decimales para moneda
 */

// Guardamos todos los botones Añadir al carrito
const botones = document.querySelectorAll('.add-btn');
// Obtenemos el carrito
const carrito = document.querySelector('#carrito');
// Obtenemos el total
const total = document.querySelector('#total');

/* 2. Crea una función calcularTotal() que recorra todos 
los <li> del carrito, lea sus data-price, los sume y actualice
el textContent del span#total. */
function calcularTotal() {
    let suma = 0;
    // Recorremos todos los li del carrito y calculamos el total de los productos
    carrito.querySelectorAll('li').forEach((articulo) => {
        const precio = parseFloat(articulo.dataset.price);
        suma += precio;
    });
    // Actualizamos el total en el HTML con 2 decimales
    total.textContent = suma.toFixed(2);
}

/* 1. Al hacer clic en “Añadir al carrito”, clona el <li> 
del producto (cloneNode(true)) y añádelo a la lista del 
carrito, además de agregar el botón Quitar con su funcionalidad. */
function añadirCarrito(boton) {

    // Clonamos el li
    const producto = boton.parentElement.cloneNode(true);

    // Quitamos el botón Añadir al carrito del clon
    producto.querySelector('.add-btn').remove();

    // Creamos el botón Quitar
    const btnQuitar = document.createElement('button');
    btnQuitar.textContent = 'Quitar';
    btnQuitar.classList.add('remove-btn');

    // 3. Método que quita productos del carrito
    btnQuitar.addEventListener('click', () => {
        eliminarCarrito(producto);
    });

    // Añadimos el botón Quitar al producto
    producto.appendChild(btnQuitar);

    // Añadimos el producto al carrito
    carrito.appendChild(producto);

    // Calculamos el total después de añadir el producto
    calcularTotal();
}

// Método para eliminar un producto del carrito
function eliminarCarrito(producto) {
    producto.remove();
    // Calculamos el total después de eliminar el producto
    calcularTotal();
}

// Recorremos todos los botones Añadir al carrito y añadimos el listener
botones.forEach((boton) => {
    boton.addEventListener('click', () => {
        añadirCarrito(boton);
    });
});
