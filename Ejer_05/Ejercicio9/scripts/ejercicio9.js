/**
 * Ejercicio 9 - Filtro en tiempo real de una lista de ciudades por país
 * Conceptos: dataset, classList.add/remove, includes, DOMContentLoaded
 *
 * item.dataset.pais → almacenar el país en un atributo data permite filtrar sin
 *                     parsear el textContent del elemento ni crear estructuras auxiliares
 * includes(filtro)  → comprueba si la cadena del dataset contiene el texto buscado,
 *                     lo que permite búsquedas parciales además de exactas
 */

//Array de objetos que almacena una lista de ciudades y el país al que pertenecen
const ciudades = [
    { ciudad: "Madrid", pais: "España" },
    { ciudad: "Barcelona", pais: "España" },
    { ciudad: "París", pais: "Francia" },
    { ciudad: "Lyon", pais: "Francia" },
    { ciudad: "Roma", pais: "Italia" },
    { ciudad: "Milán", pais: "Italia" }
]

//Añado las ciudades a la lista 
function mostrarCiudades() {
    const listaUl = document.getElementById('listaCiudades');
    listaUl.innerHTML = '';

    ciudades.forEach(({ ciudad, pais }) => {
        const item = document.createElement('li');
        item.textContent = `${ciudad} - ${pais}`;
        item.dataset.pais = pais;
        listaUl.appendChild(item);
    });
}

//Filtro las ciudades por pais
function filtrarPorPais(texto) {
    const filtro = texto.toLowerCase();
    const items = document.querySelectorAll('li');

    items.forEach(item => {
        if (item.dataset.pais.toLowerCase().includes(filtro) || filtro === '') {
            item.classList.remove('oculto');
        } else {
            item.classList.add('oculto');
        }
    });
}
mostrarCiudades();

document.querySelector('button').addEventListener('click', function()  {
    const texto = document.getElementById('filtroPais').value;
    filtrarPorPais(texto);
});

//Limpiar el input
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#filtroPais').value = '';
})
