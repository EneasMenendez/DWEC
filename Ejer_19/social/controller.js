/**
 * Ejercicio 19 - Controlador del módulo Social Links
 * Capa MVC: Controlador
 * Conceptos: autorización explícita, CRUD unificado, verificación de propiedad
 *
 * link.user_id !== req.session.user.id → verificación de autorización a nivel de controlador;
 *                                        impide que un usuario edite o borre links de otro usuario
 *                                        aunque intente manipular la URL o el formulario
 * Patrón guardar dual (if req.body.id) → la misma ruta POST /save gestiona tanto el alta como
 *                                        la edición, reduciendo el número de endpoints necesarios
 * user_id desde sesión                 → nunca se toma el user_id del formulario; siempre de
 *                                        req.session.user.id para evitar suplantación de identidad
 */

import * as modelo from './model.js';
import {vistaFormularioSocial} from './view.js';

// Muestro el formulario para hacer un neuvo socialLink
export function formularioNuevoLink(req,res) {

  res.send(
    vistaFormularioSocial()
  );
}

// Muestro el formulario para editar un nuevo socialLink
export async function formularioEditarLink(req,res) {

  const link =
    await modelo.obtenerLinkPorId(
      req.params.id
    );

  // Verificamos que el link pertenece al usuario autenticado antes de mostrar el formulario de edición
  if (
    link.user_id !== req.session.user.id
  ) {
    return res.send('Acceso denegado');
  }

  res.send(
    vistaFormularioSocial(link)
  );
}

// Funcion que guarda un social Link
export async function guardarLink(req, res) {

  // Edito un social Link (el formulario incluye campo hidden con el id)
  if (req.body.id) {

    const link =
      await modelo.obtenerLinkPorId(
        req.body.id
      );

    // Verificación de propiedad antes de actualizar: el usuario solo puede editar sus propios links
    if (
      link.user_id !== req.session.user.id
    ) {
      return res.send('Acceso denegado');
    }

    await modelo.actualizarLink({
      ...req.body,                      // plataforma y url vienen del formulario
      user_id: req.session.user.id      // user_id siempre de la sesión, nunca del cliente
    });

  } else {

    // Creo un nuevo socialLink (el formulario no tiene id → es un alta nueva)
    await modelo.crearLink({
      ...req.body,
      user_id: req.session.user.id
    });
  }

  res.redirect('/dashboard');
}

// Funcion que elimina un socialLink
export async function borrarLink(req,res) {

  await modelo.eliminarLink(
    req.params.id,
    req.session.user.id
  );

  res.redirect('/dashboard');
}