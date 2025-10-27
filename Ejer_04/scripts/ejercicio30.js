/**
 * Ejercicio 30 - Modificación del placeholder de un textarea dentro de una sección
 * Conceptos: selector descendiente, propiedad placeholder
 *
 * '#formulario-seccion textarea' → limita la búsqueda al contexto de esa sección,
 *                                   práctica útil cuando hay varios textareas en la página
 */

/*30. Limita tu búsqueda a la sección del formulario. 
Encuentra el área de texto (textarea) y cambia su texto
 de ejemplo (placeholder) a ‘Escribe aquí tu consulta detallada’.*/

document.querySelector('#formulario-seccion textarea').placeholder = "Escribe aquí tu consulta detallada";