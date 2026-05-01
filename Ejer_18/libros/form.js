/**
 * Ejercicio 18 - Formulario genérico (archivo reutilizable de ejercicio anterior)
 * Capa MVC: Vista
 * Conceptos: template literals, campo hidden, validación de errores en formulario
 *
 * error = ''       → parámetro con valor por defecto; si no se pasa error, no se muestra ningún mensaje
 * input hidden     → campo invisible que transporta el 'id' del álbum para que el servidor sepa
 *                    si debe hacer INSERT (nuevo) o UPDATE (editar)
 * error ? ... : '' → muestra el mensaje de error en rojo solo cuando existe
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
