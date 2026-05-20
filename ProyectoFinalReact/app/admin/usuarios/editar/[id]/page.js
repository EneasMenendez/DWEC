"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";

export default function EditarUsuario({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    fetch(`/api/usuarios/${id}`)
      .then((r) => r.json())
      .then(setDatos);
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError("");
    const form = Object.fromEntries(new FormData(e.target));
    if (!form.contrasena) delete form.contrasena; // no cambiar si está vacío

    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al guardar");
      router.push("/admin/usuarios");
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
          <Link href="/admin/usuarios" className="btn btn-outline-secondary btn-sm">← Volver</Link>
          <h1 className="mb-0">Editar Usuario #{id}</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card p-4 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre *</label>
              <input name="nombre" type="text" className="form-control" defaultValue={datos.nombre} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email *</label>
              <input name="email" type="email" className="form-control" defaultValue={datos.email} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Nueva contraseña</label>
              <input name="contrasena" type="password" className="form-control" minLength={8} placeholder="Dejar vacío para no cambiar" />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Rol</label>
              <select name="rol" className="form-select" defaultValue={datos.rol}>
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={guardando}>
                {guardando ? "Guardando…" : "Guardar cambios"}
              </button>
              <Link href="/admin/usuarios" className="btn btn-outline-secondary">Cancelar</Link>
            </div>
          </form>
        </div>
      </Contenedor>
    </>
  );
}
