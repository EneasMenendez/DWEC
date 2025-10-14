const divTabs = document.getElementById('tabs');
const contenidoTabs = document.getElementById('contenido');

divTabs.addEventListener('click', e => {
  if (e.target.dataset.id) {
    document.querySelectorAll('.tab-contenido').forEach(div => div.classList.add('oculto'));
    document.getElementById(e.target.dataset.id).classList.remove('oculto');
  }
});