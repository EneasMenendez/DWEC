const imagenesTarjetas = document.querySelectorAll('.card');
imagenesTarjetas.forEach(function(tarjeta) {
  const img = tarjeta.querySelector('img');
  if (img) {
    img.classList.add('imagen-curso');
  }
});