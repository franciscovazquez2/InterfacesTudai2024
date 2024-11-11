"use strict"

document.addEventListener("DOMContentLoaded",()=>{

//id de seccion    
let sections = document.querySelectorAll('.scroll-section');
let box = document.querySelectorAll('.box');

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
            if(e.id === "tres"){
                let boxs = e.querySelectorAll('.box');
                
                if(calcularScrollProgress(e)>=0.2&&calcularScrollProgress(e)<=0.8){
                    boxs.forEach(s=>{
                        s.classList.add('boxAlert');
                    });
                    setTimeout(()=>{
                        boxs[0].style.top='320px';boxs[0].style.right='200px';
                        console.log(box[0]);
                    },200);
                    setTimeout(()=>{
                        boxs[1].style.top='320px';boxs[1].style.right='600px';
                        console.log(box[1]);
                    },400);
                    setTimeout(()=>{
                        boxs[2].style.top='320px';boxs[2].style.left='200px';
                        console.log(box[2]);
                    },600);
                }else{
                    boxs.forEach(s=>{
                        s.classList.remove('boxAlert');
                        s.style.top='741px';
                    })
                }
            }


            if(e.id === "cinco"){
                let box = e.querySelector('.box')
                
                if(calcularScrollProgress(box)>=0.2&&calcularScrollProgress(box)<=0.5){
                    box.classList.add('boxRotate');
                }else{
                    box.classList.remove('boxRotate');
                }
            }
            if(e.id === "siete"){
                let box = e.querySelector('.box')
                
                if(calcularScrollProgress(box)>=0.2&&calcularScrollProgress(box)<=0.5){
                    box.classList.add('boxTranslate');
                }else{
                    box.classList.remove('boxTranslate');
                }
            }
        }
        
    })
    
});






})