"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
const ALPHA = 0.7;

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Ajustes() {
  const [heroColor, setHeroColor] = useState("#16213e");
  const [heroImagen, setHeroImagen] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/config?clave=hero_color").then((r) => r.json()),
      fetch("/api/config?clave=hero_imagen").then((r) => r.json()),
    ]).then(([colorData, imagenData]) => {
      if (colorData.valor) setHeroColor(colorData.valor);
      if (imagenData.valor) setHeroImagen(imagenData.valor);
    });
  }, []);

  async function guardar() {
    setGuardando(true);
    setMensaje(null);
    try {
      const resultados = await Promise.all([
        fetch("/api/config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clave: "hero_color", valor: heroColor }),
        }),
        fetch("/api/config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clave: "hero_imagen", valor: heroImagen }),
        }),
      ]);
      const ok = resultados.every((r) => r.ok);
      setMensaje(ok ? { tipo: "success", texto: "Ajustes guardados correctamente." } : { tipo: "danger", texto: "Error al guardar." });
    } catch {
      setMensaje({ tipo: "danger", texto: "Error de conexión." });
    } finally {
      setGuardando(false);
    }
  }

  return (
    <>
      <NavBar admin />
      <Contenedor>
        <h1 className="my-4">Ajustes del sitio</h1>

        <div className="card shadow-sm p-4 mb-4">
          <h5 className="mb-3">Hero principal</h5>

          <div className="mb-3">
            <label className="form-label fw-semibold">Imagen de fondo (URL)</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://... (dejar vacío para sin imagen)"
              value={heroImagen}
              onChange={(e) => setHeroImagen(e.target.value)}
            />
            <div className="form-text">
              <i className="bi bi-info-circle me-1" />
              Google Drive: pega el enlace de compartir normal, se convierte automáticamente.
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <label className="form-label fw-semibold mb-0">Color de overlay</label>
            <input
              type="color"
              className="form-control form-control-color"
              value={heroColor}
              onChange={(e) => setHeroColor(e.target.value)}
              style={{ width: 56, height: 40, cursor: "pointer" }}
            />
            <span className="text-muted small font-monospace">{heroColor} · 70% opacidad</span>
          </div>

          <p className="text-muted small mb-2">Vista previa:</p>
          <div
            className="rounded mb-4 d-flex align-items-center justify-content-center text-white"
            style={{
              position: "relative",
              height: 140,
              overflow: "hidden",
              ...(heroImagen ? { backgroundImage: `url(${heroImagen})`, backgroundSize: "cover", backgroundPosition: "center" } : {}),
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: hexToRgba(heroColor, ALPHA) }} />
            <span style={{ position: "relative", zIndex: 1, fontSize: "1.2rem", fontWeight: 600 }}>
              Eneas Menéndez Photography
            </span>
          </div>

          {mensaje && (
            <div className={`alert alert-${mensaje.tipo} py-2`}>{mensaje.texto}</div>
          )}

          <button className="btn btn-dark" onClick={guardar} disabled={guardando}>
            {guardando ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </Contenedor>
    </>
  );
}
