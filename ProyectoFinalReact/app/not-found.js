import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-1 fw-bold text-secondary">404</h1>
      <h2>Página no encontrada</h2>
      <p className="text-muted">La ruta que buscas no existe o ha sido eliminada.</p>
      <Link href="/" className="btn btn-dark mt-3">
        Volver al inicio
      </Link>
    </div>
  );
}