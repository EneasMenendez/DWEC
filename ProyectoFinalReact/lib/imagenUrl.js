/**
 * Convierte URLs de servicios que no sirven imágenes directamente
 * a su equivalente de embed directo.
 *
 * Google Drive usa thumbnail?id=ID&sz=wN porque uc?export=view
 * devuelve una página de advertencia para ficheros grandes.
 */
export function resolverUrlImagen(url) {
  if (!url) return url;

  // Google Drive: /file/d/ID/...
  const drive = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (drive) return `https://drive.google.com/thumbnail?id=${drive[1]}&sz=w2000`;

  // Google Drive: /open?id=ID  o  /uc?id=ID
  const driveId = url.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([a-zA-Z0-9_-]+)/);
  if (driveId) return `https://drive.google.com/thumbnail?id=${driveId[1]}&sz=w2000`;

  return url;
}
