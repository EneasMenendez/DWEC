/**
 * Ejercicio 6 - Elemento arrastrable con el ratón dentro de un contenedor
 * Conceptos: eventos de ratón (mousedown, mouseup, mousemove), getBoundingClientRect, Math.max/min
 *
 * mousedown / mouseup en document → se usan en document en lugar del elemento para
 *   capturar el "soltar" aunque el cursor salga del elemento arrastrable durante el movimiento
 * e.offsetX / e.offsetY → guardan la posición del clic relativa al propio elemento,
 *   necesaria para que el arrastre no "salte" al esquina superior-izquierda del div
 * getBoundingClientRect() → obtiene la posición y dimensiones del contenedor en la ventana,
 *   lo que permite calcular coordenadas relativas al contenedor y no a la pantalla completa
 * Math.max(0, Math.min(...)) → técnica de "clamping" para limitar el valor entre 0
 *   y el máximo permitido, evitando que el elemento salga del área del contenedor
 */

const arrastrable = document.querySelector('.arrastrable');
const contenedor = document.querySelector('.contenedor');

let arrastrando = false;
let posX, posY;

//Haxemos el click
arrastrable.addEventListener("mousedown", function (e) {
    // arrastramos
    arrastrando = true;
    arrastrable.classList.add("arrastrando");
    // guardamos la posición del click
    posX = e.offsetX;
    posY = e.offsetY;
});

// Soltamos el click
document.addEventListener("mouseup", function () {

    // dejamos de arrastrar
    arrastrando = false;
    arrastrable.classList.remove("arrastrando");
});

// Movemos el ratón
document.addEventListener("mousemove", function (e) {
    if (!arrastrando) return;

    // Medimos el área del contenedor
    const rect = contenedor.getBoundingClientRect();

    // Calculo la nueva posicion del div arrastrableF
    let x = e.clientX - rect.left - posX;
    let y = e.clientY - rect.top - posY;

    // No dejo que salga del contenedor
    x = Math.max(0, Math.min(rect.width - arrastrable.offsetWidth, x));
    y = Math.max(0, Math.min(rect.height - arrastrable.offsetHeight, y));

    // Muevo el div
    arrastrable.style.left = x + "px";
    arrastrable.style.top = y + "px";
});