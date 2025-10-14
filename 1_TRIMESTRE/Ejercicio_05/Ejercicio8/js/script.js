const btnOrdenar = document.getElementById('ordenar');
const lista = document.getElementById('lista');

btnOrdenar.addEventListener('click', () => {
  const items = Array.from(lista.querySelectorAll('li'));
  items.sort((a, b) => a.textContent.localeCompare(b.textContent));
  lista.innerHTML = '';
  items.forEach(li => lista.appendChild(li));
});