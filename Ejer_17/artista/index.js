/**
 * Ejercicio 17 - API REST con Express.js y persistencia en JSON
 * Archivo: artista/index.js — Capa de Router (MVC: enrutador)
 * Rol en la arquitectura: define todas las rutas HTTP del recurso "artista" y las conecta
 *                         con las acciones del controlador; se exporta para montarlo en index.js
 *
 * Router()             → crea un mini-router de Express que agrupa rutas de un mismo recurso
 * router.get(path, fn) → registra un handler para peticiones GET en la ruta indicada
 * router.post(path,fn) → registra un handler para peticiones POST (envío de formularios)
 * :id                  → segmento dinámico de URL; Express lo expone en request.params.id
 */
//Rutas
import { Router } from 'express';
import { listaAction, eliminarAction, formAction, guardarAction, detalleAction } from './controller.js';

const router = Router();

// Ruta para mostrar la lista de artistas
router.get('/', listaAction);
 
// Ruta para mostrar el formulario para crear artista
router.get('/form', formAction);

// Ruta para editar un artista existente
router.get('/form/:id', formAction);

// Ruta para eliminar un artista
router.get('/delete/:id', eliminarAction);

//Ruta para ver el detalle de un artista
router.get('/detalle/:id', detalleAction);

// Ruta que recibe los datos del formulario y crea o actualiza el artista
router.post('/save', guardarAction);
export { router };
