import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";
import ImagenPortada from "@/components/ImagenPortada";
import Link from "next/link";
import { Proyecto, Categoria, Foto } from "@/lib/mysql";
import { notFound } from "next/navigation";
import GaleriaLightbox from "@/app/proyectos/[id]/GaleriaLightbox";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const p = await Proyecto.findByPk(id, { attributes: ["titulo"] });
    return { title: p ? `[Vista previa] ${p.titulo} · Portfolio` : "Proyecto no encontrado" };
  } catch {
    return { title: "Vista previa" };
  }
}

export default async function PreviewProyecto({ params }) {
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

  if (!proyecto) notFound();

  return (
    <>
      <NavBar admin />
      <Contenedor>
        {!proyecto.publicado && (
          <div className="alert alert-warning d-flex align-items-center gap-2 mt-3">
            <i className="bi bi-eye-slash-fill" />
            <span>
              <strong>Vista previa:</strong> este proyecto está en borrador y no es visible para el público.
            </span>
          </div>
        )}

        <nav aria-label="breadcrumb" className="mt-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/admin/proyectos">Proyectos</Link></li>
            <li className="breadcrumb-item active">{proyecto.titulo}</li>
          </ol>
        </nav>

        <ImagenPortada src={proyecto.imagen_portada} alt={proyecto.titulo} />

        <div className="d-flex align-items-center gap-3 mb-2">
          <h1 className="mb-0">{proyecto.titulo}</h1>
          {proyecto.categoria && (
            <span className="badge bg-secondary fs-6">{proyecto.categoria.nombre}</span>
          )}
          <span className={`badge ${proyecto.publicado ? "bg-success" : "bg-secondary"}`}>
            {proyecto.publicado ? "Publicado" : "Borrador"}
          </span>
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
            <GaleriaLightbox fotos={proyecto.fotos} tituloProyecto={proyecto.titulo} />
          </>
        )}

        <div className="d-flex justify-content-between mt-5">
          <Link href="/admin/proyectos" className="btn btn-outline-secondary">
            ← Volver al admin
          </Link>
          <Link href={`/admin/proyectos/editar/${proyecto.id}`} className="btn btn-dark">
            <i className="bi bi-pencil me-1" />Editar proyecto
          </Link>
        </div>
      </Contenedor>
    </>
  );
}
