"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

export default function EditarCategoria({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const { markDirty, clearDirty } = useUnsavedChanges();

  useEffect(() => {
    fetch(`/api/categorias/${id}`)
      .then((r) => r.json())
      .then(setDatos);
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.target));

    try {
      const res = await fetch(`/api/categorias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al guardar");
      clearDirty();
      router.push("/admin/categorias");
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
          <Link href="/admin/categorias" className="btn btn-outline-secondary btn-sm">← Volver</Link>
          <h1 className="mb-0">Editar Categoría #{id}</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card p-4 shadow-sm">
          <form onSubmit={handleSubmit} onChange={markDirty}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre *</label>
              <input name="nombre" type="text" className="form-control" defaultValue={datos.nombre} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Slug</label>
              <input name="slug" type="text" className="form-control" defaultValue={datos.slug} />
              <div className="form-text">Dejar vacío para regenerar a partir del nombre.</div>
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea name="descripcion" className="form-control" rows={3} defaultValue={datos.descripcion || ""} />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={guardando}>
                {guardando ? "Guardando…" : "Guardar cambios"}
              </button>
              <Link href="/admin/categorias" className="btn btn-outline-secondary">Cancelar</Link>
            </div>
          </form>
        </div>
      </Contenedor>
    </>
  );
}
