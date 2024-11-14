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
    
    });


});

});