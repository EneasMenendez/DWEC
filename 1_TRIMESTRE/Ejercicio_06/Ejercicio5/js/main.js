const input = document.getElementById('insertarInformacion');
const items = Array.from(document.querySelectorAll('ul li'));

input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    items.forEach(li => {
        const texto = li.textContent.trim().toLowerCase();
        li.style.display = texto.includes(query) ? '' : 'none';
    });
});