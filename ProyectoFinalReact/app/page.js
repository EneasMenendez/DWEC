import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";
import { Proyecto, Categoria } from "@/lib/mysql";

export const metadata = { title: "Lens & Light · Portfolio de Fotografía" };

async function getProyectosDestacados() {
  try {
    return await Proyecto.findAll({
      where: { publicado: 1 },
      include: [{ model: Categoria, as: "categoria", attributes: ["nombre"] }],
      order: [["creado_en", "DESC"]],
      limit: 3,
    });
  } catch {
    return [];
  }
}

export default async function Inicio() {
  const proyectos = await getProyectosDestacados();

  return (
    <>
      <NavBar />

      <section className="hero-section text-white text-center py-5">
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-3">LENS &amp; LIGHT</h1>
          <p className="lead mb-4">
            Fotografía artística · Retrato · Naturaleza · Arquitectura
          </p>
          <Link href="/proyectos" className="btn btn-outline-light btn-lg me-3">
            Ver Proyectos
          </Link>
          <Link href="/contacto" className="btn btn-light btn-lg">
            Contactar
          </Link>
        </div>
      </section>

      <Contenedor>
        <h2 className="text-center my-5">Proyectos Destacados</h2>
        {proyectos.length === 0 ? (
          <p className="text-center text-muted">No hay proyectos publicados aún.</p>
        ) : (
          <div className="row g-4">
            {proyectos.map((p) => (
              <div key={p.id} className="col-md-4">
                <div className="card h-100 shadow-sm foto-card">
                  <img
                    src={p.imagen_portada || `https://picsum.photos/seed/${p.id}/600/400`}
                    className="card-img-top"
                    alt={p.titulo}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    {p.categoria && (
                      <span className="badge bg-secondary mb-2">{p.categoria.nombre}</span>
                    )}
                    <h5 className="card-title">{p.titulo}</h5>
                    {p.descripcion && (
                      <p className="card-text text-muted small">
                        {p.descripcion.length > 100
                          ? p.descripcion.slice(0, 100) + "…"
                          : p.descripcion}
                      </p>
                    )}
                    <Link href={`/proyectos/${p.id}`} className="btn btn-dark btn-sm">
                      Ver proyecto
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Contenedor>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="mb-0">© 2024 Lens &amp; Light · Todos los derechos reservados</p>
      </footer>
    </>
  );
}
