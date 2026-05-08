/**
 * Ejercicio 19 - Router del módulo Usuarios
 * Capa MVC: Router
 * Conceptos: Express Router, rutas GET/POST para autenticación, parámetros de ruta
 *
 * GET /register  → muestra el formulario vacío de registro
 * POST /register → recibe los datos del formulario y crea el usuario en la BD
 * GET /login     → muestra el formulario de login
 * POST /login    → valida credenciales y crea la sesión si son correctas
 * GET /logout    → destruye la sesión y redirige al login
 * GET /portfolio/:username → perfil público del usuario (no requiere autenticación)
 *
 * El patrón GET+POST en la misma ruta es estándar para formularios:
 * GET muestra el form, POST procesa los datos enviados
 */

import { Router } from 'express';

import {formularioRegister,crearUsuario,formularioLogin,login,
  logout,portfolio,listarUsuarios} from './controller.js';

const router = Router();

router.get('/all', listarUsuarios); 
router.get('/register', formularioRegister);

router.post('/register', crearUsuario);

router.get('/login', formularioLogin);

router.post('/login', login);

router.get('/logout', logout);

router.get('/portfolio/:username', portfolio);

export { router };