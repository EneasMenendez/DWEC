"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import InputImagenUrl from "@/components/InputImagenUrl";

export default function EditarFoto({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [datos, setDatos] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const { markDirty, clearDirty } = useUnsavedChanges();

  useEffect(() => {
    Promise.all([
      fetch(`/api/fotos/${id}`).then((r) => r.json()),
      fetch("/api/proyectos?all=1").then((r) => r.json()),
    ]).then(([foto, proys]) => {
      setDatos(foto);
      setProyectos(proys);
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.target));
    form.orden = parseInt(form.orden) || 0;
    form.proyecto_id = parseInt(form.proyecto_id);

    try {
      const res = await fetch(`/api/fotos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al guardar");
      clearDirty();
      router.push("/admin/fotos");
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
          <Link href="/admin/fotos" className="btn btn-outline-secondary btn-sm">← Volver</Link>
          <h1 className="mb-0">Editar Foto #{id}</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card p-4 shadow-sm">
          <form onSubmit={handleSubmit} onChange={markDirty}>
            <InputImagenUrl name="url" label="URL de la imagen *" defaultValue={datos.url || ""} />
            <div className="mb-3">
              <label className="form-label fw-semibold">Título</label>
              <input name="titulo" type="text" className="form-control" defaultValue={datos.titulo || ""} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Descripción</label>
              <textarea name="descripcion" className="form-control" rows={3} defaultValue={datos.descripcion || ""} />
            </div>
            <div className="row mb-3">
              <div className="col-md-8">
                <label className="form-label fw-semibold">Proyecto *</label>
                <select name="proyecto_id" className="form-select" defaultValue={datos.proyecto_id} required>
                  <option value="">Seleccionar proyecto…</option>
                  {proyectos.map((p) => (
                    <option key={p.id} value={p.id}>{p.titulo}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Orden</label>
                <input name="orden" type="number" className="form-control" defaultValue={datos.orden ?? 0} min={0} />
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={guardando}>
                {guardando ? "Guardando…" : "Guardar cambios"}
              </button>
              <Link href="/admin/fotos" className="btn btn-outline-secondary">Cancelar</Link>
            </div>
          </form>
        </div>
      </Contenedor>
    </>
  );
}
