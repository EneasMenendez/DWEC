/**
 * Ejercicio 18 - Router del módulo Préstamos
 * Capa MVC: Router
 * Conceptos: Express Router, rutas GET/POST, parámetros de ruta, query strings
 *
 * router.get / router.post → definen qué función del controlador maneja cada tipo de petición HTTP
 * :libro_id               → parámetro dinámico en la URL; accesible en el controlador con req.params.libro_id
 * /usuario (GET)          → usa query string (?nombre=...) en vez de param de ruta porque el nombre
 *                           no identifica un recurso único sino que es un filtro de búsqueda
 */

import { Router } from 'express';
import {mostrarFormularioPrestamo,crearPrestamo,registrarDevolucion,mostrarPrestamosUsuario} from './controller.js';
import {mostrarLibrosVencidos} from '../libros/controller.js';

const router = Router();

// Voy a la ventana donde puedo ver los prestamos
router.get('/formulario/:libro_id', mostrarFormularioPrestamo);

// Voy a la ventana donde creo el prestamo
router.post('/nuevo', crearPrestamo);

// Voy a la ventana de devolucion de un libro
router.get('/devolver/:libro_id', registrarDevolucion);

// Voy a la ventana donde puedo ver los libros que tiene prestados cada usuario
router.get('/usuario', mostrarPrestamosUsuario);

// Voy a la ventana donde puedo ver todos los libros vencidos
router.get('/vencidos', mostrarLibrosVencidos);

export { router };
