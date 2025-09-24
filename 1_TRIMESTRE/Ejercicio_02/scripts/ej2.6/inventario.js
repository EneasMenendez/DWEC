export function crearProducto(nombre, categoria, precio, stock) {
    return { nombre, categoria, precio, stock };
}

export function filtrarPorCategoria(inventario, categoria) {
    return inventario.filter(producto => producto.categoria === categoria);
}

export function listarProductosAgotados(inventario) {
    return inventario.filter(producto => producto.stock === 0);
}

export function calcularValorTotalInventario(inventario) {
    return inventario.reduce((total, producto) => total + (producto.precio * producto.stock), 0);
}

export default function resumenInventario(inventario) {
    const totalProductos = inventario.length;
    const categoriasUnicas = new Set(inventario.map(producto => producto.categoria)).size;
    const valorTotal = calcularValorTotalInventario(inventario);

    console.log(`Resumen del Inventario:`);
    console.log(`- Total de productos: ${totalProductos}`);
    console.log(`- Categorías distintas: ${categoriasUnicas}`);
    console.log(`- Valor total del inventario: ${valorTotal}€`);
}

