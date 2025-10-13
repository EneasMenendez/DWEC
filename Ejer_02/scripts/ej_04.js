/**
 * Ejercicio 2.4 - Objetos, spread operator, optional chaining y nullish coalescing
 * Conceptos: objeto literal, spread operator (...), optional chaining (?.), nullish coalescing (??)
 *
 * Objeto literal       → agrupación de propiedades clave-valor: { clave: valor }
 * Spread operator (...) → copia/fusiona las propiedades de un objeto en otro sin mutar los originales
 * Optional chaining (?.) → accede a propiedades anidadas de forma segura; devuelve `undefined` en lugar de lanzar error si algo es null/undefined
 * Nullish coalescing (??) → devuelve el operando derecho SOLO cuando el izquierdo es null o undefined (no para "" o 0)
 */

//1. Crea un objeto usuario con nombre y email.

let usuario = {
    nombre: "Martín",
    email: "martin123@gmail.com"
}
console.log("Usuario:")
console.log(usuario)

//2. Crea un objeto perfil con puesto y empresa.
let perfil = {
    puesto: "Programador",
    empresa: "EDP"
}
console.log("Perfil:")
console.log(perfil)

//3.Combina ambos objetos en un nuevo objeto empleado usando el “spread operator” (...).

let empleado = {
    ...usuario,
    ...perfil
}
console.log("Empleado:")
console.log(empleado)

/*4.Supongamos que el objeto empleado podría tener o no una propiedad anidada 
perfil.direccion.ciudad. Intenta acceder a empleado.perfil.direccion.ciudad 
usando “Optional Chaining” (?.) para evitar errores*/

console.log("Resultado Optional Chaining (?): ")
console.log(empleado.perfil?.direccion?.ciudad)

/*5.Usa el “Nullish Coalescing Operator” (??) para asignar un valor por defecto 
(“Ciudad no especificada”) si el resultado del paso anterior es null o undefined.*/

console.log("Resultado Nullish Coalescing Operator (??): ")
console.log(empleado.perfil?.direccion?.ciudad ?? "Ciudad no especificada")




