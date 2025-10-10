function cambiarImagenPrincipal(indice) {
  const miniaturas = document.querySelectorAll('.miniatura');
  const imagenPrincipal = document.getElementById('imagen-principal');

  if (miniaturas[indice]) {
    const nuevaSrc = miniaturas[indice].getAttribute('src');
    imagenPrincipal.setAttribute('src', nuevaSrc);
    
    resaltarMiniatura(indice);
  }
}

function resaltarMiniatura(indice) {
  const miniaturas = document.querySelectorAll('.miniatura');

  miniaturas.forEach((miniatura, i) => {
    if (i === indice) {
      miniatura.classList.add('activa');
    } else {
      miniatura.classList.remove('activa');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const miniaturas = document.querySelectorAll('.miniatura');
  miniaturas.forEach((miniatura, indice) => {
    miniatura.addEventListener('click', () => cambiarImagenPrincipal(indice));
  });
});
