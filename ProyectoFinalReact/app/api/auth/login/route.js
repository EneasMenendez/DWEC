import { NextResponse } from 'next/server';
import { Usuario } from '@/lib/mysql';
import { verifyPassword, createToken, sessionCookieOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, contrasena, recordarme } = await request.json();

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }

    const valid = await verifyPassword(contrasena, usuario.contrasena);
    if (!valid) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }

    const token = createToken({
      id: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol,
      exp: Date.now() + (recordarme ? 86_400_000 : 3_600_000),
    });

    const res = NextResponse.json({ ok: true });
    const opts = sessionCookieOptions(!!recordarme);
    res.cookies.set(opts.name, token, opts);
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
