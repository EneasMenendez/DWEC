/**
 * Ejercicio 16.1 - Dashboard de Seguridad y Consumo
 * Conceptos: fetch de texto plano, parseo manual de logs, manipulación de strings,
 *            generación dinámica de tablas HTML, conversión de unidades, notación científica
 *
 * fetch + .text()       → descarga el archivo logs.txt como cadena de texto plana
 * split(separador)      → divide una cadena en un array usando el carácter indicado como delimitador
 * trim()                → elimina espacios en blanco al inicio y al final de cada línea
 * notación científica   → representación numérica tipo "2.5e+6"; se detecta buscando la letra 'e'
 * Number()              → convierte una cadena numérica (incluyendo notación científica) a número
 * toFixed(n)            → redondea un número a n decimales y lo devuelve como string
 * createElement/append  → API del DOM para crear y añadir elementos HTML dinámicamente
 */

// const contenedorPadre = document.querySelector('#contenedor');
let todosDatos, arrayDatos = [];
//Función para cargar los logs
async function cargarLogs(ruta) {

    try {
        await fetch(ruta)
            .then((respuesta) => {
                return respuesta.text()
            }).then((datos) => {
                todosDatos = datos;
            })
    } catch (error) {

        console.log(error.message);
    }

}
await cargarLogs("./data/logs.txt");

//Variable que almacenara el consumo total
let totalConsumo = 0;

//Contenedor padre que almacenara el h1, el otro div y la tabla
const contenedorPadre = crearDiv("contenedorPadre", document.body);

//H1 del ejercicio
crearH1("Dashboard de Seguridad y Consumo", contenedorPadre);

//Contenedor hijo que almacenara el resumen Global
const contenedorHijo = crearDiv("contenedorHijo", contenedorPadre);
crearH2('resumen', "Resumen Global", contenedorHijo);


//Creo la tabla
const tabla = document.createElement('table');
contenedorPadre.appendChild(tabla);

//Creo las cabeceras de la tabla
crearTh(tabla, 'ID Sesión');
crearTh(tabla, 'Usuario');
crearTh(tabla, 'Consumo(MB)');
crearTh(tabla, 'Estado');


/*Creo un array con todos los datos del archivo logs.txt
que estan separados por un salto de línea*/
const datoSeparados = separarDatos(todosDatos, "\n");

//Normalización: Elimina espacios al principio y final de cada línea con .trim()
const datosNormalizados = datoSeparados.map((linea) => {
    return linea.trim();
});


//A los datos normalizados le quito la |
const lineaDatosSinBarra = datosNormalizados.map((linea) => {
    return separarDatos(linea, "|");
})

//Recorro los datos quedandome con la parte que me interesa en cada caso
lineaDatosSinBarra.map((linea) => {
    // Cada campo del log sigue el patrón "ETIQUETA-valor" o "ETIQUETA:valor"
    let id = separarDatos(linea[0], "-")[1];
    let nombre = separarDatos(linea[1], ":")[1].toLowerCase();
    let consumo = separarDatos(linea[2], ":")[1];
    // El consumo viene como "BYTES: 2500000", tomamos solo el número tras el espacio
    consumo = separarDatos(consumo, " ")[1];
    let estado = separarDatos(linea[3], ":")[1];

    //Compruebo si el numero tiene notacion cientifica
    if (tieneNotacionCientífica(consumo)) {
        // Number() interpreta "2.5e+6" correctamente; dividimos entre 1e6 para pasar a MB
        consumo = (Number(consumo) / 1000000);
    } else {
        consumo = (consumo / 1000000);
    }

    totalConsumo += Number(consumo);
    arrayDatos.push({
        id: "#" + id,
        nombre: nombre,
        consumo: consumo.toFixed(2) + " MB",
        estado: estado
    })
})

//H2 que contiene el contenedor hijo
crearH2('consumo', "Consumo Total detectado: " + totalConsumo.toFixed(2) + " MB", contenedorHijo);

//Agrego los datos a la tabla
arrayDatos.map((item) => {
    const tr = crearTr(tabla, item.estado);

    crearTd(item.id, tr)
    crearTd(item.nombre, tr)
    crearTd(item.consumo, tr)
    crearTd(item.estado, tr)

})


//Funcion para calcular el consumo total
function calcularConsumoTotal(consumo) {
    total += consumo;
    return total;
}

//Funcion para separar los datos
function separarDatos(datos, separador) {
    const datosSeparados = datos.split(separador);
    return datosSeparados;

}

//Fución para comprobar si el consumo esta en notacion científica
function tieneNotacionCientífica(numero) {

    if (numero.includes('e'))
        return true;
    else
        return false;
}

//Funcion para crear las cabeceras de la tabla
function crearTh(tabla, nombre) {
    const th = document.createElement('th');
    th.textContent = nombre;
    tabla.appendChild(th);

}

//Funcion para crear las filas de la tabla
function crearTr(tabla, estado) {
    const tr = document.createElement('tr');
    if (estado !== " SUCCESS")
        tr.id = "error";
    tabla.appendChild(tr);
    return tr;

}

//Funcion para crear las celdas de la tabla
function crearTd(texto, tr,) {
    const td = document.createElement('td');

    if (texto === " SUCCESS") {
        td.textContent = "OK";
        td.id = "bien";
    } else {
        if (texto === " ERROR")
            td.id = "mal";
        td.textContent = texto;
    }
    tr.appendChild(td);
}

//Funcion para crear los h1
function crearH1(texto, contenedor) {
    const h1 = document.createElement('h1');
    h1.textContent = texto;
    contenedor.appendChild(h1);
}

//Funcion para crear los h2
function crearH2(id, texto, contenedor) {
    const h2 = document.createElement('h2');
    h2.id = id;
    h2.textContent = texto;
    contenedor.appendChild(h2);
}
//Funcion para crear un div
function crearDiv(id, contenedorAppend) {
    const div = document.createElement('div');
    div.id = id;
    contenedorAppend.appendChild(div);
    return div;
}
