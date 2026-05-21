"use client";
import { useState } from "react";
import { resolverUrlImagen } from "@/lib/imagenUrl";

export default function InputImagenUrl({ name, defaultValue = "", label = "Imagen (URL)" }) {
  const [url, setUrl] = useState(defaultValue);
  const [error, setError] = useState(false);

  const urlResuelta = resolverUrlImagen(url);

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <input
        name={name}
        type="text"
        className="form-control"
        value={url}
        onChange={(e) => { setUrl(e.target.value); setError(false); }}
        placeholder="https://... o enlace de Google Drive"
      />
      <div className="form-text">
        <i className="bi bi-info-circle me-1" />
        Admite enlaces de Google Drive. Asegúrate de que el archivo es público («Cualquier persona con el enlace»).
      </div>

      {url && (
        <div className="mt-2">
          {error ? (
            <div className="alert alert-warning py-2 small mb-0 d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill" />
              <span>No se puede cargar la imagen. Comprueba que la URL es correcta y que el archivo de Drive es público.</span>
            </div>
          ) : (
            <img
              src={urlResuelta}
              alt="Vista previa"
              className="rounded border"
              style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", objectPosition: "center bottom" }}
              onError={() => setError(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
