/**
 * Ejercicio 19 - Controlador del módulo Dashboard
 * Capa MVC: Controlador
 * Conceptos: área privada, req.session.user, agregación de datos de múltiples modelos
 *
 * req.session.user.id  → el id del usuario autenticado se lee de la sesión; no se confía en datos
 *                        del cliente (req.body/req.params) para identificar al propietario de los datos
 * Tres modelos         → el dashboard agrega usuario, proyectos y links sociales en una sola vista
 *                        privada; el controlador orquesta las consultas y pasa todo a la vista inline
 * actualizarPerfil     → usa req.session.user.id como identificador seguro; el usuario no puede
 *                        modificar el perfil de otro usuario aunque manipule el formulario
 */

import * as users from '../users/model.js';
import * as projects from '../projects/model.js';
import * as social from '../social/model.js';

export async function dashboard(req, res) {

  // Leemos el id del usuario desde la sesión (no del cliente) para garantizar que solo
  // accede a sus propios datos; un usuario malintencionado no puede falsificar req.session
  const usuario =
    await users.obtenerUsuarioPorId(req.session.user.id);

  const proyectos =
    await projects.obtenerProyectos(usuario.id);

  const links =
    await social.obtenerLinks(usuario.id);

  res.send(`
    <html>

    <head>
      <link rel="stylesheet" href="/style.css">
    </head>

    <body>

    <h1>Dashboard</h1>

    <a href="/portfolio/${usuario.username}">
      Ver Portafolio
    </a>

    <a href="/logout">
      Logout
    </a>

    <h2>Editar Perfil</h2>

    <form method="POST" action="/dashboard/profile">

      <textarea name="bio">
${usuario.bio || ''}
      </textarea>

      <input
        name="email"
        value="${usuario.email}"
      >

      <button>Guardar</button>

    </form>

    <h2>Redes Sociales</h2>

    <a href="/social/new">
      Nueva Red Social
    </a>

    ${links.map(link => `
      <div class="card">

        <p>${link.platform}</p>

        <a href="/social/edit/${link.id}">
          Editar
        </a>

        <a href="/social/delete/${link.id}">
          Borrar
        </a>

      </div>
    `).join('')}

    <h2>Proyectos</h2>

    <a href="/projects/new">
      Nuevo Proyecto
    </a>

    ${proyectos.map(p => `
      <div class="card">

        <h3>${p.title}</h3>

        <a href="/projects/edit/${p.id}">
          Editar
        </a>

        <a href="/projects/delete/${p.id}">
          Borrar
        </a>

      </div>
    `).join('')}

    </body>
    </html>
  `);
}

// Funcion que actualiza el perfil
export async function actualizarPerfil(
  req,
  res
) {

  await users.actualizarPerfil(
    req.session.user.id,
    req.body.bio,
    req.body.email
  );

  res.redirect('/dashboard');
}