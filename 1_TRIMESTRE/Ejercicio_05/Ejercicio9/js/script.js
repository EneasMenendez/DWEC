const ciudades = [
  {nombre: 'Madrid', pais: 'España'},
  {nombre: 'Lima', pais: 'Perú'},
  {nombre: 'París', pais: 'Francia'},
  {nombre: 'Bogotá', pais: 'Colombia'}
];
const ulCiudades = document.getElementById('lista-ciudades');
ciudades.forEach(c => {
  const li = document.createElement('li');
  li.textContent = `${c.nombre} - ${c.pais}`;
  ulCiudades.appendChild(li);
});
function filtrarPorPais(pais) {
  ulCiudades.querySelectorAll('li').forEach(li => {
    li.style.display = li.textContent.includes(pais) ? 'list-item' : 'none';
  });
}