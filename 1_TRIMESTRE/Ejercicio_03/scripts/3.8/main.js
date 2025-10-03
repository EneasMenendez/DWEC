import {
  agregarEmpleado,
  eliminarEmpleado,
  buscarPorDepartamento,
  calcularSalarioPromedio,
  obtenerEmpleadosOrdenadosPorSalario
} from './empleados.js';

agregarEmpleado({ id: 1, nombre: 'Ana', departamento: 'IT', salario: 2500 });
agregarEmpleado({ id: 2, nombre: 'Luis', departamento: 'HR', salario: 2000 });
agregarEmpleado({ id: 3, nombre: 'María', departamento: 'IT', salario: 3000 });
agregarEmpleado({ id: 4, nombre: 'Carlos', departamento: 'Ventas', salario: 1800 });

console.log('Empleados en IT:', buscarPorDepartamento('IT'));
console.log('Salario promedio:', calcularSalarioPromedio());
console.log('Empleados ordenados por salario:', obtenerEmpleadosOrdenadosPorSalario());

eliminarEmpleado(2);
console.log('Empleados después de eliminar:', obtenerEmpleadosOrdenadosPorSalario());
