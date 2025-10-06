/**
 * Ejercicio 4 - Arrays y métodos básicos
 * Conceptos: push(), map(), filter()
 *
 * map()    → recorre el array y devuelve uno nuevo transformando cada elemento
 * filter() → recorre el array y devuelve uno nuevo solo con los elementos que cumplan la condición
 * push()   → añade un elemento al final del array (modifica el original)
 */

//1. Crea un array llamado ciudades con los siguientes strings: "Madrid", "Buenos Aires",
//  "Tokio", "Nueva York", "París".
let ciudades = ["Madrid", "Buenos Aires", "Tokio", "Nueva York", "París"]

console.log("Array ciudades antes de añadir 'Roma'")
console.log(ciudades)

//2. Añade con otra sentencia "Roma" al final del array.
ciudades.push("Roma")

//3. Crea un nuevo array ciudadesMayusculas utilizando el método .map() que contenga todos 
// los elementos del array original pero en mayúsculas.
let ciudadesMayusculas = ciudades.map(function (tech) {

    return tech.toUpperCase()
})

//4. Crea un nuevo array ciudadesFiltradas utilizando el método .filter() que contenga 
// solo los elementos que tienen más de 6 caracteres.

let ciudadesFiltradas = ciudades.filter(function (tech) {
    if (tech.length > 6)
        return tech
})

//5. Imprime los tres arrays en consola (ciudades, ciudadesMayusculas, ciudadesFiltradas).
console.log("Array ciudades después de añadir 'Roma'")
console.log(ciudades)

console.log("Array ciudadesMayúscula")
console.log(ciudadesMayusculas)

console.log("Array ciudadesFiltradas")
console.log(ciudadesFiltradas)



