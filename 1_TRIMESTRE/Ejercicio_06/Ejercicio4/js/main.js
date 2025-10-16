const contenedor = document.getElementById('contentBox');

contenedor.addEventListener('click', (event) => {
    if (event.target.classList && event.target.classList.contains('background-color')) {
        const color = getComputedStyle(event.target).backgroundColor;
        document.body.style.backgroundColor = color;
    }
});