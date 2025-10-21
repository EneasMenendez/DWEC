document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---
// const onclick = document.getElementById('outer-box');

// onclick.addEventListener('click', (event)=> {
//     console.log(event.target.id);
//     console.log(event.currentTarget)

//     event.target.style.backgroundColor = 'coral';
// })

const outerBox = document.getElementById('outer-box');
const middleBox = document.getElementById('middle-box');

outerBox.addEventListener('click', (event) => {
    console.log('Casilla exterior:', event.target.id, event.currentTarget.id);
    outerBox.style.backgroundColor = 'coral';
});

middleBox.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Propagacion parada');
    middleBox.style.backgroundColor = 'coral';
});
        // --- Solución Ejercicio 2 ---


        // --- Solución Ejercicio 3 ---


        // --- Solución Ejercicio 5 ---

    });
