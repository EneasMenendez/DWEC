/**
 * Ejercicio 17 - API REST con Express.js y persistencia en JSON
 * Archivo: artista/model.js — Capa de Modelo (MVC: model)
 * Rol en la arquitectura: gestiona el acceso y la persistencia de los datos de artistas;
 *                         carga el JSON al arrancar el servidor y mantiene los datos en memoria;
 *                         expone las operaciones CRUD (getAll, get, save, remove) al controlador
 *
 * fs.readFileSync()    → lee el archivo JSON de forma síncrona al iniciar (solo se ejecuta una vez)
 * JSON.parse()         → convierte la cadena JSON leída del archivo en un array de objetos JS
 * Math.max(...ids)     → obtiene el id máximo del array para autoincremento; el spread (...) expande el array
 * Promise.resolve()    → envuelve un valor síncrono en una Promesa para mantener una API async uniforme
 * findIndex()          → localiza la posición de un elemento en el array por condición, para poder actualizarlo
 * filter()             → devuelve un nuevo array excluyendo el elemento a eliminar (inmutabilidad)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargo los datos desde el JSON
let datos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/artistas.json'), 'utf-8'));

// Esta funcion genera un nuevo id automaticamente
function getNextId() {
  return datos.length ? Math.max(...datos.map((artista) => artista.id)) + 1 : 1;
}

// Esta funcion inserta un nuevo artista
function insertar(artista) {
  artista.id = getNextId();
  datos.push(artista);
}

// Esta funcion actualiza un artista ya existente
function actualizar(artista) {
  artista.id = parseInt(artista.id, 10);
  const index = datos.findIndex((a) => a.id === artista.id);
  datos[index] = artista;
}

// Esta funcion obtiene todos los artistas
export function getAll() {
  return Promise.resolve(datos);
}

// Esta funcion devuelve un artista por su id 
export function get(id) {
  return Promise.resolve(datos.find((artista) => artista.id === id));
}

// Esta funcion elimina un artista por su id
export function remove(id) {
  datos = datos.filter((artista) => artista.id !== id);
  return Promise.resolve();
}

// Esta funcion guarda el artista 
export function save(artista) {
  if (artista.id === '') {
    insertar(artista);
  } else {
    actualizar(artista);
  }
  return Promise.resolve();
}
