import { NextResponse } from 'next/server';
import { Usuario } from '@/lib/mysql';
import { getSession, hashPassword } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nombre', 'email', 'rol', 'creado_en'],
      order: [['creado_en', 'DESC']],
    });
    return NextResponse.json(usuarios);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getSession();
  if (!session || session.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'Solo administradores pueden crear usuarios' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const contrasena = await hashPassword(body.contrasena);
    const usuario = await Usuario.create({
      nombre: body.nombre,
      email: body.email,
      contrasena,
      rol: body.rol || 'EDITOR',
    });
    return NextResponse.json(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
      { status: 201 }
    );
  } catch (err) {
    const msg = err.name === 'SequelizeUniqueConstraintError'
      ? 'Ya existe un usuario con ese email'
      : err.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
