let base = Math.floor(Math.random() * 11)
console.log ("Base:",base)
let altura = Math.floor(Math.random() * 11)
console.log ("Altura:",altura)

function calcularAreaRectangulo(base, altura) {
    return base * altura
}

console.log("Cuadrado :" ,calcularAreaRectangulo(base, altura))

const calcularAreaTriangulo = function (base, altura){
    return (base * altura) / 2;
}

console.log("Triangulo :" ,calcularAreaTriangulo(base, altura))

const calcularAreaTriangulo2 = (base, altura) => (base*altura)/2

console.log ("Triangulo2: ",calcularAreaTriangulo2(base,altura))