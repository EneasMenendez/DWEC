// In-memory rate limiter — single-instance only (suficiente para un portfolio)
const store = new Map();

// Limpia entradas expiradas periódicamente
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 60_000);

/**
 * @param {string} key       - clave única (ej. "login:1.2.3.4")
 * @param {object} options
 * @param {number} options.max       - máximo de intentos por ventana
 * @param {number} options.windowMs  - duración de la ventana en ms
 * @returns {{ limited: boolean, retryAfter?: number }}
 */
export function checkRateLimit(key, { max, windowMs }) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false };
  }

  if (entry.count >= max) {
    return { limited: true, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { limited: false };
}
