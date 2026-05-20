"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";

export default function NuevoUsuario() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError("");
    const datos = Object.fromEntries(new FormData(e.target));

    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Error al crear el usuario");
      router.push("/admin/usuarios");
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
          <Link href="/admin/usuarios" className="btn btn-outline-secondary btn-sm">← Volver</Link>
          <h1 className="mb-0">Nuevo Usuario</h1>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card p-4 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Nombre *</label>
              <input name="nombre" type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email *</label>
              <input name="email" type="email" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Contraseña *</label>
              <input name="contrasena" type="password" className="form-control" required minLength={8} />
              <div className="form-text">Mínimo 8 caracteres.</div>
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Rol</label>
              <select name="rol" className="form-select">
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark" disabled={guardando}>
                {guardando ? "Creando…" : "Crear usuario"}
              </button>
              <Link href="/admin/usuarios" className="btn btn-outline-secondary">Cancelar</Link>
            </div>
          </form>
        </div>
      </Contenedor>
    </>
  );
}
