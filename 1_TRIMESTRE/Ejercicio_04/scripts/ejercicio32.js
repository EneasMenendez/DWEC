// Ejercicio 32: Añadir una clase a las imágenes dentro de tarjetas de curso.
(function () {
  const tarjetas = document.querySelectorAll('.card');
  tarjetas.forEach(function(tarjeta) {
    const img = tarjeta.querySelector('img');
    if (img) {
      img.classList.add('imagen-curso');
    }
  });
})();