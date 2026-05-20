import { NextResponse } from 'next/server';
import { Mensaje } from '@/lib/mysql';
import { getSession } from '@/lib/auth';

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
  try {
    const body = await request.json();
    const mensaje = await Mensaje.create({
      nombre: body.nombre,
      email: body.email,
      asunto: body.asunto || null,
      mensaje: body.mensaje,
    });
    return NextResponse.json(mensaje, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
