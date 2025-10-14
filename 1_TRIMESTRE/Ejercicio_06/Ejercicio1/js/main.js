const modal = document.getElementById('modal');

const btnMostrar = document.getElementById('mostrarInfo');
const btnCerrar = document.getElementById('cerrar');

if (modal && btnMostrar && btnCerrar) {
  btnMostrar.addEventListener('click', () => { modal.id = 'View'; });
  btnCerrar.addEventListener('click', () => { modal.id = 'modal'; });
}
