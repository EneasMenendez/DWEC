  let enlaceDos = document.querySelector('.navegacion a:nth-child(2)');
  if (enlaceDos && enlaceDos.parentElement && enlaceDos.parentElement.previousElementSibling) {
    enlaceDos.parentElement.previousElementSibling.style.color = 'orange';
  } 
