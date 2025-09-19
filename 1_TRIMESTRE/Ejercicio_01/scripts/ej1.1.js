const nombre = "Pedro"
let edad = 23
let tieneMascota = true

edad = 25
tieneMascota = false

console.log (typeof nombre)
console.log (typeof edad)
console.log (typeof tieneMascota)

const frase = `${nombre} tiene ${edad} años y ${tieneMascota? "sí tiene mascota" : "no tiene mascota"}.`

console.log (frase)