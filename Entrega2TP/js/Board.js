class Board extends Figure{
    
    constructor(posX,posY,fill,context,width,height,columns,rows,combinations){
        super(posX,posY,fill,context);
        this.width = width;
        this.height = height;
        this.lockers = [];
        this.columns = columns;
        this.rows = rows;
        this.combinations=combinations;
    }

    //creacion dinamica de lokers segun tamanio juego
    createLokers(){
        this.lockers=[];
        let marginX = 3;//margenes de separacion
        let marginY =3;
        let widthLoker = 65;//tamaño lokers segun cantidad fichas
        let heightLocker = 65;
        let widthTablero= ((this.columns*(marginX+widthLoker)));
        let heightTablero=((this.rows*(marginY+heightLocker)));
        let x = this.posX-widthLoker+(this.width/2)-(widthTablero/2);//pos coordenadas segun tamanio fichas
        let y = this.posY-heightLocker+(this.height/2)-(heightTablero/2);
        //llenado de matriz con los casilleros
        for (let i = 0; i < this.rows; i++) {
            this.lockers[i] = []; // Inicializamos cada fila como un arreglo
            for (let j = 0; j < this.columns; j++) {
                //creacion de lockers en la matriz
                if(i===0){//linea de lockers receptores, solo la primera
                    this.lockers[i][j] = new LokerReceptor(x+widthLoker, y+heightLocker,"rgba(0,0,0,0)",this.context, false, widthLoker, heightLocker,j);  
                    x+=widthLoker+marginX;
                }else{
                    this.lockers[i][j] = new Locker(x+widthLoker, y+heightLocker,"rgba(25,25,25,0.7)",this.context, true, widthLoker, heightLocker);
                    x+=widthLoker+marginX;
                    this.lockers[i][j].setMatrizPosition(i,j);//le asigno posicion de donde se ubica en matriz para calcular logica
                }
            }
            x = this.posX-widthLoker+(this.width/2)-(widthTablero/2);
            y+=heightLocker+marginY;
          }
    }
    
    //dibuja la matriz de lockers
    draw(){
        super.draw();
        //this.context.fillRect(this.posX,this.posY,this.width,this.height);
        for(let i = 0; i < this.lockers.length;i++){
            for(let j = 0; j<this.lockers[i].length;j++){
                this.lockers[i][j].draw();
            }
        }
    }

    setWidth(width){
        this.width=width;
    }
    setHeigth(height){
        this.heigth=height;
    }

    //devuelve un casillero si una ficha se para sobre alguno de los receptores, sino null.
    isAnyLockerPointInsided(x,y){
        for(let i=0; i<this.lockers[0].length;i++){
            if(this.lockers[0][i].isPointInsided(x,y)){
                return this.lockers[0][i];
            }
        }
        return null;
    }

    //devuelve casillero vacio segun columna a la que se quiere ubicar una ficha.
    getLokerEmptyInColumn(column,rows){
        for(let i = rows-1 ; i > 0; i--){
            if(this.lockers[i][column].getIsEmpty()){
                return this.lockers[i][column];
            }
        }
        return null;
    }

    //devuelve cantidad de filas
    getRows(){
        return this.rows;
    }
    //devuelve cantidad de columnas
    getColumns(){
        return this.columns;
    }

    //---------------------------------------CHEQUEOS DE LOGICA X EN LINEA---------------------------------------
    
    //metodo que averigue si alguien cumplio la combinacion (recibe parametro del tipo de juego/viene del index.    )
    winner(player,casillero){
        let positionMatriz = casillero.getMatrizPosition();
        let contador = 0;
        let posRowTope = positionMatriz.row;
        let posColumnTope = positionMatriz.column;
        
        //busca la combinacion horizontal, vertical, diagonal derecha y diagonal izquierda, si alguna es verdadera entonces hay ganador
        if((this.getHorizontalSequence(positionMatriz, contador, player))||
            (this.getVerticalSequence(positionMatriz, contador, player))||
            (this.getRightDiagonalSequence(contador, player, posRowTope, posColumnTope))||
            (this.getLeftDiagonalSequence(positionMatriz, contador, player, posRowTope, posColumnTope))){
                return true;
        }
        return false;
    }
    
    //chequeo secuencia horizontal
    getHorizontalSequence(positionMatriz, contador, player){
        for(let i =0; i<this.columns;i++){
            //que el casillero no este vacio
            if(this.lockers[positionMatriz.row][i].getFicha()!=null){
                //verificar que sea el player
                if(this.lockers[positionMatriz.row][i].getFicha().getPlayer()===player){
                    contador++;
                    if(contador==this.combinations){
                        return true;
                    }
                }else{//si no es se corta la secuencia
                    contador=0;
                }
            }else{
                contador=0;
            }
        }
        contador = 0;
        return false
    }

    //chequeo secuencia vertical
    getVerticalSequence(positionMatriz, contador, player){
        for(let i =1; i<this.rows;i++){
            //que el casillero no este vacio
            if(this.lockers[i][positionMatriz.column].getFicha()!=null){
                if(this.lockers[i][positionMatriz.column].getFicha().getPlayer()===player){
                    contador++;
                    if(contador==this.combinations){
                        return true;
                    }
                }else{
                    contador=0;
                }

            }else{
                contador=0; 
            }
        }
        contador=0;
        return false;
    }

    //chequeo secuencia diagonal derecha
    getRightDiagonalSequence(contador, player, posRowTope, posColumnTope){
        //buscar cero

        while(posRowTope<this.rows-1&&posColumnTope>0){
            posRowTope+=1;
            posColumnTope-=1;            
        }
        
        while (posRowTope>0 && posColumnTope<this.columns){
            if(this.lockers[posRowTope][posColumnTope].getFicha()!=null){
                if(this.lockers[posRowTope][posColumnTope].getFicha().getPlayer()===player){
                    contador++;
                    if(contador==this.combinations){
                        return true;
                    }
                }else{
                    contador=0;
                }
            }
            posRowTope-=1;
            posColumnTope+=1;
        }
        contador=0;
        return false;
    }

    //chequeo secuencia diagonal izquierda
    getLeftDiagonalSequence(positionMatriz, contador, player, posRowTope, posColumnTope){
        posRowTope = positionMatriz.row;
        posColumnTope = positionMatriz.column
        while(posRowTope<this.rows-1&&posColumnTope<this.columns-1){
            posRowTope+=1;
            posColumnTope+=1;            
        }
        
        while(posRowTope>0&&posColumnTope>=0){
            if(this.lockers[posRowTope][posColumnTope].getFicha()!=null){
                if(this.lockers[posRowTope][posColumnTope].getFicha().getPlayer()===player){
                    contador++;
                    if(contador==this.combinations){
                        return true;
                    }
                }else{
                    contador=0;
                }
                
            }
            posRowTope-=1;
            posColumnTope-=1;
        }
        return false;
    }

    //devuelve si existe empate
    isDeuce(){
        for(let i=0; i<this.lockers[1].length;i++){
            if(this.lockers[1][i].getFicha()==null){
                return false;
            }
        }
        return true;
    }
   
}