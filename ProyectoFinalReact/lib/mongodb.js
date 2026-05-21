import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Define MONGODB_URI en .env.local');
}

// Reutiliza la conexión en desarrollo para evitar múltiples conexiones con HMR
const cached = global._mongoose ?? (global._mongoose = { conn: null, promise: null });

export async function connectMongoDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
