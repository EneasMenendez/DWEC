/**
 * Ejercicio 2.5 - Módulo principal: consumo de gestorUsuarios
 * Conceptos: import nombrado, import default, alias de importación, map como iterador
 *
 * import { X as alias } → importa X con otro nombre local para evitar conflictos o mejorar legibilidad
 * import default         → la exportación por defecto no lleva llaves; se le puede dar cualquier nombre local
 * map como iterador      → aquí map se usa solo por su efecto de recorrer el array, no para crear un nuevo array
 *                          (para eso sería más semántico usar forEach, pero ambos funcionan)
 */

//2.1 Importa crearPerfil y mostrarPerfil desde gestorUsuarios.js. Puedes usar un alias
// para la importación de crearPerfil si lo deseas.

//4.1 Importa todas las funciones necesarias desde gestorUsuarios.js.

import { crearPerfil as funcionCrearPerfil, obtenerMayoresDeEdad, calcularPromedioEdad } from './gestorUsuarios.js';
import mostrarPerfil from './gestorUsuarios.js';//No va entre llaves porque esta exportada como default

//Llama a crearPerfil dos veces para crear dos perfiles de usuario diferentes y 
// guárdalos en un array llamado usuarios.

let usuarios = [
    funcionCrearPerfil("Maria", "maria341@gmail.com", 14),
    funcionCrearPerfil("Manuel", "manuel989@outloook.es", 20)]

//Itera sobre el array usuarios y, para cada usuario, utiliza mostrarPerfil 
// para imprimir su información en la consola.

console.log("Array Usuarios:")
usuarios.map((usuario) => {
    console.log(mostrarPerfil(usuario))
})

//Crea un array con al menos 5 objetos de usuario, con diferentes edades 
//(algunos mayores de 18 y otros menores).

let usuarios2 = [
    funcionCrearPerfil("Pepe", "pepe863@gmail.com", 10),
    funcionCrearPerfil("Borja", "borja985@outlook.com", 18),
    funcionCrearPerfil("Antonio", "antonio462@gmail.com", 23),
    funcionCrearPerfil("Andrea", "andrea453@hotmail.com", 17),
    funcionCrearPerfil("Ana", "ana142@hotmail.com", 54)


]
console.log("Array Usuarios2:")
console.log(usuarios2)

//Usa las funciones importadas para realizar las siguientes operaciones
// y mostrar los resultados en la consola:

//1. Llama a obtenerMayoresDeEdad para filtrar el array y guarda el 
// resultado en una nueva variable.

let usuariosMayoresDeEdad = obtenerMayoresDeEdad(usuarios2)

//2. Muestra un encabezado que diga “Usuarios mayores de edad:” y 
// luego itera sobre el nuevo array para mostrar el perfil de cada 
// uno de esos usuarios.

console.log("Usuarios mayores de edad:")

usuariosMayoresDeEdad.map((usuario) => {
    console.log(mostrarPerfil(usuario))
})

//3. Llama a calcularPromedioEdad con el array original de usuarios y
//  muestra el resultado en un mensaje claro, por ejemplo: 
// “La edad promedio de los usuarios es: [promedio]”.

let promedio = calcularPromedioEdad(usuarios2)
console.log("Promedio de edades:")
console.log(`La edad promedio de los usuarios es:${promedio}`)