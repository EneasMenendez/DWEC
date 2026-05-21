import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";
import { Proyecto, Categoria, Configuracion } from "@/lib/mysql";
import { unstable_cache } from "next/cache";

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

async function getHeroConfig() {
  try {
    const [colorRow, imagenRow] = await Promise.all([
      Configuracion.findByPk('hero_color'),
      Configuracion.findByPk('hero_imagen'),
    ]);
    return {
      color: colorRow?.valor ?? '#16213e',
      imagen: imagenRow?.valor ?? '',
    };
  } catch {
    return { color: '#16213e', imagen: '' };
  }
}

export const metadata = { title: "Portfolio Eneas Menéndez" };

const getProyectosDestacados = unstable_cache(
  async () => {
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
  },
  ["proyectos-destacados"],
  { revalidate: 3600, tags: ["proyectos"] }
);

export default async function Inicio() {
  const [proyectos, { color: heroColor, imagen: heroImagen }] = await Promise.all([
    getProyectosDestacados(),
    getHeroConfig(),
  ]);

  return (
    <>
      <NavBar />

      <section
        className="hero-section text-white text-center py-5"
        style={heroImagen ? { backgroundImage: `url(${heroImagen})` } : {}}
      >
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, background: hexToRgba(heroColor, 0.7) }}
        />
        <div className="container py-5" style={{ position: "relative", zIndex: 1 }}>
          <h1 className="display-3 fw-bold mb-3">Eneas Menéndez Photography</h1>
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
                    style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover" }}
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

      <footer className="bg-dark text-white py-5 mt-5">
        <div className="container text-center">
          <p className="fs-5 fw-semibold mb-1 tracking-wide">Eneas Menéndez Photography</p>
          <p className="text-secondary small mb-0">© {new Date().getFullYear()} · Todos los derechos reservados</p>
        </div>
      </footer>
    </>
  );
}
