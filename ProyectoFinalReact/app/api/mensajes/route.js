import { NextResponse } from 'next/server';
import { Mensaje } from '@/lib/mysql';
import { getSession } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';
import { checkCsrf } from '@/lib/csrf';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const mensajes = await Mensaje.findAll({ order: [['creado_en', 'DESC']] });
    return NextResponse.json(mensajes);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!checkCsrf(request)) {
    return NextResponse.json({ error: 'Petición no permitida.' }, { status: 403 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const { limited, retryAfter } = checkRateLimit(`mensajes:${ip}`, { max: 3, windowMs: 60 * 60 * 1000 });
  if (limited) {
    return NextResponse.json(
      { error: `Demasiados mensajes. Espera ${retryAfter} segundos.` },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    );
  }

  try {
    const body = await request.json();

    if (!body.nombre || body.nombre.trim().length < 2)
      return NextResponse.json({ error: 'El nombre debe tener al menos 2 caracteres.' }, { status: 400 });
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      return NextResponse.json({ error: 'Email no válido.' }, { status: 400 });
    if (!body.mensaje || body.mensaje.trim().length < 10)
      return NextResponse.json({ error: 'El mensaje debe tener al menos 10 caracteres.' }, { status: 400 });

    const mensaje = await Mensaje.create({
      nombre: body.nombre.trim(),
      email: body.email.trim(),
      asunto: body.asunto?.trim() || null,
      mensaje: body.mensaje.trim(),
    });
    return NextResponse.json(mensaje, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
