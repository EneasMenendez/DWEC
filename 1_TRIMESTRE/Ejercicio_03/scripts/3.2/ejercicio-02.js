const playlist = [
    { titulo: "Shape of You", artista: "Ed Sheeran", duracion: 233 },
    { titulo: "Blinding Lights", artista: "The Weeknd", duracion: 200 },
    { titulo: "Bohemian Rhapsody", artista: "Queen", duracion: 354 },
    { titulo: "Bad Guy", artista: "Billie Eilish", duracion: 194 },
    { titulo: "Imagine", artista: "John Lennon", duracion: 183 },
    { titulo: "Uptown Funk", artista: "Mark Ronson ft. Bruno Mars", duracion: 270 },
    { titulo: "Despacito", artista: "Luis Fonsi", duracion: 229 },
    { titulo: "Rolling in the Deep", artista: "Adele", duracion: 228 },
    { titulo: "Viva la Vida", artista: "Coldplay", duracion: 242 },
    { titulo: "Hey Jude", artista: "The Beatles", duracion: 431 }
];

const cancionesLargas = playlist.filter(cancion => cancion.duracion > 180);

const mensajes = cancionesLargas.map(cancion =>
    `La canción ‘${cancion.titulo}’ de ${cancion.artista} dura ${cancion.duracion} segundos.`
);

console.log(mensajes);