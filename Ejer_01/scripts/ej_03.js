/**
 * Ejercicio 3 - Spread Operator (...)
 * Conceptos: operador spread para combinar objetos y copiar propiedades
 *
 * Spread operator en objetos: { ...obj1, ...obj2 }
 *   - Copia todas las propiedades de obj1 y obj2 en un nuevo objeto
 *   - Si hay propiedades con el mismo nombre, gana la última en aparecer
 */

//1. Crea un objeto ‘producto’ con las propiedades: ‘nombre’ (string), ‘precio’ (number).
let producto = {
    nombre: "Estuche",
    precio: 20
}
console.log("Objeto 'producto':")
console.table(producto)

//2. Crea un objeto ‘cliente’ con las propiedades: ‘nombreCliente’ (string), ‘esPremium’ (boolean).
let cliente = {
    nombreCliente: "Alex",
    esPremium: false
}
console.log("Objeto 'cliente':")
console.table(cliente)

//3. Combina ambos objetos en un nuevo objeto llamado ‘pedido’ utilizando el Spread Operator (…).
let pedido = {
    ...producto,
    ...cliente
}

//4. Muestra el objeto ‘pedido’ en consola.
console.log("Objeto 'pedido': ")
console.table(pedido)

/*5. ¿Qué sucede si las propiedades de los objetos originales tienen el mismo nombre? 
Crea un nuevo objeto ‘producto2’ con la propiedad ‘nombre’ y combínalo con el objeto ‘cliente’ 
para ver el resultado.*/

let producto2 = {
    nombre: "Reloj"
}
let cliente2 = {
    nombre: "Eneas",
    esPremium: false
}
let combinarlo = {
    ...cliente2,
    ...producto2
}
console.log("Combinación de 'producto2' con 'cliente2': ")
console.table(combinarlo)

/* Al combinar dos objetos que tienen una propiedad con el mismo nombre,
 * la propiedad del primer objeto se sobrescribe con la del segundo.
 * En este caso, como primero se pasa cliente2 y después producto2 y ambos
 * contienen la propiedad nombre.
 * La propiedad "nombre" de cliente2 es machacada por la de producto2 y
 * finalmente, se mostraría por pantalla: el nombre del producto,
 * y si el cliente es premium o no
 */
