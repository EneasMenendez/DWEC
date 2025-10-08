const primerInfo = document.querySelector('.info');
if (primerInfo && primerInfo.parentElement) {
  const imagen = primerInfo.parentElement.firstElementChild;
  console.log('Imagen: ', imagen);
}