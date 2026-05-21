import { NextResponse } from 'next/server';
import { Configuracion } from '@/lib/mysql';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const clave = searchParams.get('clave');
  if (!clave) return NextResponse.json({ error: 'Parámetro clave requerido.' }, { status: 400 });

  try {
    const row = await Configuracion.findByPk(clave);
    return NextResponse.json({ clave, valor: row?.valor ?? null });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const { clave, valor } = await request.json();
    if (!clave || valor === undefined) {
      return NextResponse.json({ error: 'Campos clave y valor requeridos.' }, { status: 400 });
    }

    await Configuracion.upsert({ clave, valor });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
