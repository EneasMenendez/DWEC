/**
 * Ejercicio 21 - Integración con Filebase (almacenamiento compatible S3)
 * Capa MVC: Configuración / Servicio
 * Conceptos: AWS SDK v3, S3Client, comandos S3, Filebase, ACL pública, streaming de objetos
 *
 * S3Client          → cliente del SDK de AWS v3 para interactuar con buckets S3 o compatibles (Filebase)
 * endpoint          → URL personalizada que redirige las llamadas al proveedor alternativo (Filebase en lugar de AWS)
 * forcePathStyle    → fuerza el formato de URL path-style (endpoint/bucket/key) en vez de subdominios
 * PutObjectCommand  → comando para subir un objeto (archivo) al bucket con metadatos como ContentType y ACL
 * DeleteObjectCommand→ comando para eliminar un objeto del bucket usando su Key (nombre)
 * GetObjectCommand  → comando para descargar un objeto; devuelve un stream en data.Body
 * ACL:'public-read' → hace que el objeto sea accesible públicamente mediante URL directa
 */
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// Cargo las variables del .env
dotenv.config();

// Creo el cliente S3 apuntando a Filebase
export const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,      // URL de Filebase en lugar del endpoint por defecto de AWS
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  forcePathStyle: true  // necesario para proveedores S3-compatibles como Filebase o MinIO
});

export const BUCKET = process.env.AWS_BUCKET_MANE;

// Subo una imagen al bucket de Filebase
export async function subirImagen(nombreArchivo, buffer, mimetype) {
  // Key es el nombre con el que se guardará el archivo en el bucket
  // Body es el Buffer en memoria que Multer proporcionó (no se escribe en disco)
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: nombreArchivo,
    Body: buffer,
    ContentType: mimetype,
    ACL: 'public-read'  // permite que cualquiera pueda acceder al archivo con su URL
  }));
}

// Elimino una imagen del bucket de Filebase
export async function eliminarImagen(nombreArchivo) {
  // Key identifica de forma unívoca el objeto dentro del bucket
  await s3.send(new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: nombreArchivo
  }));
}

// Obtengo una imagen del bucket de Filebase y la mando al navegador
export async function obtenerImagen(nombreArchivo) {
  // GetObjectCommand devuelve data.Body como un stream que se puede pipear directamente a res
  return await s3.send(new GetObjectCommand({
    Bucket: BUCKET,
    Key: nombreArchivo
  }));
}