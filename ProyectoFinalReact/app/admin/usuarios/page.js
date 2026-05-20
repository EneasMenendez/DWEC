"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Paginacion from "@/components/Paginacion";
import Link from "next/link";

const POR_PAGINA = 10;

export default function AdminUsuarios() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    fetch("/api/usuarios")
      .then((r) => {
        if (r.status === 401) { router.push("/login"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setUsuarios(data); })
      .finally(() => setCargando(false));
  }, []);

  async function eliminar(id, nombre) {
    if (!confirm(`¿Eliminar el usuario "${nombre}"?`)) return;
    const res = await fetch(`/api/usuarios/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } else {
      const json = await res.json();
      alert(json.error || "Error al eliminar el usuario.");
    }
  }

  const inicio = (pagina - 1) * POR_PAGINA;
  const pagUsuarios = usuarios.slice(inicio, inicio + POR_PAGINA);

  return (
    <>
      <NavBar admin />
      <Contenedor>
        <div className="d-flex justify-content-between align-items-center my-4">
          <h1>Gestión de Usuarios</h1>
          <Link href="/admin/usuarios/nuevo" className="btn btn-dark">
            <i className="bi bi-person-plus me-1" />Nuevo usuario
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Creado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan={6} className="text-center py-4">Cargando…</td></tr>
              ) : usuarios.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-muted py-4">No hay usuarios.</td></tr>
              ) : (
                pagUsuarios.map((u) => (
                  <tr key={u.id}>
                    <td className="text-muted small">{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.rol === "ADMIN" ? "bg-danger" : "bg-primary"}`}>
                        {u.rol}
                      </span>
                    </td>
                    <td className="text-muted small">
                      {u.creado_en ? new Date(u.creado_en).toLocaleDateString("es-ES") : "—"}
                    </td>
                    <td>
                      <Link href={`/admin/usuarios/editar/${u.id}`} className="btn btn-sm btn-outline-dark me-1">
                        <i className="bi bi-pencil" />
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(u.id, u.nombre)}>
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Paginacion pagina={pagina} total={usuarios.length} porPagina={POR_PAGINA} onChange={setPagina} />
      </Contenedor>
    </>
  );
}
