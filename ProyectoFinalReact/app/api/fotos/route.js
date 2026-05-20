import { NextResponse } from 'next/server';
import { Foto, Proyecto } from '@/lib/mysql';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const fotos = await Foto.findAll({
      include: [{ model: Proyecto, as: 'proyecto', attributes: ['id', 'titulo'] }],
      order: [['proyecto_id', 'ASC'], ['orden', 'ASC']],
    });
    return NextResponse.json(fotos);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const body = await request.json();
    const foto = await Foto.create({
      titulo: body.titulo || null,
      url: body.url,
      descripcion: body.descripcion || null,
      orden: body.orden ?? 0,
      proyecto_id: body.proyecto_id,
    });
    return NextResponse.json(foto, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
