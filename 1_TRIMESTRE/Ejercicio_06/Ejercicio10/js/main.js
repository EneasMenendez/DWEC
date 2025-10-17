let carrito = [];

const botones = document.querySelectorAll('.añadir');

botones.forEach(boton => {
  boton.addEventListener('click', (e) => {
    const productoDiv = e.target.closest('.producto');
    const nombre = productoDiv.querySelector('.nombre').textContent;
    const precio = parseFloat(productoDiv.querySelector('.precio span').textContent);

    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    renderizarCarrito();
    calcularTotal();
  });
});

function renderizarCarrito() {
  const lista = document.getElementById('listaCarrito');
  lista.innerHTML = ''; 

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} (x${item.cantidad}) - ${item.precio} €`;
    lista.appendChild(li);
  });
}

function calcularTotal() {
  const total = carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
  document.getElementById('total').textContent = total.toFixed(2);
}
