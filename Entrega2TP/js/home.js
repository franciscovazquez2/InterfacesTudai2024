"use strict";

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

    // Asignar eventos a los botones
    carousel.querySelector('.carousel-btn.right').addEventListener('click', moveRight);
    carousel.querySelector('.carousel-btn.left').addEventListener('click', moveLeft);
}

// Inicializar carouseles por ID
createCarousel('carousel1');
createCarousel('carousel2');
// Añade más carouseles aquí llamando a createCarousel con su ID
