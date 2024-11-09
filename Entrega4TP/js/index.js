"use strict"

document.addEventListener("DOMContentLoaded",()=>{

//id de seccion    
let sections = document.querySelectorAll('.scroll-section');
let box = document.querySelectorAll('.box');
function calcularScrollProgress(element){
    const rect = element.getBoundingClientRect();
    const windowsHeight= window.innerHeight;
    const sectionHeight= element.offsetHeight;
    const progress = (windowsHeight-rect.top)/(windowsHeight+sectionHeight);
    return Math.max(0,Math.min(1,progress));
}


//evento scroll
window.addEventListener("scroll",()=>{

    console.log("scrolleando");
    
    sections.forEach((e)=>{
        let idSection = e.id;
        /*let element= e.getBoundingClientRect();
        let width = element.width;
        let height = element.height;
        let x = element.x + (width/2);
        let y = element.y + (height/2);*/
        console.log("Seccion:"+idSection+" "+calcularScrollProgress(e));//"width: "+width+"height: "+height+" x: "+x+" y: "+y
    
        if(calcularScrollProgress(e)>=0.5){
            e.classList.add('boxAlert');
        }else{
            e.classList.remove('boxAlert');
        }
    
    })
    
});






})