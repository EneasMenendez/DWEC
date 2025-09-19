let saldo =Math.floor(Math.random() * 1001) 
console.log ("Saldo: ", saldo)
let retirar=Math.floor(Math.random() * 1001)
console.log("Dinero a retirar: ", retirar)

let numero0a1 = Math.floor(Math.random() * 3) 

let tieneTarjetaCredito = true

function ramdomTarjetaCredito (numero0a1){
    if (numero0a1==0){
        tieneTarjetaCredito = false
    }
    else  tieneTarjetaCredito
    
    return tieneTarjetaCredito
}

console.log ("Tarjeta credito: ",  ramdomTarjetaCredito(numero0a1))

function contabilizar (saldo, retirar,tieneTarjetaCredito) {
    if (saldo >= retirar){
        console.log ("El nuevo saldo es: ", (saldo-retirar))
    }
    else if ((retirar>saldo)&& tieneTarjetaCredito) console.log ("Saldo insuficiente, pagando con tarjeta de credito")
    else console.log ("Imposible realizar el pago")
}

console.log (contabilizar(saldo,retirar,tieneTarjetaCredito))