/**
 * Ejercicio 3 - Módulo de Datos: Catálogo de Actividades Turísticas
 * Conceptos: módulos ES6, export nombrado, arrays de objetos
 *
 * export const (nombrado) → a diferencia de export default, requiere llaves al importar: `import { actividades } from ...`
 * unsplash.photos         → servicio de imágenes de alta calidad para prototipos; la URL apunta a fotos reales
 */
// Archivo: /datos/Actividades.js

export const actividades = [
    {
        id: 1,
        nombre: "Tour por las ruinas del Coliseo",
        destino: "Italia",
        precio: 50,
        duracionHoras: 3,
        tipo: "Cultural",
        imagen: "https://images.unsplash.com/photo-1526481280695-3c720685208b"
    },
    {
        id: 2,
        nombre: "Clase de cocina tradicional italiana",
        destino: "Italia",
        precio: 75,
        duracionHoras: 4,
        tipo: "Gastronómico",
        imagen: "https://images.unsplash.com/photo-1514516870926-20636e3d10f3"
    },
    {
        id: 3,
        nombre: "Excursión al Monte Fuji",
        destino: "Japón",
        precio: 120,
        duracionHoras: 8,
        tipo: "Naturaleza",
        imagen: "https://images.unsplash.com/photo-1526483360412-f4dbaf036963"
    },
    {
        id: 4,
        nombre: "Visita guiada al Museo del Louvre",
        destino: "Francia",
        precio: 60,
        duracionHoras: 2,
        tipo: "Cultural",
        imagen: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba"
    },
    {
        id: 5,
        nombre: "Ruta en bicicleta por los canales",
        destino: "Países Bajos",
        precio: 40,
        duracionHoras: 3,
        tipo: "Deportivo",
        imagen: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf"
    },
    {
        id: 6,
        nombre: "Buceo en la Gran Barrera de Coral",
        destino: "Australia",
        precio: 200,
        duracionHoras: 6,
        tipo: "Aventura",
        imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    },
    {
        id: 7,
        nombre: "Tour de tapas y vinos",
        destino: "España",
        precio: 55,
        duracionHoras: 3,
        tipo: "Gastronómico",
        imagen: "https://images.unsplash.com/photo-1551218808-94e220e084d2"
    },
    {
        id: 8,
        nombre: "Caminata por el Cañón del Colca",
        destino: "Perú",
        precio: 90,
        duracionHoras: 7,
        tipo: "Naturaleza",
        imagen: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
    },
    {
        id: 9,
        nombre: "Clases de surf en Bali",
        destino: "Indonesia",
        precio: 80,
        duracionHoras: 5,
        tipo: "Deportivo",
        imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    },
    {
        id: 10,
        nombre: "Safari por el Serengeti",
        destino: "Tanzania",
        precio: 300,
        duracionHoras: 10,
        tipo: "Aventura",
        imagen: "https://images.unsplash.com/photo-1565958011705-44e2119f9f18"
    },
    {
        id: 11,
        nombre: "Visita a los templos antiguos de Kioto",
        destino: "Japón",
        precio: 65,
        duracionHoras: 4,
        tipo: "Cultural",
        imagen: "https://images.unsplash.com/photo-1526481280695-3c720685208b"
    },
    {
        id: 12,
        nombre: "Cata de vinos en Burdeos",
        destino: "Francia",
        precio: 70,
        duracionHoras: 3,
        tipo: "Gastronómico",
        imagen: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03"
    },
    {
        id: 13,
        nombre: "Rafting en el río Zambeze",
        destino: "Zimbabue",
        precio: 150,
        duracionHoras: 6,
        tipo: "Aventura",
        imagen: "https://images.unsplash.com/photo-1508672019048-805c876b67e2"
    },
    {
        id: 14,
        nombre: "Senderismo en Machu Picchu",
        destino: "Perú",
        precio: 250,
        duracionHoras: 9,
        tipo: "Naturaleza",
        imagen: "https://images.unsplash.com/photo-1526483360412-f4dbaf036963"
    },
    {
        id: 15,
        nombre: "Tour nocturno por Nueva York",
        destino: "Estados Unidos",
        precio: 85,
        duracionHoras: 3,
        tipo: "Cultural",
        imagen: "https://images.unsplash.com/photo-1493612276216-ee3925520721"
    }
];


