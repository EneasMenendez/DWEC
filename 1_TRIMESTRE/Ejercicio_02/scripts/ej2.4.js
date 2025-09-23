const usuario = {
     nombre : "Eneas",
     email : "eneasdmp36@educastur.es"
}
const perfil = {
    puesto : "Ingeniero IA",
    empresa : "Vectio Traffic"
}

//spread operator

const empleado ={
    ...usuario,
    perfil : {...perfil}
}

const ciudad = empleado.perfil?.direccion?.ciudad

// si la ciudad no tiene ningún dato, utilizaremos
//?? utilizado para dar un valor cuando esta variable está vacia o indefinida

const ciudadDato =ciudad ?? "Ciudad no especificada"

console.table (empleado)
console.log ("Ciudad: ", ciudadDato)