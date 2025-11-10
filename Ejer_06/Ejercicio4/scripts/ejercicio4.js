/**
 * Ejercicio 4 - Cambiar color de fondo al hacer clic en divisiones coloreadas
 * Conceptos: delegación de eventos, event.target, switch, manipulación de clases en body
 *
 * Delegación de eventos → en lugar de añadir un listener a cada div hijo, se pone uno
 *   solo en el contenedor padre; el evento burbujea hasta él y event.target identifica
 *   exactamente qué hijo fue pulsado (patrón eficiente y escalable)
 * event.target !== contenedor → filtra clics directos sobre el fondo del contenedor
 *   para que solo reaccionen los divs hijos, no el área vacía
 * document.body.className = '' → limpia todas las clases anteriores antes de aplicar
 *   la nueva, evitando acumular clases de colores anteriores
 */

const contenedor = document.querySelector('.contenedor');

contenedor.addEventListener('click', function (event) {
    if (event.target !== contenedor) {
        document.body.className = '';

        switch (event.target.id) {
            case 'div1':
                document.body.classList.add('red');
                break;
            case 'div2':
                document.body.classList.add('blue');
                break;
            case 'div3':
                document.body.classList.add('green');
                break;
            case 'div4':
                document.body.classList.add('yellow');
                break;
            case 'div5':
                document.body.classList.add('purple');
                break;
        }
    }
});
