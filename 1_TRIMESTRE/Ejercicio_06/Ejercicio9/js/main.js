const grid = document.getElementById('grid');
let isDrawing = false;

for (let i = 0; i < 1600; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  grid.appendChild(cell);
}


grid.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('cell')) {
    isDrawing = true;
    e.target.classList.add('pintado');
  }
});


grid.addEventListener('mouseover', (e) => {
  if (isDrawing && e.target.classList.contains('cell')) {
    e.target.classList.add('pintado');
  }
});


document.addEventListener('mouseup', () => {
  isDrawing = false;
});
