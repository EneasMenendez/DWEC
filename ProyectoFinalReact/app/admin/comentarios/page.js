"use client";
import { useState, useEffect, useCallback } from "react";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";

export default function AdminComentarios() {
  const [comentarios, setComentarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("todos");

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/comentarios");
      const data = await res.json();
      setComentarios(Array.isArray(data) ? data : []);
    } catch {
      setComentarios([]);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  async function toggleAprobado(id) {
    await fetch(`/api/comentarios/${id}`, { method: "PUT" });
    cargar();
  }

  async function eliminar(id) {
    if (!confirm("¿Eliminar este comentario?")) return;
    await fetch(`/api/comentarios/${id}`, { method: "DELETE" });
    cargar();
  }

  const filtrados = comentarios.filter((c) => {
    if (filtro === "pendientes") return !c.aprobado;
    if (filtro === "aprobados") return c.aprobado;
    return true;
  });

  return (
    <>
      <NavBar admin />
      <Contenedor>
        <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
          <h2 className="mb-0">Comentarios</h2>
          <div className="btn-group btn-group-sm">
            {["todos", "pendientes", "aprobados"].map((f) => (
              <button
                key={f}
                className={`btn ${filtro === f ? "btn-dark" : "btn-outline-secondary"}`}
                onClick={() => setFiltro(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {cargando ? (
          <p className="text-muted">Cargando…</p>
        ) : filtrados.length === 0 ? (
          <p className="text-muted">No hay comentarios{filtro !== "todos" ? ` ${filtro}` : ""}.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Proyecto</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Comentario</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((c) => (
                  <tr key={c._id}>
                    <td>
                      <a href={`/proyectos/${c.proyecto_id}`} target="_blank" rel="noreferrer" className="text-decoration-none">
                        #{c.proyecto_id}
                      </a>
                    </td>
                    <td>{c.nombre}</td>
                    <td className="text-muted small">{c.email}</td>
                    <td style={{ maxWidth: 300 }}>
                      <span className="d-block text-truncate" title={c.texto}>{c.texto}</span>
                    </td>
                    <td className="text-muted small text-nowrap">
                      {new Date(c.creado_en).toLocaleDateString("es-ES")}
                    </td>
                    <td>
                      {c.aprobado ? (
                        <span className="badge bg-success">Aprobado</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Pendiente</span>
                      )}
                    </td>
                    <td className="text-nowrap">
                      <button
                        className={`btn btn-sm me-1 ${c.aprobado ? "btn-outline-warning" : "btn-outline-success"}`}
                        title={c.aprobado ? "Rechazar" : "Aprobar"}
                        onClick={() => toggleAprobado(c._id)}
                      >
                        <i className={`bi ${c.aprobado ? "bi-x-circle" : "bi-check-circle"}`} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Eliminar"
                        onClick={() => eliminar(c._id)}
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Contenedor>
    </>
  );
}
