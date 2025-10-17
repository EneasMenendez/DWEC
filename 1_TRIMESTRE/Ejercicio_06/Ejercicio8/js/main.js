const lista = document.getElementById('listaOrdenable');

function actualizarBotones() {
  const items = lista.querySelectorAll('li');
  items.forEach((item, index) => {
    const subir = item.querySelector('.subir');
    const bajar = item.querySelector('.bajar');
    subir.disabled = index === 0;
    bajar.disabled = index === items.length - 1;
  });
}

lista.addEventListener('click', (event) => {
  if (event.target.tagName !== 'BUTTON') return;

  const li = event.target.parentElement;

  if (event.target.classList.contains('subir')) {
    const anterior = li.previousElementSibling;
    if (anterior) lista.insertBefore(li, anterior);
  }

  if (event.target.classList.contains('bajar')) {
    const siguiente = li.nextElementSibling;
    if (siguiente) lista.insertBefore(siguiente, li);
  }

  actualizarBotones();
});

actualizarBotones();
