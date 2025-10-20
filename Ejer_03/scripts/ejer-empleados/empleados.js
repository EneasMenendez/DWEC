/**
 * Ejercicio 3.8 - Módulo empleados: gestión de una plantilla de personal
 * Conceptos: array de objetos, findIndex, splice, filter, reduce, sort, export nombrado
 *
 * findIndex + splice → patrón clásico para eliminar un elemento de un array por criterio (no por índice fijo)
 * reorganizarIDs     → tras cada eliminación se renumeran los IDs para que sean consecutivos y coherentes
 * reduce             → suma todos los salarios en una sola pasada; dividir por length da el promedio
 * sort descendente   → inversa del ascendente: se resta empleadoAnterior a empleadoPosterior (orden de mayor a menor salario)
 * export nombrado    → todas las funciones se exportan juntas al final para tener una vista clara de la API del módulo
 */

//En empleados.js, crea un módulo para gestionar una lista de empleados. El arreglo de objetos
// de empleados debe tener: id, nombre, departamento y salario.
let empleados = [
    {
        id: 1,
        nombre: "Alex",
        departamento: "Informatica",
        salario: 1200
    },
    {
        id: 2,
        nombre: "Antonio",
        departamento: "Direccion",
        salario: 1403.40
    },
    {
        id: 3,
        nombre: "Martin",
        departamento: "RRHH",
        salario: 1090
    },
    {
        id: 4,
        nombre: "Eneas",
        departamento: "Informatica",
        salario: 1258.78
    },
    {
        id: 5,
        nombre: "Laura",
        departamento: "Marketing",
        salario: 1320.50
    },
    {
        id: 6,
        nombre: "Sofía",
        departamento: "Contabilidad",
        salario: 1150
    },
    {
        id: 7,
        nombre: "Carlos",
        departamento: "Logistica",
        salario: 980.75
    },
    {
        id: 8,
        nombre: "Marta",
        departamento: "Ventas",
        salario: 1430
    },
    {
        id: 9,
        nombre: "Javier",
        departamento: "Marketing",
        salario: 1500
    },
    {
        id: 10,
        nombre: "Elena",
        departamento: "Contabilidad",
        salario: 1050.20
    }
];

//* agregarEmpleado(empleado)
function agregarEmpleado(empleado) {

    empleados.push(empleado)
}

//Creo una funcio para obtener los empleados para mostrarlos 
function obtenerEmpleados() {
    return empleados
}

//Creo una función que vuelve a asignar las ID a los empleados después de eliminar uno
// Necesario para mantener IDs consecutivos; los objetos se modifican directamente porque JS los pasa por referencia
function reorganizarIDsEmpleados(empleados) {
    let cont = 0
    empleados.forEach(function (empleado) {
        cont++
        empleado.id = cont
    })
}

//* eliminarEmpleado(id)

function eliminarEmpleado(id) {
    let indiceEmpleado = empleados.findIndex(empleado => empleado.id === id)
    empleados.splice(indiceEmpleado, 1)
    reorganizarIDsEmpleados(empleados)
}

//* buscarPorDepartamento(departamento): Debe devolver un arreglo con los empleados de ese departamento (.filter()).
function buscarPorDepartamento(departamento) {
    let empleadosDepartamento = empleados.filter((empleado) => {
        if (empleado.departamento === departamento)
            return empleado
    })
    return empleadosDepartamento
}

//* calcularSalarioPromedio(): Debe devolver el salario promedio de todos los empleados (.reduce()).

function calcularSalarioPromedio() {
    const suma = empleados.reduce((acum, empleado) => acum + empleado.salario, 0);
    return suma / empleados.length
}

//* obtenerEmpleadosOrdenadosPorSalario(): Debe devolver un nuevo arreglo con los empleados ordenados de mayor a menor salario (.sort()).
function obtenerEmpleadosOrdenadosPorSalario() {
    // Se invierte el orden de la resta respecto a ordenarPorPaginas: Posterior - Anterior → orden descendente (mayor salario primero)
    let empleadosOrdenados = empleados.sort((empleadoAnterior, empleadoPosterior) => empleadoPosterior.salario - empleadoAnterior.salario)
    return empleadosOrdenados
}

export { agregarEmpleado, eliminarEmpleado, buscarPorDepartamento, calcularSalarioPromedio, obtenerEmpleadosOrdenadosPorSalario, obtenerEmpleados }

