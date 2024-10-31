"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){

var hamburguer = document.getElementById('hamburger');
let sidebar = document.querySelector('.sidebar');
sidebar.classList.toggle('hiddenHamburger');
hamburguer.addEventListener('click',()=>{
    sidebar.classList.toggle('hiddenHamburger');
});

var userHeader = document.getElementById('user-header');
    let usmenu = document.querySelector('.seccion-usuario');
    userHeader.addEventListener('click',()=>{
        usmenu.classList.toggle('userHidden');
    });

//inicio de canvas
let canvas = document.querySelector('#canvas'); 
let ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let figuras = [];
const rect = canvas.getBoundingClientRect()//constante para tomar distancia y calcular x/y


/*let img = new Image();
img.src= "src/img/fondo-ironman-robocop-2.jpg";
img.onload = () => {
    ctx.drawImage(img, 0, 0, width, height);
};*/
let img = new Image();

const imgAspectRatio = img.width / img.height;
const canvasAspectRatio = width / height;
let sx, sy, sWidth, sHeight;

img.src = "src/img/fondo-ironman-robocop-2.jpg";
img.onload = () => {

    if (imgAspectRatio > canvasAspectRatio) {
        // La imagen es más ancha que el canvas, recortar horizontalmente
        sHeight = img.height;
        sWidth = sHeight * canvasAspectRatio;
        sx = (img.width - sWidth) / 2;
        sy = 0;
    } else {
        sWidth = img.width;
        sHeight = sWidth / canvasAspectRatio;
        sx = 0;
        sy = 220;
    }
     // Dibujar la imagen recortada en el canvas sin estirarla
     ctx.drawImage(
        img,
        sx, sy, sWidth, sHeight,  // Área de recorte de la imagen
        0, 0, width, height       // Área en el canvas
    );
    };



//dimensiones board
const widthBoard=820;
const heightBoard=600;
const marginBoard = (width-widthBoard)/2;
const marginSupBoard = height-heightBoard;

let size = 4;//default tamanio game
let file = null;//ficha
let board = null;//tablero
let game = null;//juego
let firstTurn = null;//primer turno
let ganador = false;//ganador
let filePlayerA = "src/img/robocop.jpg";//imagenes por default
let filePlayerB="src/img/iroman.jpg";//imagenes por default
let imgPlayerA = new Image();
let imgPlayerB=new Image();
//loadImg();
//musica fondo
const backgroundMusic = document.getElementById('backgroundMusic');
//contador
const countdownDiv = document.querySelector(".countdown");
const countdownDivcomplete = document.querySelector(".divCountdown");


//lectura de pantalla informativa del transcurso del juego
let log = document.querySelector('.log');
let prompt = document.querySelector('.prompt');


//INICIALIZACION DE TABLERO (setea dimensiones y combinaciones segun parametro 4,5,6,7 en linea)
let startGame = document.querySelector('.start-game');
let setConfigurations = document.querySelector('#play');
let selectGame = document.querySelector('.configuration-game');
let selectFile = document.querySelectorAll('.select-file .player img');
let startGamePlay = document.querySelector('.start');
let resetGame = document.querySelector('.reset-game');
let winner = document.querySelector('.winner');
let iroWinner = document.querySelector('.imgWinnerI');
let roboWinner = document.querySelector('.imgWinnerR');
let deuce = document.querySelector('.imgDeuce');
//deuce.classList.add('hidden');

let previousA=null;
let previousB=null;
let previousType = null;

resetGame.classList.add('hidden');
//seleccion de ficha personalizada por jugador
selectFile.forEach(element => {
    
    element.addEventListener('click',()=>{    
        if(parseInt(element.id)>0 && parseInt(element.id)<=3 ){
            if(previousA!=null){
                previousA.classList.remove('selected');
            }
            previousA=element;
            filePlayerA="src/img/"+element.src.split('/').pop();
            element.classList.add('selected');
            console.log(filePlayerA);
            loadImg();
        }
        if(parseInt(element.id )>3&&parseInt(element.id )<=6){
            if(previousB!=null){
                previousB.classList.remove('selected');
            }
            previousB=element;
            filePlayerB="src/img/"+element.src.split('/').pop();
            element.classList.add('selected');
            loadImg();
        }
    })
});


//esconder pantalla telon al apretar play
setConfigurations.addEventListener('click',()=>{
    prompt.style.visibility='hidden';
    startGame.classList.add('hidden');
    resetGame.classList.add('hidden');
    //backgroundMusic.play();

})

//al seleccionar tipo juego mostrar opcion empezar
selectGame.querySelectorAll('button').forEach(button=>{
    button.addEventListener('click',()=>{
        if(previousType!=null){ 
            previousType.classList.remove('selected');
        }
        previousType=button;
        console.log(previousType.id);        
        button.classList.add('selected');
        startGamePlay.style.visibility='visible';
        
    });
});

//para empezar el juego se controla que esten seleccionadas las opciones 
startGamePlay.addEventListener('click',()=>{
    size = parseInt(previousType.id);
    if(previousA!=null&&previousB!=null&&size>0){
        resetGame.classList.add('hidden');
        prompt.style.visibility='visible';
        iroWinner.classList.remove('hidden');
        roboWinner.classList.remove('hidden');
        deuce.classList.add('hidden');
        // Agrega la clase 'fade-out' para la transición de opacidad
        selectGame.classList.add('fade-out');
        // Espera a que termine la transición antes de aplicar 'hidden'
        setupGame(size);
        setTimeout(() => {
            selectGame.classList.add('hidden');
        }, 500); // Espera 500 ms o lo mismo que la duración de la transición
        
    }
})

resetGame.querySelectorAll('button').forEach(button=>{
    button.addEventListener('click',()=>{
        if(button.id === "reset"){
            console.log("reset");
            ganador=false;
            figuras=[];
            clearCanvas();
            iroWinner.classList.remove('hidden');
            roboWinner.classList.remove('hidden');
            resetGame.classList.add('hidden');
            prompt.style.visibility='visible';
            countdownDivcomplete.classList.remove('finishTime');
            countdownDivcomplete.classList.remove('timeWarning');
            resetearCuentaRegresiva();  
            setupGame(size);
            iniciarCuentaRegresiva();
            // Agrega la clase 'fade-out' para la transición de opacidad
            selectGame.classList.add('fade-out');
            // Espera a que termine la transición antes de aplicar 'hidden'
            setTimeout(() => {
                selectGame.classList.add('hidden');
            }, 500); // Espera 500 ms o lo mismo que la duración de la transición
        }
        if(button.id === "exit"){
            console.log("exit");
            ganador=false;
            figuras=[];
            clearCanvas();
            selectGame.classList.remove('fade-out');
            selectGame.classList.remove('hidden');
            startGame.classList.remove('hidden');
        }
    })
})

//setea parametros juego segun eleccion
function setupGame(gameSize){
    let columns, rows , files, combinations;
    switch(gameSize){
        case 4:
            columns=8;
            rows = 7; 
            files = 24;
            combinations=4;
            break;
        case 5:
            columns=9;
            rows = 7; 
            files = 27;
            combinations=5
            break;
        case 6:
            columns=9;
            rows = 8; 
            files = 32;
            combinations=6;
            break;
        case 7:
            columns=10;
            rows = 8; 
            files = 35;
            combinations=7;
            break;
        default:
            console.log("error, seleccion invalida");
            return;
    }
    //creacion de tablero, juego y eleccion aleatoria del primer turno
    board = new Board(marginBoard,marginSupBoard,randomRGB(),ctx,widthBoard,heightBoard,columns,rows,combinations);
    game = new Game("robocop","ironman");
    firstTurn=game.setFirstTurn();
    stateLog("Comienza jugando: "+firstTurn,log);
    board.createLokers();
    drawAll();
    loadFiles(files/2,95, 550,ctx,25,imgPlayerB,"robocop");
    loadFiles(files/2,1105, 550,ctx,25,imgPlayerA,"ironman");
    iniciarCuentaRegresiva();
    console.log("entre en el reset de cuentaregre");
    
};

function showDeuce(){ //MODULARIZACION -- funcion usada en mousedown y mouseup para mostrar el menu de reset/exit al empatar
    clearLog(log);
    stateLog("EMPATE",log);
    winner.innerHTML="EMPATE";
    roboWinner.classList.add('hidden');
    iroWinner.classList.add('hidden');
    deuce.classList.remove('hidden');
    resetGame.classList.remove('hidden');
    resetearCuentaRegresiva();
}

//EVENTOS DE MOUSE   
//controla que se seleccione una ficha al turno correspondiente
canvas.addEventListener('mousedown', (e)=>{
                        console.log("mousedown");
                        let figura = isFile(e);
                        if(board.isDeuce()||tiempo==0){//verifica que no sea la ultima ficha(empate)
                            showDeuce()
                        }
                        else if(figura != null && figura.isClickable() && !ganador){
                            //verifica si clickea ficha al turno correspondiente
                            if(game.isTurn(figura.getPlayer())){
                            file = figura;
                            }else{
                                stateLog(figura.getPlayer()+" no es tu turno",log);
                            }
                        }
                        drawAll();
                    });
//soltar seleccion de ficha
canvas.addEventListener('mouseup', (e)=>{
                        if(file != null){
                            //buscar casillero receptor
                            let lockerReceptor = board.isAnyLockerPointInsided(getX(e),getY(e));
                            //si encontro casillero receptor busca la columna
                            if(lockerReceptor!=null){                    
                                let emptyLocker = board.getLokerEmptyInColumn(lockerReceptor.getColumn(),board.getRows());
                                //si hay lugar
                                if(emptyLocker!=null){
                                    traslateFile(file,emptyLocker);
                                    emptyLocker.setIsEmpty(false);
                                    emptyLocker.setFicha(file);
                                    file.setClickable(false);//se inabilita la ficha para que se mueva.
                                    drawAll();
                                    let player = file.getPlayer();
                                    setTimeout(()=>{     
                                        ganador = board.winner(player,emptyLocker);                                   
                                        if(ganador){
                                            clearLog(log);
                                            stateLog("GANADOR!!: "+player.toUpperCase(),log);
                                            winner.innerHTML="GANADOR: "+player.toUpperCase();
                                            if(player === "robocop"){
                                                iroWinner.classList.add('hidden');
                                                deuce.classList.add('hidden');
                                            }else{
                                                roboWinner.classList.add('hidden');
                                                deuce.classList.add('hidden');
                                            }
                                            //winner.classList.add('imgWinner');
                                            resetGame.classList.remove('hidden');
                                            resetearCuentaRegresiva();
                                            drawAll();
                                        }else if(board.isDeuce()||tiempo==0){//verificar que no sea la ultima ficha(empate)
                                            showDeuce()
                                        }else{
                                            stateLog("es el turno de : "+ game.changeTurn(),log);//se cambia el turno y se informa
                                        }
                                    },700);
                                    lockerReceptor.setFill("rgba(0,0,0,0)");
                                }else{
                                    //volver a posicion inicial
                                    stateLog("Columna llena, intenta nuevamente",log);
                                    file.setPosX(file.startPosX);
                                    file.setPosY(file.startPosY);
                                    drawAll();
                                }

                            }else{
                                //volver a posicion inicial
                                stateLog("Posicion incorrecta, intenta nuevamente",log);
                                file.setPosX(file.startPosX);
                                file.setPosY(file.startPosY);
                                drawAll();
                            }
                            file = null;
                        }
                    });

//drop de la ficha
canvas.addEventListener('mousemove', (e)=>{
                        if(file != null){
                            file.setPosX(getX(e));
                            file.setPosY(getY(e));
                            //pintar o despintar si se pasa por los casilleros receptores
                            for(let i=0; i<board.lockers[0].length;i++){
                                if(board.lockers[0][i].isPointInsided(getX(e),getY(e))){
                                    //controla si esta lleno o tiene lugar para informar si se puede ingresar o no ficha
                                    if(board.getLokerEmptyInColumn(board.lockers[0][i].getColumn(),board.getRows())){
                                        board.lockers[0][i].setFill("rgba(0,255,0,0.7)");
                                    }else{
                                        board.lockers[0][i].setFill("rgba(255,0,0,0.7)");
                                    }
                                }else{
                                    board.lockers[0][i].setFill("rgba(0,0,0,0)");
                                }
                            }
                            drawAll();                           
                        }
                    });

//efecto gravedad (movimiento de la ficha)
function traslateFile(ficha,casillero){
    let posXficha=ficha.getPosX();
    let posYficha=ficha.getPosY();
    let posXcasillero=casillero.getPosX()+32.5;
    let posYcasillero=casillero.getPosY()+29;
    let velocidad = 1; // velocidad de movimiento (en milisegundos)

    if(posXficha<posXcasillero){
        //desciende mientras no llegue al casillero destino en intervalos
        let intervaloX = setInterval(() => {
            if (posXficha < posXcasillero) {
                posXficha++; // incrementar la posición de la ficha
                ficha.setPosX(posXficha); // actualizar la posición de la ficha
                drawAll(); // redibujar todo
            } else {
                clearInterval(intervaloX); // detener el intervalo cuando la ficha llega al casillero
            }
        }, velocidad);

    }else if(posXficha>posXcasillero){
        let intervaloXiz = setInterval(() => {
            if (posXficha > posXcasillero) {
                posXficha--; // incrementar la posición de la ficha
                ficha.setPosX(posXficha); // actualizar la posición de la ficha
                drawAll(); // redibujar todo
            } else {
                clearInterval(intervaloXiz); // detener el intervalo cuando la ficha llega al casillero
            }
        }, velocidad);
    }
    
    let intervaloY = setInterval(() => {
        
        if (posYficha < posYcasillero) {
            if(posYficha<120){
                posYficha+=5;
            }else if(posYficha<150){
                posYficha+=15; // incrementar la posición de la ficha
            }else{
                posYficha+=40
            }
            if(posYficha > posYcasillero){
                posYficha-=20;
            }
            ficha.setPosY(posYficha); // actualizar la posición de la ficha
            drawAll(); // redibujar todo
        } else {
            rebote(ficha,posYficha,posYcasillero,posYcasillero-100);
            clearInterval(intervaloY); // detener el intervalo cuando la ficha llega al casillero
        }
    }, velocidad);
                  
}

//crea efecto rebote
function rebote(ficha,pos,buttom,top){
    let sentido = true;
    let position = buttom ;
    let contador = 0;
    let intervalorebote= setInterval(()=>{
            if(pos>=top&& sentido){
                pos-=25;
                ficha.setPosY(pos);
                drawAll();
                            
            }else if(pos<buttom){
                sentido=false;
                pos+=10;
                ficha.setPosY(pos);
                drawAll();
            }

            if(pos == buttom){
                sentido=true;
                contador++;
                top=top+40;
                console.log(contador);
            }
            
            if(contador >= 2){
                clearInterval(intervalorebote);
            }
            
        },10);
        pos = position;
        sentido=true;

}


//dibujar todo
function drawAll(){
    clearCanvas();
    board.draw();
    figuras.forEach(element => { 
        element.draw();
    });
}

//obtener pos x e y 
function getX(event){
    let rect =canvas.getBoundingClientRect();
    return event.clientX - rect.left;
}
function getY(event){
    let rect =canvas.getBoundingClientRect();
    return event.clientY - rect.top;
}

//borrar canvas
function clearCanvas(){
    ctx.clearRect(0,0,width,height); 
    //ctx.drawImage(img, 0, 0, width, height);   
    ctx.drawImage(
        img,
        sx, sy, sWidth, sHeight,  // Área de recorte de la imagen
        0, 0, width, height       // Área en el canvas
    );
}

//colores aleatorios
function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

//carga imagenes
function loadImg(){
    imgPlayerA.src = filePlayerA;
    imgPlayerB.src = filePlayerB;
}

//carga de fichas en tablero
function loadFiles(cantFichas,witdhPartial, heightPartial,ctx,radius,img,name){
    console.log("cargando fichas");
//las posiciones 95 y 1105 estan "harcodeadas" para que la imagen de fondo sea entera, dejaria de existir marginBoard
    for (let i = 0; i < cantFichas; i++){
       let c = new File(witdhPartial, heightPartial,"rgba(0,0,0,0)", ctx, radius,img,name);
        if(i==(cantFichas-2)){
            heightPartial -= 55;        
        }else{
            heightPartial = heightPartial -2;
        }
        figuras.push(c);
        c.draw();
    }
}


function isFile(e){
    for(let i = 0; i < figuras.length; i++){
        if(figuras[i].isPointInsided(getX(e),getY(e))){
            return figuras[i];
        }
    }
}

//imprime en el juego
function stateLog(message,log){
    log.innerHTML="";
    let parrafo = document.createElement("p");
    parrafo.textContent=message;
    parrafo.classList.add('logStyle');

    //log.removeChild(log.firstChild);
    log.appendChild(parrafo);   
    
}

function clearLog(log){
    log.innerHTML = '';
}


let tiempo = 25; // Tiempo inicial en segundos
let cuentaRegresiva; // Variable para almacenar el ID del intervalo
let span = document.createElement('span');

// Función que inicia o reinicia el temporizador
function iniciarCuentaRegresiva() {
    // Si hay un intervalo en ejecución, lo detiene
    clearInterval(cuentaRegresiva);
    
    // Reinicia el tiempo a 10 segundos (o el tiempo deseado)
    tiempo = 240 ;
    
    // Inicia un nuevo intervalo
    cuentaRegresiva = setInterval(() => {
    
    if(!ganador){
        tiempo--;
        countdownDiv.innerHTML = tiempo;
        span.innerHTML = tiempo;    

        // Detener el temporizador cuando llegue a 0
        if(tiempo<15){
            countdownDivcomplete.classList.add('timeWarning');
        }
        
        
        if (tiempo <= 0) {
            clearInterval(cuentaRegresiva);
            console.log("¡Tiempo terminado!");
            countdownDivcomplete.innerHTML="Se acabo el Tiempo!";
            countdownDivcomplete.classList.add('finishTime');
            winner.innerHTML="EMPATE";
            roboWinner.classList.add('hidden');
            iroWinner.classList.add('hidden');
            deuce.classList.remove('hidden');
            resetGame.classList.remove('hidden');
        }
    }else{
        clearInterval(cuentaRegresiva);
        resetearCuentaRegresiva();
    }
    }, 1000); // Actualiza cada 1 segundo
}

// Función para resetear la cuenta regresiva
function resetearCuentaRegresiva() {
    span.classList.add("countdown");
    countdownDivcomplete.innerHTML="TIEMPO: ";
    countdownDivcomplete.appendChild(span);
}

}


