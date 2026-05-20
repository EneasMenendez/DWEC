"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

function generarSlug(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function NuevaCategoria() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [slug, setSlug] = useState("");
  const { markDirty, clearDirty } = useUnsavedChanges();

  function handleNombreChange(e) {
    markDirty();
    setSlug(generarSlug(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError("");
    const datos = Object.fromEntries(new FormData(e.target));

    try {
      const res = await fetch("/api/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al crear la categoría");
      clearDirty();
      router.push("/admin/categorias");
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
          <Link href="/admin/categorias" className="btn btn-outline-secondary btn-sm">← Volver</Link>
          <h1 className="mb-0">Nueva Categoría</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card p-4 shadow-sm">
          <form onSubmit={handleSubmit} onChange={markDirty}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre *</label>
              <input name="nombre" type="text" className="form-control" required onChange={handleNombreChange} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Slug</label>
              <input name="slug" type="text" className="form-control" value={slug}
                onChange={(e) => { markDirty(); setSlug(e.target.value); }}
                placeholder="Se genera automáticamente" />
              <div className="form-text">Identificador único en la URL. Se genera a partir del nombre.</div>
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea name="descripcion" className="form-control" rows={3} />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={guardando}>
                {guardando ? "Creando…" : "Crear categoría"}
              </button>
              <Link href="/admin/categorias" className="btn btn-outline-secondary">Cancelar</Link>
            </div>
          </form>
        </div>
      </Contenedor>
    </>
  );
}
