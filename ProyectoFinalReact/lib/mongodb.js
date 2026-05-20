import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_fotografia';

const cached = global._mongoose ?? (global._mongoose = { conn: null, promise: null });

export async function connectMongo() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const mensajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  asunto: String,
  mensaje: { type: String, required: true },
  estado: {
    type: String,
    enum: ['nuevo', 'leido', 'respondido'],
    default: 'nuevo',
  },
  creado_en: { type: Date, default: Date.now },
  metadatos: mongoose.Schema.Types.Mixed,
});

export const Mensaje =
  mongoose.models.Mensaje ||
  mongoose.model('Mensaje', mensajeSchema, 'mensajes_contacto');

export default connectMongo;
