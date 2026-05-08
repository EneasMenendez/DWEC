/**
 * Ejercicio 19 - Vista del módulo Usuarios
 * Capa MVC: Vista
 * Conceptos: formularios de autenticación, template literals, renderizado condicional, portafolio público
 *
 * vistaRegister(error='') → parámetro por defecto; si no hay error no se muestra el bloque de error
 * type="password"         → el navegador oculta el texto escrito y no lo cachea en el historial
 * type="email"            → validación básica de formato de email en el lado del cliente (HTML5)
 * esDueno                → controla qué botones de navegación se muestran:
 *                           el dueño ve "Dashboard/Logout", los visitantes ven "Login/Register"
 * links.map / proyectos.map → generan listas dinámicas de redes sociales y proyectos del portafolio
 */

export function vistaRegister(error = '') {
  return `
  <html>
    <head>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <div class="container">
        <form method="POST" action="/register">
          <h1>Register</h1>
          ${error ? `<p class="error">${error}</p>` : ''}
          
          <div>
            <label>Username:</label>
            <input name="username" required>
          </div>

          <div>
            <label>Email:</label>
            <input name="email" type="email" required>
          </div>

          <div>
            <label>Password:</label>
            <input type="password" name="password" required>
          </div>

          <div>
            <label>URL Foto:</label>
            <input name="photo">
          </div>

          <div>
            <label>Biografía:</label>
            <textarea name="bio"></textarea>
          </div>

          <button type="submit">Register</button>
          <div style="margin-top:15px">
            <a href="/login">¿Ya tienes cuenta? Login</a>
          </div>
        </form>
      </div>
    </body>
  </html>
  `;
}

export function vistaLogin(error = '') {

  return `
  <html>

  <head>
    <link rel="stylesheet" href="/style.css">
  </head>

  <body>

  <h1>Login</h1>

  ${error ? `<p class="error">${error}</p>` : ''}

  <form method="POST" action="/login">

    <input
      name="username"
      placeholder="Username"
      required
    >

    <input
      type="password"
      name="password"
      placeholder="Password"
      required
    >

    <button>Entrar</button>

  </form>

  <a href="/register">Crear cuenta</a>

  </body>
  </html>
  `;
}

export function vistaPortfolio(user, proyectos, links, esDueno=false) {
  return `
  <html>
    <head>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <nav>
        <a href="/">Home</a> | <a href="/all">All Portfolios</a> | 
        <!-- Si el visitante es el dueño, mostramos Dashboard/Logout; si no, Login/Register -->
        ${esDueno ? '<a href="/dashboard">My Dashboard</a> | <a href="/logout">Logout</a>' : '<a href="/login">Login</a> | <a href="/register">Register</a>'}
      </nav>

      <div class="container">
        <div class="card">
          <img src="${user.photo}" class="profile-photo">
          <h1>${user.username}</h1>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Bio:</strong> ${user.bio}</p>
        </div>

        <div class="card">
          <h2>Social Links</h2>
          <ul>
            ${links.map(link => `
              <li><a href="${link.url}">${link.platform}</a></li>
            `).join('')}
          </ul>
        </div>

        <div class="card">
          <h2>Projects</h2>
          ${proyectos.map(proyecto => `
            <div class="project">
              <h3>${proyecto.title}</h3>
              <p>${proyecto.description}</p>
              <a href="${proyecto.repo_url}">Repo</a> | <a href="${proyecto.live_url}">Live Demo</a>
            </div>
          `).join('')}
        </div>
      </div>

      <footer>DevPortfolio © 2026</footer>
    </body>
  </html>
  `;
}