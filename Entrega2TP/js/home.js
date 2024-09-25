"use strict";

function createCarousel(carouselId) {
    console.log(carouselId);
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

// Inicializar carouseles por ID
document.addEventListener('DOMContentLoaded', () => {
    //createCarousel('carousel1');
    createCarousel('carousel2');
    createCarousel('carousel3');
    createCarousel('carousel4');
    createCarousel('carousel5');
    createCarousel('carousel6');
    createCarousel('carousel7');
});
