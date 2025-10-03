let empleados = [];

export function agregarEmpleado(empleado) {
  empleados.push(empleado);
}

export function eliminarEmpleado(id) {
  empleados = empleados.filter(e => e.id !== id);
}

export function buscarPorDepartamento(departamento) {
  return empleados.filter(e => e.departamento === departamento);
}

export function calcularSalarioPromedio() {
  if (empleados.length === 0) return 0;
  return empleados.reduce((acc, e) => acc + e.salario, 0) / empleados.length;
}

export function obtenerEmpleadosOrdenadosPorSalario() {
  return [...empleados].sort((a, b) => b.salario - a.salario);
}
