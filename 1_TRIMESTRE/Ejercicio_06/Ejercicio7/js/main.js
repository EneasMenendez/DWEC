const tabla = document.getElementById('tablaEditable');

tabla.addEventListener('dblclick', (event) => {
  const celda = event.target;

  if (celda.tagName !== 'TD' || celda.querySelector('input')) return;

  const valorActual = celda.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = valorActual;
  celda.textContent = '';
  celda.appendChild(input);
  input.focus();

  input.addEventListener('blur', () => {
    celda.textContent = input.value.trim() || valorActual;
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      input.blur();
    }
  });
});
