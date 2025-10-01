import { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro } from './biblioteca.js';

console.log("Colección inicial de libros:");
console.log(obtenerLibros());

const libroNuevo = { id: 11, titulo: "Rayuela", autor: "Julio Cortázar", paginas: 468 };
agregarLibro(libroNuevo);

console.log("Colección después de añadir un libro:");
console.log(obtenerLibros());

const libroBuscado = buscarLibro(3);
console.log("Libro buscado con id 3:");
console.log(libroBuscado);

eliminarLibro(2);

console.log("Colección después de eliminar el libro con id 2:");
console.log(obtenerLibros());