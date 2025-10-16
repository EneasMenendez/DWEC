const checkbox = document.getElementById('infoCheck');
const boton = document.getElementById('enviarInfo');

if (checkbox && boton) {
  boton.disabled = !checkbox.checked;

  checkbox.addEventListener('change', () => {
    boton.disabled = !checkbox.checked;
  });
}