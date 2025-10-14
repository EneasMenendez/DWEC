const nombre = document.getElementById('nombre');
const apellidos = document.getElementById('apellidos');
const cuerpoTabla = document.getElementById('informacionTabla');
const btnAniadir = document.getElementById('aniadirInformacion');

if (nombre && apellidos && cuerpoTabla && btnAniadir) {
  btnAniadir.addEventListener('click', (e) => {
    if (e) e.preventDefault();

    if (!nombre.value.trim() || !apellidos.value.trim()) return;

    const fila = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');

    td1.textContent = nombre.value.trim();
    td2.textContent = apellidos.value.trim();

    fila.append(td1, td2);
    cuerpoTabla.appendChild(fila);

    nombre.value = '';
    apellidos.value = '';
  });
}