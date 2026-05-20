export default function Contenedor({ children, fluid = false }) {
  return (
    <div className={fluid ? "container-fluid px-4" : "container"}>
      {children}
    </div>
  );
}