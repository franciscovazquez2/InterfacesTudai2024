class LokerReceptor extends Locker{

    constructor(posX,posY,fill,context,isEmpty,width,height,columnPos){
        super(posX,posY,fill,context,isEmpty,width,height);
        this.columnPos = columnPos;
        this.fill= "rgba(0,0,0,0)";
    }

    draw() {
        this.context.fillStyle = this.fill; 
    
        // Comenzar un nuevo camino
        this.context.beginPath();
    
        const x = this.posX + (this.width / 2); 
        const y = this.posY + (this.height / 2); 
        const arrowHeadWidth = 40; 
        const arrowHeadHeight = 20; 
      

        this.context.moveTo(x, y-60 + (this.height / 2)); // Punta de la flecha (abajo)
        this.context.lineTo(x - arrowHeadWidth / 2, y - arrowHeadHeight-30); // Esquina izquierda
        this.context.lineTo(x + arrowHeadWidth / 2, y - arrowHeadHeight-30); // Esquina derecha
        this.context.closePath(); // Cerrar el camino
    
        // Rellenar el triángulo
        this.context.fill();
    }


    //
    isPointInsided(x, y) {
        return (x >= this.posX +10 && x <= this.posX -10  + this.width) &&
               (y >= this.posY +10 && y <= this.posY -10  + this.height);
    }

    getColumn(){
        return this.columnPos;
    }

}