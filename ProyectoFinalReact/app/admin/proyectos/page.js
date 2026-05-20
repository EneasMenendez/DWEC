"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";

export default function AdminProyectos() {
  const router = useRouter();
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  function cargar() {
    fetch("/api/proyectos?all=1")
      .then((r) => {
        if (r.status === 401) { router.push("/login"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setProyectos(data); })
      .finally(() => setCargando(false));
  }

  useEffect(() => { cargar(); }, []);

  async function eliminar(id, titulo) {
    if (!confirm(`¿Eliminar el proyecto "${titulo}"? Se eliminarán también sus fotos.`)) return;
    const res = await fetch(`/api/proyectos/${id}`, { method: "DELETE" });
    if (res.ok) setProyectos((prev) => prev.filter((p) => p.id !== id));
    else alert("Error al eliminar el proyecto.");
  }

  return (
    <>
      <NavBar admin />
      <Contenedor>
        <div className="d-flex justify-content-between align-items-center my-4">
          <h1>Gestión de Proyectos</h1>
          <Link href="/admin/proyectos/nuevo" className="btn btn-dark">
            <i className="bi bi-plus-lg me-1" />Nuevo
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Fotos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan={6} className="text-center py-4">Cargando…</td></tr>
              ) : proyectos.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-muted py-4">No hay proyectos.</td></tr>
              ) : (
                proyectos.map((p) => (
                  <tr key={p.id}>
                    <td className="text-muted small">{p.id}</td>
                    <td>
                      <strong>{p.titulo}</strong>
                      {p.imagen_portada && (
                        <img
                          src={p.imagen_portada}
                          alt=""
                          className="ms-2 rounded"
                          style={{ height: 32, width: 48, objectFit: "cover" }}
                        />
                      )}
                    </td>
                    <td>{p.categoria?.nombre ?? <span className="text-muted">—</span>}</td>
                    <td>{p.fotos?.length ?? 0}</td>
                    <td>
                      <span className={`badge ${p.publicado ? "bg-success" : "bg-secondary"}`}>
                        {p.publicado ? "Publicado" : "Borrador"}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/admin/proyectos/editar/${p.id}`}
                        className="btn btn-sm btn-outline-dark me-1"
                      >
                        <i className="bi bi-pencil" />
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminar(p.id, p.titulo)}
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
