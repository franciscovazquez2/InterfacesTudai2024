"use strict"

document.addEventListener("DOMContentLoaded",()=>{
    
    //loader inicio
    let porcentaje = 0;
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    const interval = setInterval(function () {
        if (porcentaje < 100) {
            porcentaje += 1;
            progressBar.style.width = `${porcentaje}%`;
            progressText.innerText = `${porcentaje}%`;
        } else {
            clearInterval(interval);
            setTimeout(function () {
                document.body.classList.add('loaded'); // Ocultar el loader
            }, 800);//espacio antes de iniciar la pagina
        }
    }, 50);

    //calcula progreso de scroll por seccion
    function calcularScrollProgress(element){
        const rect = element.getBoundingClientRect();
        const windowsHeight= window.innerHeight;
        const sectionHeight= element.offsetHeight;
        const progress = (windowsHeight-rect.top)/(windowsHeight+sectionHeight);
        return Math.max(0,Math.min(1,progress));
    }

    
    // menu hamburguesa - desplegable//
    document.querySelector(".bars__menu").addEventListener("click", animateBars);
    let menu = document.querySelector('.bars__menu');
    let menuOptions = document.querySelector('.menu');
    let line1__bars = document.querySelector(".line1__bars-menu");
    let line2__bars = document.querySelector(".line2__bars-menu");
    let line3__bars = document.querySelector(".line3__bars-menu");
    
    menu.addEventListener('click',()=>{
        menuOptions.classList.toggle('hidden');
        desplegarMenu();
    });
    
    function animateBars(){
        line1__bars.classList.toggle("activeline1__bars-menu");
        line2__bars.classList.toggle("activeline2__bars-menu");
        line3__bars.classList.toggle("activeline3__bars-menu");
    };

    //manejo de secciones    
    let sections = document.querySelectorAll('.scroll-section');
    
    // logo inicial
    let logo = document.getElementById('logo-principal-header');
    
    //seccion paralax 1
    let layers = document.querySelectorAll('.parallax');
    //articulos seccion 4
    let artsSecCuatro = document.querySelectorAll(".art-secCuatro"); 

    //evento scroll
    window.addEventListener("scroll",()=>{
        sections.forEach((e)=>{            
            let idSection = e.id;
            /*_______________SECCION 1_______________*/    

            if(idSection==="uno"){
                //achicar logo inicia segun prograso de la seccion
                let viewDisplay = calcularScrollProgress(e);
                if(window.scrollY>5 && viewDisplay<0.5){
                    let scaleValue = 0.8-(viewDisplay);
                    logo.style.transform=`translateY(-120px) scale(${scaleValue})`;
                    
                }if(window.scrollY<=5){
                    logo.style.transform=`scale(${(1)})`;
                } 
                //paralax seccion 1 (velocidades calculadas por los data "speedY-speedX")
                layers.forEach((layer)=>{    
                    let top =scrollY;
                    let speedY = layer.getAttribute('data-speedY');
                    let speedX = layer.getAttribute('data-speedX');
                    let posX = -(top*speedX/100);
                    let posY = -(top*speedY/100);
                    layer.setAttribute('style','transform:translate3d('+posX+'px,'+posY+'px,0px)');
                });
            }
            /*_______________SECCION 2_______________*/

            if(e.id === "dos"){
                // Me traigo el elemento logo
                const menu = document.querySelector('#logo-principal-header');
                //valor computado de la propiedad 'transform'
                const transformValue = window.getComputedStyle(menu).transform;
                let tamScaleLogo = 0;
                if (transformValue !== 'none') {
                    // Me guardo el valor de 'scale' usando una expresión regular
                    const match = transformValue.match(/matrix\(([^,]+),[^,]+,[^,]+,[^,]+,[^,]+,[^,]+\)/);
                    if (match) {
                        const scale = parseFloat(match[1]); // El valor de escala está en la primera posición
                        tamScaleLogo = scale; //Guardo scale para poder usarlo fuera del if
                    }
                }
                
                if(tamScaleLogo == 1){ //si el valor de scale es 1 (cuando refresco la pagina) entonces lo bajo a 0.3
                    menu.style.transform = 'translateY(-120px) scale(0.3)';
                }

                //figuras seccion 2 y cards 
                let cardsSecDos = document.querySelectorAll(".card-section2");
                let figurasSecDos = document.querySelectorAll(".figSecDos");

                figurasSecDos.forEach((fig)=>{
                    let top = scrollY;
                    let speed = fig.getAttribute("data-speed");
                    let posY = -(top*speed/100);
                    fig.setAttribute('style','transform:translate3d(0px,'+posY+'px,0px)');
                })
                
                if(calcularScrollProgress(e)>=0.5 && calcularScrollProgress(e)<=0.8){
                    setTimeout(()=>{
                        cardsSecDos[0].style.top='0px';
                        cardsSecDos[0].style.opacity='1';
                    },300);
        
                    setTimeout(()=>{
                        cardsSecDos[1].style.top='0px';
                        cardsSecDos[1].style.opacity='1';
                    },600);
        
                    setTimeout(()=>{
                        cardsSecDos[2].style.top='0px';
                        cardsSecDos[2].style.opacity='1';
                    },900);
                }
            }
        });

        /*_______________SECCION 4_______________*/

        artsSecCuatro.forEach((e)=>{
            let idArt = e.id;

            if(calcularScrollProgress(e)>0.25 && calcularScrollProgress(e)<0.75){
                //si estoy en articulo 1, personaje 0 se oculta y personaje 1 se muestra
                switch(e.id){
                    case "art-cero":
                        cambiarPersonaje("uno","cero");
                        break;
                    case "art-uno":
                        cambiarPersonaje("cero", "uno");
                        cambiarPersonaje("dos","uno")
                        break;
                    case "art-dos":
                        cambiarPersonaje("uno", "dos");
                        cambiarPersonaje("tres", "dos");
                        break;
                    case "art-tres":
                        cambiarPersonaje("dos", "tres");
                        cambiarPersonaje("cuatro", "tres");
                        break;
                    case "art-cuatro":
                        cambiarPersonaje("tres", "cuatro");
                        cambiarPersonaje("cinco", "cuatro");
                        break;
                    case "art-cinco":
                        cambiarPersonaje("cuatro", "cinco");
                        cambiarPersonaje("seis", "cinco");
                        break;
                    case "art-seis":
                        cambiarPersonaje("cinco", "seis");
                        cambiarPersonaje("siete", "seis");
                        break;
                    case "art-siete":
                        cambiarPersonaje("seis", "siete");
                        cambiarPersonaje("ocho", "siete");
                        break;
                    case "art-ocho":
                        cambiarPersonaje("siete", "ocho");
                        cambiarPersonaje("nueve", "ocho");
                        break;
                    case "art-nueve":
                        cambiarPersonaje("ocho", "nueve");
                        cambiarPersonaje("diez", "nueve");
                        break;
                    case "art-diez":
                        cambiarPersonaje("nueve", "diez");
                        break;
                    
                }
            }
        });
        /*_______________SECCION 5_______________*/
        let figurasSecCinco = document.querySelectorAll("#parallax-secCinco");

        figurasSecCinco.forEach((fig)=>{
            let top = scrollY-10000;
            let speed = fig.getAttribute("data-speed");
            let posY = -(top*speed/100);
            fig.setAttribute('style','transform:translate3d(0px,'+posY+'px,0px)');
        })
    }); /*_______________CIERRE DE EVENTO SCROLL_______________*/

    /*______________________MENU______________________*/
    let menuOpts = document.querySelectorAll('.menu-option-hidden');

    function desplegarMenu(){
        setTimeout(()=>{
            menuOpts[0].classList.toggle('menu-option-hidden');
            menuOpts[0].classList.toggle('menu-option');
        },130);
        setTimeout(()=>{
            menuOpts[1].classList.toggle('menu-option-hidden');
            menuOpts[1].classList.toggle('menu-option');
        },260);
        setTimeout(()=>{
            menuOpts[2].classList.toggle('menu-option-hidden');
            menuOpts[2].classList.toggle('menu-option');
        },390);
    }
    /*______________________FIN MENU______________________*/

    /*________________________PERTENECE A SECCION 2________________________ */
    const images = [
        "src/seccion2/cuadro0.svg",
        "src/seccion2/cuadro1.svg",
        "src/seccion2/cuadro2.svg",
        "src/seccion2/cuadro3.svg" 
    ];

    images.forEach(src =>{
        const img = new Image();
        img.src = src;
    })

    const cuadroImg = document.querySelector(".cuadro img");
    let currentIndex = 0;

    setInterval(() => {
        cuadroImg.classList.remove('visible');

        setTimeout(()=>{
            currentIndex = (currentIndex + 1) % images.length;
            cuadroImg.src = images[currentIndex];
            cuadroImg.classList.add('visible');
        },500)
    }, 3000);
    /*________________________FIN PERTENECE A SECCION 2________________________ */
    
    //secion 3 paralax con mouse move
    (function() {
        // Add event listener
        document.addEventListener("mousemove", parallax);
        const elem = document.querySelector("#parallax1");
        // Magic happens here
        function parallax(e) {
            let _w = window.innerWidth/2;
            let _h = window.innerHeight/2;
            let _mouseX = e.clientX;
            let _mouseY = e.clientY;
            let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
            let x = `${_depth1}`;
            elem.style.backgroundPosition = x;
        }
    })();
    
    //funcion seccion 4
    function cambiarPersonaje(ocultar, mostrar){
        let pjocultar = document.querySelector(`#pj-${ocultar}`);
        let pjMostrar = document.querySelector(`#pj-${mostrar}`);

        if(ocultar == "uno" && mostrar == "cero"){
            pjocultar.classList.remove('pj');
            pjocultar.classList.add('ocultar-pj');

            pjMostrar.classList.remove('ocultar-pj');
            pjMostrar.classList.add('pj-sticky-cero');
        }
        else if(ocultar == "nueve" && mostrar == "diez"){
            pjocultar.classList.remove('pj');
            pjocultar.classList.add('ocultar-pj');

            pjMostrar.classList.remove('ocultar-pj');
            pjMostrar.classList.add('pj-sticky-diez');
        }
        else{
            pjocultar.classList.remove('pj');
            pjocultar.classList.add('ocultar-pj');
        
            pjMostrar.classList.remove('ocultar-pj');
            pjMostrar.classList.add('pj');
        }

    };

});