/**
 * Ejercicio 2.1 - Métodos de array: map, filter y for...of
 * Conceptos: Array, map, filter, arrow function, for...of
 *
 * map     → transforma cada elemento y devuelve un NUEVO array del mismo tamaño
 * filter  → selecciona elementos según una condición y devuelve un NUEVO array (puede ser más pequeño)
 * for...of → itera sobre los valores de un iterable (array, string…) sin necesitar el índice
 * arrow function → sintaxis compacta para funciones: (param) => expresión
 */

//1. Crea un array numeros con al menos 6 números.
let numeros = [2, 3, 6, 9, 8, 10, 28, 5]
console.log("Array Números:")
console.log(numeros)

//2. Usa el método .map() para crear un nuevo array dobles que contenga 
// el doble de cada número del array original.

let dobles = numeros.map((numero) => {
    return numero * 2
})

console.log("Array Dobles:")
console.log(dobles)

//3.Usa el método .filter() para crear un nuevo array pares que contenga 
// solo los números pares del array numeros.

let pares = numeros.filter((numero) => {
    if (numero % 2 == 0)
        return numero
})

//4.Usa un bucle for...of para imprimir cada número del array pares en la consola.
console.log("Array Pares:")

for (let numero of pares) {
    console.log(numero)
}

