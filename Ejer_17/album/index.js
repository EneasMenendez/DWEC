/**
 * Ejercicio 17 - API REST con Express.js y persistencia en JSON
 * Archivo: album/index.js — Capa de Router (MVC: enrutador)
 * Rol en la arquitectura: define todas las rutas HTTP del recurso "album" y las conecta
 *                         con las acciones del controlador; se exporta para montarlo en index.js
 *
 * Router()              → crea un mini-router de Express que agrupa rutas de un mismo recurso
 * router.get('/', fn)   → lista todos los álbumes (READ)
 * router.get('/form',fn)→ muestra formulario vacío para crear un álbum nuevo (CREATE form)
 * router.get('/form/:id')→ muestra formulario prerrellenado para editar un álbum (UPDATE form)
 * router.get('/delete/:id') → elimina el álbum indicado y redirige (DELETE)
 * router.post('/save',fn) → procesa el formulario y crea o actualiza el álbum (CREATE/UPDATE)
 */
//Rutas
import { Router } from 'express';

import {
  listaAction,
  eliminarAction,
  formAction,
  guardarAction,
} from './controller.js';

const router = Router();

// Lista de los albunes
router.get('/', listaAction);

// Eliminar un albun
router.get('/delete/:id', eliminarAction);

// formulario sin id -> crear
router.get('/form', formAction);

// formulario con id -> editar
router.get('/form/:id', formAction);

// guardar datos
router.post('/save', guardarAction);

export { router };
