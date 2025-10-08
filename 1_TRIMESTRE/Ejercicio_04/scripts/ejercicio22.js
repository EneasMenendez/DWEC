const formularioCorregido = document.getElementById('formulario-contacto');
if (formularioCorregido) {
  formularioCorregido.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    console.log('Nombre:', nombre,'Correo', correo, 'Mensaje:', mensaje);
  });
}