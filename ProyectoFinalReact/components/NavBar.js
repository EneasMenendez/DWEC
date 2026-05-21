"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavBar({ admin = false, onLogout }) {
  const ruta = usePathname();
  const router = useRouter();
  const [esAdmin, setEsAdmin] = useState(true);

  useEffect(() => {
    if (!admin) return;
    fetch("/api/me")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setEsAdmin(data.rol === "ADMIN"); });
  }, [admin]);

  function esActiva(href) {
    return ruta === href ? "active" : "";
  }

  async function handleLogout() {
    if (onLogout) {
      onLogout();
    } else {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src="/logo.svg" alt="Logo" width={32} height={32} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          suppressHydrationWarning
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMenu" suppressHydrationWarning>
          {!admin ? (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link href="/" className={`nav-link ${esActiva("/")}`}>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link href="/proyectos" className={`nav-link ${esActiva("/proyectos")}`}>
                  Proyectos
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/sobre-mi" className={`nav-link ${esActiva("/sobre-mi")}`}>
                  Sobre mí
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contacto" className={`nav-link ${esActiva("/contacto")}`}>
                  Contacto
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link href="/dashboard" className={`nav-link ${esActiva("/dashboard")}`}>
                  <i className="bi bi-speedometer2 me-1" />Dashboard
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  Contenido
                </a>
                <ul className="dropdown-menu">
                  <li><Link href="/admin/proyectos" className="dropdown-item">Proyectos</Link></li>
                  <li><Link href="/admin/fotos" className="dropdown-item">Fotos</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link href="/admin/categorias" className="dropdown-item">Categorías</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link href="/admin/comentarios" className="dropdown-item">Comentarios</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/admin/mensajes" className={`nav-link ${esActiva("/admin/mensajes")}`}>
                  Mensajes
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/admin/ajustes" className={`nav-link ${esActiva("/admin/ajustes")}`}>
                  <i className="bi bi-gear me-1" />Ajustes
                </Link>
              </li>
              {esAdmin && (
                <li className="nav-item">
                  <Link href="/admin/usuarios" className={`nav-link ${esActiva("/admin/usuarios")}`}>
                    Usuarios
                  </Link>
                </li>
              )}
            </ul>
          )}

          <ul className="navbar-nav ms-auto">
            {admin ? (
              <>
                <li className="nav-item">
                  <Link href="/" className="nav-link text-warning">
                    <i className="bi bi-box-arrow-up-right me-1" />Ver web
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link text-danger border-0 bg-transparent"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1" />Salir
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/login" className="nav-link">
                  <i className="bi bi-person-circle me-1" />Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
