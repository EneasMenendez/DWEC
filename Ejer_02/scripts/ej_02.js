/**
 * Ejercicio 2.2 - Tipos de funciones en JavaScript
 * Conceptos: Function Declaration, Function Expression, Arrow Function, parámetros por defecto
 *
 * Function Declaration  → se declara con la palabra clave `function` y tiene hoisting (se puede llamar antes de definirla)
 * Function Expression   → se asigna a una variable; NO tiene hoisting, debe definirse antes de usarse
 * Arrow Function        → versión compacta de Function Expression; no tiene su propio `this`
 * Parámetros por defecto → valor que toma el parámetro si no se pasa argumento al llamar la función
 * Math.random / Math.floor → generan números aleatorios enteros para las llamadas de prueba
 */

//1.Escribe una Function Declaration llamada calcularAreaRectangulo
// que acepte base y altura y devuelva el área.


function calcularAreaRectangulo(base, altura) {
    console.log("Área del Rectangulo:")
    console.log(`La base es ${base} y la altura es ${altura}:`)
    console.log(base * altura)
}

//2. Escribe la misma lógica usando una Function Expression y 
// guárdala en una constante calcularAreaTriangulo.

const calcularAreaTriangulo = function (base, altura) {
    console.log("Área del Triangulo usando Function Expression:")
    console.log(`La base es ${base} y la altura es ${altura}:`)
    console.log((base * altura) / 2)
}

//3.Convierte la función anterior en una Arrow Function.

const calcularAreaTrianguloArrow = (base, altura) => {
    console.log("Área Triángulo usando Arrow Function:")
    console.log(`La base es ${base} y la altura es ${altura}:`)
    console.log((base * altura) / 2)
}


//4.Añade valores por defecto a los parámetros de cualquiera de las funciones anteriores.
const calcularAreaTrianguloValoresPorDefecto = (base = 8, altura = 4) => {
    console.log("Área Triángulo usando Parametros con valores por defecto:")
    console.log(`La base es ${base} y la altura es ${altura}:`)
    console.log((base * altura) / 2)
}


//5.Llama a cada función con valores de prueba y muestra el resultado en la consola.

calcularAreaRectangulo(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100))
calcularAreaTriangulo(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100))
calcularAreaTrianguloArrow(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100))
calcularAreaTrianguloValoresPorDefecto()


