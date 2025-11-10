/**
 * Ejercicio 9 - Cuadrícula de dibujo con el ratón (pixel art)
 * Conceptos: creación masiva de nodos, eventos mousedown/mouseup/mouseover, bandera de estado
 *
 * estaDibujando → bandera global que permite distinguir entre un simple hover del ratón
 *   y un arrastre con el botón presionado; sin ella, mouseover pintaría al pasar el cursor
 * mousedown en body (no en celda) → captura el inicio del trazo aunque empiece fuera
 *   de la cuadrícula y garantiza que mouseup siempre desactive el modo dibujo
 * mouseover en cada celda → detecta el paso del cursor por encima mientras se arrastra,
 *   lo que permite "pintar" varias celdas en un solo movimiento continuo
 * Bucle de 40×40 = 1600 celdas → todas se crean en la inicialización para no generar
 *   nodos en caliente durante el dibujo, lo que mejoraría el rendimiento del scroll
 */

// Variable para saber cuando se dibuja o no
let estaDibujando = false;

const contenedorCuadricula = document.getElementById('cuadricula');

// Función que crea la cuadrícula
function crearCuadricula() {
    for (let i = 0; i < 40 * 40; i++) {
        const celda = document.createElement('div');
        celda.classList.add('celda');

        // Cuando esta clicado y se arrastra el raton se pinta de negro
        celda.addEventListener('mouseover', () => {
            if (estaDibujando) {
                celda.style.backgroundColor = 'black';
            }
        });

        // Cuando se hace clic en una celda solo esta se pinta de negro
        celda.addEventListener('mousedown', () => {
            celda.style.backgroundColor = 'black';
        });

        contenedorCuadricula.appendChild(celda);
    }
}

// Cuando se hace clic se empieza a dibujar
document.body.addEventListener('mousedown', () => {
    estaDibujando = true;
});

// Cuando se deja de hacer clic se deja de dibujar
document.body.addEventListener('mouseup', () => {
    estaDibujando = false;
});

crearCuadricula();