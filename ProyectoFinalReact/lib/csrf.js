/**
 * Verifica que el header Origin coincida con el host de la petición.
 * Protege contra Login CSRF y envío de formularios desde dominios externos.
 * Las rutas de admin ya están protegidas por sameSite:lax + cookie de sesión.
 */
export function checkCsrf(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true; // petición same-site o server-to-server

  const { origin: expected } = new URL(request.url);
  return origin === expected;
}
