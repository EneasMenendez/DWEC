import { NextResponse } from 'next/server';
import { Usuario } from '@/lib/mysql';
import { verifyPassword, createToken, sessionCookieOptions } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    const { limited, retryAfter } = checkRateLimit(`login:${ip}`, { max: 5, windowMs: 15 * 60 * 1000 });
    if (limited) {
      return NextResponse.json(
        { error: `Demasiados intentos. Espera ${retryAfter} segundos.` },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

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
    console.error('[LOGIN ERROR]', err?.message, err?.code, err?.stack?.split('\n')[1]);
    return NextResponse.json({ error: err?.message ?? 'Error del servidor' }, { status: 500 });
  }
}
