const inputNum = document.getElementById('cajaTexto');
const btnGenerar = document.getElementById('generar');
const resultado = document.getElementById('resultado');

btnGenerar.addEventListener('click', () => {
  const cantidad = parseInt(inputNum.value);
  if (isNaN(cantidad) || cantidad <= 0) return;
  resultado.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement('p');
    p.textContent = 'Lorem ipsum';
    fragment.appendChild(p);
  }
  resultado.appendChild(fragment);
});
