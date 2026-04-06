/**
 * Ejercicio 15-2 - Tablero Kanban con Drag & Drop entre columnas
 * Conceptos: Drag & Drop API, dataTransfer, getBoundingClientRect, inserción dinámica en el DOM
 *
 * draggable="true"        → atributo HTML que activa el arrastre nativo del elemento
 * dragstart               → se dispara al comenzar a arrastrar; guarda referencia a la tarjeta
 * dragend                 → se dispara al soltar el arrastre; limpia estilos temporales
 * dragover                → se dispara mientras un elemento arrastrado pasa sobre el destino
 * dragleave               → se dispara cuando el elemento arrastrado sale del área destino
 * drop                    → se dispara cuando el elemento se suelta sobre el destino
 * event.dataTransfer      → objeto que transporta datos entre el origen y el destino del arrastre
 * event.dataTransfer.setData() → guarda datos (id, status) al iniciar el arrastre
 * event.dataTransfer.getData() → recupera esos datos al soltar la tarjeta
 * getBoundingClientRect() → devuelve la posición y tamaño del elemento en la ventana (para saber si el cursor está en la mitad superior o inferior de una tarjeta)
 * insertBefore()          → inserta un nodo antes de otro en el DOM (controla el orden visual)
 * dataset.status          → atributo data-status del elemento para rastrear la columna actual
 */
const tarjetas = document.querySelectorAll('.tarjeta');
const columnas = document.querySelectorAll('.columna');

let tarjetaArrastrando = null;
let lineaInsercion = null;

tarjetas.forEach(tarjeta => {

    //Cuando empiezo a arrastrar la tarjeta
    tarjeta.addEventListener('dragstart', (event) => {

        //Guardo la tarjeta que se esta arrastrando
        tarjetaArrastrando = tarjeta;
        tarjeta.classList.add('arrastrando');

        //Guardo la info de la tarjeta como JSON
        event.dataTransfer.setData('application/json', JSON.stringify({
            id: tarjeta.dataset.id,
            status: tarjeta.parentElement.dataset.status
        }));

        event.dataTransfer.effectAllowed = "move";
    });

    //Cuando termino de arrastrar, reseteo la variable, quito la linea de inseccion y el estilo
    tarjeta.addEventListener('dragend', () => {
        tarjeta.classList.remove('arrastrando');
        tarjetaArrastrando = null;
        removerLineaInsercion();
    });
});

columnas.forEach(columna => {

    //Cuando paso la tarjeta sobre la columna
    columna.addEventListener('dragover', (event) => {
        event.preventDefault();
        //Resalto la columna como destino válido               
        columna.classList.add('resaltada');

        const target = event.target;

        //Si paso sobre otra tarjeta
        if (target.classList.contains('tarjeta') && target !== tarjetaArrastrando) {
            const rect = target.getBoundingClientRect();
            // Calculamos la posición vertical del centro de la tarjeta destino
            const mitad = rect.top + rect.height / 2;

            //Si no hay linea de insercion la creo
            if (!lineaInsercion) {
                lineaInsercion = document.createElement('div');
                lineaInsercion.classList.add('linea-insercion');
            }

            // Si el cursor está en la mitad superior, insertamos antes; si no, después
            if (event.clientY < mitad) {
                target.parentElement.insertBefore(lineaInsercion, target);
            } else {
                target.parentElement.insertBefore(lineaInsercion, target.nextSibling);
            }

            //Si paso sobre columna vacia
        } else if (target.classList.contains('columna')) {
            if (!lineaInsercion) {
                lineaInsercion = document.createElement('div');
                lineaInsercion.classList.add('linea-insercion');
            }
            target.appendChild(lineaInsercion);
        }
    });

    //Cuando dejo de pasar la tarjeta por la columna
    columna.addEventListener('dragleave', () => {
        columna.classList.remove('resaltada');
        removerLineaInsercion();
    });

    //Cuando suelto la tarjeta en la columna
    columna.addEventListener('drop', (event) => {
        event.preventDefault();
        columna.classList.remove('resaltada');

        // Recuperamos los datos que guardamos en dragstart (id y estado anterior)
        const data = JSON.parse(event.dataTransfer.getData('application/json'));
        const id = data.id;

        //Si hay línea de inserción
        if (lineaInsercion) {
            //Inserto tarjeta antes de la línea para respetar el orden visual elegido
            columna.insertBefore(tarjetaArrastrando, lineaInsercion);
        } else {
            columna.appendChild(tarjetaArrastrando);
        }

        // Actualizamos el data-status de la tarjeta al estado de la columna destino
        tarjetaArrastrando.dataset.status = columna.dataset.status;
        removerLineaInsercion();
    });
});

//Funcion para quitar la linea de insercion
function removerLineaInsercion() {
    if (lineaInsercion && lineaInsercion.parentElement) {
        lineaInsercion.parentElement.removeChild(lineaInsercion);
    }
    lineaInsercion = null;
}
