"use strict";

document.addEventListener("DOMContentLoaded", function() {
    // Esperar hasta que la página se haya cargado completamente
    let porcentaje = 0;
    const porcentajeCarga = document.getElementById('porcentaje');

    // Simular el incremento del porcentaje
    const interval = setInterval(function() {
        if (porcentaje < 100) {
            porcentaje = porcentaje + 1;
            porcentajeCarga.innerText = porcentaje;
        } else {
            clearInterval(interval);
            setTimeout(function() {
                document.body.classList.add('loaded'); // Ocultar el loader
            }, 800); // momento antes de iniciar
        }
    }, 20); //tiempo del intervalo que incrementa el loader

    createCarousel('carousel1');
    createCarousel('carousel2');
    createCarousel('carousel3');
    createCarousel('carousel4');
    createCarousel('carousel5');
    createCarousel('carousel6');
    createCarousel('carousel7');

    /*Boton cambio de icono addCart*/
    /*__________________FALTA HACERLO FUNCIONAR__________________*/
    let buyButtons = document.querySelectorAll('.button-with-icon');
    
    if(buyButtons){
        console.log("Botones encontrados");

        buyButtons.forEach(buyButton => {
            buyButton.addEventListener('click', () => {
                console.log("Botón compra clickeado");
                cambiarImagenCart(buyButton);
            });
        });
    }

    let cartAddIcons = document.querySelectorAll('.addCart');
    let cartInIcons = document.querySelectorAll('.inCart');

    if(cartAddIcons.length > 0 && cartInIcons.length > 0){
        console.log("Imagenes encontradas");
    }else{
        console.log("No se encontraron las imagenes");
    }
    
    var contador = 0;
    function cambiarImagenCart(buyButton){
        let cartAddIc = buyButton.querySelector('.addCart');
        let cartInIc = buyButton.querySelector('.inCart');
        let cantidadCarrito = document.querySelector('.cuentaCarrito');

        if(cartAddIc.style.display==="block" && cartInIc.style.display==="none"){
            cartAddIc.style.display = "none";
            cartInIc.style.display = "block";
            contador++;
            cantidadCarrito.innerHTML=contador;
        }else if(cartAddIc.style.display==="none" && cartInIc.style.display==="block"){
            cartAddIc.style.display = "block";
            cartInIc.style.display = "none";
            contador--;
            cantidadCarrito.innerHTML=contador;
        }
        else{
            console.log("Iconos no encontrados en el boton actual")
        }

        if(contador>0){
            cantidadCarrito.style.display="block";
        }else{
            cantidadCarrito.style.display="none";
        }
    }
    
    
    /*Boton abrir seccion user*/
    var userHeader = document.getElementById('user-header');
    let usmenu = document.querySelector('.seccion-usuario');
    userHeader.addEventListener('click',()=>{
        usmenu.classList.toggle('userHidden');
    });
});


function createCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    let cards = carousel.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth + 20; // Ancho de cada card más el gap
    const totalCards = cards.length;

    // Duplicamos las cards para crear el efecto cíclico
    carousel.innerHTML += carousel.innerHTML += carousel.innerHTML;
    cards = carousel.querySelectorAll('.card'); // Actualizamos la lista de cards con las duplicadas

    let currentIndex = 0;
    let isTransitioning = false;

    function updateCarouselPosition() {
        carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    function moveRight() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex++;
        updateCarouselPosition();
        console.log(currentIndex + " current " + totalCards);

        // Cuando lleguemos al final del conjunto de cards original, volvemos al inicio de manera invisible
        if (currentIndex >= totalCards) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = 0; // Saltamos al inicio de las cards originales
                updateCarouselPosition();
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease';
                    isTransitioning = false;
                }, 50);
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    function moveLeft() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex--;
        updateCarouselPosition();

        // Si llegamos al principio, volvemos al final de las cards duplicadas
        if (currentIndex < 0) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = totalCards - 1; // Saltamos al final del carrusel
                updateCarouselPosition();
                setTimeout(() => {
                    carousel.style.transition = 'transform 0.5s ease';
                    isTransitioning = false;
                }, 50);
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    const leftBtn = carousel.parentNode.querySelector('.carousel-btn.left');
    const rightBtn = carousel.parentNode.querySelector('.carousel-btn.right');

    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', moveLeft);
        rightBtn.addEventListener('click', moveRight);
    } else {
        console.error("No se encontraron los botones izquierdo y derecho.");
    }
}


var hamburguer = document.getElementById('hamburger');
let sidebar = document.querySelector('.sidebar');
hamburguer.addEventListener('click',()=>{
    sidebar.classList.toggle('hidden');
});


    

