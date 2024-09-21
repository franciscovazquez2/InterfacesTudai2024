"use strict";



function createCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    let cards = carousel.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth + 20; // Ancho de cada card más el gap
    const totalCards = cards.length;
    console.log(totalCards);

    // Duplicamos las cards para crear el efecto cíclico
    carousel.querySelector('.carousel').innerHTML += carousel.querySelector('.carousel').innerHTML += carousel.querySelector('.carousel').innerHTML;
    cards = carousel.querySelectorAll('.card'); // Actualizamos la lista de cards con las duplicadas

    let currentIndex = 0;
    let isTransitioning = false;

    function updateCarouselPosition() {
        carousel.querySelector('.carousel').style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }

    function moveRight() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex++;
        updateCarouselPosition();

        // Cuando lleguemos al final del conjunto de cards original, volvemos al inicio de manera invisible
        if (currentIndex >= totalCards) {
            setTimeout(() => {
                carousel.querySelector('.carousel').style.transition = 'none';
                currentIndex = 0; // Saltamos al inicio de las cards originales
                updateCarouselPosition();
                setTimeout(() => {
                    carousel.querySelector('.carousel').style.transition = 'transform 0.5s ease';
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
                carousel.querySelector('.carousel').style.transition = 'none';
                currentIndex = totalCards - 1; // Saltamos al final del carrusel
                updateCarouselPosition();
                setTimeout(() => {
                    carousel.querySelector('.carousel').style.transition = 'transform 0.5s ease';
                    isTransitioning = false;
                }, 50);
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Asignar eventos a los botones
    carousel.querySelector('.left-btn').addEventListener('click', moveLeft);
    carousel.querySelector('.right-btn').addEventListener('click', moveRight);
}

// Inicializar el carrusel
createCarousel('carousel1');
createCarousel('carousel2');
createCarousel('carousel3');

