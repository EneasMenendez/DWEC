"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Paginacion from "@/components/Paginacion";
import Link from "next/link";

const POR_PAGINA = 10;

export default function AdminProyectos() {
  const router = useRouter();
  const [proyectos, setProyectos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1);

  const [buscar, setBuscar] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");

  function cargar() {
    Promise.all([
      fetch("/api/proyectos?all=1").then((r) => {
        if (r.status === 401) { router.push("/login"); return null; }
        return r.json();
      }),
      fetch("/api/categorias").then((r) => r.json()),
    ]).then(([data, cats]) => {
      if (data) setProyectos(data);
      if (cats) setCategorias(cats);
    }).finally(() => setCargando(false));
  }

  useEffect(() => { cargar(); }, []);

  async function eliminar(id, titulo) {
    if (!confirm(`¿Eliminar el proyecto "${titulo}"? Se eliminarán también sus fotos.`)) return;
    const res = await fetch(`/api/proyectos/${id}`, { method: "DELETE" });
    if (res.ok) setProyectos((prev) => prev.filter((p) => p.id !== id));
    else alert("Error al eliminar el proyecto.");
  }

  function cambiarFiltro(setter) {
    return (e) => { setter(e.target.value); setPagina(1); };
  }

  const proyectosFiltrados = useMemo(() => {
    return proyectos.filter((p) => {
      if (buscar && !p.titulo.toLowerCase().includes(buscar.toLowerCase())) return false;
      if (categoriaFiltro && String(p.categoria_id) !== categoriaFiltro) return false;
      if (estadoFiltro === "1" && !p.publicado) return false;
      if (estadoFiltro === "0" && p.publicado) return false;
      return true;
    });
  }, [proyectos, buscar, categoriaFiltro, estadoFiltro]);

  const hayFiltros = buscar || categoriaFiltro || estadoFiltro;
  const inicio = (pagina - 1) * POR_PAGINA;
  const pagProyectos = proyectosFiltrados.slice(inicio, inicio + POR_PAGINA);

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

        <div className="card mb-4 p-3 bg-light border-0 shadow-sm">
          <div className="row g-2 align-items-end">
            <div className="col-md-4">
              <label className="form-label small fw-semibold mb-1">
                <i className="bi bi-search me-1" />Buscar título
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre del proyecto…"
                value={buscar}
                onChange={cambiarFiltro(setBuscar)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-semibold mb-1">
                <i className="bi bi-tag me-1" />Categoría
              </label>
              <select className="form-select" value={categoriaFiltro} onChange={cambiarFiltro(setCategoriaFiltro)}>
                <option value="">Todas</option>
                {categorias.map((c) => (
                  <option key={c.id} value={String(c.id)}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-semibold mb-1">
                <i className="bi bi-toggle-on me-1" />Estado
              </label>
              <select className="form-select" value={estadoFiltro} onChange={cambiarFiltro(setEstadoFiltro)}>
                <option value="">Todos</option>
                <option value="1">Publicado</option>
                <option value="0">Borrador</option>
              </select>
            </div>
            {hayFiltros && (
              <div className="col-md-2">
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={() => { setBuscar(""); setCategoriaFiltro(""); setEstadoFiltro(""); setPagina(1); }}
                >
                  ✕ Limpiar
                </button>
              </div>
            )}
          </div>
          {hayFiltros && (
            <p className="mb-0 mt-2 small text-muted">
              {proyectosFiltrados.length} resultado{proyectosFiltrados.length !== 1 ? "s" : ""}
            </p>
          )}
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
              ) : proyectosFiltrados.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-muted py-4">No hay proyectos con esos filtros.</td></tr>
              ) : (
                pagProyectos.map((p) => (
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
                      <Link href={`/admin/fotos?proyecto=${p.id}`} className="btn btn-sm btn-outline-secondary me-1" title="Ver fotos">
                        <i className="bi bi-images" />
                      </Link>
                      <Link href={`/admin/proyectos/editar/${p.id}`} className="btn btn-sm btn-outline-dark me-1">
                        <i className="bi bi-pencil" />
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p.id, p.titulo)}>
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Paginacion pagina={pagina} total={proyectosFiltrados.length} porPagina={POR_PAGINA} onChange={setPagina} />
      </Contenedor>
    </>
  );
}
