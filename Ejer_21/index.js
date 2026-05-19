/**
 * Ejercicio 21 - Servidor principal: Gestión de alumnos con imágenes en la nube
 * Capa MVC: Controlador / Configuración
 * Conceptos: Multer, multipart/form-data, UUID, AWS S3, MySQL, streaming de objetos, memoryStorage
 *
 * Multer            → middleware Express para gestionar subida de archivos (multipart/form-data)
 * memoryStorage()   → guarda el archivo en un Buffer en RAM en lugar de escribirlo en disco
 * fileFilter        → función que acepta o rechaza archivos según su tipo MIME
 * limits.fileSize   → tamaño máximo permitido (aquí 5 MB = 5 * 1024 * 1024 bytes)
 * uuidv4()          → genera un identificador único universal v4 para evitar colisiones de nombres en el bucket
 * upload.single()   → middleware que procesa un único campo de archivo (el campo 'imagen' del formulario)
 * req.file          → objeto con los datos del archivo subido (buffer, mimetype, originalname, etc.)
 * data.Body.pipe()  → canaliza el stream de S3 directamente a la respuesta HTTP sin guardar en disco
 * INSERT INTO       → sentencia SQL para insertar un registro; los '?' son placeholders para evitar SQL injection
 * pool.query()      → ejecuta una query y devuelve [rows, fields]; destructuramos solo rows con [rows]
 */
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { conexionBD } from './db.js';
import { subirImagen, eliminarImagen, obtenerImagen } from './filebase.js';

// Cargo las variables del .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuro multer para guardar el archivo en memoria
const upload = multer({
  storage: multer.memoryStorage(),              // el archivo queda en req.file.buffer, sin tocar el disco
  limits: { fileSize: 5 * 1024 * 1024 },        // rechaza archivos mayores de 5 MB
  fileFilter: (req, file, cb) => {
    // Valida que el tipo MIME sea una imagen permitida; cb(null,true) acepta, cb(Error) rechaza
    const valido = /jpeg|jpg|png|gif|webp/.test(file.mimetype);
    valido ? cb(null, true) : cb(new Error('Solo se permiten imagenes'));
  }
});
app.use(express.static(`${path.dirname(fileURLToPath(import.meta.url))}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Obtengo la imagen del bucket y la muestri
app.get('/imagen/:nombre', async (req, res) => {
  try {
    const data = await obtenerImagen(req.params.nombre);
    // Establece el Content-Type correcto para que el navegador interprete la imagen
    res.setHeader('Content-Type', data.ContentType || 'application/octet-stream');
    // Canaliza el stream de S3 directamente a la respuesta; evita cargar toda la imagen en memoria
    data.Body.pipe(res);
  } catch (err) {
    res.status(404).json({ error: 'Imagen no encontrada' });
  }
});

// Obtengo todos los alumnos de la BD
app.get('/alumnos', async (req, res) => {
  try {
    const [rows] = await conexionBD.query('SELECT * FROM alumno ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});

// Recibo los datos del formulario.Una vez que los tengo: subo la imagen a Filebase y guardo el alumno en la BD
app.post('/alumnos', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, apellidos, localidad } = req.body;

    if (!nombre || !apellidos)
      return res.status(400).json({ error: 'Nombre y apellidos son obligatorios' });

    let nombreImagen = null;

    if (req.file) {
      // Renombro la imagen con UUID para que no haya duplicados en el bucket
      // Ejemplo: "foto.jpg" → "3f2504e0-4f89-11d3-9a0c-0305e82c3301.jpg"
      const ext = path.extname(req.file.originalname).toLowerCase();
      nombreImagen = `${uuidv4()}${ext}`;
      // req.file.buffer contiene la imagen en memoria gracias a memoryStorage de Multer
      await subirImagen(nombreImagen, req.file.buffer, req.file.mimetype);
    }

    // Guardo el alumno en la base de datos
    const [resultado] = await conexionBD.query(
      'INSERT INTO alumno (nombre, apellidos, localidad, imagen) VALUES (?, ?, ?, ?)',
      [nombre, apellidos, localidad || null, nombreImagen]
    );

    res.status(201).json({
      id: resultado.insertId,
      nombre, apellidos,
      localidad: localidad || null,
      imagen: nombreImagen
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el alumno' });
  }
});

// Elimino el alumno de la BD y su imagen del bucket
app.delete('/alumnos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Busco al alumno para saber que imagen tiene antes de borrarlo
    const [rows] = await conexionBD.query('SELECT imagen FROM alumno WHERE id = ?', [id]);
    if (rows.length === 0)
      return res.status(404).json({ error: 'Alumno no encontrado' });

    const nombreImagen = rows[0].imagen;

    // Borro el alumno de la base de datos
    await conexionBD.query('DELETE FROM alumno WHERE id = ?', [id]);

    // Compruebo si tiene imagen y la borro tambien del bucket
    if (nombreImagen) {
      await eliminarImagen(nombreImagen);
    }

    res.json({ mensaje: 'Alumno eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el alumno' });
  }
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));