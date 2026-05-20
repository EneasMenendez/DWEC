"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";

export default function AdminFotos() {
  const router = useRouter();
  const [fotos, setFotos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/api/fotos")
      .then((r) => {
        if (r.status === 401) { router.push("/login"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setFotos(data); })
      .finally(() => setCargando(false));
  }, []);

  async function eliminar(id) {
    if (!confirm("¿Eliminar esta foto?")) return;
    const res = await fetch(`/api/fotos/${id}`, { method: "DELETE" });
    if (res.ok) setFotos((prev) => prev.filter((f) => f.id !== id));
    else alert("Error al eliminar la foto.");
  }

  return (
    <>
      <NavBar admin />
      <Contenedor>
        <div className="d-flex justify-content-between align-items-center my-4">
          <h1>Gestión de Fotos</h1>
          <Link href="/admin/fotos/nuevo" className="btn btn-dark">
            <i className="bi bi-plus-lg me-1" />Nueva foto
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Miniatura</th>
                <th>Título</th>
                <th>Proyecto</th>
                <th>Orden</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan={6} className="text-center py-4">Cargando…</td></tr>
              ) : fotos.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-muted py-4">No hay fotos.</td></tr>
              ) : (
                fotos.map((f) => (
                  <tr key={f.id}>
                    <td className="text-muted small">{f.id}</td>
                    <td>
                      <img
                        src={f.url}
                        alt={f.titulo || ""}
                        className="rounded"
                        style={{ height: 48, width: 72, objectFit: "cover" }}
                      />
                    </td>
                    <td>{f.titulo || <span className="text-muted">Sin título</span>}</td>
                    <td>{f.proyecto?.titulo ?? "—"}</td>
                    <td>{f.orden}</td>
                    <td>
                      <Link
                        href={`/admin/fotos/editar/${f.id}`}
                        className="btn btn-sm btn-outline-dark me-1"
                      >
                        <i className="bi bi-pencil" />
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminar(f.id)}
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Contenedor>
    </>
  );
}
