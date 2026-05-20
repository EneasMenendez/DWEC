"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Paginacion from "@/components/Paginacion";
import Link from "next/link";

const POR_PAGINA = 10;

function AdminFotosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const proyectoParam = searchParams.get("proyecto");

  const [fotos, setFotos] = useState([]);
  const [proyectoNombre, setProyectoNombre] = useState("");
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const url = proyectoParam ? `/api/fotos?proyecto=${proyectoParam}` : "/api/fotos";
    fetch(url)
      .then((r) => {
        if (r.status === 401) { router.push("/login"); return null; }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setFotos(data);
        if (proyectoParam && data.length > 0 && data[0].proyecto?.titulo) {
          setProyectoNombre(data[0].proyecto.titulo);
        }
      })
      .finally(() => setCargando(false));
  }, [proyectoParam]);

  async function eliminar(id) {
    if (!confirm("¿Eliminar esta foto?")) return;
    const res = await fetch(`/api/fotos/${id}`, { method: "DELETE" });
    if (res.ok) setFotos((prev) => prev.filter((f) => f.id !== id));
    else alert("Error al eliminar la foto.");
  }

  const inicio = (pagina - 1) * POR_PAGINA;
  const pagFotos = fotos.slice(inicio, inicio + POR_PAGINA);

  return (
    <>
      <NavBar admin />
      <Contenedor>
        <div className="d-flex justify-content-between align-items-center my-4">
          <div className="d-flex align-items-center gap-3">
            {proyectoParam && (
              <Link href={`/admin/proyectos`} className="btn btn-outline-secondary btn-sm">
                ← Volver a proyectos
              </Link>
            )}
            <div>
              <h1 className="mb-0">Gestión de Fotos</h1>
              {proyectoParam && proyectoNombre && (
                <p className="text-muted small mb-0">
                  Filtrando por proyecto: <strong>{proyectoNombre}</strong>
                  {" · "}
                  <Link href="/admin/fotos" className="text-muted">Ver todas</Link>
                </p>
              )}
            </div>
          </div>
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
                pagFotos.map((f) => (
                  <tr key={f.id}>
                    <td className="text-muted small">{f.id}</td>
                    <td>
                      <img src={f.url} alt={f.titulo || ""} className="rounded"
                        style={{ height: 48, width: 72, objectFit: "cover" }} />
                    </td>
                    <td>{f.titulo || <span className="text-muted">Sin título</span>}</td>
                    <td>{f.proyecto?.titulo ?? "—"}</td>
                    <td>{f.orden}</td>
                    <td>
                      <Link href={`/admin/fotos/editar/${f.id}`} className="btn btn-sm btn-outline-dark me-1">
                        <i className="bi bi-pencil" />
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(f.id)}>
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Paginacion pagina={pagina} total={fotos.length} porPagina={POR_PAGINA} onChange={setPagina} />
      </Contenedor>
    </>
  );
}

export default function AdminFotos() {
  return (
    <Suspense fallback={
      <>
        <NavBar admin />
        <Contenedor><p className="my-5 text-center">Cargando…</p></Contenedor>
      </>
    }>
      <AdminFotosContent />
    </Suspense>
  );
}
