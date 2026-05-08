/**
 * Ejercicio 19 - Punto de entrada de la aplicación con autenticación
 * Capa MVC: Configuración
 * Conceptos: Express, express-session, Morgan, middlewares encadenados, módulos ES
 *
 * express-session      → middleware que crea y gestiona sesiones de usuario en el servidor;
 *                        almacena un identificador de sesión en una cookie del cliente
 * secret              → clave usada para firmar la cookie de sesión; impide que el cliente la manipule
 * resave: false       → no guarda la sesión en el store si no se modificó (mejora rendimiento)
 * saveUninitialized: false → no crea sesión para peticiones anónimas (solo cuando el usuario hace login)
 * Orden de middlewares → el orden importa: express.urlencoded debe ir ANTES que las rutas para que
 *                        req.body esté disponible; session debe ir ANTES que los routers que lo usan
 */

// Configuro express y morgan
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {router as userRouter} from './users/index.js';
import {router as dashboardRouter} from './dashboard/index.js';
import {router as projectsRouter} from './projects/index.js';
import {router as socialRouter} from './social/index.js';

const app = express();

// Linea que hace que el codigo detecte la carpeta public
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));

// Configuro Morgan para que cree el archivo de logs
app.use(morgan('common', { immediate: true }));

//este middleware es para procesar formularios
//que vienen en el body de la petición
//al final tendremos un objeto request.body
//con los datos del formulario parseados
app.use(express.urlencoded({ extended: false }));

// Configuro sesiones
// La sesión es el mecanismo que permite al servidor recordar qué usuario está autenticado
// entre peticiones sucesivas (HTTP es sin estado por defecto)
app.use(
  session({
    secret: 'portfolio-secret', // en producción debería venir de una variable de entorno
    resave: false,
    saveUninitialized: false
  })
);

// Rutas
app.use('/', userRouter);
app.use('/dashboard', dashboardRouter);
app.use('/projects', projectsRouter);
app.use('/social', socialRouter);


// Redirijo al login
app.get('/', (req, res) => res.redirect('/login'));

app.listen(8080, () => {
  console.log('Servidor en http://localhost:8080');
});

export default app;
