/* 
===============================================NOTA===============================================
Se puede utilizar un método en cualquier momento en javaScript y en HTML únicamente en eventos (on)
*/

let numeroSecreto = 0; //Variable de alcanze global
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return; //Buena práctica aunque no retorne nada
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorDeUsuario").value); //Si no se utiliza el parseInt el valor ingresado es String
    console.log(numeroDeUsuario === numeroSecreto);//El triple igual es estricto en cuanto el tipo de dato que se compara por lo que deben de ser del mismo tipo los elmentos
    
    if (intentos == 3 && numeroDeUsuario != numeroSecreto) {
        asignarTextoElemento("p", "Perdiste, la cantidad máxima de intentos es 3")
        document.querySelector("#intentar").setAttribute("disabled", "true");
        cleanInput();
    } else {
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento("p", `Acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces" }`);
            document.getElementById("reiniciar").removeAttribute("disabled");
            document.querySelector("#intentar").setAttribute("disabled", "true");
        } else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', 'El número secreto es menor');
            } else {
                asignarTextoElemento("p", "El número secreto es mayor")
            }
            intentos++;
            cleanInput();
        }
    }
    return; //Buena práctica aunque no retorne nada
}

function cleanInput() {
    document.querySelector("#valorDeUsuario").value = "";
    return; //Buena práctica aunque no retorne nada
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*10+1);//Variable de alcance de bloque 
    console.log("El tipo del número generado es: " + typeof(numeroGenerado) + ` (${numeroGenerado})`);
    console.log(listaNumerosSorteados);

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento("p",`Ya se sortearon todos los números posibles`);
        document.querySelector("#intentar").setAttribute("disabled", "true");
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('p', `Escribe un número del 1 al ${numeroMaximo}`);
    asignarTextoElemento("h1", "JUEGO DEL NÚMERO SECRETO");
    numeroSecreto = generarNumeroSecreto();
    intentos = 1; 
    return;   
}

function reiniciarJuego() {
    cleanInput();
    condicionesIniciales();
    document.querySelector("#reiniciar").setAttribute("disabled", "true");
    document.querySelector("#intentar").removeAttribute("disabled");
    return;
}

condicionesIniciales();
