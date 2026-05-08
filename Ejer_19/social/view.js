/**
 * Ejercicio 19 - Vista del módulo Social Links
 * Capa MVC: Vista
 * Conceptos: formulario dual (crear/editar), campo hidden, valores por defecto con ||
 *
 * link={}              → valor por defecto vacío; la misma función sirve para crear un nuevo link
 *                        (objeto vacío sin id) y para editar uno existente (objeto con datos)
 * link.id ? ... : ...  → el título del formulario cambia dinámicamente según el contexto
 * value="${x || ''}"   → si la propiedad es undefined (objeto vacío), usa cadena vacía
 *                        para evitar que aparezca "undefined" en los campos
 * input hidden con id  → mecanismo para que el POST /save sepa si debe hacer INSERT o UPDATE
 */

export function vistaFormularioSocial(
  link={}
) {

  return `
  <html>

  <head>
    <link rel="stylesheet" href="/style.css">
  </head>

  <body>

  <h1>
    ${
      link.id
        ? 'Editar Red Social'
        : 'Nueva Red Social'
    }
  </h1>

  <form method="POST" action="/social/save">

    <input
      type="hidden"
      name="id"
      value="${link.id || ''}"
    >

    <input
      name="platform"
      placeholder="Plataforma"
      value="${link.platform || ''}"
      required
    >

    <input
      name="url"
      placeholder="URL"
      value="${link.url || ''}"
      required
    >

    <button>Guardar</button>

  </form>

  <a href="/dashboard">Volver</a>

  </body>
  </html>
  `;
}