/**
 * Ejercicio 19 - Modelo del módulo Social Links
 * Capa MVC: Modelo
 * Conceptos: CRUD con filtro por propietario, queries parametrizadas, seguridad por diseño
 *
 * WHERE user_id=?         → todas las queries filtran por usuario; un usuario no puede ver
 *                           ni modificar los links de otro aunque conozca el 'id' del link
 * AND user_id=? en UPDATE/DELETE → la doble condición id+user_id garantiza que solo el propietario
 *                                  puede modificar o eliminar su propio link social
 * Patrón idéntico a projects → reutilizar el mismo patrón CRUD facilita el mantenimiento y
 *                               la comprensión del código entre módulos
 */

import { conexionBD } from '../db.js';

// Funcion que obtiene todos los social links
export async function obtenerLinks(user_id) {

  const [filas] = await conexionBD.query(`
    SELECT * FROM social_links WHERE user_id=?`, [user_id]);

  return filas;
}

// Funcion que obtiene un socialLinks a partir de su id
export async function obtenerLinkPorId(id) {

  const [filas] = await conexionBD.query(`
    SELECT * FROM social_links WHERE id=?`, [id]);

  return filas[0];
}

// Funcion que crea un socialLink
export async function crearLink(datos) {

  await conexionBD.query(`
    INSERT INTO social_links
    (platform, url, user_id)
    VALUES (?, ?, ?)
  `, [datos.platform,datos.url,datos.user_id]);
}

// Funcion que actualiza un SocialLink
export async function actualizarLink(datos) {

  await conexionBD.query(`
    UPDATE social_links SET platform=?,url=? WHERE id=? AND user_id=?
  `, [datos.platform,datos.url,datos.id,datos.user_id]);
}

// Funcion que elimina un socialLink
export async function eliminarLink(id, user_id) {

  await conexionBD.query(`
    DELETE FROM social_linksWHERE id=? AND user_id=?`, [id, user_id]);
}