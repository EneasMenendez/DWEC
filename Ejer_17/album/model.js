/**
 * Ejercicio 17 - API REST con Express.js y persistencia en JSON
 * Archivo: album/model.js — Capa de Modelo (MVC: model)
 * Rol en la arquitectura: gestiona el acceso y la persistencia de los datos de álbumes;
 *                         carga el JSON al arrancar el servidor y mantiene los datos en memoria;
 *                         expone las operaciones CRUD (getAll, get, save, remove) al controlador
 *
 * fs.readFileSync()     → lee el archivo JSON de forma síncrona al iniciar el servidor
 * JSON.parse()          → convierte la cadena JSON en un array de objetos JS utilizables
 * Math.max(...ids)      → calcula el id más alto para el autoincremento; spread expande el array como argumentos
 * { ...album, id }      → spread operator para clonar el objeto album y sobreescribir solo el id al actualizar
 * Promise.resolve()     → devuelve una Promesa ya resuelta para mantener coherencia con la API async del controlador
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargo los datos desde el JSON 
let datos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/albumes.json'), 'utf-8'));

// Esta funcion genera un nuevo id automaticamente
function getNextId() {
  return datos.length ? Math.max(...datos.map((a) => a.id)) + 1 : 1;
}

// Funcion para insertar un nuevo album
function insertar(album) {
  album.id = getNextId();
  datos.push(album);
}

// Funcion para actualizar un album que ya existe
function actualizar(album) {
  const idNumerico = parseInt(album.id, 10);
  const index = datos.findIndex((a) => a.id === idNumerico);
  
  if (index !== -1) {
    datos[index] = { ...album, id: idNumerico };
  } else {
    console.error(`No se encontró el álbum con ID: ${idNumerico}`);
  }
}

// Funcion para obtener todos los albumes
export function getAll() {
  return Promise.resolve(datos);
}

// Funcion para obtener un album por id
export function get(id) {
  return Promise.resolve(datos.find((a) => a.id === id));
}

// Funcion para eliminar un album por id
export function remove(id) {
  datos = datos.filter((a) => a.id !== id);
  return Promise.resolve();
}

// Funcion que guarda el album 
export function save(album) {
  if (album.id === '') {
    insertar(album);
  } else {
    actualizar(album);
  }
  return Promise.resolve();
}
