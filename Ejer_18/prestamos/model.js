/**
 * Ejercicio 18 - Modelo del módulo Préstamos
 * Capa MVC: Modelo
 * Conceptos: INSERT parametrizado, UPDATE con condición, INNER JOIN, CURDATE()
 *
 * INSERT parametrizado  → los '?' protegen contra inyección SQL; mysql2 escapa los valores automáticamente
 * CURDATE()             → registra la fecha actual del servidor MySQL como fecha de entrega real,
 *                         independientemente de lo que envíe el cliente
 * fecha_entrega IS NULL → condición clave: solo actualiza el préstamo activo (sin fecha de entrega)
 *                         para no sobreescribir devoluciones previas del mismo libro
 * INNER JOIN            → necesario para obtener datos del libro (título, autor) junto con el préstamo
 */

import { conexionBD } from '../db.js';


// Funcion que crea un prestamo
export async function crearPrestamo(datos) {
  await conexionBD.query(`
    INSERT INTO prestamos 
    (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion)
    VALUES (?, ?, ?, ?)
  `, [
    datos.libro_id,
    datos.nombre,
    datos.fecha_prestamo,
    datos.fecha_devolucion
  ]);
}

// Funcion que actualiza la bd para actualizar la devolucion de un libro
export async function registrarDevolucion(libro_id) {
  await conexionBD.query(`
    UPDATE prestamos
    SET fecha_entrega = CURDATE()   -- usamos la fecha del servidor, no la del cliente, para mayor fiabilidad
    WHERE libro_id=? AND fecha_entrega IS NULL  -- solo afecta al préstamo activo, no a los históricos
  `, [libro_id]);
}

//Funcion que obtine los prestamos de un usuario
export async function obtenerPrestamosPorUsuario(nombre) {
  const [filas] = await conexionBD.query(`
    SELECT l.*, p.fecha_devolucion
    FROM prestamos p
    INNER JOIN libros l ON l.id = p.libro_id
    WHERE p.nombre_prestatario=? AND p.fecha_entrega IS NULL
  `, [nombre]);

  return filas;
}


