/**
 * Ejercicio 20 - Modelo Autor
 * Capa MVC: Modelo
 * Conceptos: Schema Mongoose, validadores de campo, modelo ODM, colección MongoDB
 *
 * mongoose.Schema  → define la estructura (campos, tipos y restricciones) de los documentos
 * required         → validador que impide guardar el documento si el campo está vacío
 * unique           → crea un índice único en MongoDB para evitar duplicados en ese campo
 * mongoose.model() → compila el schema en un Model que representa la colección 'autores'
 */
import mongoose from 'mongoose';

// Definición de la estructura de un documento Autor en MongoDB
const esquemaAutor = new mongoose.Schema({
    referencia: { type: String, unique: true, required: true }, // identificador legible, debe ser único
    nombre: { type: String, required: true },                   // campo obligatorio
    nacionalidad: String,
    fechaNacimiento: Date,
    imagenUrl: String
});

// El tercer parámetro 'autores' fuerza el nombre de la colección en MongoDB
export default mongoose.model('Autor', esquemaAutor, 'autores');