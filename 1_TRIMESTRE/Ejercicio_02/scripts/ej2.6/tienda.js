import resumenInventario, { 
    crearProducto, 
    filtrarPorCategoria, 
    listarProductosAgotados, 
    calcularValorTotalInventario 
} from './inventario.js';

const inventario = [];

inventario.push(crearProducto("Camiseta", "Ropa", 15.99, 10));
inventario.push(crearProducto("Pantalón", "Ropa", 25.99, 5));
inventario.push(crearProducto("Teléfono", "Electrónica", 299.99, 3));
inventario.push(crearProducto("Libro de JavaScript", "Libros", 19.99, 0));
inventario.push(crearProducto("Auriculares", "Electrónica", 49.99, 7));
inventario.push(crearProducto("Zapatos", "Ropa", 39.99, 0));

const productosRopa = filtrarPorCategoria(inventario, "Ropa");
console.log("Productos en la categoría 'Ropa':", productosRopa);

const productosAgotados = listarProductosAgotados(inventario);
console.log("Productos agotados:", productosAgotados);

const valorTotal = calcularValorTotalInventario(inventario);
console.log(`Valor total del inventario: ${valorTotal.toFixed(2)}€`);

resumenInventario(inventario);