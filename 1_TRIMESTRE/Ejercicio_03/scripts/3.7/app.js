import { 
    agregarLibro, 
    obtenerLibros, 
    buscarLibro, 
    eliminarLibro, 
    calcularTotalPaginas, 
    ordenarPorPaginas,
    hayLibrosLargos,
    todosSonLibrosCortos
} from './biblioteca.js';

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

console.log("Total de páginas en la biblioteca:");
console.log(calcularTotalPaginas());

console.log("Colección antes de ordenar por páginas:");
console.log(obtenerLibros());

ordenarPorPaginas();

console.log("Colección ordenada por páginas (menor a mayor):");
console.log(obtenerLibros());

console.log("¿Hay libros con más de 500 páginas?");
console.log(hayLibrosLargos(500)); // true

console.log("¿Hay libros con más de 1000 páginas?");
console.log(hayLibrosLargos(1000)); // false

console.log("¿Todos los libros tienen menos de 900 páginas?");
console.log(todosSonLibrosCortos(900)); // true

console.log("¿Todos los libros tienen menos de 300 páginas?");
console.log(todosSonLibrosCortos(300)); // false