"use client";

export default function Error({ error, reset }) {
  return (
    <div className="container text-center py-5">
      <i className="bi bi-exclamation-triangle-fill text-warning" style={{ fontSize: "4rem" }}></i>
      <h2 className="mt-3">Algo ha ido mal</h2>
      <p className="text-muted">{error?.message || "Error inesperado en la aplicaciÃ³n."}</p>
      <button className="btn btn-dark mt-2" onClick={reset}>
        Volver a intentarlo
      </button>
    </div>
  );
}