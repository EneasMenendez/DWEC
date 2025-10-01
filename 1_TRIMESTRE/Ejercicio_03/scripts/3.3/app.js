import { agregarLibro, obtenerLibros } from './biblioteca.js';

console.log("Colección inicial de libros:");
console.log(obtenerLibros());

const libroNuevo = { id: 11, titulo: "Rayuela", autor: "Julio Cortázar", paginas: 468 };
agregarLibro(libroNuevo);

console.log("Colección después de añadir un libro:");
console.log(obtenerLibros());