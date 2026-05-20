import { NextResponse } from 'next/server';
import { Categoria } from '@/lib/mysql';

export async function GET() {
  try {
    const categorias = await Categoria.findAll({ order: [['nombre', 'ASC']] });
    return NextResponse.json(categorias);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
