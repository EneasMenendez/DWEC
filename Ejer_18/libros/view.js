/**
 * Ejercicio 18 - Vista del módulo Libros
 * Capa MVC: Vista
 * Conceptos: template literals, Array.map(), generación de HTML en servidor, operador ternario
 *
 * Template literals (`)   → permiten incrustar expresiones JavaScript dentro de cadenas HTML con ${}
 * Array.map().join('')     → itera el array de libros y genera un fragmento HTML por cada elemento;
 *                            join('') concatena todos los fragmentos sin separador
 * Operador ternario ?:     → selecciona entre dos bloques HTML según el estado del libro (Disponible/Prestado)
 * historial.find()         → busca el primer préstamo activo (sin fecha_entrega) para mostrar al prestatario actual
 * optional chaining ?.    → evita errores si prestamoActivo es undefined al acceder a sus propiedades
 */

export function vistaListado(libros) {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>

  <h1>Catálogo de libros</h1>

  <a href="/prestados">Libros prestados</a>
  <a href="/vencidos">Libros vencidos</a>

  <table>
    <tr>
      <th>Título</th>
      <th>Autor</th>
      <th>Estado</th>
    </tr>

    ${libros.map(libro => `
      <tr>
        <td>
          <a href="/libro/${libro.id}">
            ${libro.titulo}
          </a>
        </td>
        <td>${libro.autor}</td>
        <td>${libro.estado}</td>
      </tr>
    `).join('')}
  </table>

  </body>
  </html>
  `;
}

// Vista libros prestados
export function vistaPrestados(libros) {
  return `
  <html>
  <head>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>

  <nav class="menu">
    <a href="/libros">Inicio</a>
    <a href="/prestados">Prestados</a>
    <a href="/vencidos">Vencidos</a>
  </nav>

  <h1>Libros prestados</h1>

  <table>
    <tr>
      <th>Título</th>
      <th>Autor</th>
      <th>Usuario</th>
      <th>Fecha devolución</th>
    </tr>

    ${libros.map(libro => `
      <tr>
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>
          <a href="/prestamos/usuario?nombre=${libro.nombre_prestatario}">
            ${libro.nombre_prestatario}
          </a>
        </td>
        <td>${new Date(libro.fecha_devolucion).toLocaleDateString()}</td>
      </tr>
    `).join('')}
  </table>

  </body>
  </html>
  `;
}



// Vista detalle libro
export function vistaDetalle(libro, historial) {

  // Buscamos el préstamo sin fecha_entrega: ese es el préstamo vigente del libro
  const prestamoActivo = historial.find(p => !p.fecha_entrega);

  return `
  <html>
  <head>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>

  <nav class="menu">
    <a href="/libros">Inicio</a>
    <a href="/prestados">Prestados</a>
    <a href="/vencidos">Vencidos</a>
  </nav>

  <h1>${libro.titulo}</h1>

  <p>Autor: ${libro.autor}</p>
  <p>ISBN: ${libro.isbn}</p>

  ${
    libro.estado === 'Disponible'
      ? `<a href="/prestamos/formulario/${libro.id}">Prestar libro</a>`
      : `
        <p><strong>Prestado a:</strong> ${prestamoActivo?.nombre_prestatario}</p>
        <p><strong>Devuelve el:</strong> ${new Date(prestamoActivo?.fecha_devolucion).toLocaleDateString()}</p>
        <a href="/prestamos/devolver/${libro.id}">Registrar devolución</a>
      `
  }

  <h2>Historial de préstamos</h2>

  <ul>
    ${historial.map(p => `
      <li>
        ${p.nombre_prestatario} -
        ${new Date(p.fecha_prestamo).toLocaleDateString()} →
        ${new Date(p.fecha_devolucion).toLocaleDateString()}
      </li>
    `).join('')}
  </ul>

  </body>
  </html>
  `;
}

