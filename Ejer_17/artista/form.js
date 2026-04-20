/**
 * Ejercicio 17 - API REST con Express.js y persistencia en JSON
 * Archivo: artista/form.js — Vista de formulario (MVC: view parcial)
 * Rol en la arquitectura: genera el HTML del formulario de creación/edición de un artista;
 *                         sirve tanto para crear (id vacío) como para editar (id con valor),
 *                         ya que los campos se prerellenan con los datos del artista recibido
 *
 * input type="hidden"  → campo invisible que transporta el id al servidor al hacer submit,
 *                        permitiendo distinguir entre crear (id='') y actualizar (id numérico)
 * value="${artista.x}" → prerellena el campo con el valor actual para facilitar la edición
 * action="/artista/save" method="post" → el formulario envía los datos al endpoint POST /save
 */
export function render(artista) {

    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Formulario artista</title>
    <link rel="stylesheet" href="/style.css">
    </head>
   
    <body>
    <nav class="menu">
    <a href="/">Inicio</a>
    <a href="/album">Álbumes</a>
    <a href="/artista">Artistas</a>
  </nav>
    <h1>Formulario Artista</h1>
  
    <form action="/artista/save" method="post">
  
      <input type="hidden" name="id" value="${artista.id}">
  
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value="${artista.nombre}">
      </div>
  
      <div>
        <label>Pais:</label>
        <input type="text" name="pais" value="${artista.pais}">
      </div>
  
      <div>
        <label>Genero:</label>
        <input type="text" name="genero" value="${artista.genero}">
      </div>
  
      <div>
        <label>Año formación:</label>
        <input type="text" name="fecha_formacion" value="${artista.fecha_formacion}">
      </div>
  
      <div>
        <label>URL Foto:</label>
        <input type="text" name="foto" value="${artista.foto}">
      </div>
  
      <div>
        <img src="${artista.foto || 'https://via.placeholder.com/150'}" width="100">
      </div>
  
      <button type="submit">guardar</button>
  
    </form>
  
    </body>
    </html>
    `;
  }
  