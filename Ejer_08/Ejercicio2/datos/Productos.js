/**
 * Ejercicio 2 - Módulo de Datos: Catálogo de Productos
 * Conceptos: módulos ES6, export default, arrays de objetos
 *
 * export default → permite importar este array en otros archivos con `import productos from ...`
 * picsum.photos  → servicio de imágenes de prueba; el parámetro ?random=N garantiza imagen distinta por producto
 */

const productos = [
    {
      id: 1,
      nombre: "Laptop Pro",
      precio: 1200,
      categoria: "Tecnología",
      imagen: "https://picsum.photos/150/150?random=1"
    },
    {
      id: 2,
      nombre: "Cafetera Automática",
      precio: 250,
      categoria: "Hogar",
      imagen: "https://picsum.photos/150/150?random=2"
    },
    {
      id: 3,
      nombre: "Bicicleta Montaña XTR",
      precio: 980,
      categoria: "Deportes",
      imagen: "https://picsum.photos/150/150?random=3"
    },
    {
      id: 4,
      nombre: "Smartphone Ultra",
      precio: 899,
      categoria: "Tecnología",
      imagen: "https://picsum.photos/150/150?random=4"
    },
    {
      id: 5,
      nombre: "Silla Ergonómica Office",
      precio: 320,
      categoria: "Oficina",
      imagen: "https://picsum.photos/150/150?random=5"
    },
    {
      id: 6,
      nombre: "Televisor 4K UHD",
      precio: 1100,
      categoria: "Electrónica",
      imagen: "https://picsum.photos/150/150?random=6"
    },
    {
      id: 7,
      nombre: "Auriculares Inalámbricos",
      precio: 150,
      categoria: "Accesorios",
      imagen: "https://picsum.photos/150/150?random=7"
    },
    {
      id: 8,
      nombre: "Robot Aspirador SmartClean",
      precio: 560,
      categoria: "Hogar",
      imagen: "https://picsum.photos/150/150?random=8"
    },
    {
      id: 9,
      nombre: "Zapatillas Running AirZoom",
      precio: 180,
      categoria: "Deportes",
      imagen: "https://picsum.photos/150/150?random=9"
    },
    {
      id: 10,
      nombre: "Reloj Inteligente FitPro",
      precio: 220,
      categoria: "Tecnología",
      imagen: "https://picsum.photos/150/150?random=10"
    }
  ];
  
  export default productos;
  