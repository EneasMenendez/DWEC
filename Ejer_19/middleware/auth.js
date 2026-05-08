/**
 * Ejercicio 19 - Middleware de autenticación
 * Capa MVC: Middleware
 * Conceptos: middleware de Express, req.session, protección de rutas, patrón guard
 *
 * Middleware       → función intermedia que se ejecuta entre la petición y el controlador final;
 *                    recibe (req, res, next) y decide si continuar o cortar la cadena
 * req.session.user → el login guarda el objeto usuario aquí; si existe, el usuario está autenticado
 * return redirect  → el 'return' es importante: detiene la ejecución del middleware y no llama a next()
 * next()           → pasa el control al siguiente middleware o controlador de la cadena
 *
 * Uso: router.get('/ruta-privada', auth, controlador) → auth se ejecuta primero y actúa de guard
 */

export function auth(req, res, next) {

  // Si no hay usuario en sesión, el cliente no ha iniciado sesión → redirigir al login
  if (!req.session.user) {
    return res.redirect('/login');
  }

  // El usuario está autenticado, continuamos hacia el controlador
  next();
}