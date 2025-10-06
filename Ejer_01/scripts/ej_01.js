/**
 * Ejercicio 1 - Variables y tipos de datos
 * Conceptos: const, let, typeof, template literals, operador ternario
 *
 * Regla de uso:
 *   - const → valor que NO cambia (constante)
 *   - let   → valor que SÍ puede cambiar
 */

//1. Declara una variable ‘nombre’ usando ‘const’ y asígnale tu nombre.
const NOMBRE = "Covadonga"

//2. Declara una variable ‘edad’ usando ‘let’ y asígnale tu edad.
let edad = 21

//3. Declara una variable ‘tieneMascota’ usando ‘const’ y asígnale un valor booleano.
const TIENEMASCOTA = true

console.log("Nombre:", NOMBRE)
console.log("Edad:", edad)
console.log("Tiene mascota:", TIENEMASCOTA)

//4. Reasigna un nuevo valor a la variable ‘edad’ y ‘tieneMascota’.
edad = 22
//tieneMascota=false --> No se puede reasignar el valor de una constante
console.log("Nueva edad :", edad)
console.log("Tiene Mascota:", TIENEMASCOTA)

//5. Imprime en consola el valor y el tipo de cada una de las tres variables.
console.log("Nombre: ", NOMBRE)
console.log("Tipo de la variable nombre: ", typeof NOMBRE)
console.log("Edad: ", edad)
console.log("Tipo de la Variable Edad: ", typeof edad)
console.log(`¿Tengo mascota?: ${TIENEMASCOTA ? "Sí" : "No"}`)
console.log("Tipo de la varible tieneMascota: ", typeof TIENEMASCOTA)

//6. Crea una frase que describa a la persona usando Template Strings, por ejemplo:
//  “Juan tiene 30 años y no tiene mascota.”. Imprímela en consola.
console.log(`Hola, mi nombre es ${NOMBRE}, tengo ${edad} años y ${TIENEMASCOTA ? "tengo" : "no tengo"} mascota.`)