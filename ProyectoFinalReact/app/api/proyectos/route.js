import { NextResponse } from 'next/server';
import { Proyecto, Categoria, Foto } from '@/lib/mysql';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === '1';

  if (all) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined;

    const proyectos = await Proyecto.findAll({
      where: all ? {} : { publicado: 1 },
      include: [
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre', 'slug'] },
        { model: Foto, as: 'fotos', attributes: ['id'], required: false },
      ],
      order: [['creado_en', 'DESC']],
      ...(limit ? { limit } : {}),
    });

    return NextResponse.json(proyectos);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const body = await request.json();

    if (!body.titulo || body.titulo.trim().length < 1)
      return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 });

    const proyecto = await Proyecto.create({
      titulo: body.titulo,
      descripcion: body.descripcion || null,
      imagen_portada: body.imagen_portada || null,
      fecha: body.fecha || null,
      publicado: body.publicado ? 1 : 0,
      categoria_id: body.categoria_id || null,
    });
    return NextResponse.json(proyecto, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
