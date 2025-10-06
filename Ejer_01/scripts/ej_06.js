/**
 * Ejercicio 6 - Arrays anidados y reduce()
 * Conceptos: arrays de objetos con arrays dentro, reduce() para acumuladores
 *
 * reduce(callback(acumulador, elementoActual), valorInicial)
 *   → recorre el array y acumula un único valor resultado
 *   Ejemplo: [1,2,3].reduce((suma, n) => suma + n, 0) → 6
 */

/*1. Crea un array llamado `cursos`, donde cada elemento sea un objeto que represente un curso. Cada curso debe tener las siguientes propiedades:
- `nombre` (string)
- `profesor` (string)
- `estudiantes` (array de objetos), donde cada objeto represente a un estudiante con:
- nombre (string)
- `calificacion` (number)

Crea al menos 4 cursos, y cada uno con al menos 3 estudiantes.*/

let cursos = [
    {
        nombre: "Matematicas",
        profesor: "Barbara",
        estudiantes: [
            {
                nombre: "Angela",
                calificacion: 8
            },
            {
                nombre: "Manuel",
                calificacion: 6.5
            },
            {
                nombre: "Pepe",
                calificacion: 8.9
            }
        ]

    },

    {
        nombre: "Física",
        profesor: "Alberto",
        estudiantes: [
            {
                nombre: "Cova",
                calificacion: 5
            },
            {
                nombre: "María",
                calificacion: 5.5
            },
            {
                nombre: "Marcos",
                calificacion: 2.9
            }
        ]
    },

    {
        nombre: "Química",
        profesor: "María Eugénia",
        estudiantes: [
            {
                nombre: "Alex",
                calificacion: 7.4
            },
            {
                nombre: "Eneas",
                calificacion: 8
            },
            {
                nombre: "Mateo",
                calificacion: 9
            }
        ]
    },

    {
        nombre: "Lengua",
        profesor: "Amalia",
        estudiantes: [
            {
                nombre: "Ezequiel",
                calificacion: 1
            },
            {
                nombre: "Nerea",
                calificacion: 0.8
            },
            {
                nombre: "Laura",
                calificacion: 10
            }
        ]
    }
]
console.log("Array cursos:")
console.log(cursos)

/*2. Utiliza .map() para crear un nuevo array resumenCursos que contenga objetos con:
- nombreCurso
- promedioCalificaciones (promedio de las calificaciones de los estudiantes) */

let resumenCursos = cursos.map(function (curso) {

    let suma = curso.estudiantes.reduce((acum, estudiante) => acum + estudiante.calificacion, 0);
    let promedio = (suma / curso.estudiantes.length);

    return {
        nombreCurso: curso.nombre,
        promedioCalificaciones: parseFloat(promedio).toFixed(2)
    };
});

console.log("Resumen de cursos:");
console.log(resumenCursos);

//3. Utiliza .filter() para obtener un array cursosDestacados que contenga solo los cursos
//  cuyo promedio de calificaciones sea mayor o igual a 7.

let cursosDestacados = cursos.filter(function (curso) {
    let suma = curso.estudiantes.reduce((acum, estudiante) => acum + estudiante.calificacion, 0);
    let promedio = (suma / curso.estudiantes.length);

    if (promedio >= 7)
        return curso
})
console.log("Cursos Destacados")
console.log(cursosDestacados)

//4. Recorre los cursos destacados e imprime en consola un mensaje como:
//`"📘 El curso [nombreCurso] tiene un promedio de [promedio] y es considerado destacado."`

console.log("Cursos destacados usando for:")
for (let i = 0; i < cursosDestacados.length; i++) {

    let curso = cursosDestacados[i]
    let suma = 0
    for (let j = 0; j < curso.estudiantes.length; j++) {
        suma += curso.estudiantes[j].calificacion
    }
    let promedio = suma / curso.estudiantes.length

    console.info(`📘 El curso ${curso.nombre} tiene un promedio de ${promedio.toFixed(2)} y es considerado destacado`)

}

console.log("Cursos destacados usando Map:")

cursosDestacados.map(function (curso) {

    let suma2 = curso.estudiantes.reduce((suma, estudiante) => suma + estudiante.calificacion, 0);
    let promedio2 = (suma2 / curso.estudiantes.length);
    console.info(`📘 El curso ${curso.nombre} tiene un promedio de ${promedio2.toFixed(2)} y es considerado destacado`)

})


//5. Verifica si hay algún estudiante con calificación menor a 4 en cada curso. Si lo hay, imprime:
//`"⚠️ Atención: En el curso [nombreCurso] hay estudiantes con calificaciones muy bajas."`

console.log("Aviso calificaciones bajas en los cursos usando for:")
for (let i = 0; i < cursos.length; i++) {
    let curso = cursos[i]
    let puedeMensajeCurso = false
    for (let j = 0; j < curso.estudiantes.length; j++) {

        if (curso.estudiantes[j].calificacion < 4 && puedeMensajeCurso === false) {
            console.warn(`⚠️ Atención: En el curso ${curso.nombre} hay estudiantes con calificaciones muy bajas`)
            puedeMensajeCurso = true

        }


    }

}


console.log("Aviso calificaciones bajas en los cursos usando Map:")

cursos.map(function (curso) {

    let estudiantesCurso = curso.estudiantes
    let puedeMensajeCurso = false

    estudiantesCurso.map(function (estudiante) {
        if (estudiante.calificacion < 4 && puedeMensajeCurso === false) {
            console.warn(`⚠️ Atención: En el curso ${curso.nombre} hay estudiantes con calificaciones muy bajas`)
            puedeMensajeCurso = true
        }

    })

})