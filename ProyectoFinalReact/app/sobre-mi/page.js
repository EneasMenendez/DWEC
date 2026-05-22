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

            <div className="mb-4">
              <h2 className="h4 mb-1">Eneas Menéndez</h2>
              <p className="text-muted mb-0">Fotografía · Asturias, España</p>
            </div>

            <p className="lead">
              {/* Escribe aquí tu presentación personal */}
              Hola, soy Eneas.
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
              <li><i className="bi bi-envelope me-2" />eneasdmp36@educastur.com</li>
              <li><i className="bi bi-instagram me-2" />@eneas_menendez_photography</li>
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
