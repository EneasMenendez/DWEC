/**
 * Ejercicio 16.2 - Próximos Eventos con Cuenta Atrás
 * Conceptos: fetch de JSON, formateo de fechas, setInterval, cuenta atrás en tiempo real,
 *            generación dinámica de tarjetas HTML, posposición de eventos
 *
 * fetch + .json()      → descarga y parsea automáticamente un archivo JSON a objeto JS
 * new Date(fecha)      → crea un objeto Date a partir de una cadena de texto o timestamp
 * Date.now()           → devuelve el instante actual en milisegundos (timestamp Unix)
 * getTime()            → devuelve el timestamp en ms de un objeto Date para operar con él
 * setInterval(fn, ms)  → ejecuta una función repetidamente cada N milisegundos (aquí 1000 = 1 segundo)
 * clearInterval(id)    → detiene un intervalo activo usando el id que devolvió setInterval
 * toLocaleDateString() → formatea una fecha al idioma/región del navegador del usuario
 */

let eventos;
//Función para cargar los eventos
async function cargarLogs(ruta) {

    try {
        await fetch(ruta)
            .then((respuesta) => {
                return respuesta.json()
            }).then((datos) => {

                eventos = datos.map((dato) => {
                    return {
                        nombre: dato.nombre,
                        fecha: formatearFecha(dato.fecha),
                        descripcion: dato.descripcion
                    }
                })
            })

    } catch (error) {

        console.log(error.message);
    }

}
await cargarLogs("./data/eventos.json");

crearH1("Próximos Eventos", document.body);
const divPadre = crearDiv("contenedorPadre", document.body);


//Muestro todos los eventos
eventos.map((evento) => {
    console.log(evento.fecha);
    // Ordena los eventos por fecha de más próximo a más lejano en cada iteración
    eventos.sort((a, b) => a.fecha - b.fecha);
    const div = crearDiv("tarjeta", divPadre);


    div.innerHTML += `
        <h2>${evento.nombre}</h2>
        <p>${evento.descripcion}</p>
        <p><strong>Fecha:</strong> ${evento.fecha.toLocaleDateString()}</p>
    `;

    const divDiasRestantes = crearDiv("diasRestantes", div);

    let idIntervalo = calcularDiasRestantes(evento.fecha, 0, divDiasRestantes);

    const divPosponer = crearDiv("divPosponer", div);
    divPosponer.innerHTML = `
    <div class="divPosponer">
        <input type="number" min="0" placeholder="Días a sumar" class="inputDias">
        <button class="botonPosponer">Posponer</button>
    </div>
`;

    const botonPosponer = divPosponer.querySelector(".botonPosponer");
    const inputDias = divPosponer.querySelector(".inputDias");

    botonPosponer.addEventListener("click", () => {
        // Cancela el intervalo anterior antes de crear uno nuevo con los días ampliados
        clearInterval(idIntervalo);
        const diasASumar = Number(inputDias.value);
        idIntervalo=calcularDiasRestantes(evento.fecha, diasASumar, divDiasRestantes);
        inputDias.value = "";
    });
});



//Funcion para calcular los días restantes
function calcularDiasRestantes(fechaEvento, diasSumar, divDiasRestantes) {
    let idIntervalo = setInterval(() => {

        const ahora = Date.now();
        const fechaFin = fechaEvento.getTime();
        // Diferencia en milisegundos entre la fecha del evento y el instante actual
        const diferenciaFechas = fechaFin - ahora;

        if (diferenciaFechas <= 0) {
            divDiasRestantes.innerHTML = `<h2 id="inactivo">FINALIZADO</h2>`;
        } else {
            // Se crea un Date con la diferencia para extraer horas, minutos y segundos de forma sencilla
            const tiempo = new Date(diferenciaFechas);

            // Los días se calculan manualmente (no con getUTCDate) para evitar desbordamientos de mes
            const dias = Math.floor(diferenciaFechas / (1000 * 60 * 60 * 24)) + diasSumar;
            const horas = tiempo.getUTCHours();
            const minutos = tiempo.getUTCMinutes();
            const segundos = tiempo.getUTCSeconds();

            divDiasRestantes.innerHTML = `
                <h2 id="activo">
                    ${dias}d ${horas}h ${minutos}m ${segundos}s
                </h2>`;
        }

    }, 1000);
    return idIntervalo;
}


//Funcion para formatear las fechas
function formatearFecha(fecha) {

    let fechaF;
    if (typeof (fecha) === "object") {
        // Si la fecha llega como objeto con propiedades {año, mes, dia}, se concatenan en una cadena ISO
        fechaF = new Date(fecha.año + fecha.mes + fecha.dia);

    }
    else
        // Si la fecha ya es una cadena (p.ej. "2026-07-15"), new Date() la parsea directamente
        fechaF = new Date(fecha);
    return fechaF;
}

//Funcion para crear los div
function crearDiv(id, contenedor) {
    const div = document.createElement('div');
    div.id = id;
    contenedor.appendChild(div);
    return div;
}

//Función para crear los h1
function crearH1(texto, contenedor) {
    const h1 = document.createElement('h1');
    h1.textContent = texto;
    contenedor.appendChild(h1);

}


