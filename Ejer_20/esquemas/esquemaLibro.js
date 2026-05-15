/**
 * Ejercicio 20 - Modelo Libro
 * Capa MVC: Modelo
 * Conceptos: Schema Mongoose, relación entre colecciones por campo de texto, validadores, colección MongoDB
 *
 * mongoose.Schema  → define la estructura de los documentos de la colección 'libros'
 * required         → validador obligatorio; Mongoose lanza error si el campo falta al guardar
 * unique           → índice único; no pueden existir dos libros con la misma referencia
 * autor            → almacena la referencia del autor como String (relación manual, sin ObjectId)
 * mongoose.model() → genera el Model que expone los métodos find, save, findOneAndUpdate, etc.
 */
import mongoose from 'mongoose';

// Definición de la estructura de un documento Libro en MongoDB
const esquemaLibro = new mongoose.Schema({
    referencia: { type: String, unique: true, required: true }, // clave legible única del libro
    titulo: { type: String, required: true },                   // campo obligatorio
    genero: String,
    anyoPublicacion: Number,
    autor: { type: String, required: true },  // referencia al campo 'referencia' del autor (relación por valor)
    imagenUrl: String
});

// El tercer parámetro 'libros' fuerza el nombre de la colección en MongoDB
export default mongoose.model('Libro', esquemaLibro, 'libros');