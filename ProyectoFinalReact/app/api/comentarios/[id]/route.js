import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Comentario from '@/lib/models/Comentario';
import { getSession } from '@/lib/auth';

async function requireAdmin() {
  const session = await getSession();
  if (!session) return false;
  return true;
}

export async function PUT(request, { params }) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  const { id } = await params;
  await connectMongoDB();

  const comentario = await Comentario.findById(id);
  if (!comentario)
    return NextResponse.json({ error: 'Comentario no encontrado.' }, { status: 404 });

  comentario.aprobado = !comentario.aprobado;
  await comentario.save();
  return NextResponse.json(comentario);
}

export async function DELETE(request, { params }) {
  if (!(await requireAdmin()))
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });

  const { id } = await params;
  await connectMongoDB();

  const result = await Comentario.findByIdAndDelete(id);
  if (!result)
    return NextResponse.json({ error: 'Comentario no encontrado.' }, { status: 404 });

  return NextResponse.json({ ok: true });
}
