"use strict"

document.addEventListener("DOMContentLoaded",()=>{

//id de seccion    
let sections = document.querySelectorAll('.scroll-section');

// Seleccionar el logo y el header
const logo = document.getElementById('logo-principal-header');
const header = document.querySelector('.header-container');
//seccion paralax 1
let layers = document.querySelectorAll('.parallax');


//calcular progreso de scroll por seccion
function calcularScrollProgress(element){
    const rect = element.getBoundingClientRect();
    const windowsHeight= window.innerHeight;
    const sectionHeight= element.offsetHeight;
    const progress = (windowsHeight-rect.top)/(windowsHeight+sectionHeight);
    return Math.max(0,Math.min(1,progress));
}

let artsSecCuatro = document.querySelectorAll(".art-secCuatro"); //articulos seccion 4


// MENU HAMBURGUESA //

const line1__bars = document.querySelector(".line1__bars-menu");
const line2__bars = document.querySelector(".line2__bars-menu");
const line3__bars = document.querySelector(".line3__bars-menu");

document.querySelector(".bars__menu").addEventListener("click", animateBars);

function animateBars(){
    line1__bars.classList.toggle("activeline1__bars-menu");
    line2__bars.classList.toggle("activeline2__bars-menu");
    line3__bars.classList.toggle("activeline3__bars-menu");
}


//evento scroll
window.addEventListener("scroll",()=>{
    
    sections.forEach((e)=>{
        let idSection = e.id;
            
        if(idSection==="uno"){
            let viewDisplay = calcularScrollProgress(e);
            if(window.scrollY>5 && viewDisplay<0.5){
                let scaleValue = 0.9-(viewDisplay);
                logo.style.transform=`translateY(-150px) scale(${scaleValue})`;
                header.classList.add('header-container-scroll');
                
            }if(window.scrollY<=5){
                logo.style.transform=`scale(${(1)})`;
                header.classList.remove('header-container-scroll');
            } 
            
            layers.forEach((layer)=>{
                
                let top =scrollY;
                let speed = layer.getAttribute('data-speed');
                let posX = -(top*speed/100);
                let posY = -(top*speed/100);
                
                layer.setAttribute('style','transform:translate3d(0px,'+posY+'px,0px)');

            })
            
        
        }


        /*_______________SECCION 2_______________*/

    
        if(e.id === "dos"){
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
                    console.log(cardsSecDos[0]);
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
    
            /*_______________FIN SECCION 2_______________*/

        /*
        if(calcularScrollProgress(e)>0 && calcularScrollProgress(e)<1){
            console.log("estoy en seccion:" + idSection)
            if
        }*/

    
    });

        /*_______________SECCION 4_______________*/

        artsSecCuatro.forEach((e)=>{
            let idArt = e.id;
            console.log("Sec 4 Art: " + idArt + " " + calcularScrollProgress(e));

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
        })

        /*_______________FIN SECCION 4_______________*/

        /*_______________SECCION 5_______________*/
        let figurasSecCinco = document.querySelectorAll("#parallax-secCinco");

        figurasSecCinco.forEach((fig)=>{
            let top = scrollY-10000;
            console.log("scrollY: "+scrollY)
            let speed = fig.getAttribute("data-speed");
            let posY = -(top*speed/100);
            fig.setAttribute('style','transform:translate3d(0px,'+posY+'px,0px)');
        })

        /*_______________FIN SECCION 5_______________*/

        
}); /*_______________CIERRE DE EVENTO SCROLL_______________*/

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

//funcion seccion 4
function cambiarPersonaje(ocultar, mostrar){
    let pjocultar = document.querySelector(`#pj-${ocultar}`);
    let pjMostrar = document.querySelector(`#pj-${mostrar}`);
    console.log("borrando: "+ocultar+ " - mostrando: "+mostrar)

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



//secion 3
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
        //let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        //let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
        let x = `${_depth1}`;//`${_depth3}, ${_depth2}, ${_depth1}`;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();

});