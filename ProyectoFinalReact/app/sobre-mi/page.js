import NavBar from "@/components/NavBar";
import Contenedor from "@/components/Contenedor";

export const metadata = { title: "Sobre mí · Portfolio Eneas Menéndez" };

export default function SobreMi() {
  return (
    <>
      <NavBar />

      <Contenedor>
        <div className="row justify-content-center py-5">
          <div className="col-lg-8">
            <h1 className="mb-4">Sobre mí</h1>

            <div className="d-flex align-items-center gap-4 mb-4">
              {/* Sustituye el src por tu foto de perfil */}
              <img
                src="/foto-perfil.jpg"
                alt="Eneas Menéndez"
                className="rounded-circle shadow"
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
              />
              <div>
                <h2 className="h4 mb-1">Eneas Menéndez</h2>
                <p className="text-muted mb-0">Desarrollador web · Asturias, España</p>
              </div>
            </div>

            <p className="lead">
              {/* Escribe aquí tu presentación personal */}
              Hola, soy Eneas. Añade aquí tu descripción personal.
            </p>

            <hr className="my-4" />

            <h3 className="h5 mb-3">Habilidades</h3>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {/* Añade o elimina etiquetas según tus tecnologías */}
              {["Retrato", "Paisaje", "Arquitectura", "Naturaleza", "Street", "Larga exposición"].map((skill) => (
                <span key={skill} className="badge bg-dark fs-6">{skill}</span>
              ))}
            </div>

            <h3 className="h5 mb-3">Contacto</h3>
            <ul className="list-unstyled">
              {/* Actualiza con tus datos reales */}
              <li><i className="bi bi-envelope me-2" />admin@portfolio.com</li>
              <li><i className="bi bi-github me-2" />github.com/EneasMenendez</li>
            </ul>
          </div>
        </div>
      </Contenedor>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="mb-0">Eneas Menendez</p>
      </footer>
    </>
  );
}
