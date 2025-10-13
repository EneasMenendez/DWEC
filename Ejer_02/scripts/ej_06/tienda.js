/**
 * Ejercicio 2.6 - Módulo principal: consumo del módulo inventario
 * Conceptos: import nombrado, import default, push, console.table
 *
 * import nombrado  → se importan exactamente las funciones que se necesitan entre llaves { }
 * import default   → resumenInventario se importa sin llaves porque fue exportada como export default
 * push             → añade elementos al final del array existente (muta el array original)
 * console.table    → muestra arrays de objetos como tabla en la consola del navegador; muy útil para depurar
 */

//Importa todas las funciones desde inventario.js.
import { crearProducto, filtrarPorCategoria, listarProductosAgotados, calcularValorTotalInventario } from './inventario.js';
import resumenInventario from './inventario.js';//No va entre llaves porque esta exportada como default

//Crea un array vacío inventario.
let inventario = []

/*Usa la función crearProducto para añadir al menos 6 productos al array. Asegúrate de tener varias categorías
 (ej: “Electrónica”, “Ropa”, “Libros”) y de que al menos un producto tenga stock: 0.
*/

inventario.push(crearProducto("Portatil MSI Katana", "Electrónica", 200, 4))
inventario.push(crearProducto("Ratón Inalambrico Logitech", "Electrónica", 14.3, 20))
inventario.push(crearProducto("Vestido de Flores", "Ropa", 20, 0))
inventario.push(crearProducto("Pijama Stich", "Ropa", 25.3, 15))
inventario.push(crearProducto("El Quijote", "Libros", 50, 0))
inventario.push(crearProducto("El chico de la ultima fila", "Libros", 30, 12.8))

// Utiliza las funciones importadas para hacer lo siguiente y 
// mostrar los resultados en la consola:

//1. Obtén y muestra todos los productos de la categoría “Ropa”.

let productosCategoria = filtrarPorCategoria(inventario, "Ropa")
console.log("Los productos de la categoria Ropa son:")
console.table(productosCategoria)

//2.Obtén y muestra una lista de los productos agotados.

let productosAgotados = listarProductosAgotados(inventario)
console.log("Lista Productos Agotados:")
productosAgotados.map((producto) => {
    console.log(`- Producto: ${producto.nombre}, Categoría: ${producto.categoria}, Precio: ${producto.precio}, Stock: ${producto.stock}`)
})

//3.Calcula y muestra el valor total del inventario.

console.log("Valor Total del Inventario:")
console.log(`${calcularValorTotalInventario(inventario)} €`)

//4. Ejecuta la función resumenInventario para ver el resumen completo.

resumenInventario(inventario)

