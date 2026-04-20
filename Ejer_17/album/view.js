/**
 * Ejercicio 17 - API REST con Express.js y persistencia en JSON
 * Archivo: album/view.js — Capa de Vista (MVC: view)
 * Rol en la arquitectura: recibe el array de álbumes ya enriquecido con el nombre del artista
 *                         (procesado por el controlador) y genera el HTML de la tabla de listado;
 *                         no contiene lógica de negocio ni accede al modelo directamente
 *
 * Template literals     → permiten construir HTML multilínea con expresiones JS incrustadas (${ })
 * array.map().join("")  → genera una fila <tr> por cada álbum y las une en una cadena HTML continua
 * artistaNombre         → campo calculado por el controlador; la vista lo muestra sin conocer el modelo
 */
export function render(albumes) {
 
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Lista de álbumes</title>
    <link rel="stylesheet" href="/style.css">
    </head>
    
    <body>
    
    <nav class="menu">
      <a href="/">Inicio</a>
      <a href="/album">Álbumes</a>
      <a href="/artista">Artistas</a>
    </nav>
    
    <h1>Lista de Álbumes</h1>
    
    <a href="/album/form">Añadir Nuevo Álbum</a>
    
    <table>
    
    <thead>
    <tr>
    <th>Foto</th>
    <th>Titulo</th>
    <th>Artista</th>
    <th>Año</th>
    <th></th>
    <th></th>
    </tr>
    </thead>
    
    <tbody>
    
    ${albumes.map(album => `
    <tr>
    
    <td><img src="${album.foto}" width="60"></td>
    
    <td>${album.titulo}</td>
    
    <td>${album.artistaNombre}</td>
    
    <td>${album.anio}</td>
    
    <td><a href="/album/form/${album.id}">editar</a></td>
    
    <td><a href="/album/delete/${album.id}">eliminar</a></td>
    
    </tr>
    `).join("")}
    
    </tbody>
    
    </table>
    
    </body>
    </html>
    `;
    }
    