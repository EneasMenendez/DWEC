const informacion = document.querySelectorAll('.card .info');
informacion.forEach(function(info) {
  const pDuracion = document.createElement('p');
  pDuracion.textContent = 'Duración: 20 horas';
  pDuracion.classList.add('duracion');
  info.appendChild(pDuracion);
});