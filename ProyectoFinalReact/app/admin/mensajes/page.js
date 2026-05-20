"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";

const ESTADOS = ["nuevo", "leido", "respondido"];
const BADGE = { nuevo: "bg-danger", leido: "bg-secondary", respondido: "bg-success" };

export default function AdminMensajes() {
  const router = useRouter();
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [expandido, setExpandido] = useState(null);

  useEffect(() => {
    fetch("/api/mensajes")
      .then((r) => {
        if (r.status === 401) { router.push("/login"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setMensajes(data); })
      .finally(() => setCargando(false));
  }, []);

  async function cambiarEstado(id, estado) {
    const res = await fetch(`/api/mensajes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });
    if (res.ok) {
      setMensajes((prev) => prev.map((m) => (m.id === id ? { ...m, estado } : m)));
    }
  }

  async function eliminar(id) {
    if (!confirm("¿Eliminar este mensaje?")) return;
    const res = await fetch(`/api/mensajes/${id}`, { method: "DELETE" });
    if (res.ok) setMensajes((prev) => prev.filter((m) => m.id !== id));
    else alert("Error al eliminar el mensaje.");
  }

  return (
    <>
      <NavBar admin />
      <Contenedor>
        <h1 className="my-4">Mensajes de contacto</h1>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Asunto</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan={6} className="text-center py-4">Cargando…</td></tr>
              ) : mensajes.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-muted py-4">No hay mensajes.</td></tr>
              ) : (
                mensajes.map((m) => (
                  <>
                    <tr
                      key={m.id}
                      className={m.estado === "nuevo" ? "table-warning" : ""}
                      style={{ cursor: "pointer" }}
                      onClick={() => setExpandido(expandido === m.id ? null : m.id)}
                    >
                      <td className="small text-muted">
                        {new Date(m.creado_en).toLocaleDateString("es-ES")}
                      </td>
                      <td className="fw-semibold">{m.nombre}</td>
                      <td>{m.email}</td>
                      <td>{m.asunto || <span className="text-muted">—</span>}</td>
                      <td>
                        <span className={`badge ${BADGE[m.estado]}`}>{m.estado}</span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <select
                          className="form-select form-select-sm d-inline-block w-auto me-1"
                          value={m.estado}
                          onChange={(e) => cambiarEstado(m.id, e.target.value)}
                        >
                          {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminar(m.id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                    {expandido === m.id && (
                      <tr key={`${m.id}-detalle`} className="bg-light">
                        <td colSpan={6} className="px-4 py-3">
                          <strong>Mensaje:</strong>
                          <p className="mb-0 mt-1">{m.mensaje}</p>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Contenedor>
    </>
  );
}
