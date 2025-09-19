const coche = {
    marca : "Audi",
    modelo : "A4",
    año : 2006,
    estaDisponible : true
}

console.table (coche)

const { marca, modelo} = coche

console.log (marca)
console.log (modelo)

estaDisponible = true

coche.color = "Rojo"

delete coche.año

console.table (coche)