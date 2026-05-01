/**
 * Ejercicio 18 - Router del módulo Libros
 * Capa MVC: Router
 * Conceptos: Express Router, rutas GET, parámetros de ruta (:id)
 *
 * Router          → mini-aplicación Express que agrupa rutas relacionadas en un módulo independiente
 * :id             → parámetro de ruta dinámico, accesible en el controlador mediante req.params.id
 * Separar routers → favorece la organización MVC; cada módulo tiene su propio fichero de rutas
 */

import { Router } from 'express';
import {mostrarLibros,mostrarLibrosPrestados,mostrarDetalleLibro,mostrarLibrosVencidos} from './controller.js';

const router = Router();

// Ruta que lleva a ver los libros
router.get('/libros', mostrarLibros);

// Ruta que lleva a ver los libros prestados
router.get('/prestados', mostrarLibrosPrestados);

// Ruta que lleva a ver los detalles del libro
router.get('/libro/:id', mostrarDetalleLibro);

//Ruta que lleva a ver los libros vencidos
router.get('/vencidos', mostrarLibrosVencidos);

export { router };
