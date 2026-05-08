/**
 * Ejercicio 19 - Modelo del módulo Usuarios
 * Capa MVC: Modelo
 * Conceptos: MD5 en MySQL, queries parametrizadas, autenticación en base de datos
 *
 * MD5(?)          → función de hash de MySQL aplicada directamente en la query; la contraseña
 *                   nunca viaja en texto plano al almacenamiento. NOTA: MD5 no es seguro para
 *                   producción (usar bcrypt en apps reales), pero sirve para aprender el concepto
 * Login por query → en vez de obtener el usuario y comparar en JS, se valida directamente en SQL:
 *                   si la query devuelve fila, las credenciales son correctas; si no, son incorrectas
 * filas[0]        → devolvemos solo el primer resultado; si undefined, el usuario no existe o
 *                   las credenciales son incorrectas
 */

import { conexionBD } from '../db.js';

// Crear usuario
export async function crearUsuario(datos) {

  // MD5(?) hashea la contraseña antes de guardarla; nunca se almacena texto plano
  await conexionBD.query(`
    INSERT INTO users (username, password, bio, email, photo) VALUES (?, MD5(?), ?, ?, ?)
  `, [datos.username,datos.password,datos.bio,datos.email,datos.photo]);
}

// Login
export async function login(username, password) {

  // Hasheamos la contraseña recibida con MD5 y comparamos con la almacenada;
  // si coinciden, MySQL devuelve la fila del usuario; si no, devuelve vacío
  const [filas] = await conexionBD.query(`
    SELECT * FROM users WHERE username=? AND password=MD5(?)
  `, [username, password]);

  return filas[0];
}

// Obtener usuario por username
export async function obtenerUsuario(username) {

  const [filas] = await conexionBD.query(`
    SELECT * FROM users WHERE username=?
  `, [username]);

  return filas[0];
}

// Obtener usuario por id
export async function obtenerUsuarioPorId(id) {

  const [filas] = await conexionBD.query(`
    SELECT * FROM users WHERE id=?
  `, [id]);

  return filas[0];
}

// Actualizar perfil
export async function actualizarPerfil(id, bio, email) {

  await conexionBD.query(`
    UPDATE users SET bio=?, email=? WHERE id=? `, [bio, email, id]);
}

export async function obtenerTodosLosUsuarios() {
  const [filas] = await conexionBD.query('SELECT username FROM users');
  return filas;
}