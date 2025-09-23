//importaciones varias 
import mostrarPerfil,{
    crearPerfil,
    comprobarMayorEdad,
    mayoresDeEdad,
    calcularPromedioEdad
} from "./gestorUsuarios";

//array de usuarios varios
const usuarios = [
    crearPerfil("Eneas","eneas@example.com",17),
    crearPerfil("Covadonga","covadonga@example.com",21),
    crearPerfil("Alex","alex@example.com",22),
    crearPerfil("Chema","chema@example.com",21),
    crearPerfil("Amaia","amaia@example.com",19),
];
mayoresDeEdad = comprobarMayorEdad(usuarios);

console.log ("Usuarios mayores de edad");
mayoresDeEdad.forEach(usuario => {console.log(mostrarPerfil(usuario))});

calcularPromedioEdad = calcularPromedioEdad(usuarios);
console.log ("El promedio de edad es de: ",calcularPromedioEdad);
