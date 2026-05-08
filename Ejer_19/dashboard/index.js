/**
 * Ejercicio 19 - Router del módulo Dashboard
 * Capa MVC: Router
 * Conceptos: protección de rutas con middleware, encadenamiento de handlers en Express
 *
 * auth como segundo argumento  → Express permite encadenar múltiples handlers en una ruta;
 *                                 auth se ejecuta primero y, si pasa la validación, llama a next()
 *                                 para que Express ejecute el controlador final (dashboard / actualizarPerfil)
 * Todas las rutas del dashboard requieren autenticación → el middleware auth protege el área privada
 */

import { Router } from 'express';

import { auth } from '../middleware/auth.js';

import {
  dashboard,
  actualizarPerfil
} from './controller.js';

const router = Router();

router.get(
  '/',
  auth,
  dashboard
);

router.post(
  '/profile',
  auth,
  actualizarPerfil
);

export { router };