let numeros =[]
for (let i = 0; i <= 5; i++) {
    let numeroAleatorio = Math.floor(Math.random() * 11)
    numeros.push(numeroAleatorio)
}
    console.log(numeros)

let numerosDobles = numeros.map(x => x * 2)
console.log(numerosDobles)

let numerosPares = numerosDobles.filter(x => x % 2 === 0)
console.log(numerosPares)

for (let i = 0; i < numerosPares.length; i++) {
    console.log(numerosPares[i])
}