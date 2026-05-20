import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import ImagenPortada from "@/components/ImagenPortada";
import Link from "next/link";
import { Proyecto, Categoria, Foto } from "@/lib/mysql";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const p = await Proyecto.findByPk(id, { attributes: ["titulo"] });
    return { title: p ? `${p.titulo} · Portfolio` : "Proyecto no encontrado" };
  } catch {
    return { title: "Proyecto" };
  }
}

export default async function DetalleProyecto({ params }) {
  const { id } = await params;

  let proyecto;
  try {
    proyecto = await Proyecto.findByPk(id, {
      include: [
        { model: Categoria, as: "categoria", attributes: ["nombre", "slug"] },
        { model: Foto, as: "fotos", required: false, order: [["orden", "ASC"]] },
      ],
    });
  } catch {
    proyecto = null;
  }

  if (!proyecto || !proyecto.publicado) notFound();

  return (
    <>
      <NavBar />
      <Contenedor>
        <nav aria-label="breadcrumb" className="mt-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/">Inicio</Link></li>
            <li className="breadcrumb-item"><Link href="/proyectos">Proyectos</Link></li>
            <li className="breadcrumb-item active">{proyecto.titulo}</li>
          </ol>
        </nav>

        <ImagenPortada src={proyecto.imagen_portada} alt={proyecto.titulo} />

        <div className="d-flex align-items-center gap-3 mb-2">
          <h1 className="mb-0">{proyecto.titulo}</h1>
          {proyecto.categoria && (
            <Link
              href={`/proyectos?categoria=${proyecto.categoria.slug}`}
              className="badge bg-secondary fs-6 text-decoration-none"
            >
              {proyecto.categoria.nombre}
            </Link>
          )}
        </div>

        {proyecto.fecha && (
          <p className="text-muted small mb-3">
            {new Date(proyecto.fecha).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
            })}
          </p>
        )}

        {proyecto.descripcion && (
          <p className="lead">{proyecto.descripcion}</p>
        )}

        {proyecto.fotos && proyecto.fotos.length > 0 && (
          <>
            <h4 className="mt-5 mb-3">Galería de fotos</h4>
            <div className="row g-3">
              {proyecto.fotos.map((f) => (
                <div key={f.id} className="col-md-3 col-sm-6">
                  <img
                    src={f.url}
                    className="img-fluid rounded shadow-sm"
                    alt={f.titulo || proyecto.titulo}
                    style={{ height: "200px", objectFit: "cover", width: "100%" }}
                  />
                  {f.titulo && (
                    <p className="small text-muted mt-1 mb-0">{f.titulo}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="d-flex justify-content-between mt-5">
          <Link href="/proyectos" className="btn btn-outline-secondary">
            ← Todos los proyectos
          </Link>
          <Link href="/contacto" className="btn btn-dark">
            Solicitar presupuesto
          </Link>
        </div>
      </Contenedor>
    </>
  );
}
