/**
 * Ejercicio 3.1 - Array de objetos: lista de reproducción con forEach
 * Conceptos: array de objetos, objeto literal, forEach, export default
 *
 * Array de objetos  → cada elemento del array es un objeto con sus propias propiedades (titulo, artista, duracion)
 * forEach           → recorre cada elemento del array ejecutando una función; NO devuelve nada (a diferencia de map)
 * export default    → exporta la playlist para que otros módulos (ejercicio-02.js) puedan importarla y reutilizarla
 */

/*Ejercicio 3.1: Creando tu primera lista de reproducción

Define un arreglo de objetos llamado `playlist`. Cada objeto representará una canción 
y debe tener las siguientes propiedades: `titulo` (string), `artista` (string) y `duracion` 
(número en segundos).

Agrega al menos 10 canciones a la `playlist`.
 Luego, utiliza un bucle `forEach` para imprimir en la consola el título y el artista de cada canción.
*/

let playlist = [

    {
        titulo: "no tiene sentido",
        artista: "Beéle",
        duracion: 180
    },
    {
        titulo: "Baby Don´t Hurt me",
        artista: "Anne-Marie",
        duracion: 140
    },
    {
        titulo: "Ké Más Nos Da",
        artista: "Estopa",
        duracion: 188
    },
    {
        titulo: "La rueca",
        artista: "Marea",
        duracion: 160
    },
    {
        titulo: "Cacho a Cacho",
        artista: "Estopa",
        duracion: 155
    },
    {
        titulo: "estaré millor demà",
        artista: "Marlene",
        duracion: 173
    },
    {
        titulo: "Indomable",
        artista: "Indara",
        duracion: 145
    },
    {
        titulo: "Diablo",
        artista: "Beret",
        duracion: 190
    },
    {
        titulo: "Lenguas de Serpiente",
        artista: "Blake",
        duracion: 111
    },
    {
        titulo: "Loco",
        artista: "Melendi",
        duracion: 183
    }
]

// console.log("Lista de Canciones:")

// playlist.forEach( function(cancion) {
//     console.log( `Canción: ${cancion.titulo }---> Artista: ${cancion.artista} ` )
// })

export default playlist