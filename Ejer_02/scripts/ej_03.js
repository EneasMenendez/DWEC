/**
 * Ejercicio 2.3 - Condicionales y operador ternario
 * Conceptos: if/else if/else, operador ternario, Math.random, lógica de negocio
 *
 * if/else if/else  → evalúa condiciones en orden; ejecuta el primer bloque cuya condición sea verdadera
 * Operador ternario → condición ? valorSiVerdadero : valorSiFalso (forma compacta de un if/else simple)
 * Math.round(Math.random()) → genera 0 o 1 aleatoriamente; se usa aquí para simular un booleano al azar
 */

//1. Crea una función que reciba un saldo y una cantidad a retirar.
//2. Dentro de la función, comprueba si el saldo es mayor o igual a la cantidad a retirar.
//3.Si se puede retirar, muestra “Retiro exitoso. Saldo restante: [nuevo saldo]”.
//4.Si no, muestra “Saldo insuficiente”.
/*5.Extra: Añade una variable booleana tieneTarjetaCredito. Modifica la lógica para que, 
si el saldo no es suficiente PERO tieneTarjetaCredito es true, muestre “Saldo insuficiente, 
pagando con tarjeta de crédito”.
*/

const cuenta = (saldo, cantidadretirar, tarjeta) => {
    console.log(`Saldo: ${saldo}`)
    console.log(`Cantidad a Retirar: ${cantidadretirar}`)
    console.log(`¿Con tarjeta?: ${tarjeta ? "Sí" : "No"} `)

    if (saldo >= cantidadretirar && tarjeta == true) {
        saldo = saldo - cantidadretirar
        console.info(`Retiro exitoso.Saldo restante en la tarjeta: ${saldo}`)

    } else if (saldo >= cantidadretirar && tarjeta == false) {
        saldo = saldo - cantidadretirar
        console.info(`Retiro exitoso.Saldo restante: ${saldo}`)

    } else if (saldo < cantidadretirar && tarjeta == true) {
        console.info("Saldo insuficiente, pagando con tarjeta de crédito")
    } else {
        console.info("Saldo insuficiente")
    }

}

cuenta(200, 100, false)
cuenta(7, 200, false)
cuenta(80, 500, true)
cuenta(120, 50, true)

let num = Math.round(Math.random())
let respuesta = num === 1 ? true : false;

cuenta(Math.floor(Math.random() * 8000), Math.floor(Math.random() * 8000), respuesta)

