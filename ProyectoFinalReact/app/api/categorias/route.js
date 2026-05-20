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

export async function GET() {
  try {
    const categorias = await Categoria.findAll({ order: [['nombre', 'ASC']] });
    return NextResponse.json(categorias);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const body = await request.json();

    if (!body.nombre || body.nombre.trim().length < 2)
      return NextResponse.json({ error: 'El nombre debe tener al menos 2 caracteres.' }, { status: 400 });

    const nombre = body.nombre.trim();
    const slug = body.slug?.trim() || generarSlug(nombre);

    const categoria = await Categoria.create({
      nombre,
      descripcion: body.descripcion?.trim() || null,
      slug,
    });
    return NextResponse.json(categoria, { status: 201 });
  } catch (err) {
    const msg = err.name === 'SequelizeUniqueConstraintError'
      ? 'Ya existe una categoría con ese nombre o slug.'
      : err.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
