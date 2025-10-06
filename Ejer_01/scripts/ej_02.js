/**
 * Ejercicio 2 - Objetos literales
 * Conceptos: creación de objetos, console.table(), desestructuración, Object.assign(), delete
 *
 * Desestructuración: extrae propiedades de un objeto en variables independientes
 *   const { propiedad: alias } = objeto
 * Object.assign(destino, ...fuentes): copia propiedades de fuentes en destino
 */

//1. Crea un objeto ‘coche’ con las propiedades: ‘marca’ (string),’modelo’ (string),
// ‘año’ (number) y ‘estaDisponible’ (boolean).
let coche = {
    marca: "Toyota",
    modelo: "Corolla",
    anio: 2020,
    estaDisponible: false
}

//2. Muestra el objeto completo en consola utilizando console.table().
console.log("Objeto 'coche'")
console.table(coche)

//3. Usa la desestructuración (destructuring) para extraer la ‘marca’ y el ‘modelo’ 
// en variables separadas e imprímelas en consola.
const { marca: MARCACOCHE, modelo: MODELOCOCHE } = coche
console.log("Marca del Coche: ", MARCACOCHE)
console.log("Modelo del Coche: ", MODELOCOCHE)

//4. Cambia el valor de la propiedad ‘estaDisponible’ a ‘true’.
coche.estaDisponible = true
console.log("Valor Nuevo de la variable estaDisponible:", coche.estaDisponible)

//5. Agrega una nueva propiedad ‘color’ al objeto.
coche = Object.assign({ color: "Azul" }, coche)
console.log("Objeto 'coche' después de añadirle la propiedad 'color'")
console.table(coche)

//6. Elimina la propiedad ‘año’ del objeto.
delete coche.anio

//7.Vuelve a imprimir el objeto modificado en consola.
console.log("Objeto 'coche' después de eliminar la propiedad 'anio'")
console.table(coche)