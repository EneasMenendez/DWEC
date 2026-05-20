import { NextResponse } from 'next/server';
import { Foto, Proyecto } from '@/lib/mysql';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const proyectoId = searchParams.get('proyecto');
    const where = proyectoId && !isNaN(parseInt(proyectoId)) ? { proyecto_id: parseInt(proyectoId) } : {};

    const fotos = await Foto.findAll({
      where,
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

    if (!body.url || !/^https?:\/\/.+/.test(body.url))
      return NextResponse.json({ error: 'URL de imagen no válida.' }, { status: 400 });
    if (!body.proyecto_id || isNaN(parseInt(body.proyecto_id)))
      return NextResponse.json({ error: 'Proyecto requerido.' }, { status: 400 });

    const foto = await Foto.create({
      titulo: body.titulo?.trim() || null,
      url: body.url.trim(),
      descripcion: body.descripcion?.trim() || null,
      orden: body.orden ?? 0,
      proyecto_id: parseInt(body.proyecto_id),
    });
    return NextResponse.json(foto, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
