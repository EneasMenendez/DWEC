/**
 * Ejercicio 20 - Travesía DOM encadenada de varios niveles
 * Conceptos: children, parentNode, parentElement, firstElementChild, classList
 *
 * Encadenar parentNode/parentElement varias veces permite escalar el árbol DOM
 * desde un nodo profundo hasta un ancestro lejano sin usar un selector global
 */

/*20.Localiza el segundo enlace del menú. Tu objetivo es, 
 partiendo de él, llegar hasta el título <h1> principal 
de la cabecera y cambiar su color a naranja.*/

document.querySelector('.navegacion').children[2].parentNode.parentElement.firstElementChild.classList.add('titulo-principal');
//document.querySelector('.navegacion').children[2].parentNode.parentElement.firstElementChild.style.color = 'orange';