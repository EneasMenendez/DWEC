"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [error, setError]   = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target));
    try {
      const res = await fetch("/api/mensajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!res.ok) throw new Error("Error al enviar el mensaje");
      setEnviado(true);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <NavBar />
      <Contenedor>
        <div className="row justify-content-center my-5">
          <div className="col-md-7">
            <h1 className="mb-4">Contacto</h1>

            {enviado && (
              <div className="alert alert-success">
                ¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.
              </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}

            {!enviado && (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Nombre *</label>
                  <input
                    name="nombre"
                    type="text"
                    className="form-control"
                    required
                    minLength={2}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email *</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    required
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Asunto</label>
                  <input
                    name="asunto"
                    type="text"
                    className="form-control"
                    placeholder="¿En qué puedo ayudarte?"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Mensaje *</label>
                  <textarea
                    name="mensaje"
                    className="form-control"
                    rows={5}
                    required
                    minLength={10}
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100">
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </Contenedor>
    </>
  );
}