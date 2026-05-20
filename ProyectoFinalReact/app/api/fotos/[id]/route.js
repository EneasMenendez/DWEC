import { NextResponse } from 'next/server';
import { Foto, Proyecto } from '@/lib/mysql';
import { getSession } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const foto = await Foto.findByPk(id, {
      include: [{ model: Proyecto, as: 'proyecto', attributes: ['id', 'titulo'] }],
    });
    if (!foto) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
    return NextResponse.json(foto);
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
    const foto = await Foto.findByPk(id);
    if (!foto) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });

    await foto.update({
      titulo: body.titulo ?? foto.titulo,
      url: body.url ?? foto.url,
      descripcion: body.descripcion ?? foto.descripcion,
      orden: body.orden ?? foto.orden,
      proyecto_id: body.proyecto_id ?? foto.proyecto_id,
    });

    return NextResponse.json(foto);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const { id } = await params;
    const foto = await Foto.findByPk(id);
    if (!foto) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
    await foto.destroy();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
