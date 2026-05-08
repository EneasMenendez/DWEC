/**
 * Ejercicio 19 - Vista del módulo Proyectos
 * Capa MVC: Vista
 * Conceptos: formulario dual (crear/editar), campo hidden, valores por defecto con ||
 *
 * proyecto={}          → valor por defecto vacío; la misma función sirve para nuevo proyecto
 *                        (objeto vacío) y para editar (objeto con datos del proyecto existente)
 * proyecto.id ? ... : ... → el título del formulario cambia según si hay id (editar) o no (nuevo)
 * value="${x || ''}"   → si la propiedad no existe (objeto vacío), usa cadena vacía para evitar
 *                        que aparezca "undefined" en los campos del formulario
 * input hidden con id  → clave del patrón crear/editar: si llega al POST con id → UPDATE, sin id → INSERT
 */

export function vistaFormularioProyecto(
  proyecto={}
) {

  return `
  <html>

  <head>
    <link rel="stylesheet" href="/style.css">
  </head>

  <body>

  <h1>
    ${
      proyecto.id
        ? 'Editar Proyecto'
        : 'Nuevo Proyecto'
    }
  </h1>

  <form method="POST" action="/projects/save">

    <input
      type="hidden"
      name="id"
      value="${proyecto.id || ''}"
    >

    <input
      name="title"
      placeholder="Título"
      value="${proyecto.title || ''}"
      required
    >

    <textarea
      name="description"
      placeholder="Descripción"
    >${proyecto.description || ''}</textarea>

    <input
      name="repo_url"
      placeholder="Repositorio"
      value="${proyecto.repo_url || ''}"
    >

    <input
      name="live_url"
      placeholder="Demo"
      value="${proyecto.live_url || ''}"
    >

    <button>Guardar</button>

  </form>

  <a href="/dashboard">Volver</a>

  </body>
  </html>
  `;
}