export function crearPerfil (nombre, email, edad) {
    return {nombre, email, edad}
}

function mostrarPerfil (usuario) {
    return `Nombre: ${usuario.nombre}, Email: ${nombre.email}, Edad: ${usuario.edad}`
}

function comprobarMayorEdad (usuario){
    return usuario.edad >= 18
}
export function mayoresDeEdad(usuarios){
    return usuarios.filter (comprobarMayorEdad)
}

export function calcularPromedioEdad (usuarios){
    //comprueba la longitud del array que le proporcinamos, ya que si es 0, el promedio es 0

    if (usuarios.length===0){
        return 0
    }
    else {
        const sumaEdades = usuario.reduce((acum,usuario)=>acum + usuario.edad,0)
        return sumaEdades/usuarios.length
    }
}

export default mostrarPerfil