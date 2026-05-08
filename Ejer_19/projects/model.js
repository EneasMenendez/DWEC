/**
 * Ejercicio 19 - Modelo del módulo Proyectos
 * Capa MVC: Modelo
 * Conceptos: CRUD completo en SQL, autorización a nivel de modelo, queries parametrizadas
 *
 * WHERE user_id=?          → filtra los proyectos por propietario; cada usuario solo ve los suyos
 * AND user_id=? en UPDATE  → doble verificación de propiedad en la query SQL: aunque alguien
 *                            adivine el 'id' del proyecto, no puede modificarlo si no es su dueño
 * spread operator {...req.body, user_id} → combina los datos del formulario con el id seguro de sesión
 * DELETE con AND user_id   → misma protección que UPDATE; evita borrado de proyectos ajenos
 */

import { conexionBD } from '../db.js';

// Funcion que obtiene todos los proyectos
export async function obtenerProyectos(user_id) {

  const [filas] = await conexionBD.query(`
    SELECT * FROM projects WHERE user_id=?`, [user_id]);

  return filas;
}

// Funcion que obtiene un proyecto a partir de su id
export async function obtenerProyectoPorId(id) {

  const [filas] = await conexionBD.query(`
    SELECT * FROM projects WHERE id=?`, [id]);

  return filas[0];
}

// Funcion que crea un proyecto
export async function crearProyecto(datos) {

  await conexionBD.query(`
    INSERT INTO projects
    (title, description, repo_url, live_url, user_id)
    VALUES (?, ?, ?, ?, ?)
  `, [datos.title,datos.description,datos.repo_url,datos.live_url,datos.user_id]);
}

// Funcion que actualiza un proyecto
export async function actualizarProyecto(datos) {

  await conexionBD.query(`
    UPDATE projects SET
      title=?,description=?,repo_url=?,live_url=? WHERE id=? AND user_id=?`, [
    datos.title,datos.description,datos.repo_url,datos.live_url,datos.id,datos.user_id]);
}

//Funcion que elimina un proyecto
export async function eliminarProyecto(id, user_id) {

  await conexionBD.query(`
    DELETE FROM projectsWHERE id=? AND user_id=?`, [id, user_id]);
}