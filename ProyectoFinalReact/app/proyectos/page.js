import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";
import { Proyecto, Categoria } from "@/lib/mysql";

export const metadata = { title: "Proyectos · Portfolio" };

async function getProyectos(categoriaSlug) {
  try {
    const where = { publicado: 1 };
    const include = [{ model: Categoria, as: "categoria", attributes: ["id", "nombre", "slug"] }];

    const proyectos = await Proyecto.findAll({ where, include, order: [["creado_en", "DESC"]] });

    if (categoriaSlug) {
      return proyectos.filter((p) => p.categoria?.slug === categoriaSlug);
    }
    return proyectos;
  } catch {
    return [];
  }
}

async function getCategorias() {
  try {
    return await Categoria.findAll({ order: [["nombre", "ASC"]] });
  } catch {
    return [];
  }
}

export default async function Proyectos({ searchParams }) {
  const { categoria: catSlug } = await searchParams;
  const [proyectos, categorias] = await Promise.all([
    getProyectos(catSlug),
    getCategorias(),
  ]);

  return (
    <>
      <NavBar />
      <Contenedor>
        <div className="d-flex justify-content-between align-items-center my-4">
          <h1>Proyectos</h1>
        </div>

        {/* Filtro por categoría */}
        <div className="card mb-4 p-3 bg-light">
          <div className="row g-2 align-items-center">
            <div className="col-auto">
              <Link
                href="/proyectos"
                className={`btn btn-sm ${!catSlug ? "btn-dark" : "btn-outline-dark"}`}
              >
                Todos
              </Link>
            </div>
            {categorias.map((cat) => (
              <div key={cat.id} className="col-auto">
                <Link
                  href={`/proyectos?categoria=${cat.slug}`}
                  className={`btn btn-sm ${catSlug === cat.slug ? "btn-dark" : "btn-outline-dark"}`}
                >
                  {cat.nombre}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {proyectos.length === 0 ? (
          <p className="text-center text-muted py-5">No hay proyectos en esta categoría.</p>
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
                    <Link href={`/proyectos/${p.id}`} className="btn btn-outline-dark btn-sm">
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Contenedor>
    </>
  );
}
