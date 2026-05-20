import { NextResponse } from 'next/server';
import { Proyecto, Foto, Mensaje } from '@/lib/mysql';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const [proyectos, fotos, mensajes] = await Promise.all([
      Proyecto.count(),
      Foto.count(),
      Mensaje.count({ where: { estado: 'nuevo' } }),
    ]);
    return NextResponse.json({
      proyectos,
      fotos,
      mensajes,
      usuario: { nombre: session.nombre, rol: session.rol },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
