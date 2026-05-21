import mongoose from 'mongoose';

const ComentarioSchema = new mongoose.Schema({
  proyecto_id: { type: Number, required: true, index: true },
  nombre:      { type: String, required: true, trim: true, maxlength: 100 },
  email:       { type: String, required: true, trim: true },
  texto:       { type: String, required: true, trim: true, maxlength: 1000 },
  aprobado:    { type: Boolean, default: false },
  creado_en:   { type: Date, default: Date.now },
});

export default mongoose.models.Comentario ?? mongoose.model('Comentario', ComentarioSchema);
