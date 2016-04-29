/* globals cc, asset */

var INITTIALAZED = false;
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        cc.log(string);
        var size = cc.winSize;


        var menuItem1 = new cc.MenuItemFont("Push!", play); // Remover, apenas testando a transição de cenas
        var menu = new cc.Menu(menuItem1);
        
        menu.alignItemsVertically();
        this.addChild(menu);
        
        
        var closeMenu = new cc.MenuItemImage(asset.CloseNormal_png, asset.CloseSelected_png, closeGame); // Adicionando o botão
        closeMenu.setAnchorPoint(cc.p(0,0));                                                            // de fechar o jogo
        closeMenu.setPosition(cc.p(size.width-40, size.height-40));
        this.addChild(closeMenu, 12);
        
        var topMenu = new cc.Sprite.create(asset.wood_jpg); // Adicionando a barra superior para o menu
        topMenu.setAnchorPoint(cc.p( 0, 0 ));
        topMenu.setPosition(cc.p(0, size.height-40));
        this.addChild(topMenu, 11);
        
        
        
        
        
        
        var sprite = new cc.Sprite.create(asset.char_gif); // Carregando imagem do personagem.
        sprite.setAnchorPoint( cc.p( 0, 0 ) );             // Será inserido posteriormente
        
        var sombra = new cc.Sprite.create(asset.sombra_png); // Carregando imagem do personagem.
//        sombra.setAnchorPoint( cc.p( 429, 810 ) );             // Será inserido posteriormente
        sombra.setAnchorPoint( cc.p( 0.462, 0.485 ) ); // Valores da sombra testados
        
        
        
        var rectSprite = sprite.getBoundingBox(); // tratamento de colisão (não está sendo utilizado)
        var spriteMoveUp = new cc.MoveBy( 0.08, cc.p( 0, 40 ) );
        var sequenceMoveUp = cc.Sequence.create(spriteMoveUp);
        var sombraMoveUp = new cc.MoveBy( 0.08, cc.p( 0, 40 ) );
        var sequenceSombraMoveUp = cc.Sequence.create(sombraMoveUp);
        
        
        var spriteMoveDown = new cc.MoveBy( 0.08, cc.p( 0, -40 ) );
        var sequenceMoveDown = cc.Sequence.create(spriteMoveDown);
        var sombraMoveDown = new cc.MoveBy( 0.08, cc.p( 0, -40 ) );
        var sequenceSombraMoveDown = cc.Sequence.create(sombraMoveDown);
        
        
        var spriteMoveRight = new cc.MoveBy( 0.08, cc.p( 40, 0 ) );
        var sequenceMoveRight = cc.Sequence.create(spriteMoveRight);
        var sombraMoveRight = new cc.MoveBy( 0.08, cc.p( 40, 0 ) );
        var sequenceSombraMoveRight = cc.Sequence.create(sombraMoveRight);
        
        
        var spriteMoveLeft = new cc.MoveBy( 0.08, cc.p( -40, 0 ) );
        var sequenceMoveLeft = cc.Sequence.create(spriteMoveLeft);
        var sombraMoveLeft = new cc.MoveBy( 0.08, cc.p( -40, 0 ) );
        var sequenceSombraMoveLeft = cc.Sequence.create(sombraMoveLeft);
        
        
        
        var mapsList = [];
        
        var stringFechada = 
            [[1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1],
             [1,1,1,1,1,1,1,1,1,1,1,1]];
        var string = 
            [[0,2,0,0,0,0,0,0,0,0,1,0],
             [0,1,0,1,1,1,0,0,0,1,0,0],
             [0,0,5,0,1,1,0,1,0,1,0,1],
             [1,0,0,0,1,1,0,1,0,1,0,1],
             [0,0,1,0,0,0,0,1,0,0,0,1],
             [1,0,1,1,1,1,1,1,1,1,1,1],
             [0,0,0,0,0,0,0,0,0,1,0,0],
             [1,1,1,1,1,1,1,1,0,1,0,1],
             [1,0,0,0,0,0,1,1,0,1,0,1],
             [1,0,1,1,1,0,0,0,0,1,0,0],
             [0,0,1,0,0,0,1,1,1,1,0,1],
             [1,0,0,1,0,1,0,0,0,0,0,0],
             [1,0,1,0,0,1,0,1,1,1,1,0],
             [0,0,1,1,0,1,0,1,0,0,1,0],
             [1,0,0,0,0,1,0,1,1,0,1,0],
             [0,0,1,1,1,1,0,1,1,0,1,1],
             [1,0,0,0,0,0,0,0,0,0,0,0],
             [0,0,1,1,0,1,1,0,1,1,1,1],
             [1,0,1,0,0,0,1,0,0,0,0,3]];
        
        var currentSpritePosition = [2,2];
        var wallSpritesArray = [];
        var objectsSpritesArray = [];
        
        
        
        // 0 -> Caminho Aberto
        // 1 -> Parede
        // 2 -> Pergunta
        // 3 -> Saída
        // 5 -> Posição do personagem
        
        
        
        
        var s = 0;
        for (var linha in string) {
            for ( var elemento in string[linha]) {
                    cc.log("valor = "+string[ linha ][ elemento ]); // adicionando o tile background (grass)
                    var back = new cc.Sprite.create(asset.grass_gif);
                    back.setAnchorPoint( cc.p( 0, 0 ) );
                    back.setPosition(cc.p(elemento * 40, linha * 40));
                    back.zPosition = -1;
                    this.addChild(back);
                    // Escurecendo o background
//                    back.runAction(escurecer);
                if ( string[ linha ][ elemento ] == 1 ) {
                    s = new cc.Sprite.create( asset.wall_jpg );
                    s.setAnchorPoint( cc.p( 0, 0 ) );
                    s.setPosition( cc.p( elemento * 40, linha * 40 ) );
                    
                    this.addChild( s, 0);
                    wallSpritesArray.push([s, [elemento, linha]]);
                    // Escurecer tile
//                    s.runAction(escurecer);
                    //
                }
                
                else {
                    
                    if ( string[ linha ][ elemento ] == 2 ) { // Adicionando questão
                        s = new cc.Sprite.create( asset.question_png );
                        s.setAnchorPoint( cc.p( 0, 0 ) );
                        s.setPosition( cc.p( elemento * 40, linha * 40 ) );
                        objectsSpritesArray.push([s, [elemento, linha]]);
                        this.addChild( s, 1 );
                        objectsSpritesArray.push([s, [elemento, linha]]);
//                        // Escurecer tile
//                        s.runAction(escurecer);
                        //
                    }
                    else{
                        if ( string[ linha ][ elemento ] == 3 ) { // Adicionando saída
                            s = new cc.Sprite.create( asset.exit_png );
                            s.setAnchorPoint( cc.p( 0, 0 ) );
                            s.setPosition( cc.p( elemento * 40, linha * 40 ) );
                            this.addChild( s, 1 );
                            objectsSpritesArray.push([s, [elemento, linha]]);
                            // Escurecer tile
//                            s.runAction(escurecer);
                            //
                    
                        }
                        else{
                            if(string[ linha ][ elemento ] == 5){
                                if(INITTIALAZED===false){

                                    INITTIALAZED = true;
                                    sprite.setPosition(cc.p(elemento*40, linha*40));
                                    this.addChild(sprite, 10);
                                    sombra.setPosition(cc.p(elemento*40, linha*40));
                                    this.addChild(sombra, 10);
                                }
                                
                            }
                        }
                    }
                }
                
                

            }
	}
        
        
        
        
        
        
        
        
        
        function delay(ms) {
           ms += new Date().getTime();
           while (new Date() < ms){}
        }
        
        
        function removeObjectSprite(HelloWorldLayer){
            cc.log("Entrou");
            var newBackgroundTile = new cc.Sprite.create(asset.grass_gif); // Adicionando background
            newBackgroundTile.setAnchorPoint(cc.p( 0, 0 ));
            newBackgroundTile.setPosition(cc.p(currentSpritePosition[0]*40, currentSpritePosition[1]*40));
            HelloWorldLayer.addChild(newBackgroundTile, 2);    
        }
        
        function objectAction(value, old){
            if(value===2){
//                removeObjectSprite(); // Background por cima do sprite do objeto
                play();
                cc.log("play!");
            }else{
                if (value==3){
//                    removeObjectSprite(this); // Background por cima do sprite do objeto
                    endGame();
                }
            }       
        }
        
        function moveRight(){
            var oldSpritePosition = [currentSpritePosition[0]][currentSpritePosition[1]];
            var targetValue = string[currentSpritePosition[0]][currentSpritePosition[1]+1];
            string[currentSpritePosition[0]][currentSpritePosition[1]] = 0;
            string[currentSpritePosition[0]][currentSpritePosition[1]+1] = 5;
            currentSpritePosition = [currentSpritePosition[0], currentSpritePosition[1]+1];
            var result = objectAction(targetValue); // Decide se termina o jogo, mostra uma pergunta, ou se não faz                                                                  //  nada e remove o sprite
            return result;
        }
        function moveLeft(){
            var oldSpritePosition = [currentSpritePosition[0]][currentSpritePosition[1]];
            var targetValue = string[currentSpritePosition[0]][currentSpritePosition[1]-1];
            string[currentSpritePosition[0]][currentSpritePosition[1]] = 0;
            string[currentSpritePosition[0]][currentSpritePosition[1]-1] = 5;
            currentSpritePosition = [currentSpritePosition[0], currentSpritePosition[1]-1];
            objectAction(targetValue); // Decide se termina o jogo, mostra uma pergunta, ou se não faz                                                                  //  nada e remove o sprite
        }
        function moveUp(){
            var oldSpritePosition = [currentSpritePosition[0]][currentSpritePosition[1]];
            var targetValue = string[currentSpritePosition[0]+1][currentSpritePosition[1]];
            string[currentSpritePosition[0]][currentSpritePosition[1]] = 0;
            string[currentSpritePosition[0]+1][currentSpritePosition[1]] = 5;
            currentSpritePosition = [currentSpritePosition[0]+1, currentSpritePosition[1]];
            objectAction(targetValue); // Decide se termina o jogo, mostra uma pergunta, ou se não faz                                                                  //  nada e remove o sprite
        }
        function moveDown(){
            var oldSpritePosition = [currentSpritePosition[0]][currentSpritePosition[1]];
            var targetValue = string[currentSpritePosition[0]-1][currentSpritePosition[1]];
            string[currentSpritePosition[0]][currentSpritePosition[1]] = 0;
            string[currentSpritePosition[0]-1][currentSpritePosition[1]] = 5;
            currentSpritePosition = [currentSpritePosition[0]-1, currentSpritePosition[1]];
            objectAction(targetValue); // Decide se termina o jogo, mostra uma pergunta, ou se não faz                                                                  //  nada e remove o sprite
        }
        
        var isFirstMovement = true;
        if (cc.sys.capabilities.hasOwnProperty('accelerometer')){
            cc.inputManager.setAccelerometerInterval(1/5);
            cc.inputManager.setAccelerometerEnabled(true);
            
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION,
                callback: function(accelEvent, event){
//                    cc.log("Accel x = "+ accelEvent.x);
//                    cc.log("Accel y = "+ accelEvent.y);
                    cc.log("-------------------------");
                    if(!isFirstMovement){
                        delay(200);
                    }
                    isFirstMovement = false;

                    
                    
                    
                    if (accelEvent.x<-0.2){
                            
                            
                            
                                cc.log("Move Left!");
                                if( (currentSpritePosition[1]>0) && 
                                    (string[currentSpritePosition[0]][currentSpritePosition[1]-1]!==1) ){
                                    cc.log("Pode mover para a esquerda!");
                                    sprite.runAction(sequenceMoveLeft);
                                    sombra.runAction(sequenceSombraMoveLeft);
                                    moveLeft(); // Move left in the string
                                }else{
                                    cc.log("Impossível mover para a esquerda!");
                                    
                                    
                                }

                        }
                    
                    if (accelEvent.x>0.2){
                            cc.log("Move Right!");
                            if( (currentSpritePosition[1]<11) && 
                                    (string[currentSpritePosition[0]][currentSpritePosition[1]+1]!==1) ){
                                        cc.log("Pode mover para a direita!");
                                        sprite.runAction(sequenceMoveRight);
                                        sombra.runAction(sequenceSombraMoveRight);  
                                        moveRight(); // Move right in the string
                                        
                                    
                                }else{
                                    cc.log("Impossível mover para a direita!!");
                                }
                            
//                        }
                    }
                    if (accelEvent.y<-0.2){
                            cc.log("Move Down!");
                            if( (currentSpritePosition[0]>0) && 
                                    (string[currentSpritePosition[0]-1][currentSpritePosition[1]]!==1) ){
                                    cc.log("Pode mover para a baixo!");  
                                    sprite.runAction(sequenceMoveDown);
                                    sombra.runAction(sequenceSombraMoveDown);
                                    moveDown(); // Move down in the string
                                    
                                }else{
                                    cc.log("Impossível mover para a baixo!!");
                                    
                                }
                            
//                        }
                    }
                    if (accelEvent.y>0.2){
                        
                        if( (currentSpritePosition[0]<18) && 
                                    (string[currentSpritePosition[0]+1][currentSpritePosition[1]]!==1) ){
                                        
                                    cc.log("Pode mover para a cima!");
                                    sprite.runAction(sequenceMoveUp);
                                    sombra.runAction(sequenceSombraMoveUp);
                                    moveUp(); // Move up in the string
                                }else{
                                    cc.log("Impossível mover para a Cima!!");
                                    
                                }

                    }
                    
                    
                    
                }
            }, this);
        }
        
        return true;
    },
    
  
});



function delay(ms) {
           ms += new Date().getTime();
           while (new Date() < ms){}
        }

function play(){
    cc.log("Play!");
//    var scene = new HelloWorldScene2();
//    cc.director.runScene(new cc.TransitionJumpZoom(0.2,scene));
    var scene = new QuestionScene();
    delay(500);
    cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,scene));    
//    var newBackgroundTile = new cc.Sprite.create(asset.grass_gif); // Adicionando background
//    newBackgroundTile.setAnchorPoint(cc.p( 0, 0 ));
//    newBackgroundTile.setPosition(cc.p(0*40, 1*40));
//    HelloWorldLayer.addChild(newBackgroundTile, 2); 
}

function endGame(){
    cc.log("EndGame!");
//    alert("End game!");
    
}


var closeGame = function(){
    cc.log("closeGame");
};






var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        if (INITTIALAZED===false){
//            INITTIALAZED = true;
            this._super();
            var layer = new HelloWorldLayer();
            this.addChild(layer);
        }
    }
});




// Scene two
