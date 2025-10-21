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
    const testLink = document.getElementById('test-link');

    testLink.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Navegacion permitida");
    });
    // --- Solución Ejercicio 3 ---

    const botonEscondido = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
            botonEscondido.classList.remove('hidden');
        }
        else botonEscondido.classList.add('hidden');
    });

    botonEscondido.addEventListener('click', () => {
        window.scrollTo({
            top: 100,
            behavior: "smooth",
        });
    });


    // --- Solución Ejercicio 5 ---
    const btnNotificacion = document.getElementById('notification-btn');
    const cajonNotificacion = document.getElementById('notification-area');

    document.body.addEventListener('notification', (event) => {
        const { mensaje, fecha } = event.detail;
        cajonNotificacion.textContent = `${mensaje} — ${fecha}`;
    });

    btnNotificacion.addEventListener('click', () => {
        const evento = new CustomEvent('notification', {
            detail: {
                mensaje: 'Esta es la notificación personalizada',
                fecha: new Date().toLocaleString()
            }
        });
        document.body.dispatchEvent(evento);
    });



});
