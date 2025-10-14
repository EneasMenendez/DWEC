const inputTarea = document.querySelector('input');
const btnAgregar = document.querySelector('button');
const listaTareas = document.querySelector('ul');

btnAgregar.addEventListener('click', () => {
  if (inputTarea.value.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = inputTarea.value;
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);
    inputTarea.value = '';
  }
});
listaTareas.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') e.target.parentNode.remove();
});