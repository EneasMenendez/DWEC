/**
 * Ejercicio 3 - Sistema de acceso de agentes con validación desde XML
 * Conceptos: XMLHttpRequest, responseType 'document', querySelector en XML,
 *            validación en dos pasos (código + clave), evento blur, estado de formulario
 *
 * XMLHttpRequest   → se lanza una petición al perder el foco del campo (evento blur)
 * querySelector    → busca nodos dentro del XML de respuesta igual que en el DOM HTML
 * getAttribute     → lee el atributo 'codigo' de cada nodo <agente> para compararlo
 * evento blur      → se dispara cuando el usuario abandona un campo de formulario
 * estado disabled  → los campos y botones se habilitan progresivamente según validación
 * flujo en dos pasos → primero se valida el código y luego, solo si es correcto, la clave
 */

const InputCodigo = document.querySelector('#codigo');
const InputClave = document.querySelector('#claveAcesso');
const ParrafoCodigo = document.querySelector('#mensajeCodigo');
const ParrafoClave = document.querySelector('#mensajeClave');
const BotonAcceder = document.querySelector('#boton');
const ParrafoBienvenida = document.querySelector('#mensajeBienvenida');

let Agente = null;
let CodigoValido = false;
let ClaveCorrecta = false;

// Funcion que crea las peticiones
function crearPeticion(ruta) {
    const Request = new XMLHttpRequest();
    Request.open('GET', ruta);
    Request.responseType = 'document';
    Request.send();
    return Request;
}

// Valido el codigo del agente
InputCodigo.addEventListener('blur', () => {
    const Codigo = InputCodigo.value.trim();
    Agente = null;
    CodigoValido = false;
    ClaveCorrecta = false;
    InputClave.value = '';
    InputClave.disabled = true;
    ParrafoClave.textContent = '';
    BotonAcceder.disabled = true;
    ParrafoBienvenida.textContent = '';

    if (Codigo === '') {
        ParrafoCodigo.textContent = 'Introduce un código de agente.';
        ParrafoCodigo.className = 'form-text text-muted';
        return;
    }

    // Hago la peticion
    const request = crearPeticion('./datos/personal.xml');

    request.onload = () => {

        if (request.status === 200) {
            const Respuesta = request.response;
            const Agentes = Respuesta.querySelectorAll('agente');
            Agente = null;
            // Recorro todos los nodos <agente> buscando el que coincide con el código introducido
            Agentes.forEach(agente => {
                if (agente.getAttribute('codigo') === Codigo) {
                    Agente = agente;
                }
            });

            if (Agente) {
                CodigoValido = true;
                ParrafoCodigo.textContent = 'Código válido';
                ParrafoCodigo.className = 'form-text text-success fw-bold';
                InputClave.disabled = false;
            } else {
                ParrafoCodigo.textContent = 'Código de agente no reconocido.';
                ParrafoCodigo.className = 'form-text text-danger';
            }
        } else {
            ParrafoCodigo.textContent = 'Error al cargar el archivo personal.xml';
            ParrafoCodigo.className = 'form-text text-danger';
        }
    };

});

// Valido la clave de acceso
InputClave.addEventListener('blur', () => {
    if (!Agente) return;

    const ClaveIntroducida = InputClave.value.trim();
    const ClaveReal = Agente.querySelector('clave').textContent;

    if (ClaveIntroducida === ClaveReal) {
        ParrafoClave.textContent = 'Clave correcta';
        ParrafoClave.className = 'form-text text-success fw-bold';
        ClaveCorrecta = true;
        if (CodigoValido) BotonAcceder.disabled = false;
    } else {
        ParrafoClave.textContent = 'Clave incorrecta';
        ParrafoClave.className = 'form-text text-danger';
        ClaveCorrecta = false;
        BotonAcceder.disabled = true;
    }
});


// Cuando cambia el codigo reinicio todos los campos
InputCodigo.addEventListener('input', () => {
    Agente = null;
    CodigoValido = false;
    ClaveCorrecta = false;
    ParrafoCodigo.textContent = '';
    ParrafoClave.textContent = '';
    ParrafoBienvenida.textContent = '';
    InputClave.value = '';
    InputClave.disabled = true;
    BotonAcceder.disabled = true;
});

// Boton acceder
BotonAcceder.addEventListener('click', function () {

    if (CodigoValido && ClaveCorrecta && Agente) {
        const NombreAgente = Agente.querySelector('nombre') ? Agente.querySelector('nombre').textContent.trim() : 'Agente';
        ParrafoBienvenida.textContent = `Bienvenido, ${NombreAgente}`;
        ParrafoBienvenida.className = 'text-success fw-bold';
    } else {
        ParrafoBienvenida.textContent = 'Datos incorrectos o incompletos.';
        ParrafoBienvenida.className = 'text-danger fw-bold';
    }
});
