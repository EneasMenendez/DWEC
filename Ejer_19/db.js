/**
 * Ejercicio 19 - Configuración de la conexión a la base de datos
 * Capa MVC: Configuración
 * Conceptos: mysql2/promise, dotenv, pool de conexiones, variables de entorno
 *
 * mysql2/promise  → driver oficial de MySQL para Node.js con soporte async/await nativo
 * dotenv          → carga el archivo .env en process.env; mantiene credenciales fuera del código fuente
 * createPool      → mantiene un grupo de conexiones reutilizables; más eficiente que conectar y
 *                   desconectar en cada petición HTTP, especialmente en apps con autenticación
 * process.env     → las variables de entorno nunca se suben a repositorios, protegiendo las credenciales
 */

// Configuro la conexión a MySQL
 import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

//Cargamos las variables del archivo .env a process.env
dotenv.config();

// Creo el pool de conexiones
export const conexionBD = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port:process.env.DB_PORT
});






// export const conexionBD = mysql.createPool({
//   host: 'dbejerciciosia.cnc6ds24hpyr.us-east-1.rds.amazonaws.com',
//   user: 'ejerciciosIA',
//   password: '12345678',
//   database: 'portfolio'
// });