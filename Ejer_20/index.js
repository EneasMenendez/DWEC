/**
 * Ejercicio 20 - Servidor principal: API REST de Biblioteca
 * Capa MVC: Configuración / Arranque
 * Conceptos: Express, montaje de routers, middleware global, servidor HTTP
 *
 * express.json()    → middleware que parsea el body de las peticiones con Content-Type application/json
 * app.use(ruta, r)  → monta un sub-router bajo un prefijo de ruta; todas sus rutas heredan ese prefijo
 * app.listen()      → abre el puerto TCP y pone el servidor a escuchar peticiones entrantes
 */
import express from 'express';
import routerAutores from './routes/rutasAutores.js';
import routerLibros from './routes/rutasLibros.js';


// Configuro express 
const app = express();
app.use(express.json());

// Rutas a autores y libros
app.use('/api/autores', routerAutores);
app.use('/api/libros', routerLibros);


app.get('/', (req, res) => {
  res.send(`
    
    <html lang="es">

      <head>

        <meta charset="UTF-8">

        <title>Ejercicio 20</title>

        <style>

          body{
            font-family: Arial, Helvetica, sans-serif;
            background:#f4f4f4;
            margin:0;
            padding:40px;
          }

          .container{
            max-width:1000px;
            margin:auto;
            background:white;
            padding:30px;
            border-radius:12px;
            box-shadow:0 0 10px rgba(0,0,0,0.1);
          }

          h1{
            color:#2c3e50;
            margin-bottom:10px;
          }

          p{
            color:#555;
            margin-bottom:30px;
          }

          h2{
            color:#34495e;
            margin-top:30px;
          }

          ul{
            list-style:none;
            padding:0;
          }

          li{
            background:#ecf0f1;
            margin-bottom:10px;
            padding:12px;
            border-radius:8px;
          }

          a{
            text-decoration:none;
            color:#2980b9;
            font-weight:bold;
          }

          a:hover{
            color:#1abc9c;
          }

          code{
            background:#dfe6e9;
            padding:3px 6px;
            border-radius:5px;
          }

        </style>

      </head>

      <body>

        <div class="container">

           <h1>Ejercicio 20: Biblioteca</h1>

          <h2> Autores</h2>

          <ul>

            <li><code> GET /api/autores</code> : Todos los autores</li>

            <li><code>/api/autores?nacionalidad='<Introduce la Nacionalidad>'</code> : Filtrar autores por nacionalidad</li>

            <li><code>GET /api/autores/:id</code> :  Obtener autor por ID </li>

            <li><code>GET /api/autores/:id/libros</code> :  Obtener libros de un autor</li>

            <li><code>POST /api/autores</code> : Crear un autor</li>

            <li><code>PUT /api/autores/:id</code> : Actualizar un autor por su ID</li>
            
            <li><code>DELETE /api/autores/:id</code> : Eliminar un autor por su ID</li>

          </ul>

          <h2>Libros</h2>

          <ul>

          <li><code> GET /api/libros</code> : Todos los libros</li>

          <li><code> GET /api/libros?sort=titulo : Ordenar  los libros por titulo</li>

          <li><code>GET /api/libros/:id</code> : Obtener libro por ID</li>

          <li><code>POST /api/libros</code> : Crear un libro </li>

          <li><code>PUT /api/libros/:id</code> : Actualizar un libro por su ID</li>

          <li><code>DELETE /api/libros/:id</code> : Eliminar un libro por su ID </li>

          </ul>

        </div>

      </body>

    </html>

  `);
});



app.listen(8080, () => {
  console.log('Servidor en http://localhost:8080');
});

export default app;