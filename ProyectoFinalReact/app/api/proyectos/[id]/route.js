import { NextResponse } from 'next/server';
import { Proyecto, Categoria, Foto } from '@/lib/mysql';
import { getSession } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const proyecto = await Proyecto.findByPk(id, {
      include: [
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre', 'slug'] },
        { model: Foto, as: 'fotos', required: false, order: [['orden', 'ASC']] },
      ],
    });
    if (!proyecto) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    return NextResponse.json(proyecto);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });

    await proyecto.update({
      titulo: body.titulo ?? proyecto.titulo,
      descripcion: body.descripcion ?? proyecto.descripcion,
      imagen_portada: body.imagen_portada ?? proyecto.imagen_portada,
      fecha: body.fecha ?? proyecto.fecha,
      publicado: body.publicado !== undefined ? (body.publicado ? 1 : 0) : proyecto.publicado,
      categoria_id: body.categoria_id ?? proyecto.categoria_id,
    });

    return NextResponse.json(proyecto);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const { id } = await params;
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    await proyecto.destroy();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
