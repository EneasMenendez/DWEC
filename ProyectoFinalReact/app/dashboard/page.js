"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [contadores, setContadores] = useState({ proyectos: 0, fotos: 0, mensajes: 0 });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => {
        if (r.status === 401) { router.push("/login"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setContadores(data); })
      .finally(() => setCargando(false));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <>
      <NavBar admin onLogout={handleLogout} />
      <Contenedor>
        <h1 className="my-4">Dashboard</h1>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card text-white bg-dark h-100 shadow">
              <div className="card-body text-center py-4">
                <i className="bi bi-images" style={{ fontSize: "2.5rem" }} />
                <h2 className="display-4 fw-bold mt-2">
                  {cargando ? "…" : contadores.proyectos}
                </h2>
                <p className="mb-0">Proyectos</p>
              </div>
              <div className="card-footer text-center">
                <Link href="/admin/proyectos" className="text-white-50 small">Gestionar →</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-secondary h-100 shadow">
              <div className="card-body text-center py-4">
                <i className="bi bi-camera" style={{ fontSize: "2.5rem" }} />
                <h2 className="display-4 fw-bold mt-2">
                  {cargando ? "…" : contadores.fotos}
                </h2>
                <p className="mb-0">Fotos</p>
              </div>
              <div className="card-footer text-center">
                <Link href="/admin/fotos" className="text-white-50 small">Gestionar →</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-success h-100 shadow">
              <div className="card-body text-center py-4">
                <i className="bi bi-envelope" style={{ fontSize: "2.5rem" }} />
                <h2 className="display-4 fw-bold mt-2">
                  {cargando ? "…" : contadores.mensajes}
                </h2>
                <p className="mb-0">Mensajes nuevos</p>
              </div>
              <div className="card-footer text-center">
                <Link href="/admin/mensajes" className="text-white-50 small">Ver mensajes →</Link>
              </div>
            </div>
          </div>
        </div>

        <h4 className="mb-3">Accesos rápidos</h4>
        <div className="list-group">
          <Link href="/admin/proyectos/nuevo" className="list-group-item list-group-item-action">
            <i className="bi bi-plus-circle me-2" />Nuevo proyecto
          </Link>
          <Link href="/admin/fotos/nuevo" className="list-group-item list-group-item-action">
            <i className="bi bi-upload me-2" />Subir foto
          </Link>
          <Link href="/admin/usuarios" className="list-group-item list-group-item-action">
            <i className="bi bi-people me-2" />Gestionar usuarios
          </Link>
        </div>
      </Contenedor>
    </>
  );
}
