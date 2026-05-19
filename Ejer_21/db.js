/**
 * Ejercicio 21 - Conexión a MySQL (AWS RDS) con pool de conexiones
 * Capa MVC: Configuración
 * Conceptos: mysql2/promise, pool de conexiones, variables de entorno, AWS RDS
 *
 * mysql2/promise    → versión de mysql2 que devuelve Promesas en lugar de callbacks; permite usar async/await
 * createPool()      → crea un conjunto de conexiones reutilizables; evita abrir/cerrar una conexión por query
 * Pool              → cuando una query termina, la conexión vuelve al pool para que otra la use (más eficiente)
 * AWS RDS           → servicio de base de datos relacional gestionado de Amazon Web Services
 * dotenv            → carga las credenciales desde el archivo .env para no exponerlas en el código
 */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargo las variables del .env
dotenv.config();

// Creo el pool de conexiones a AWS RDS
export const conexionBD = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});






// export const conexionBD = mysql.createPool({
//   host: 'dbejerciciosia.cnc6ds24hpyr.us-east-1.rds.amazonaws.com',
//   user: 'ejerciciosIA',
//   password: '12345678',
//   database: 'portfolio'
// });