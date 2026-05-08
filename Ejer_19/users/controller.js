/**
 * Ejercicio 19 - Controlador del módulo Usuarios
 * Capa MVC: Controlador
 * Conceptos: autenticación, gestión de sesión, req.session, control de acceso, portafolio público
 *
 * req.session.user = user  → guarda el objeto usuario en la sesión del servidor tras login correcto;
 *                            a partir de aquí, todas las rutas protegidas pueden leer req.session.user
 * req.session.destroy()    → elimina completamente la sesión del servidor al hacer logout;
 *                            la cookie del cliente pierde validez
 * esPropietario            → compara el id de la sesión con el id del perfil visitado para decidir
 *                            si mostrar los controles de edición (solo al dueño del portafolio)
 * Tres modelos en portfolio → la vista del portafolio agrega datos de usuarios, proyectos y links sociales;
 *                             el controlador orquesta las tres consultas antes de renderizar
 */

import * as modelo from './model.js';
import * as modeloProject from '../projects/model.js';
import * as modeloSocial from '../social/model.js';
import { vistaRegister, vistaLogin, vistaPortfolio } from './view.js';

//Funcion que muestra el formulario de Registro
export function formularioRegister(req, res) {

  res.send(
    vistaRegister()
  );
}

// Fucnion que crea usuario
export async function crearUsuario(req, res) {

  await modelo.crearUsuario(req.body);

  res.redirect('/login');
}

export function formularioLogin(req, res) {

  res.send(
    vistaLogin()
  );
}

//Funcio que muestra el formulario de Login
export async function login(req, res) {

  const user = await modelo.login(
    req.body.username,
    req.body.password
  );

  // Si el modelo no devuelve usuario, las credenciales son incorrectas → mostramos el error en el form
  if (!user) {
    return res.send(
      vistaLogin('Credenciales incorrectas')
    );
  }

  // Guardamos el usuario en la sesión → a partir de aquí el usuario está "autenticado"
  req.session.user = user;

  res.redirect('/dashboard');
}

// Funcion que cierra sesion
export function logout(req, res) {

  req.session.destroy();

  res.redirect('/login');
}

export async function portfolio(req, res) {

  const user =
    await modelo.obtenerUsuario(req.params.username);

  const proyectos =
    await modeloProject.obtenerProyectos(user.id);

  const links =
    await modeloSocial.obtenerLinks(user.id);

  // Solo mostramos opciones de edición si el visitante es el propio dueño del portafolio
  const esPropietario =
    req.session.user &&
    req.session.user.id === user.id;

  res.send(
    vistaPortfolio(user, proyectos, links, esPropietario)
  );
}
export async function listarUsuarios(req, res) {
  const usuarios = await modelo.obtenerTodosLosUsuarios();

  res.send(`
  <html>
    <head><link rel="stylesheet" href="/style.css"></head>
    <body>
      <nav>
        <a href="/">Home</a> | <a href="/all">All Portfolios</a> | 
        ${req.session.user ? '<a href="/dashboard">My Dashboard</a>' : '<a href="/login">Login</a>'}
      </nav>
      <div class="container">
        <h1>Todos los Portafolios</h1>
        <div class="card">
          <ul>
            ${usuarios.map(u => `
              <li><a href="/portfolio/${u.username}" style="font-size: 18px;">${u.username}</a></li>
            `).join('')}
          </ul>
        </div>
      </div>
      <footer>DevPortfolio © 2026</footer>
    </body>
  </html>
  `);
}