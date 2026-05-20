"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router  = useRouter();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setCargando(true);
    setError("");
    const datos = Object.fromEntries(new FormData(e.target));
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Credenciales incorrectas");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4">
                <h2 className="text-center mb-4 fw-bold">
                  <i className="bi bi-camera me-2"></i>Admin
                </h2>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ContraseÃ±a</label>
                    <input
                      name="contrasena"
                      type="password"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      name="recordarme"
                      type="checkbox"
                      className="form-check-input"
                      id="recordarme"
                      value="1"
                    />
                    <label className="form-check-label" htmlFor="recordarme">
                      Recordarme (24 h)
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                    disabled={cargando}
                  >
                    {cargando ? "Entrando..." : "Entrar"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}