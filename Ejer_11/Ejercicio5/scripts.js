/**
 * Ejercicio 5 - Quiz interactivo con preguntas cargadas desde JSON
 * Conceptos: fetch API, async/await, JSON, manipulación dinámica del DOM,
 *            radio buttons dinámicos, acumulación de respuestas, resumen final con <details>
 *
 * fetch + async/await  → carga el archivo questions.json de forma asíncrona antes de empezar
 * response.json()      → parsea el cuerpo de la respuesta como array de objetos pregunta
 * radio buttons        → se crean dinámicamente con createElement; su evento change habilita el botón
 * dataset.choice       → guarda el id de la opción en el atributo data-choice del <input>
 * respuestasUsuario[]  → array paralelo al de preguntas que almacena true/false por cada respuesta
 * <details>/<summary>  → elementos HTML nativos que permiten mostrar/ocultar explicaciones al final
 */

let quizPreguntas = [];
let respuestasUsuario = [];
let indicePregunta = 0;

// Inicializa la app
async function iniciarQuizApp() {
    cambiarTextoBoton("Cargando preguntas...");

    try {
        const response = await fetch('./data/questions.json');
        if (!response.ok) throw new Error("No se pudieron cargar las preguntas.");
        quizPreguntas = await response.json();

        document.querySelector(".error-conexion").style.display = "none";
        cambiarTextoBoton("Comenzar Quiz");
        const boton = document.querySelector("button");
        boton.addEventListener('click', comenzarQuiz);
    } catch (error) {
        document.querySelector(".error-conexion").style.display = "block";
        cambiarTextoBoton("Error!");
        console.error(error.message);
    }
}

// Cambia el texto del botón principal
function cambiarTextoBoton(texto) {
    document.querySelector('button').textContent = texto;
}

// Inicia el quiz
function comenzarQuiz() {
    const boton = document.querySelector("button");
    boton.removeEventListener('click', comenzarQuiz);
    mostrarPregunta(indicePregunta);
}

// Muestra una pregunta y sus opciones
function mostrarPregunta(num) {
    const pregunta = quizPreguntas[num];
    const contenedorPregunta = document.querySelector('.pregunta');
    contenedorPregunta.style.display = "block";
    contenedorPregunta.dataset.id = pregunta.questionId;
    contenedorPregunta.textContent = `${pregunta.questionId}: ${pregunta.text}`;

    const contenedorRespuestas = document.querySelector('.respuestas');
    contenedorRespuestas.style.display = "block";
    contenedorRespuestas.innerHTML = "";

    pregunta.options.forEach(opcion => {
        const input = document.createElement('input');
        input.type = "radio";
        input.name = "respuesta";
        input.dataset.choice = opcion.id;
        input.id = `opcion-${opcion.id}`;

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = `${opcion.id}) ${opcion.text}`;

        contenedorRespuestas.appendChild(input);
        contenedorRespuestas.appendChild(label);
        contenedorRespuestas.appendChild(document.createElement('br'));

        input.addEventListener('change', () => {
            const boton = document.querySelector('button');
            boton.disabled = false;
            boton.onclick = () => {
                registrarRespuesta(input.dataset.choice);
            };
        });
    });

    const boton = document.querySelector('button');
    boton.disabled = true;
    boton.textContent = (indicePregunta === quizPreguntas.length - 1) ? "Finalizar" : "Siguiente";

    actualizarResumen();
}

// Registra la respuesta del usuario y avanza
function registrarRespuesta(eleccion) {
    // Compara la elección del usuario con la respuesta correcta del JSON; guarda true o false
    respuestasUsuario[indicePregunta] = eleccion === quizPreguntas[indicePregunta].correctAnswer;
    indicePregunta++;

    if (indicePregunta < quizPreguntas.length) {
        mostrarPregunta(indicePregunta);
    } else {
        finalizarQuiz();
    }
}

// Calcula aciertos
function calcularAciertos() {
    return respuestasUsuario.filter(r => r).length;
}

// Actualiza el resumen parcial
function actualizarResumen() {
    const resumen = document.querySelector("#results-summary");
    resumen.style.display = "block";
    resumen.textContent = `Aciertos: ${calcularAciertos()}/${quizPreguntas.length}`;
}

// Finaliza el quiz mostrando los resultados completos
function finalizarQuiz() {
    document.querySelector('.pregunta').style.display = "none";
    document.querySelector('.respuestas').style.display = "none";
    document.querySelector('button').style.display = "none";

    const resumen = document.querySelector("#results-summary");
    resumen.innerHTML = `<div>Aciertos: ${calcularAciertos()}/${quizPreguntas.length}</div><hr>`;

    quizPreguntas.forEach(preg => {
        resumen.innerHTML += `
            <details>
                <summary>${preg.questionId}: ${preg.text}</summary>
                <p>Respuesta correcta: ${preg.correctAnswer}</p>
                <p>Explicación: ${preg.explanation}</p>
            </details>
        `;
    });
}

document.addEventListener('DOMContentLoaded', iniciarQuizApp);
