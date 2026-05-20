import { NextResponse } from 'next/server';
import { Usuario } from '@/lib/mysql';
import { getSession, hashPassword } from '@/lib/auth';

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const { id } = await params;
    const usuario = await Usuario.findByPk(id, {
      attributes: ['id', 'nombre', 'email', 'rol', 'creado_en'],
    });
    if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    return NextResponse.json(usuario);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session || session.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });

    const updates = {
      nombre: body.nombre ?? usuario.nombre,
      email: body.email ?? usuario.email,
      rol: body.rol ?? usuario.rol,
    };
    if (body.contrasena) {
      updates.contrasena = await hashPassword(body.contrasena);
    }

    await usuario.update(updates);
    return NextResponse.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session || session.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  try {
    const { id } = await params;
    if (parseInt(id) === session.id) {
      return NextResponse.json({ error: 'No puedes eliminar tu propia cuenta' }, { status: 400 });
    }
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    await usuario.destroy();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
