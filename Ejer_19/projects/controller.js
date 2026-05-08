/**
 * Ejercicio 19 - Controlador del módulo Proyectos
 * Capa MVC: Controlador
 * Conceptos: autorización explícita, CRUD unificado, spread operator, patrón PRG
 *
 * proyecto.user_id !== req.session.user.id → verificación de autorización: aunque el middleware
 *                                            auth comprueba que el usuario está autenticado, aquí
 *                                            verificamos que sea el DUEÑO del recurso concreto
 * if (req.body.id) → distingue entre crear (sin id) y actualizar (con id) en un único handler;
 *                    el campo hidden del formulario transporta el id cuando se edita
 * {...req.body, user_id: req.session.user.id} → spread para copiar todos los campos del form
 *                                               y añadir el user_id de la sesión (fuente fiable)
 */

import * as modelo from './model.js';
import {vistaFormularioProyecto} from './view.js';

// Muestra el formulario para crear un nuevo Proyecto
export function formularioNuevoProyecto(
  req,
  res
) {

  res.send(
    vistaFormularioProyecto()
  );
}

// Muestra el formulario para  editar proyecto
export async function formularioEditarProyecto(req,res) {

  const proyecto =
    await modelo.obtenerProyectoPorId(
      req.params.id
    );

  // Verificamos que el proyecto pertenece al usuario autenticado antes de permitir la edición
  if (
    proyecto.user_id !== req.session.user.id
  ) {
    return res.send('Acceso denegado');
  }

  res.send(
    vistaFormularioProyecto(
      proyecto
    )
  );
}

//Funcion para guardar los datos de un proyecto
export async function guardarProyecto(req,res) {

  // Edito un Proyecto (el form incluye un campo hidden con el id)
  if (req.body.id) {

    const proyecto =
      await modelo.obtenerProyectoPorId(req.body.id);

    // Segunda verificación de propiedad: aunque el modelo también valida, el controlador
    // lo comprueba explícitamente para devolver una respuesta clara al usuario
    if (
      proyecto.user_id !== req.session.user.id
    ) {
      return res.send('Acceso denegado');
    }

    await modelo.actualizarProyecto({
      ...req.body,                      // título, descripción, urls vienen del formulario
      user_id: req.session.user.id      // el user_id viene de la sesión (no del form) por seguridad
    });

  } else {

    // Creo un proyecto (el form no tiene id → es un alta nueva)
    await modelo.crearProyecto({
      ...req.body,
      user_id: req.session.user.id
    });
  }

  res.redirect('/dashboard');
}

// Funcion para borrar un proyecto
export async function borrarProyecto(req,res) {

  await modelo.eliminarProyecto(
    req.params.id,
    req.session.user.id
  );

  res.redirect('/dashboard');
}