/**
 * Ejercicio 8 - Lista reordenable con botones subir/bajar
 * Conceptos: insertBefore, previousElementSibling, nextElementSibling, deshabilitar botones en extremos
 *
 * insertBefore(nodo, referencia) → mueve un nodo existente antes de la referencia;
 *   al insertar un nodo que ya está en el DOM, el navegador lo mueve automáticamente
 *   sin necesidad de eliminarlo primero
 * Para subir: insertBefore(actual, anterior) coloca el actual antes del anterior
 * Para bajar: insertBefore(siguiente, actual) coloca el siguiente antes del actual,
 *   lo que equivale a mover el actual hacia abajo
 * actualizarBotones() se llama tras cada movimiento para deshabilitar subir en el
 *   primer elemento y bajar en el último, evitando operaciones sin efecto visual
 */

let lista = document.querySelector('ul');
actualizarBotones();
document.querySelectorAll('li button').forEach((boton) => {

    boton.addEventListener('click', function () {

        if (boton.classList.contains('subir')) {
            //Me situo en el li anterior
            let anteriorLi = boton.parentNode.previousElementSibling;
            //Me situo en le li actual
            let padreBoton = boton.parentNode;

            lista.insertBefore(padreBoton, anteriorLi);

        } else {

            //Me situo en el li posterior
            let siguienteLi = boton.parentNode.nextElementSibling;

            //Me situo en el li actual
            let padreBoton = boton.parentNode;

            lista.insertBefore(siguienteLi, padreBoton);
        }
        actualizarBotones();
    })
})

// Función para actualizar el estado de los botones 
function actualizarBotones() {
    const elementos = lista.querySelectorAll('li');
    const total = elementos.length;

    elementos.forEach((item, index) => {
        const botonSubir = item.querySelector('.subir');
        const botonBajar = item.querySelector('.bajar');

        // Deshabilitar el botón subir si es el primer elemento
        if (botonSubir) {
            if (index === 0) {
                botonSubir.disabled = true;
            } else {
                botonSubir.disabled = false;
            }
        }

        // Deshabilitar el botón bajar si es el último elemento
        if (botonBajar) {
            if (index === total - 1) {
                botonBajar.disabled = true;
            } else {
                botonBajar.disabled = false;
            }
        }
    });
}
//.disabled = false;