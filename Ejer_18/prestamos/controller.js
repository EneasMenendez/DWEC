/**
 * Ejercicio 18 - Controlador del módulo Préstamos
 * Capa MVC: Controlador
 * Conceptos: req.body, req.params, operaciones en dos tablas, redirect tras POST
 *
 * req.body          → datos enviados por el formulario HTML (disponible gracias a express.urlencoded)
 * new Date()        → genera la fecha actual en JavaScript para usarla como fecha_prestamo
 * Dos modelos       → el controlador coordina dos modelos (préstamos y libros) para mantener
 *                     la coherencia: al crear/devolver un préstamo también actualiza el estado del libro
 * redirect tras POST → patrón PRG (Post/Redirect/Get): evita reenviar el formulario al refrescar
 * req.query.nombre  → dato llegado como query string (?nombre=...) en vez de en el cuerpo del POST
 */

import * as modelo from './model.js';
import * as modeloLibros from '../libros/model.js';

// Formulario para mostrar los prestamos
export async function mostrarFormularioPrestamo(req, res) {
  res.send(`
    <html>
    <head>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>

    <nav class="menu">
      <a href="/libros">Inicio</a>
    </nav>

    <h1>Nuevo préstamo</h1>

    <form method="POST" action="/prestamos/nuevo">

      <input type="hidden" name="libro_id" value="${req.params.libro_id}">

      <label>Nombre</label>
      <input name="nombre" required>

      <label>Fecha devolución</label>
      <input type="date" name="fecha_devolucion" required>

      <button>Guardar</button>
    </form>

    </body>
    </html>
  `);
}

//Funcion para crear un presyamo
export async function crearPrestamo(req, res) {
  await modelo.crearPrestamo({
    libro_id: req.body.libro_id,
    nombre: req.body.nombre,
    fecha_prestamo: new Date(),          // la fecha de préstamo la fija el servidor, no el formulario
    fecha_devolucion: req.body.fecha_devolucion
  });

  // Actualizamos también la tabla libros para que el estado quede sincronizado con el préstamo creado
  await modeloLibros.actualizarEstadoLibro(req.body.libro_id, 'Prestado');

  res.redirect(`/libro/${req.body.libro_id}`);
}

// Funcion para registrar la devolucion del libro
export async function registrarDevolucion(req, res) {
  await modelo.registrarDevolucion(req.params.libro_id);

  // Al devolver el libro, lo marcamos como Disponible para que pueda volver a prestarse
  await modeloLibros.actualizarEstadoLibro(req.params.libro_id, 'Disponible');

  res.redirect(`/libro/${req.params.libro_id}`);
}

// Funcion para mostrar los prestamos por usuario
export async function mostrarPrestamosUsuario(req, res) {
  const datos = await modelo.obtenerPrestamosPorUsuario(req.query.nombre);

  res.send(`
    <html>
    <head>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>

    <nav class="menu">
      <a href="/libros">Inicio</a>
    </nav>

    <h1>Libros prestados a ${req.query.nombre}</h1>

    ${datos.map(libro => `
      <p>${libro.titulo} - ${new Date(libro.fecha_devolucion).toLocaleDateString()}</p>
    `).join('')}

    </body>
    </html>
  `);
}


