import { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro } from './biblioteca.js';

console.log("Colección inicial:");
console.log(obtenerLibros());

const libroNuevo = { id: 11, titulo: "Rayuela", autor: "Julio Cortázar", paginas: 468 };
agregarLibro(libroNuevo);

console.log("Coleccion +1 libro:");
console.log(obtenerLibros());

const libroBuscado = buscarLibro(3);
console.log("Libro 3:");
console.log(libroBuscado);

eliminarLibro(2);

console.log("Coleccion - libro 2:");
console.log(obtenerLibros());