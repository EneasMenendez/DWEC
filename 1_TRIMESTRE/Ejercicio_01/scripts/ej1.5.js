
let estudiantes = [
  { nombre: "Ana", apellidos: "García López", calificacion: 8, aprobado: true },
  { nombre: "Luis", apellidos: "Martínez Pérez", calificacion: 4, aprobado: false },
  { nombre: "María", apellidos: "Fernández Díaz", calificacion: 6, aprobado: false } 
];
 

let estudiantesConId = estudiantes.map((estudiante, index) => ({...estudiante,id: index + 1}));
 
console.log("Estudiantes con ID:", estudiantesConId);
 

let estudiantesAprobados = estudiantesConId.filter(estudiante => estudiante.calificacion >= 5);
 
console.log("Estudiantes aprobados:", estudiantesAprobados);
 

estudiantesAprobados.forEach(estudiante => {
  console.log(`¡Felicidades ${estudiante.nombre}, has aprobado con ${estudiante.calificacion}!`);
});
 

estudiantes.forEach(estudiante => {
  const aprobadoCorrecto = estudiante.calificacion >= 5;
  if (estudiante.aprobado !== aprobadoCorrecto) {
    console.log(
      `Incoherencia en el registro de ${estudiante.nombre}: calificación = ${estudiante.calificacion}, aprobado = ${estudiante.aprobado}`
    );
  }
});
