import { NextResponse } from 'next/server';
import { Usuario } from '@/lib/mysql';
import { hashPassword } from '@/lib/auth';

// Llama a GET /api/setup UNA VEZ después de ejecutar el SQL para crear el admin.
// Contraseña por defecto: admin1234  (cámbiala después desde /admin/usuarios)
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Endpoint desactivado en producción.' }, { status: 403 });
  }

  try {
    const count = await Usuario.count({ where: { rol: 'ADMIN' } });
    if (count > 0) {
      return NextResponse.json(
        { error: 'Ya existe al menos un administrador. Endpoint desactivado.' },
        { status: 400 }
      );
    }

    const contrasena = await hashPassword('admin1234');
    const [updated] = await Usuario.update(
      { contrasena },
      { where: { email: 'admin@portfolio.com' } }
    );

    if (updated === 0) {
      // Si no existía el usuario del SQL, lo creamos
      await Usuario.create({
        nombre: 'Administrador',
        email: 'admin@portfolio.com',
        contrasena,
        rol: 'ADMIN',
      });
    }

    return NextResponse.json({
      ok: true,
      mensaje: 'Admin listo. Email: admin@portfolio.com · Contraseña: admin1234',
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
