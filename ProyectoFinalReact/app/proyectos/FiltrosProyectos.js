"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FiltrosProyectos({ categorias, anios, buscarInicial = "", categoriaInicial = "", anioInicial = "" }) {
  const router = useRouter();
  const [buscar, setBuscar] = useState(buscarInicial);
  const [categoria, setCategoria] = useState(categoriaInicial);
  const [anio, setAnio] = useState(anioInicial);

  const hayFiltros = buscarInicial || categoriaInicial || anioInicial;

  function filtrar(e) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (buscar.trim()) p.set("buscar", buscar.trim());
    if (categoria) p.set("categoria", categoria);
    if (anio) p.set("anio", anio);
    router.push(`/proyectos?${p.toString()}`);
  }

  return (
    <div className="card mb-4 p-3 bg-light border-0 shadow-sm">
      <form onSubmit={filtrar}>
        <div className="row g-2 align-items-end">
          <div className="col-md-4">
            <label className="form-label small fw-semibold mb-1">
              <i className="bi bi-search me-1" />Buscar
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Título del proyecto…"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label small fw-semibold mb-1">
              <i className="bi bi-tag me-1" />Categoría
            </label>
            <select
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.slug}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label small fw-semibold mb-1">
              <i className="bi bi-calendar me-1" />Año
            </label>
            <select
              className="form-select"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
            >
              <option value="">Todos los años</option>
              {anios.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <button type="submit" className="btn btn-dark w-100">
              <i className="bi bi-funnel me-1" />Filtrar
            </button>
          </div>

          {hayFiltros && (
            <div className="col-md-1">
              <Link href="/proyectos" className="btn btn-outline-secondary w-100" title="Limpiar filtros">
                ✕
              </Link>
            </div>
          )}
        </div>
      </form>

      {hayFiltros && (
        <div className="mt-2 small text-muted">
          Filtrando por:{" "}
          {[
            buscarInicial && `título: "${buscarInicial}"`,
            categoriaInicial && `categoría: ${categoriaInicial}`,
            anioInicial && `año: ${anioInicial}`,
          ]
            .filter(Boolean)
            .join(" · ")}
        </div>
      )}
    </div>
  );
}
