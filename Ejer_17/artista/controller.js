/**
 * Ejercicio 17 - API REST con Express.js y persistencia en JSON
 * Archivo: artista/controller.js — Capa de Controlador (MVC: controller)
 * Rol en la arquitectura: recibe las peticiones HTTP del router, coordina el modelo para
 *                         obtener o modificar datos, y delega en la vista la generación del HTML;
 *                         contiene la lógica de negocio y la validación de los datos del formulario
 *
 * request.params.id    → extrae el segmento dinámico :id de la URL
 * parseInt(str, 10)    → convierte el id (que llega como string) a número entero en base 10
 * request.body         → objeto con los campos del formulario, disponible gracias a express.urlencoded
 * response.send(html)  → envía la respuesta HTTP con el HTML generado por la vista
 * response.redirect()  → redirige al cliente a otra URL tras una operación de escritura (patrón POST-Redirect-GET)
 * filter/find/map      → métodos de array usados para relacionar artistas con sus álbumes
 */
import { getAll, remove, get, save } from './model.js';
import { render } from './view.js';
import { render as form } from './form.js';
import { getAll as getAlbumes } from '../album/model.js';

// Funcion que muestra la lista de artistas
export async function listaAction(request, response) {
  const artistas = await getAll();
  const body = render(artistas);
  response.send(body);
}

// Funcion que muestra el detalle de un artista con sus albumes
export async function detalleAction(request, response) {
  const id = parseInt(request.params.id, 10);
  const artista = await get(id);
  const albumes = await getAlbumes();
  const albumesArtista = albumes.filter((album) => album.artistaId === id);

  const body = `
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

  <h1>${artista.nombre}</h1>

  <img src="${artista.foto || 'https://via.placeholder.com/150'}" width="150">

  <p>Pais: ${artista.pais}</p>
  <p>Genero: ${artista.genero}</p>
  <p>Año formación: ${artista.fecha_formacion}</p>

  <h2>Álbumes</h2>

  <ul>
    ${albumesArtista.map(album => `
      <li>
        <img src="${album.foto || 'https://via.placeholder.com/50'}" width="50">
        ${album.titulo} (${album.anio})
      </li>
    `).join("")}
  </ul>

  <a href="/artista">volver</a>

  </body>
  </html>
  `;

  response.send(body);
}

// Funcion para eliminar un artista
export async function eliminarAction(request, response) {
  const id = parseInt(request.params.id, 10);
  await remove(id);
  response.redirect(request.baseUrl);
}

// Funcion que muestra el formulario
export async function formAction(request, response) {

  let artista = {
    id: '',
    nombre: '',
    pais: '',
    genero: '',
    fecha_formacion: '',
    foto: ''
  };

  // si hay id estamos editando 
  if (request.params.id) {
    artista = await get(parseInt(request.params.id, 10));
  }

  const body = form(artista);
  response.send(body);
}

// Funcion que guarda un artista
export async function guardarAction(request, response) {

  const { id, nombre, pais, genero, fecha_formacion, foto } = request.body;

//Compruebo para que el nombre y la fecha no puedan ser nulos
  if (!nombre || !fecha_formacion || isNaN(fecha_formacion)) {

    let error = '';

    if (!nombre || !fecha_formacion) {
      error = 'Error: nombre y año de formación son obligatorios';
    } else if (isNaN(fecha_formacion)) {
      error = 'Error: el año de formación debe ser numérico';
    }

    const artista = {
      id,
      nombre,
      pais,
      genero,
      fecha_formacion,
      foto
    };

    const body = form(artista, error);

    return response.send(body);
  }

  const artista = {
    id,
    nombre,
    pais,
    genero,
    fecha_formacion,
    foto
  };

  await save(artista);
  response.redirect(request.baseUrl);
}

