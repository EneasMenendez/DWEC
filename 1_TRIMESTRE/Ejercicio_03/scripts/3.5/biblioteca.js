export const libros = [
    { id: 1, titulo: "El gran Gatsby", autor: "F. Scott Fitzgerald", paginas: 180 },
    { id: 2, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", paginas: 417 },
    { id: 3, titulo: "1984", autor: "George Orwell", paginas: 328 },
    { id: 4, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", paginas: 863 },
    { id: 5, titulo: "Moby Dick", autor: "Herman Melville", paginas: 635 },
    { id: 6, titulo: "Orgullo y prejuicio", autor: "Jane Austen", paginas: 279 },
    { id: 7, titulo: "La Odisea", autor: "Homero", paginas: 541 },
    { id: 8, titulo: "Hamlet", autor: "William Shakespeare", paginas: 342 },
    { id: 9, titulo: "Crimen y castigo", autor: "Fiódor Dostoyevski", paginas: 671 },
    { id: 10, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", paginas: 96 }
];

export function agregarLibro(nuevoLibro) {
    libros.push(nuevoLibro);
}

export function obtenerLibros() {
    return libros;
}

export function buscarLibro(id) {
    return libros.find(libro => libro.id === id);
}

export function eliminarLibro(id) {
    const indice = libros.findIndex(libro => libro.id === id);
    if (indice !== -1) {
        libros.splice(indice, 1);
        return true;
    }
    return false;
}

export function calcularTotalPaginas() {
    return libros.reduce((total, libro) => total + libro.paginas, 0);
}