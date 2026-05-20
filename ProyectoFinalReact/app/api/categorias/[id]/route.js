import { NextResponse } from 'next/server';
import { Categoria } from '@/lib/mysql';
import { getSession } from '@/lib/auth';

function generarSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
    return NextResponse.json(categoria);
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

    if (!body.nombre || body.nombre.trim().length < 2)
      return NextResponse.json({ error: 'El nombre debe tener al menos 2 caracteres.' }, { status: 400 });

    const categoria = await Categoria.findByPk(id);
    if (!categoria) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });

    const nombre = body.nombre.trim();
    await categoria.update({
      nombre,
      descripcion: body.descripcion?.trim() ?? categoria.descripcion,
      slug: body.slug?.trim() || generarSlug(nombre),
    });
    return NextResponse.json(categoria);
  } catch (err) {
    const msg = err.name === 'SequelizeUniqueConstraintError'
      ? 'Ya existe una categoría con ese nombre o slug.'
      : err.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const { id } = await params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return NextResponse.json({ error: 'No encontrada' }, { status: 404 });
    await categoria.destroy();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
