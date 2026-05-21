"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import InputImagenUrl from "@/components/InputImagenUrl";

export default function EditarProyecto({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [datos, setDatos] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const { markDirty, clearDirty } = useUnsavedChanges();

  useEffect(() => {
    Promise.all([
      fetch(`/api/proyectos/${id}`).then((r) => r.json()),
      fetch("/api/categorias").then((r) => r.json()),
    ]).then(([proyecto, cats]) => {
      setDatos(proyecto);
      setCategorias(cats);
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.target));
    form.publicado = form.publicado === "1";
    form.categoria_id = form.categoria_id ? parseInt(form.categoria_id) : null;

    try {
      const res = await fetch(`/api/proyectos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  if (!datos) return (
    <>
      <NavBar admin />
      <Contenedor><p className="my-5 text-center">Cargando…</p></Contenedor>
    </>
  );

  return (
    <>
      <NavBar admin />
      <Contenedor>
        <div className="d-flex align-items-center gap-3 my-4">
          <Link href="/admin/proyectos" className="btn btn-outline-secondary btn-sm">← Volver</Link>
          <h1 className="mb-0">Editar Proyecto #{id}</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card p-4 shadow-sm">
          <form onSubmit={handleSubmit} onChange={markDirty}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Título *</label>
              <input name="titulo" type="text" className="form-control" defaultValue={datos.titulo} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea name="descripcion" className="form-control" rows={4} defaultValue={datos.descripcion || ""} />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Categoría</label>
                <select name="categoria_id" className="form-select" defaultValue={datos.categoria_id || ""}>
                  <option value="">Sin categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Fecha</label>
                <input name="fecha" type="date" className="form-control" defaultValue={datos.fecha || ""} />
              </div>
            </div>
            <InputImagenUrl name="imagen_portada" label="Imagen de portada" defaultValue={datos.imagen_portada || ""} />
            <div className="mb-4 form-check">
              <input name="publicado" type="checkbox" className="form-check-input" id="publicado"
                value="1" defaultChecked={!!datos.publicado} />
              <label className="form-check-label" htmlFor="publicado">Publicado</label>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={guardando}>
                {guardando ? "Guardando…" : "Guardar cambios"}
              </button>
              <Link href="/admin/proyectos" className="btn btn-outline-secondary">Cancelar</Link>
            </div>
          </form>
        </div>
      </Contenedor>
    </>
  );
}
