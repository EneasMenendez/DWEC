const producto = {
    nombre : "Manzana",
    precio : 2
}

const cliente = {
    nombreCliente: "Pablo",
    esPremium : false
}

const pedido = {...producto,...cliente}

console.table(pedido)

const producto2 = {
    nombreCliente : "Pera",
    precio : 2
}

const pedido2 = {...producto2,...pedido}

// ¿Que sucede?
// Nos dará un error debido a que una variable se duplica dentro de varios objetos
// (tienen el mismo nombre) y por eso nos salta la excepcion