const productos = document.querySelectorAll('.producto');
const carrito = document.getElementById('carrito');
const total = document.getElementById('total');

function calcularTotal() {
  let suma = 0;
  carrito.querySelectorAll('li').forEach(li => {
    suma += parseFloat(li.dataset.price);
  });
  total.textContent = suma.toFixed(2);
}

productos.forEach(prod => {
  prod.querySelector('button').addEventListener('click', () => {
    const item = prod.cloneNode(true);
    const btnQuitar = document.createElement('button');
    btnQuitar.textContent = 'Quitar';
    item.appendChild(btnQuitar);
    carrito.appendChild(item);
    calcularTotal();
  });
});

carrito.addEventListener('click', e => {
  if (e.target.textContent === 'Quitar') {
    e.target.parentNode.remove();
    calcularTotal();
  }
});