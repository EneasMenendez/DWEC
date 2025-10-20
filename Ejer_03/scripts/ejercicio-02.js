/**
 * Ejercicio 3.2 - Encadenamiento de filter y map sobre un array de objetos
 * Conceptos: import default, spread operator, filter, map, encadenamiento de métodos
 *
 * import default      → importa la playlist de ejercicio-01.js sin llaves (fue exportada como export default)
 * spread [...playlist] → crea una copia superficial del array original para no modificarlo directamente
 * filter              → selecciona solo las canciones que cumplen la condición (duración > 180 s)
 * map                 → transforma cada objeto canción en un string con el mensaje formateado
 * Encadenamiento      → filter primero reduce el array, luego map transforma los elementos restantes
 */

/*Crea un archivo `ejercicio-02.js`. Copia la `playlist` del ejercicio anterior.
 Ahora, utiliza el método `.filter()` para crear un nuevo arreglo que contenga 
 únicamente las canciones que duren más de 180 segundos.

Finalmente, utiliza `.map()` en el nuevo arreglo filtrado para crear un arreglo 
de strings que contenga el mensaje: “La canción ‘[TITULO]’ de [ARTISTA] dura [DURACION] segundos.” 
Imprime este último arreglo en la consola.
*/

import playlist from "./ejercicio-01.js";

let playlist2 = [...playlist]
console.log("Canciones copiadas a la Playlist2")
console.table(playlist2)

let cancionesFiltradas = playlist2.filter((cancion) => {
    if (cancion.duracion > 180)
        return cancion

})
console.log("Lista de Canciones Filtradas")
console.table(cancionesFiltradas)

let arregloMensajes = cancionesFiltradas.map((cancion) => {
    return `La canción ${cancion.titulo} de ${cancion.artista} dura ${cancion.duracion} segundos`
})

console.log("Arreglo de Mensajes")
console.table(arregloMensajes)