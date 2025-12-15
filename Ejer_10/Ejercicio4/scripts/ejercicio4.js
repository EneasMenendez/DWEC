/**
 * Ejercicio 4 - Juego de descifrado: selecciona letra y elemento del DOM desde fragmentos XML
 * Conceptos: XMLHttpRequest, responseType 'document', querySelector en XML,
 *            selectores CSS como dato en XML, carga encadenada de fragmentos, validación de intentos
 *
 * XMLHttpRequest          → carga cada fragmento XML bajo demanda al avanzar en el juego
 * responseType document   → el XML se parsea como DOM para poder usar querySelector sobre él
 * selector_solucion (XML) → string CSS guardado en el XML que se usa con element.matches()
 * element.matches()       → comprueba si un elemento del DOM satisface un selector CSS
 * carga encadenada        → el propio XML indica el nombre del siguiente fragmento a cargar
 * dataset                 → se podría usar; aquí se aprovecha el atributo del evento click
 */

const btnEmpezar = document.querySelector('#btnEmpezar');
const textoFragmento = document.querySelector('#textoFragmento');
const pistaFragmento = document.querySelector('#pistaFragmento');
const alfabetoDiv = document.querySelector('#alfabeto');
const contadorIntentosSpan = document.querySelector('#contadorIntentos');

let fragmentoActual = "";
let selectorSolucion = "";
let letraClave = "";
let letraSeleccionada = "";
let intentos = 0;

document.addEventListener('DOMContentLoaded', function () {
    crearAlfabeto();
});

btnEmpezar.addEventListener('click', function () {
    cargarFragmento("fragmento1.xml");
});

//Creo el alfabeto
function crearAlfabeto() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    letras.forEach(l => {
        const div = document.createElement('div');

        div.className = "border p-2 m-1 text-center"; 
        div.style.width = "40px";
        div.textContent = l;

        alfabetoDiv.appendChild(div);
    });
}

document.addEventListener('click', function (event) {

    if (event.target.parentElement === alfabetoDiv) {
        seleccionarLetra(event.target);
        return;
    }

    if (selectorSolucion !== "") {
        validarIntento(event.target);
    }
});

//Seleccionar letra
function seleccionarLetra(divLetra) {
    letraSeleccionada = divLetra.textContent;

    document.querySelectorAll('#alfabeto div').forEach(l => {
        l.classList.remove('bg-primary', 'text-white');
    });

    divLetra.classList.add('bg-primary', 'text-white');
}

//Comprobar los intentos
function validarIntento(elemento) {

    intentos++;
    contadorIntentosSpan.textContent = intentos;

    // matches() comprueba si el elemento clicado satisface el selector CSS leído del XML
    const coincideCSS = elemento.matches(selectorSolucion);
    // El intento es correcto solo si la letra Y el elemento del DOM son los esperados
    const coincideLetra = letraSeleccionada === letraClave;

    if (coincideCSS && coincideLetra) {
        cargarFragmento(fragmentoActual); // Avanza al siguiente fragmento XML
    } else {
        marcarError(elemento);
    }
}

//Marcar los errores
function marcarError(el) {
    const originalBg = el.className;

    el.classList.add("bg-danger", "text-white");

    setTimeout(() => {
        el.className = originalBg;
    }, 300);
}

//Cargar fragmento
function cargarFragmento(nombreArchivo) {

    const request = new XMLHttpRequest();
    request.open('GET', "./datos/" + nombreArchivo);
    request.responseType = 'document';
    request.send();

    request.onload = () => {
        if (request.status === 200) {

            const xml = request.response;

            textoFragmento.textContent = xml.querySelector('texto').textContent;
            pistaFragmento.textContent = xml.querySelector('pista').textContent;

            selectorSolucion = xml.querySelector('selector_solucion').textContent;
            letraClave = xml.querySelector('letra_clave').textContent;
            fragmentoActual = xml.querySelector('siguiente_fragmento').textContent;

            letraSeleccionada = "";
            document.querySelectorAll('#alfabeto div')
                .forEach(l => l.classList.remove('bg-primary', 'text-white'));

        } else {
            textoFragmento.textContent = "Error cargando fragmento...";
        }
    }
}
