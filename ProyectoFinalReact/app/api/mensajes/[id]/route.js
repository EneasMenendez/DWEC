import { NextResponse } from 'next/server';
import { Mensaje } from '@/lib/mysql';
import { getSession } from '@/lib/auth';

export async function PATCH(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const { id } = await params;
    const { estado } = await request.json();
    const mensaje = await Mensaje.findByPk(id);
    if (!mensaje) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    await mensaje.update({ estado });
    return NextResponse.json(mensaje);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const { id } = await params;
    const mensaje = await Mensaje.findByPk(id);
    if (!mensaje) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    await mensaje.destroy();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
