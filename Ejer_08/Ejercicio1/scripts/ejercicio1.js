/**
 * Ejercicio 1 - Configurador de Pizza con Cálculo de Precio en Tiempo Real
 * Conceptos: formularios HTML, checkboxes, radio buttons, select, eventos change, data-attributes, setTimeout
 *
 * data-price     → atributo personalizado en cada input que almacena el precio del ingrediente/masa
 * parseFloat     → convierte el string del atributo HTML a número decimal para poder sumarlo
 * setTimeout(fn,0) → retarda la ejecución un ciclo del event loop para que el reset del formulario termine antes de leer los valores
 * event.preventDefault → evita que el formulario se envíe si no se ha seleccionado el tipo de masa
 */

const TodosInputs = document.querySelectorAll('input');
const ElSelect = document.querySelector('select');
const Total = document.querySelector('#total');
const BotonEnviar = document.querySelector('#boton');
const BorrarPedido = document.querySelector('#borrar');
let opcion;
let ingredientes;

actualizarPedido();

//Actualiza el precio final dependiendo los inputs que esten seleccionados
TodosInputs.forEach(unInput => {
    unInput.addEventListener('change', () => {
        actualizarPedido();
    });
});


//Actualiza el precio final dependiendo el select que este seleccionado
ElSelect.addEventListener('change', () => {
    actualizarPedido();
});


//Esta funcion actualiza el pedido dependiendo lo que hay seleccionado en los inputs y el select
function actualizarPedido() {
    let total = 0.00;
    ingredientes = [];
    //Recorro los inputs y obtengo los que estan seleccionados y de ellos obtengo el atributo que contiene el precio
    TodosInputs.forEach(unInput => {

        if (unInput.checked) {
            // parentElement.textContent captura la etiqueta visible del ingrediente junto al checkbox
            ingredientes.push(unInput.parentElement.textContent);
            // getAttribute('data-price') lee el precio definido en el HTML; parseFloat lo convierte a número
            total += parseFloat(unInput.getAttribute('data-price'));
        }

    });


    //Obtengo la opcion seleccionada
    opcion = ElSelect.options[ElSelect.selectedIndex];

    //Si es la opcion 0 no hago nada porque es la que contiene el texto
    if (ElSelect.selectedIndex != 0) {
        //Obtengo el atributo que contiene el precio de la opcion seleccionada
        total += parseFloat(opcion.getAttribute('data-price'));
    }

    //Añado el precio al total
    Total.textContent = total.toFixed(2)+" €";
}

function mostrarDatos() {
    let mensaje;

    if (ElSelect.selectedIndex == 0) {

        mensaje = "Te falta seleccionar el tipo de masa";

    } else {
        mensaje = "Ingredientes:\n"
        ingredientes.map((ingrediente) => {
            mensaje += "\n- " + ingrediente;
        });

        mensaje += "\n\nTipo Masa:\n"
        mensaje += "\n- " + opcion.value;
    }

    window.alert(mensaje);
}

//Muestro los mensajes en una alerta cuando pulso enviar
BotonEnviar.addEventListener('click', function (event) {
    if (ElSelect.selectedIndex == 0) {

        event.preventDefault();
    }
    mostrarDatos();
});


//Reseteo la etiqueta del precio
BorrarPedido.addEventListener('click', function () {
    setTimeout(actualizarPedido, 0);
});
/*Tengo que usar el setTimeout para que se ejecute el listener del boton BorrarPedido
un milisegundo después de que el formulario haya terminado de resetearse, ya que cuando
pulso el boto BorrarPedido, lo primero que se ejecuta es el reset que tiene el boton y 
después el evento listener*/
