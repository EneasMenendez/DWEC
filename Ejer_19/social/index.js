/**
 * Ejercicio 19 - Router del módulo Social Links
 * Capa MVC: Router
 * Conceptos: protección de rutas con middleware, CRUD de redes sociales
 *
 * Misma estructura que el router de proyectos → patrón consistente en toda la aplicación:
 * GET /new + POST /save + GET /edit/:id + GET /delete/:id
 * auth en todas las rutas → las redes sociales son datos privados del usuario autenticado
 */

import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import {formularioNuevoLink,formularioEditarLink,guardarLink,borrarLink} from './controller.js';

const router = Router();

router.get('/new',auth,formularioNuevoLink);
router.get('/edit/:id',auth,formularioEditarLink);
router.post('/save',auth,guardarLink);
router.get('/delete/:id',auth,borrarLink);

export { router };