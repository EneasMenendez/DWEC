/**
 * Ejercicio 18 - Modelo del módulo Libros
 * Capa MVC: Modelo
 * Conceptos: queries SQL parametrizadas, INNER JOIN, async/await, desestructuración de arrays
 *
 * query('SQL', [params]) → ejecuta una query parametrizada; los '?' evitan inyección SQL
 * const [filas] = await  → mysql2 devuelve [rows, fields]; desestructuramos solo las filas
 * INNER JOIN             → combina libros con préstamos para obtener datos relacionados de ambas tablas
 * CURDATE()              → función MySQL que devuelve la fecha actual del servidor (sin hora)
 * fecha_entrega IS NULL  → filtra préstamos activos: si no hay fecha de entrega, el libro sigue prestado
 */

import { conexionBD } from '../db.js';

// Obtengo todos los libros
export async function obtenerTodosLosLibros() {
  const [filas] = await conexionBD.query('SELECT * FROM libros');
  return filas;
}

// Obtengo el libro por id
export async function obtenerLibroPorId(id) {
  const [filas] = await conexionBD.query(
    'SELECT * FROM libros WHERE id=?',
    [id]
  );
  return filas[0];
}

// Actualizo estado del libro
export async function actualizarEstadoLibro(id, estado) {
  await conexionBD.query(
    'UPDATE libros SET estado=? WHERE id=?',
    [estado, id]
  );
}

// Obtengo los libros prestados
export async function obtenerLibrosPrestados() {
  const [filas] = await conexionBD.query(`
    SELECT l.*, p.nombre_prestatario, p.fecha_devolucion
    FROM libros l
    INNER JOIN prestamos p ON l.id = p.libro_id
    WHERE l.estado='Prestado' AND p.fecha_entrega IS NULL
    -- fecha_entrega IS NULL: el préstamo está activo (el libro no ha sido devuelto todavía)
  `);

  return filas;
}
//Obtengo los libros vencidos
export async function obtenerLibrosVencidos() {
  const [rows] = await conexionBD.query(`
    SELECT l.*, p.fecha_devolucion
    FROM libros l
    JOIN prestamos p ON l.id = p.libro_id
    WHERE p.fecha_devolucion < CURDATE()  -- la fecha límite ya pasó...
      AND p.fecha_entrega IS NULL          -- ...pero el libro todavía no fue devuelto → está vencido
  `);

  return rows;
}
