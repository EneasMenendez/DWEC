const ciudades = ["Madrid" , "Buenos Aires", "Tokio", "Nueva York","Paris" ]

ciudades.push ("Roma")

let ciudadesMayusculas = ciudades.map ( ciudad => ciudad.toUpperCase())

let ciudadesFiltradas = ciudades.filter (ciudad => ciudad.length>6)

console.log ("Ciudades",ciudades)
console.log ("Mayus", ciudadesMayusculas)
console.log (">6", ciudadesFiltradas)
