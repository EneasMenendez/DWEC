"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Paginacion from "@/components/Paginacion";
import Link from "next/link";

const POR_PAGINA = 10;

export default function AdminCategorias() {
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    fetch("/api/categorias")
      .then((r) => {
        if (r.status === 401) { router.push("/login"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setCategorias(data); })
      .finally(() => setCargando(false));
  }, []);

  async function eliminar(id, nombre) {
    if (!confirm(`¿Eliminar la categoría "${nombre}"? Los proyectos asociados quedarán sin categoría.`)) return;
    const res = await fetch(`/api/categorias/${id}`, { method: "DELETE" });
    if (res.ok) setCategorias((prev) => prev.filter((c) => c.id !== id));
    else alert("Error al eliminar la categoría.");
  }

  const inicio = (pagina - 1) * POR_PAGINA;
  const pagCategorias = categorias.slice(inicio, inicio + POR_PAGINA);

  return (
    <>
      <NavBar admin />
      <Contenedor>
        <div className="d-flex justify-content-between align-items-center my-4">
          <h1>Gestión de Categorías</h1>
          <Link href="/admin/categorias/nueva" className="btn btn-dark">
            <i className="bi bi-plus-lg me-1" />Nueva
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Slug</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan={5} className="text-center py-4">Cargando…</td></tr>
              ) : categorias.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted py-4">No hay categorías.</td></tr>
              ) : (
                pagCategorias.map((c) => (
                  <tr key={c.id}>
                    <td className="text-muted small">{c.id}</td>
                    <td><strong>{c.nombre}</strong></td>
                    <td><code className="text-muted">{c.slug}</code></td>
                    <td className="text-muted small">{c.descripcion || "—"}</td>
                    <td>
                      <Link href={`/admin/categorias/editar/${c.id}`} className="btn btn-sm btn-outline-dark me-1">
                        <i className="bi bi-pencil" />
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(c.id, c.nombre)}>
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Paginacion pagina={pagina} total={categorias.length} porPagina={POR_PAGINA} onChange={setPagina} />
      </Contenedor>
    </>
  );
}
