/**
 * Ejercicio 15-1 - Editor de imágenes con Drag & Drop, FileReader y Canvas API
 * Conceptos: File input, Drag & Drop API, FileReader API, Canvas, exportar imagen
 *
 * Drag & Drop API   → eventos dragover/dragleave/drop permiten soltar archivos sobre un área
 * event.preventDefault() → impide el comportamiento por defecto del navegador al arrastrar
 * event.dataTransfer.files → lista de archivos soltados en la zona de arrastre
 * FileReader        → API para leer archivos locales de forma asíncrona en el navegador
 * lector.readAsDataURL() → convierte el archivo en una cadena base64 (Data URL) usable en <img>
 * lector.onload     → callback que se ejecuta cuando el archivo ha sido leído completamente
 * Canvas API        → elemento HTML que permite dibujar y manipular píxeles de imágenes
 * canvas.getContext('2d') → obtiene el contexto 2D para dibujar sobre el canvas
 * contexto.drawImage() → dibuja la imagen (con escalado opcional) en el canvas
 * contexto.fillText()  → escribe texto sobre el canvas (se usa para la marca de agua)
 * canvas.toBlob()   → convierte el canvas a un archivo binario descargable
 * URL.createObjectURL() → crea una URL temporal que apunta al blob generado
 */
let imagenesCargadas = [];

const inputArchivo = document.querySelector('#archivo');
const zonaArrastre = document.querySelector('#zona-arrastre');
const formulario = document.querySelector('#opciones-edicion');
const contenedorPrevisualizacion = document.querySelector('#previsualizacion');
const contenedorDescargas = document.querySelector('#descargas');

//Cuando hago clic se abre el selector de archivos
zonaArrastre.addEventListener('click', () => inputArchivo.click());

//Cuando arrastro archivos sobre la zona de arrastre
zonaArrastre.addEventListener('dragover', (e) => {
    e.preventDefault();
    zonaArrastre.classList.add('arrastrando');
});

//Cuando dejo de arrastrar fuera de la zona
zonaArrastre.addEventListener('dragleave', () => zonaArrastre.classList.remove('arrastrando'));

//Cuando suelto archivos en la zona
zonaArrastre.addEventListener('drop', (event) => {
    event.preventDefault();
    zonaArrastre.classList.remove('arrastrando');
    cargarImagenes(event.dataTransfer.files);
});

//Cuando selecciono archivos desde el input
inputArchivo.addEventListener('change', (event) => cargarImagenes(event.target.files));

//Cuando hago clic en procesar imagenes
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    procesarImagenes();
});

//Funcion para mostrar previsualización de imagenes
function cargarImagenes(files) {
    contenedorPrevisualizacion.innerHTML = '';
    imagenesCargadas = [];

    Array.from(files).forEach(file => {

        //Verifico que sea imagen
        if (!file.type.match('image.*')) {
            //Alerta si no lo es
            alert(`${file.name} no es una imagen`);
            return;
        }

        const lector = new FileReader();
        lector.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('imagenMiniatura');
            contenedorPrevisualizacion.appendChild(img);
            imagenesCargadas.push(file);
        };
        lector.readAsDataURL(file);
    });
}

//Funcion para procesar y modificar imágenes
function procesarImagenes() {
    const marcaAgua = document.querySelector('#marca-agua').value;
    const anchoMaximo = parseInt(document.querySelector('#ancho-maximo').value);
    const formato = document.querySelector('#formato-salida').value;

    contenedorDescargas.innerHTML = '';

    imagenesCargadas.forEach(file => {
        const lector = new FileReader();
        lector.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const contexto = canvas.getContext('2d');

                        // Calculamos la proporción de escala para respetar el ancho máximo (máx. 1 = sin ampliar)
                const ratio = anchoMaximo > 0 ? Math.min(1, anchoMaximo / img.width) : 1;
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;

                //Dibujo imagen en canvas (escalada al nuevo tamaño)
                contexto.drawImage(img, 0, 0, canvas.width, canvas.height);

                if (marcaAgua) {
                    // El tamaño de la fuente es proporcional al ancho del canvas (5%)
                    const fontSize = canvas.width * 0.05;
                    contexto.font = `${fontSize}px Arial`;
                    // Color blanco semitransparente para que no tape la imagen
                    contexto.fillStyle = 'rgba(255, 255, 255, 0.7)';
                    contexto.textAlign = 'center';
                    // Dibujamos el texto centrado horizontalmente, cerca del borde inferior
                    contexto.fillText(marcaAgua, canvas.width / 2, canvas.height - 20);
                }

                // Convertimos el canvas a blob y creamos un enlace de descarga
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const enlace = document.createElement('a');
                    enlace.href = url;
                    enlace.download = `editada-${file.name}`;
                    enlace.textContent = `Descargar ${file.name}`;
                    contenedorDescargas.appendChild(enlace);
                }, `image/${formato}`);
            };
        };
        lector.readAsDataURL(file);
    });
}
