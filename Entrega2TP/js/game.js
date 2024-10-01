"use strict"

document.addEventListener("DOMContentLoaded", function() {
    // Esperar hasta que la página se haya cargado completamente
    let porcentaje = 0;
    const porcentajeCarga = document.getElementById('porcentaje');

    // Simular el incremento del porcentaje
    const interval = setInterval(function() {
        if (porcentaje < 100) {
            porcentaje++;
            porcentajeCarga.innerText = porcentaje;
        } else {
            clearInterval(interval);
            setTimeout(function() {
                document.body.classList.add('loaded'); // Ocultar el loader
            }, 800); // momento antes de iniciar
        }
    }, 20); //tiempo del intervalo que incrementa el loader

});