class Locker extends Figure {
    constructor(posX,posY,fill,context,isEmpty,width,height){
        super(posX,posY,fill,context);
        this.isEmpty = isEmpty;
        this.width = width;
        this.height = height;  
        this.ficha = null; //ficha que contiene el locker
        this.matrizPositionRow=null;
        this.matrizPositionColumn=null;
    }

    draw() {
        // Dibuja el cuadrado
        this.context.fillStyle = this.fill;   
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
        // Guarda el estado del contexto
        this.context.save();
        this.context.globalCompositeOperation = 'xor'; 
        // Establece la operación de composición para borrar
        this.context.fillStyle = "rgba(0,0,0,0.05)";
        // Dibuja el círculo que "borrará" parte del cuadrado
        this.context.beginPath();
        this.context.arc(
            this.posX + (this.width / 2), // Centro en el ancho del cuadrado
            this.posY + (this.height / 2), // Centro en el alto del cuadrado
            25, // Radio del círculo
            0, 
            Math.PI * 2 // Dibuja un círculo completo
        );
        this.context.fill(); // Aplica el llenado para borrar
        this.context.closePath();
        // Restaura el contexto a su estado original
        this.context.restore();
    }    

    //devuelve la posicion en la que se encuentra en la matriz
    getMatrizPosition(){
        return {
                row:this.matrizPositionRow,
                column:this.matrizPositionColumn
                };
    }

    getPosX(){return this.posX;}
    
    getPosY(){return this.posY;}
    
    getIsEmpty(){return this.isEmpty;}
    
    getHigth(){return this.width;}
    
    getWidth(){return this.height;}
    
    getFicha(){return this.ficha;}
    
    setIsEmpty(isEmpty){this.isEmpty = isEmpty;}
    
    setFicha(ficha){this.ficha = ficha;}
    
    setMatrizPosition(row,column){this.matrizPositionRow=row;this.matrizPositionColumn=column;}
    
}