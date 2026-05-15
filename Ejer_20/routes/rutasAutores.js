/**
 * Ejercicio 20 - Router de Autores
 * Capa MVC: Controlador + Router
 * Conceptos: Express Router, CRUD MongoDB con Mongoose, query params, búsqueda flexible por _id o referencia
 *
 * express.Router()      → crea un mini-router aislado; se monta en index.js bajo /api/autores
 * req.query             → objeto con los parámetros de la URL (?nacionalidad=Española)
 * find(filtro)          → devuelve todos los documentos que coincidan con el objeto filtro
 * findOne(filtro)       → devuelve el primer documento que cumple el filtro (null si no existe)
 * findOneAndUpdate()    → busca, actualiza y devuelve el documento; {new:true} devuelve la versión actualizada
 * findOneAndDelete()    → busca y elimina el primer documento que coincida con el filtro
 * $set                  → operador MongoDB que actualiza solo los campos indicados, sin tocar el resto
 */
import express from 'express';
import esquemaAutor from '../esquemas/esquemaAutor.js';
import esquemaLibro from '../esquemas/esquemaLibro.js';
import { conectarMongo } from '../db.js';

const router = express.Router();


/** GET /api/autores: Obtener todos los autores.
* Añadir (misma ruta con parámetros para poder filtrar por nacionalidad):  */
router.get('/', async (req, res) => {
    try {

        await conectarMongo();

        const { nacionalidad } = req.query;

        // Si se recibe el parámetro ?nacionalidad=X el filtro lo aplica; si no, devuelve todos
        const filtro = nacionalidad
            ? { nacionalidad }
            : {};

        const autores = await esquemaAutor.find(filtro);

        res.json(autores);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET /api/autores/:id: Obtener un autor específico por su ID.
router.get('/:id', async (req, res) => {
    try {

        await conectarMongo();
        let autor = "No existe el Autor";
        // Búsqueda flexible: si el id tiene más de 5 caracteres se asume ObjectId de MongoDB,
        // en caso contrario se trata como el campo 'referencia' (clave legible)
        if (req.params.id.length > 5) {
            autor = await esquemaAutor.findOne({
                _id: req.params.id
            });
        } else {
            autor = await esquemaAutor.findOne({
                referencia: req.params.id
            });
        }

        res.json(autor);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/autores: Crear un nuevo autor. (Body: { "nombre": "...", "nacionalidad": "...", "fechaNacimiento": "..." })
router.post('/', async (req, res) => {
    try {

        await conectarMongo();

        const nuevoAutor = new esquemaAutor(req.body);

        await nuevoAutor.save();

        res.status(201).json(nuevoAutor);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// PUT /api/autores/:id: Actualizar un autor existente. (Body: { "nacionalidad": "..." })
router.put('/:id', async (req, res) => {
    try {
        await conectarMongo();

        const actualizado = await esquemaAutor.findOneAndUpdate(
            { referencia: req.params.id }, // busca por referencia legible
            { $set: req.body },            // $set actualiza solo los campos enviados en el body
            { new: true }                  // devuelve el documento ya actualizado, no el original
        );

        if (!actualizado) return res.status(404).json({ error: 'Autor no encontrado' });

        res.json(actualizado);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});;


// DELETE /api/autores/:id: Eliminar un autor.
router.delete('/:id', async (req, res) => {
    try {

        await conectarMongo();

        await esquemaAutor.findOneAndDelete({
            referencia: req.params.id
        });

        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET /api/autores/:id/libros: Obtener todos los libros escritos por un autor específico.
router.get('/:id/libros', async (req, res) => {
    try {

        await conectarMongo();
        // Filtra en la colección de libros por el campo 'autor', que guarda la referencia del autor
        const libros = await esquemaLibro.find({
            autor: req.params.id
        });

        res.json(libros);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;