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
    }, 40); //tiempo del intervalo que incrementa el loader

        /*Boton abrir seccion user*/
        var userHeader = document.getElementById('user-header');
        let usmenu = document.querySelector('.seccion-usuario');
        userHeader.addEventListener('click',()=>{
            usmenu.classList.toggle('userHidden');
        });
});


var hamburguer = document.getElementById('hamburger');
let sidebar = document.querySelector('.sidebar');
sidebar.classList.toggle('hidden');
hamburguer.addEventListener('click',()=>{
    sidebar.classList.toggle('hidden');
});

