const cursos = [
  {
    nombre: "Matemáticas Avanzadas",
    profesor: "Dr. Sánchez",
    estudiantes: [
      { nombre: "Ana García", calificacion: 8.5 },
      { nombre: "Luis Pérez", calificacion: 6.0 },
      { nombre: "María López", calificacion: 9.2 },
      { nombre: "Carlos Ruiz", calificacion: 7.8 }
    ]
  },
  {
    nombre: "Programación Web",
    profesor: "Ing. Gómez",
    estudiantes: [
      { nombre: "Sofía Martínez", calificacion: 9.5 },
      { nombre: "Jorge Ramírez", calificacion: 8.0 },
      { nombre: "Elena Fernández", calificacion: 7.3 },
      { nombre: "Pedro Castro", calificacion: 3.5 }
    ]
  },
  {
    nombre: "Historia del Arte",
    profesor: "Lic. Torres",
    estudiantes: [
      { nombre: "Diego Soto", calificacion: 7.0 },
      { nombre: "Laura Morales", calificacion: 6.5 },
      { nombre: "Javier Vargas", calificacion: 5.8 },
      { nombre: "Isabel Herrera", calificacion: 8.9 }
    ]
  },
  {
    nombre: "Física Cuántica",
    profesor: "Dra. Ramos",
    estudiantes: [
      { nombre: "Andrea Castro", calificacion: 9.8 },
      { nombre: "Pablo Giménez", calificacion: 9.1 },
      { nombre: "Gabriela Ortiz", calificacion: 8.7 },
      { nombre: "Fernando Díaz", calificacion: 9.3 }
    ]
  }
];
 
const resumenCursos = cursos.map(curso => {
  const calificaciones = curso.estudiantes.map(estudiante => estudiante.calificacion);
  const promedio = calificaciones.reduce((total, cal) => total + cal, 0) / calificaciones.length;
  return {
    nombreCurso: curso.nombre,
    promedioCalificaciones: parseFloat(promedio.toFixed(2))
  };
});
 
const cursosDestacados = resumenCursos.filter(curso => curso.promedioCalificaciones >= 7);
 
cursosDestacados.forEach(curso => {
  console.log(`📘 El curso ${curso.nombreCurso} tiene un promedio de ${curso.promedioCalificaciones} y es considerado destacado.`);
});
 
cursos.forEach(curso => {
  const hayBajas = curso.estudiantes.some(estudiante => estudiante.calificacion < 4);
  if (hayBajas) {
    console.log(`⚠️ Atención: En el curso ${curso.nombre} hay estudiantes con calificaciones muy bajas.`);
  }
});