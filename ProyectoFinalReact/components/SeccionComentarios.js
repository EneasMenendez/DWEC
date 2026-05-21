"use client";
import { useState, useEffect, useCallback } from "react";

function getCsrfHeaders() {
  return { "Content-Type": "application/json" };
}

export default function SeccionComentarios({ proyectoId }) {
  const [comentarios, setComentarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [form, setForm] = useState({ nombre: "", email: "", texto: "" });
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch(`/api/comentarios?proyecto=${proyectoId}`);
      const data = await res.json();
      setComentarios(Array.isArray(data) ? data : []);
    } catch {
      setComentarios([]);
    } finally {
      setCargando(false);
    }
  }, [proyectoId]);

  useEffect(() => { cargar(); }, [cargar]);

  function cambiar(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function enviar(e) {
    e.preventDefault();
    setEnviando(true);
    setMensaje(null);
    try {
      const res = await fetch("/api/comentarios", {
        method: "POST",
        headers: getCsrfHeaders(),
        body: JSON.stringify({ ...form, proyecto_id: proyectoId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMensaje({ tipo: "danger", texto: data.error || "Error al enviar." });
      } else {
        setMensaje({ tipo: "success", texto: "Comentario enviado. Está pendiente de aprobación." });
        setForm({ nombre: "", email: "", texto: "" });
      }
    } catch {
      setMensaje({ tipo: "danger", texto: "Error de red." });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="mt-5">
      <h4 className="mb-4">Comentarios</h4>

      {cargando ? (
        <p className="text-muted">Cargando comentarios…</p>
      ) : comentarios.length === 0 ? (
        <p className="text-muted">Sé el primero en comentar.</p>
      ) : (
        <ul className="list-unstyled mb-4">
          {comentarios.map((c) => (
            <li key={c._id} className="border-bottom pb-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <strong>{c.nombre}</strong>
                <small className="text-muted">
                  {new Date(c.creado_en).toLocaleDateString("es-ES", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </small>
              </div>
              <p className="mb-0">{c.texto}</p>
            </li>
          ))}
        </ul>
      )}

      <h5 className="mb-3">Deja un comentario</h5>
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo}`} role="alert">
          {mensaje.texto}
        </div>
      )}
      <form onSubmit={enviar} noValidate>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label">Nombre *</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={cambiar}
              required
              minLength={2}
              maxLength={100}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email *</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={cambiar}
              required
            />
            <div className="form-text">Tu email no se publicará.</div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Comentario *</label>
          <textarea
            className="form-control"
            name="texto"
            rows={4}
            value={form.texto}
            onChange={cambiar}
            required
            minLength={5}
            maxLength={1000}
          />
        </div>
        <button type="submit" className="btn btn-dark" disabled={enviando}>
          {enviando ? "Enviando…" : "Enviar comentario"}
        </button>
      </form>
    </section>
  );
}
