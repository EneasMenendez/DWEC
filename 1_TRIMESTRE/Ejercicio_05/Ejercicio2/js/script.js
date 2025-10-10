function revelarRespuesta(pregunta) {
  ocultarTodasLasRespuestas();

  const respuesta = pregunta.nextElementSibling; 
  if (respuesta && respuesta.tagName === 'P') {
    respuesta.classList.remove('oculto'); 
  }
}
function ocultarTodasLasRespuestas() {
  const respuestas = document.querySelectorAll('ul li p');
  respuestas.forEach(respuesta => {
    respuesta.classList.add('oculto'); 
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const preguntas = document.querySelectorAll('ul li h2');
  preguntas.forEach(pregunta => {
    pregunta.addEventListener('click', () => revelarRespuesta(pregunta));
  });
});
