"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GaleriaLightbox({ fotos, tituloProyecto }) {
  const [indice, setIndice] = useState(-1);

  const slides = fotos.map((f) => ({
    src: f.url,
    alt: f.titulo || tituloProyecto,
  }));

  return (
    <>
      <div className="row g-3">
        {fotos.map((f, i) => (
          <div key={f.id} className="col-md-3 col-sm-6">
            <img
              src={f.url}
              className="img-fluid rounded shadow-sm"
              alt={f.titulo || tituloProyecto}
              style={{ height: "200px", objectFit: "cover", width: "100%", cursor: "pointer" }}
              onClick={() => setIndice(i)}
            />
            {f.titulo && (
              <p className="small text-muted mt-1 mb-0">{f.titulo}</p>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        open={indice >= 0}
        index={indice}
        close={() => setIndice(-1)}
        slides={slides}
      />
    </>
  );
}
