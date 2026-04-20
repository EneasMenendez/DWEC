/**
 * Ejercicio 17 - API REST con Express.js y persistencia en JSON
 * Archivo: album/form.js — Vista de formulario (MVC: view parcial)
 * Rol en la arquitectura: genera el HTML del formulario de creación/edición de un álbum;
 *                         el mismo formulario sirve para crear (id vacío) y editar (id con valor);
 *                         también muestra mensajes de error de validación enviados por el controlador
 *
 * error = ''            → parámetro opcional con valor por defecto; si hay error el controlador lo pasa
 * ${error ? `<p>...` : ''} → operador ternario para mostrar el mensaje de error solo cuando existe
 * <select> + artistas.map() → genera dinámicamente las opciones del desplegable con todos los artistas
 * artista.id == album.artistaId → comparación laxa (==) para marcar como "selected" la opción actual
 *                                  aunque uno sea string (formulario) y otro número (modelo)
 * input type="hidden"   → transporta el id al servidor para distinguir creación de actualización
 */
export function render(album, artistas, error = '') {
 
  return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>Formulario álbum</title>
  <link rel="stylesheet" href="/style.css">
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
