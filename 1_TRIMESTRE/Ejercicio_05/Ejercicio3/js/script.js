function generarInformeDeValidacion(event) {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();

  const informe = document.getElementById('informe-errores');
  informe.textContent = '';
  let hayErrores = false;

  if (nombre.length <= 3) {
    const errorNombre = document.createElement('p');
    errorNombre.textContent = "Nombre invalido";
    informe.appendChild(errorNombre);
    hayErrores = true;
  }
  if (!email.includes('@')) {
    const errorEmail = document.createElement('p');
    errorEmail.textContent = "Email invalido";
    informe.appendChild(errorEmail);
    hayErrores = true;
  }

  if (!hayErrores) {
    const datosOK = document.createElement('p');
    datosOK.textContent = "Los datos son válidos.";
    informe.appendChild(ok);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('validar');
  if (btn) btn.addEventListener('click', generarInformeDeValidacion);
});