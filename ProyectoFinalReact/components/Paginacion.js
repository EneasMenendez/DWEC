export default function Paginacion({ pagina, total, porPagina, onChange }) {
  const totalPaginas = Math.ceil(total / porPagina);
  if (totalPaginas <= 1) return null;

  return (
    <nav className="mt-3">
      <ul className="pagination justify-content-center mb-0">
        <li className={`page-item ${pagina === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(pagina - 1)}>«</button>
        </li>
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
          <li key={n} className={`page-item ${n === pagina ? "active" : ""}`}>
            <button className="page-link" onClick={() => onChange(n)}>{n}</button>
          </li>
        ))}
        <li className={`page-item ${pagina === totalPaginas ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChange(pagina + 1)}>»</button>
        </li>
      </ul>
    </nav>
  );
}
