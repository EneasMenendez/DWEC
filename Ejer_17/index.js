/**
 * Ejercicio 17 - API REST con Express.js y persistencia en JSON
 * Archivo: index.js — Punto de entrada principal de la aplicación
 * Rol en la arquitectura: configuración global del servidor Express, registro de middlewares
 *                         y montaje de los routers de cada recurso (álbum, artista)
 *
 * express()                  → crea la instancia principal de la aplicación web
 * express.static()           → sirve archivos estáticos (CSS, imágenes) desde la carpeta /public
 * express.urlencoded()       → middleware que parsea el cuerpo de formularios HTML (POST)
 * morgan                     → middleware de logging HTTP; registra cada petición en access.log
 * fs.createWriteStream       → crea un flujo de escritura hacia un archivo para que morgan escriba ahí
 * app.use('/ruta', router)   → monta un router en un prefijo de URL; todas sus rutas heredan ese prefijo
 * app.listen(puerto, cb)     → arranca el servidor HTTP escuchando en el puerto indicado
 * import.meta.url / dirname  → forma de obtener la ruta del archivo actual en módulos ES (equivale a __dirname de CommonJS)
 */

// Configuro el morgan y la app de express
import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as albumRouter } from './album/index.js';
import { router as artistaRouter } from './artista/index.js';

const app = express();

// Linea que hace que el codigo detecte la carpeta public
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));

/* Vercel no me permite crear el archivo access.log mientras se ejecuta la app,
por eso para evitar el erro que me daba, busque como solucionarlo y me daba esta
solucion, que consiste, en crear el archivo access.log, solo si la app no se ejecuta 
desde vercel*/
if (process.env.NODE_ENV !== 'production') {
  //Si no ejecutamos la app desde vercel creo el archivo acces.log
  const accessLogStream = fs.createWriteStream(
      path.join(process.cwd(), 'access.log'),
      { flags: 'a' }
  );
  app.use(morgan('common', { stream: accessLogStream }));
} else {
  // En Vercel, usamos la consola estandar para que no falle
  app.use(morgan('common'));
}


// este middleware es para procesar formularios
// que vienen en el body de la petición
// al final tendremos un objeto request.body
// con los datos del formulario parseados
app.use(express.urlencoded({ extended: false }));

// rutas principales de la app
app.use('/album', albumRouter);
app.use('/artista', artistaRouter);

// Pagina de inicio 
app.get('/', (request, response) => {
  response.send(`
  <html>
  <head>
  <link rel="stylesheet" href="/style.css">
  </head>
  <body>

  <nav class="menu">
    <a href="/">Inicio</a>
    <a href="/album">Álbumes</a>
    <a href="/artista">Artistas</a>
  </nav>

  <h1>Bienvenido a la Discoteca</h1>

  <a href="/album">Ver Álbumes</a><br>
  <a href="/artista">Ver Artistas</a>

  </body>
  </html>
  `);
});

app.listen(8080, () => {
  console.log('Servidor escuchando en http://localhost:8080');
});

//Para que vercel maneje la rutas
export default app;
