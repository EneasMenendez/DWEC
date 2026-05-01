/**
 * Ejercicio 18 - Formulario genérico (archivo reutilizable de ejercicio anterior)
 * Capa MVC: Vista
 * Conceptos: template literals, select dinámico, campo hidden, validación visual de errores
 *
 * error = ''       → valor por defecto vacío; solo se muestra el párrafo de error si se recibe un mensaje
 * input hidden     → transporta el 'id' de forma invisible para que el servidor distinga INSERT de UPDATE
 * select + map     → genera las opciones del desplegable dinámicamente desde el array de artistas
 * artista.id == album.artistaId → comparación laxa (==) porque los tipos pueden diferir (string vs number)
 *                                  al venir uno del form y el otro de la BD
 */

export function render(album, artistas, error = '') {

  return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>Formulario álbum</title>
  </head>

  <body>

  <nav class="menu">
    <a href="/">Inicio</a>
    <a href="/album">Álbumes</a>
    <a href="/artista">Artistas</a>
  </nav>

  <h1>Formulario Álbum</h1>

  ${error ? `<p style="color:red">${error}</p>` : ''}

  <form action="/album/save" method="post">

    <input type="hidden" name="id" value="${album.id}">

    <div>
      <label>Título:</label>
      <input type="text" name="titulo" value="${album.titulo}">
    </div>

    <div>
      <label>Año:</label>
      <input type="text" name="anio" value="${album.anio}">
    </div>

    <div>
      <label>Artista:</label>
      <select name="artistaId">
        ${artistas.map(artista => `
          <option value="${artista.id}" ${artista.id == album.artistaId ? 'selected' : ''}>
            ${artista.nombre}
          </option>
        `).join("")}
      </select>
    </div>

    <div>
      <label>URL Foto:</label>
      <input type="text" name="foto" value="${album.foto}">
    </div>

    <div>
      <img src="${album.foto || 'https://via.placeholder.com/150'}" width="100">
    </div>

    <button type="submit">guardar</button>

  </form>

  </body>
  </html>
  `;
}
