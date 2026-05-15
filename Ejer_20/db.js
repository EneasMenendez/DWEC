/**
 * Ejercicio 20 - Conexión a MongoDB con Mongoose
 * Capa MVC: Configuración
 * Conceptos: Mongoose ODM, conexión a MongoDB Atlas, variables de entorno, singleton de conexión
 *
 * Mongoose ODM → librería que actúa como capa de abstracción sobre MongoDB; permite definir esquemas y modelos
 * dotenv        → módulo que carga variables definidas en el archivo .env a process.env en tiempo de ejecución
 * readyState    → propiedad de Mongoose que indica el estado de la conexión (0=desconectado, 1=conectado, etc.)
 * Singleton     → patrón que evita abrir múltiples conexiones comprobando si ya existe una activa
 */
import mongoose from "mongoose";
import dotenv from 'dotenv';

//Cargamos las variables del archivo .env a process.env
dotenv.config();

const uri = process.env.MONGO_URI;

export async function conectarMongo() {
  // Si readyState es 1 ya hay una conexión activa; no abrimos otra (patrón singleton)
  if (mongoose.connection.readyState === 1)
    return;

  await mongoose.connect(uri);

}
