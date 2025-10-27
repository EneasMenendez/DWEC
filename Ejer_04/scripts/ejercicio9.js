/**
 * Ejercicio 9 - Modificación de contenido de texto
 * Conceptos: textContent (escritura)
 *
 * textContent = ‘nuevo texto’ → sobreescribe el texto del elemento; más seguro
 *                               que innerHTML porque no interpreta HTML
 */

//9. El título principal de la página es demasiado genérico. Cámbialo para que diga ‘Nueva Guía Interactiva del DOM’.

document.querySelector('#titulo-principal').textContent="Nueva Guía Interactiva del DOM"
