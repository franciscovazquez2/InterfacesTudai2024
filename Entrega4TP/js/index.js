"use strict"

document.addEventListener("DOMContentLoaded",()=>{

//id de seccion    
let sections = document.querySelectorAll('.scroll-section');

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
        

        if(calcularScrollProgress(e)>0 && calcularScrollProgress(e)<1){
        
        }
    
    });


});

});