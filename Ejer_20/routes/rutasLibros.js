/**
 * Ejercicio 20 - Router de Libros
 * Capa MVC: Controlador + Router
 * Conceptos: Express Router, CRUD MongoDB con Mongoose, query params, ordenación de resultados
 *
 * express.Router()      → crea un mini-router aislado; se monta en index.js bajo /api/libros
 * req.query.sort        → parámetro de URL para ordenar (?sort=titulo aplica orden ascendente)
 * query.sort({campo:1}) → ordena ascendentemente (1) o descendentemente (-1) por el campo indicado
 * findOne({_id})        → busca por ObjectId de 24 caracteres hexadecimales generado por MongoDB
 * findOneAndUpdate()    → busca, actualiza y devuelve el documento; {new:true} devuelve la versión nueva
 * findOneAndDelete()    → busca y elimina atomicamente el documento que coincide con el filtro
 * status(204)           → respuesta "Sin contenido"; indica que la operación fue exitosa pero no hay body
 */
import express from 'express';
import esquemaLibro from '../esquemas/esquemaLibro.js';
import { conectarMongo } from '../db.js';

const router = express.Router();


/** GET /api/libros: Obtener todos los libros.
* Añadir (misma ruta con parámetros para poder ordenar libros por 
título: GET /api/libros?sort=titulo: Ordenar libros por título. */
router.get('/', async (req, res) => {
  try {

    await conectarMongo();

    const { sort } = req.query;

    // find() sin filtro devuelve todos los documentos; la query se construye antes de ejecutarse
    let query = esquemaLibro.find();

    // Si ?sort=titulo se añade ordenación ascendente (1) por el campo título
    if (sort === 'titulo') {
      query = query.sort({ titulo: 1 });
    }

    // Ejecuta la query (con o sin ordenación) y espera el resultado
    const libros = await query;

    res.json(libros);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET /api/libros/:id: Obtener un libro específico por su referencia.
router.get('/:id', async (req, res) => {
  try {

    await conectarMongo();

    let libro;
    // Los ObjectId de MongoDB tienen exactamente 24 caracteres hexadecimales;
    // si el id enviado tiene esa longitud se busca por _id, de lo contrario por 'referencia'
    if (req.params.id.length === 24) {
      libro = await esquemaLibro.findOne({
        _id: req.params.id
      });
    } else {
      libro = await esquemaLibro.findOne({
        referencia: req.params.id
      });
    }

    res.json(libro);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// POST /api/libros: Crear un nuevo libro. (Body: { "titulo": "...", "genero": "...", "anyoPublicacion": ..., "autor": "id_del_autor" })
router.post('/', async (req, res) => {
  try {

    await conectarMongo();

    const nuevoLibro = new esquemaLibro(req.body);

    await nuevoLibro.save();

    res.status(201).json(nuevoLibro);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// PUT /api/libros/:id: Actualizar un libro existente. (Body: { "genero": "Ciencia Ficción" })
router.put('/:id', async (req, res) => {
  try {

    await conectarMongo();

    const actualizado = await esquemaLibro.findOneAndUpdate(
      { referencia: req.params.id }, // localiza el libro por su referencia legible
      req.body,                       // sustituye los campos enviados en el body (sin $set: reemplaza todo)
      { new: true }                   // devuelve el documento con los datos ya actualizados
    );

    res.json(actualizado);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// DELETE /api/libros/:id: Eliminar un libro.
router.delete('/:id', async (req, res) => {
  try {

    await conectarMongo();

    await esquemaLibro.findOneAndDelete({
      referencia: req.params.id
    });

    res.status(204).send();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;