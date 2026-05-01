/**
 * Ejercicio 18 - Vista del módulo Préstamos
 * Capa MVC: Vista
 * Conceptos: template literals, Array.map().join(), toLocaleDateString(), operador ternario
 *
 * toLocaleDateString() → formatea un objeto Date al estilo local del navegador (día/mes/año en es-ES)
 *                        se aplica porque MySQL devuelve fechas como strings ISO que hay que convertir
 * Array.map().join('') → patrón estándar para generar listas HTML dinámicas desde un array de datos
 * Operador ternario    → elige entre mostrar el enlace "Prestar" o "Registrar devolución"
 *                        según el estado actual del libro
 */

export function vistaListado(libros) {
  return `
  <html>
  <head>
  </head>
  <body>

  <h1>Catálogo de libros</h1>

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
        <a href="/prestamo/usuario?nombre=${libro.nombre_prestario}">
          ${libro.nombre_prestario}
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
  return `
  <h1>${libro.titulo}</h1>

  <p>Autor: ${libro.autor}</p>
  <p>ISBN: ${libro.isbn}</p>

  ${
    libro.estado === 'Disponible'
      ? `<a href="/prestamo/formulario/${libro.id}">Prestar libro</a>`
      : `<a href="/prestamo/devolver/${libro.id}">Registrar devolución</a>`
  }

  <h2>Historial de préstamos</h2>

  <ul>
    ${historial.map(p => `
      <li>
        ${p.nombre_prestario} -
        ${ new Date(p.fecha_prestamo).toLocaleDateString()} →
        ${ new Date(p.fecha_devolucion).toLocaleDateString()}
      </li>
    `).join('')}
  </ul>
  `;
}
