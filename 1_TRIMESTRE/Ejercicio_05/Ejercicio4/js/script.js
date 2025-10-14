const usuarios = [{nombre: 'Ana', edad: 25}, {nombre: 'Luis', edad: 30}];

function crearTabla(data) {
  const tabla = document.createElement('table');
  const fragment = document.createDocumentFragment();

  data.forEach(obj => {
    const fila = document.createElement('tr');
    for (let valor in obj) {
      const celda = document.createElement('td');
      celda.textContent = obj[valor];
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  });
  
  fragment.appendChild(tabla);
  document.getElementById('contenedor-tabla').appendChild(fragment);
}
crearTabla(usuarios);