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



        /*
        if(calcularScrollProgress(e)>0 && calcularScrollProgress(e)<1){
            console.log("estoy en seccion:" + idSection)
            if
        }*/
    
    });


});

});