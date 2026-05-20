"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

export default function NuevoProyecto() {
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const { markDirty, clearDirty } = useUnsavedChanges();

  useEffect(() => {
    fetch("/api/categorias").then((r) => r.json()).then(setCategorias);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError("");
    const datos = Object.fromEntries(new FormData(e.target));
    datos.publicado = datos.publicado === "1";
    datos.categoria_id = datos.categoria_id ? parseInt(datos.categoria_id) : null;

    try {
      const res = await fetch("/api/proyectos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al guardar");
      clearDirty();
      router.push("/admin/proyectos");
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <>
      <NavBar admin />
      <Contenedor>
        <div className="d-flex align-items-center gap-3 my-4">
          <Link href="/admin/proyectos" className="btn btn-outline-secondary btn-sm">← Volver</Link>
          <h1 className="mb-0">Nuevo Proyecto</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card p-4 shadow-sm">
          <form onSubmit={handleSubmit} onChange={markDirty}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Título *</label>
              <input name="titulo" type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea name="descripcion" className="form-control" rows={4} />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Categoría</label>
                <select name="categoria_id" className="form-select">
                  <option value="">Sin categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Fecha</label>
                <input name="fecha" type="date" className="form-control" />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Imagen de portada (URL)</label>
              <input name="imagen_portada" type="url" className="form-control" placeholder="https://..." />
            </div>
            <div className="mb-4 form-check">
              <input name="publicado" type="checkbox" className="form-check-input" id="publicado" value="1" />
              <label className="form-check-label" htmlFor="publicado">Publicado (visible al público)</label>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={guardando}>
                {guardando ? "Guardando…" : "Guardar proyecto"}
              </button>
              <Link href="/admin/proyectos" className="btn btn-outline-secondary">Cancelar</Link>
            </div>
          </form>
        </div>
      </Contenedor>
    </>
  );
}
