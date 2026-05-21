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
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    fetch("/api/config?clave=hero_color")
      .then((r) => r.json())
      .then((data) => { if (data.valor) setHeroColor(data.valor); });
  }, []);

  async function guardar() {
    setGuardando(true);
    setMensaje(null);
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clave: "hero_color", valor: heroColor }),
      });
      setMensaje(res.ok ? { tipo: "success", texto: "Color guardado correctamente." } : { tipo: "danger", texto: "Error al guardar." });
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
          <h5 className="mb-3">Color de fondo del hero</h5>

          <div className="d-flex align-items-center gap-3 mb-4">
            <input
              type="color"
              className="form-control form-control-color"
              value={heroColor}
              onChange={(e) => setHeroColor(e.target.value)}
              style={{ width: 56, height: 40, cursor: "pointer" }}
            />
            <span className="text-muted small font-monospace">{heroColor} · opacidad 70%</span>
          </div>

          <p className="text-muted small mb-2">Vista previa:</p>
          <div
            className="rounded mb-4 d-flex align-items-center justify-content-center text-white"
            style={{
              background: hexToRgba(heroColor, ALPHA),
              height: 120,
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            Eneas Menéndez Photography
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
