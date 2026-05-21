import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Comentario from '@/lib/models/Comentario';
import { getSession } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';
import { checkCsrf } from '@/lib/csrf';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const proyectoId = searchParams.get('proyecto');
  const session = await getSession();

  await connectMongoDB();

  if (session) {
    const query = proyectoId ? { proyecto_id: parseInt(proyectoId) } : {};
    const comentarios = await Comentario.find(query).sort({ creado_en: -1 }).lean();
    return NextResponse.json(comentarios);
  }

  if (!proyectoId) return NextResponse.json({ error: 'Parámetro proyecto requerido.' }, { status: 400 });
  const comentarios = await Comentario.find({ proyecto_id: parseInt(proyectoId), aprobado: true })
    .sort({ creado_en: -1 }).lean();
  return NextResponse.json(comentarios);
}

export async function POST(request) {
  if (!checkCsrf(request)) {
    return NextResponse.json({ error: 'Petición no permitida.' }, { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const { limited, retryAfter } = checkRateLimit(`comentarios:${ip}`, { max: 5, windowMs: 60 * 60 * 1000 });
  if (limited) {
    return NextResponse.json({ error: `Demasiados comentarios. Espera ${retryAfter}s.` }, { status: 429 });
  }

  try {
    const body = await request.json();

    if (!body.nombre || body.nombre.trim().length < 2)
      return NextResponse.json({ error: 'El nombre debe tener al menos 2 caracteres.' }, { status: 400 });
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      return NextResponse.json({ error: 'Email no válido.' }, { status: 400 });
    if (!body.texto || body.texto.trim().length < 5)
      return NextResponse.json({ error: 'El comentario debe tener al menos 5 caracteres.' }, { status: 400 });
    if (!body.proyecto_id)
      return NextResponse.json({ error: 'Proyecto requerido.' }, { status: 400 });

    await connectMongoDB();
    const comentario = await Comentario.create({
      proyecto_id: parseInt(body.proyecto_id),
      nombre: body.nombre.trim(),
      email: body.email.trim(),
      texto: body.texto.trim(),
    });
    return NextResponse.json(comentario, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
