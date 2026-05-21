import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import Link from "next/link";
import { Proyecto, Categoria } from "@/lib/mysql";
import { Op } from "sequelize";
import FiltrosProyectos from "./FiltrosProyectos";
import { unstable_cache } from "next/cache";

export const metadata = { title: "Proyectos · Portfolio" };

const getAnios = unstable_cache(
  async () => {
    try {
      const rows = await Proyecto.findAll({
        attributes: ["fecha"],
        where: { publicado: 1, fecha: { [Op.not]: null } },
        raw: true,
      });
      return [...new Set(rows.map((r) => new Date(r.fecha).getFullYear()))].sort((a, b) => b - a);
    } catch {
      return [];
    }
  },
  ["proyectos-anios"],
  { revalidate: 3600, tags: ["proyectos"] }
);

const getProyectos = unstable_cache(
  async (categoriaSlug, buscar, anio) => {
    try {
      const where = { publicado: 1 };

      if (categoriaSlug) {
        const cat = await Categoria.findOne({ where: { slug: categoriaSlug } });
        if (!cat) return [];
        where.categoria_id = cat.id;
      }

      if (buscar) {
        where.titulo = { [Op.like]: `%${buscar}%` };
      }

      let proyectos = await Proyecto.findAll({
        where,
        include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre", "slug"] }],
        order: [["creado_en", "DESC"]],
      });

      if (anio) {
        proyectos = proyectos.filter(
          (p) => p.fecha && new Date(p.fecha).getFullYear() === parseInt(anio)
        );
      }

      return proyectos;
    } catch {
      return [];
    }
  },
  ["proyectos-lista"],
  { revalidate: 60, tags: ["proyectos"] }
);

const getCategorias = unstable_cache(
  async () => {
    try {
      const rows = await Categoria.findAll({ order: [["nombre", "ASC"]], raw: true });
      return rows.map(({ id, nombre, slug }) => ({ id, nombre, slug }));
    } catch {
      return [];
    }
  },
  ["categorias"],
  { revalidate: 3600, tags: ["categorias"] }
);

export default async function Proyectos({ searchParams }) {
  const { categoria: catSlug = "", buscar = "", anio = "" } = await searchParams;

  const [proyectos, categorias, anios] = await Promise.all([
    getProyectos(catSlug, buscar, anio),
    getCategorias(),
    getAnios(),
  ]);

  return (
    <>
      <NavBar />
      <Contenedor>
        <div className="d-flex justify-content-between align-items-center my-4">
          <h1>Proyectos</h1>
          <span className="text-muted small">{proyectos.length} resultado{proyectos.length !== 1 ? "s" : ""}</span>
        </div>

        <FiltrosProyectos
          categorias={categorias}
          anios={anios}
          buscarInicial={buscar}
          categoriaInicial={catSlug}
          anioInicial={anio}
        />

        {proyectos.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-search text-muted" style={{ fontSize: "3rem" }} />
            <p className="text-muted mt-3">No hay proyectos con esos filtros.</p>
            <Link href="/proyectos" className="btn btn-outline-dark btn-sm">Ver todos</Link>
          </div>
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
                      <Link
                        href={`/proyectos?categoria=${p.categoria.slug}`}
                        className="badge bg-secondary mb-2 text-decoration-none"
                      >
                        {p.categoria.nombre}
                      </Link>
                    )}
                    {p.fecha && (
                      <span className="badge bg-light text-muted ms-1 mb-2">
                        {new Date(p.fecha).getFullYear()}
                      </span>
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
