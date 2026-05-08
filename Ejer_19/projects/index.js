/**
 * Ejercicio 19 - Router del módulo Proyectos
 * Capa MVC: Router
 * Conceptos: protección de rutas con middleware, CRUD completo, parámetros de ruta
 *
 * Todas las rutas incluyen 'auth' → ninguna operación CRUD de proyectos está disponible sin sesión
 * GET /new + POST /save → patrón estándar para formularios: GET muestra el form vacío,
 *                          POST procesa y guarda; la misma ruta /save gestiona crear y editar
 *                          según si el body contiene 'id' o no
 * GET /delete/:id       → en una app real se usaría DELETE con fetch; aquí se simplifica con GET
 *                         para no requerir JavaScript en el cliente
 */

import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import {formularioNuevoProyecto,formularioEditarProyecto,guardarProyecto,borrarProyecto} from './controller.js';

const router = Router();

router.get('/new',auth,formularioNuevoProyecto);
router.get('/edit/:id',auth,formularioEditarProyecto);
router.post('/save',auth,guardarProyecto);
router.get('/delete/:id',auth,borrarProyecto);

export { router };