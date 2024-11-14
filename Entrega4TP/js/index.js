"use strict"

document.addEventListener("DOMContentLoaded",()=>{

//id de seccion    
let sections = document.querySelectorAll('.scroll-section');

// Seleccionar el logo y el header
const logo = document.querySelector(".logo-principal-header");
const header = document.querySelector(".header-container");

//calcular progreso de scroll por seccion
function calcularScrollProgress(element){
    const rect = element.getBoundingClientRect();
    const windowsHeight= window.innerHeight;
    const sectionHeight= element.offsetHeight;
    const progress = (windowsHeight-rect.top)/(windowsHeight+sectionHeight);
    return Math.max(0,Math.min(1,progress));
}

let artsSecCuatro = document.querySelectorAll(".art-secCuatro"); //articulos seccion 4

//evento scroll
window.addEventListener("scroll",()=>{
    
    sections.forEach((e)=>{
        let idSection = e.id;
        /*let element= e.getBoundingClientRect();
        let width = element.width;
        let height = element.height;
        let x = element.x + (width/2);
        let y = element.y + (height/2);*/
        console.log("Seccion:"+idSection+" "+calcularScrollProgress(e));
        console.log(window.scrollY);
        
        if(window.scrollY>=125){
            logo.classList.add('logo-small');
            header.classList.add('header-container-scroll');
        }else{
            logo.classList.remove('logo-small');
            header.classList.remove('header-container-scroll');
        }
        if(idSection==="uno"){
        }

        /*_______________SECCION 2_______________*/

    
        if(e.id === "dos"){
            let cardsSecDos = document.querySelectorAll(".card-section2");
            
            if(calcularScrollProgress(e)>=0.5 && calcularScrollProgress(e)<=0.8){
                console.log("entre al if sec dos");
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

});


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

});