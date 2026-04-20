/**
 * Ejercicio 17 - API REST con Express.js y persistencia en JSON
 * Archivo: album/controller.js — Capa de Controlador (MVC: controller)
 * Rol en la arquitectura: recibe las peticiones HTTP del router, coordina los modelos de
 *                         álbum y artista para enriquecer los datos, y delega en la vista
 *                         la generación del HTML; gestiona la validación del formulario
 *
 * request.params.id    → extrae el segmento dinámico :id de la URL
 * request.body         → campos del formulario disponibles gracias a express.urlencoded
 * artistas.find()      → localiza el artista cuyo id coincide con album.artistaId (JOIN en memoria)
 * parseInt(artistaId)  → convierte el artistaId del formulario (string) a número para coincidir con el modelo
 * response.redirect()  → aplica el patrón POST-Redirect-GET para evitar reenvíos al recargar la página
 * isNaN(anio)          → comprueba que el año introducido sea realmente un número
 */
import { getAll, remove, get, save } from './model.js';
import { getAll as getArtistas } from '../artista/model.js';
import { render } from './view.js';
import { render as renderForm } from './form.js';

// Funcion que muestra la lista de albumes
export async function listaAction(request, response) {

  const albumes = await getAll();
  const artistas = await getArtistas();

  // aqui recorro los albumes para sacar el nombre del artista en vez del id
  const datos = albumes.map((album) => {
    const artista = artistas.find((artista) => artista.id === album.artistaId);
    return {
      id: album.id,
      titulo: album.titulo,
      anio: album.anio,
      foto: album.foto,
      artistaNombre: artista ? artista.nombre : 'desconocido'
    };
  });

  const body = render(datos);
  response.send(body);
}

// Funcion para eliminar un album
export async function eliminarAction(request, response) {
  const id = parseInt(request.params.id, 10);
  await remove(id);
  response.redirect(request.baseUrl);
}

// Funcion que muestra el formulario
export async function formAction(request, response) {

  const artistas = await getArtistas();

  let album = {
    id: '',
    titulo: '',
    anio: '',
    artistaId: '',
    foto: ''
  };

  if (request.params.id) {
    const encontrado = await get(parseInt(request.params.id, 10));
    if (encontrado) {
      album = encontrado;
    }
  }

  const body = renderForm(album, artistas);
  response.send(body);
}


// Funcion que guarda un album 
export async function guardarAction(request, response) {

  const { id, titulo, anio, artistaId, foto } = request.body;

  // validacion para que no se guarde vacio
  if (!titulo || !anio || isNaN(anio)) {

    const artistas = await getArtistas();
  
    let error = '';
  
    if (!titulo || !anio) {
      error = 'Error: título y año son obligatorios';
    } else if (isNaN(anio)) {
      error = 'Error: el año debe ser numérico';
    }
  
    const body = renderForm(
      { id, titulo, anio, artistaId, foto },
      artistas,
      error
    );
  
    return response.send(body);
  }

  await save({
    id,
    titulo,
    anio,
    artistaId: parseInt(artistaId),
    foto
  });

  response.redirect(request.baseUrl);
}
