/* globals cc, asset */
var layerCopiaExterno; // definindo como variável global para que pergunta.js tenha acesso
var pause_exit_game = false; // Para sair do jogo a partir do pause
var pontuacao = 0;
var INITTIALAZED = false;
var LabirintoLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
//        cc.audioEngine.playMusic(asset.labirinto_musica_mp3, true);
//        cc.audioEngine.setMusicVolume(0.2);
       

        var menuItem1 = new cc.MenuItemFont("Push!", play); // Remover, apenas testando a transição de cenas
        var menu = new cc.Menu(menuItem1);
        
        menu.alignItemsVertically();
        this.addChild(menu);
        
        
        
        var pontuacaoLabel = new cc.LabelTTF("Points: "+pontuacao);
        pontuacaoLabel.setFontSize(30);
        pontuacaoLabel.setAnchorPoint(cc.p(0,0));
        pontuacaoLabel.setPosition(cc.p(10, size.height-40));
        this.addChild(pontuacaoLabel, 12, 10); //zOrder = 1, Tag = 10
        
        var closeMenu = new ccui.Button();
        closeMenu.loadTextures(asset.labirinto_pause_png);
        closeMenu.setAnchorPoint(cc.p(0,0));   
        
        closeMenu.addTouchEventListener(this.pausar, this);
        closeMenu.setPosition(cc.p(size.width-40, size.height-40));
        this.addChild(closeMenu, 12);
        
        
//        var closeMenu = new cc.MenuItemImage(asset.pause_png, asset.CloseSelected_png, closeGame); // Adicionando o botão
//        closeMenu.setAnchorPoint(cc.p(0,0));                                                            // de fechar o jogo
//        closeMenu.setPosition(cc.p(size.width-40, size.height-40));
//        this.addChild(closeMenu, 12);
        
        var topMenu = new cc.Sprite.create(asset.labirinto_barra_png); // Adicionando a barra superior para o menu
        topMenu.setAnchorPoint(cc.p( 0, 0 ));
        topMenu.setPosition(cc.p(0, size.height-40));
        this.addChild(topMenu, 11);
        
        
        
        
        
        
        var sprite = new cc.Sprite.create(asset.lab_char_1_frente_png); // Carregando imagem do personagem.
        sprite.setAnchorPoint( cc.p( 0, 0 ) );             // Será inserido posteriormente
        
        var sombra = new cc.Sprite.create(asset.labirinto_sombra_png); // Carregando imagem do personagem.
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
        
        var string = 
            [[5,0,1,2,1,1,1,1,1,1,0,1],
             [1,0,2,0,0,0,0,0,0,1,0,1],
             [1,0,1,0,1,0,1,1,0,1,0,1],
             [2,0,0,1,0,1,0,1,0,0,0,0],
             [0,1,2,0,0,0,0,1,1,1,1,1],
             [1,1,1,1,1,1,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,1,1,0,1,0],
             [1,0,1,1,1,1,0,0,1,0,1,1],
             [0,0,1,0,0,0,2,1,0,0,0,0],
             [1,0,1,0,1,1,1,1,1,1,1,0],
             [1,0,1,0,0,0,0,0,0,0,1,0],
             [1,1,1,1,1,1,2,1,1,0,1,0],
             [0,0,0,0,0,0,0,1,0,0,0,1],
             [0,1,0,1,0,1,1,0,0,1,0,1],
             [2,1,1,1,0,0,0,1,1,1,1,1],
             [0,0,0,0,1,0,1,2,0,0,0,1],
             [1,0,1,0,1,1,1,0,1,1,0,1],
             [1,0,1,0,0,0,0,0,0,1,0,1],
             [0,0,1,0,1,0,1,1,0,1,3,1]];
        
        var currentSpritePosition = [0,0];
        
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
                    var back = new cc.Sprite.create(asset.labirinto_grama_png);
                    back.setAnchorPoint( cc.p( 0, 0 ) );
                    back.setPosition(cc.p(elemento * 40, linha * 40));
                    back.zPosition = -1;
                    this.addChild(back);
                if ( string[ linha ][ elemento ] == 1 ) {
                    s = new cc.Sprite.create( asset.labirinto_parede_png );
                    s.setAnchorPoint( cc.p( 0, 0 ) );
                    s.setPosition( cc.p( elemento * 40, linha * 40 ) );
                    
                    this.addChild( s, 0);
                    wallSpritesArray.push([s, [elemento, linha]]);
                }
                
                else {
                    
                    if ( string[ linha ][ elemento ] == 2 ) { // Adicionando questão
                        s = new cc.Sprite.create( asset.labirinto_questao_png );
                        s.setAnchorPoint( cc.p( 0, 0 ) );
                        s.setPosition( cc.p( elemento * 40, linha * 40 ) );
                        objectsSpritesArray.push([s, [elemento, linha]]);
                        this.addChild( s, 1 );
                        objectsSpritesArray.push([s, [elemento, linha]]);
                    }
                    else{
                        if ( string[ linha ][ elemento ] == 3 ) { // Adicionando saída
                            s = new cc.Sprite.create( asset.labirinto_escola_saida_png );
                            s.setAnchorPoint( cc.p( 0, 0 ) );
                            s.setPosition( cc.p( elemento * 40, linha * 40 ) );
                            this.addChild( s, 1 );
                            objectsSpritesArray.push([s, [elemento, linha]]);
                    
                        }
                        else{
                            if(string[ linha ][ elemento ] == 5){
                                if(INITTIALAZED===false){

                                    INITTIALAZED = true;
                                    sprite.setPosition(cc.p(elemento*40, linha*40));
                                    this.addChild(sprite, 10);
                                    sombra.setPosition(cc.p(elemento*40, linha*40));
                                    this.addChild(sombra, 10, 0); // zOrder = 10, Tag = 0
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
            ////cc.log("Entrou");
            var newBackgroundTile = new cc.Sprite.create(asset.labirinto_grama_png); // Adicionando background
            newBackgroundTile.setAnchorPoint(cc.p( 0, 0 ));
            newBackgroundTile.setPosition(cc.p(currentSpritePosition[0]*40, currentSpritePosition[1]*40));
            HelloWorldLayer.addChild(newBackgroundTile, 2);    
        }
        
        function objectAction(value){
            if(value===2){
                play();
                return false; // O jogo continua (está confuso, mas com false o jogo continua)
            }else{
                if (value==3){
                    isFirstMovement = 100;
                    endGame();
                    var sombraSumir = cc.FadeOut.create(1);
                    var sombraSumirTamanho = cc.ScaleBy.create(1,20,20);
                    sombra.runAction(sombraSumirTamanho);
                    return 100; // O jogo não continua
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
            var result = objectAction(targetValue); // Decide se termina o jogo, mostra uma pergunta, ou se não faz                                                                  //  nada e remove o sprite
            return result;
        }
        function moveUp(){
            var oldSpritePosition = [currentSpritePosition[0]][currentSpritePosition[1]];
            var targetValue = string[currentSpritePosition[0]+1][currentSpritePosition[1]];
            string[currentSpritePosition[0]][currentSpritePosition[1]] = 0;
            string[currentSpritePosition[0]+1][currentSpritePosition[1]] = 5;
            currentSpritePosition = [currentSpritePosition[0]+1, currentSpritePosition[1]];
            var result = objectAction(targetValue); // Decide se termina o jogo, mostra uma pergunta, ou se não faz                                                                  //  nada e remove o sprite
            return result;
        }
        function moveDown(){
            var oldSpritePosition = [currentSpritePosition[0]][currentSpritePosition[1]];
            var targetValue = string[currentSpritePosition[0]-1][currentSpritePosition[1]];
            string[currentSpritePosition[0]][currentSpritePosition[1]] = 0;
            string[currentSpritePosition[0]-1][currentSpritePosition[1]] = 5;
            currentSpritePosition = [currentSpritePosition[0]-1, currentSpritePosition[1]];
            var result = objectAction(targetValue); // Decide se termina o jogo, mostra uma pergunta, ou se não faz                                                                  //  nada e remove o sprite
            return result;
        }
        
        var isFirstMovement = true;
        if (cc.sys.capabilities.hasOwnProperty('accelerometer')){
            cc.inputManager.setAccelerometerInterval(1/5);
            cc.inputManager.setAccelerometerEnabled(true);
            
            cc.eventManager.addListener({
                event: cc.EventListener.ACCELERATION,
                callback: function(accelEvent, event){
                    
                    if(isFirstMovement===100){
                    }else{
                        if(!isFirstMovement){
                            delay(200);
                        }
                        isFirstMovement = false;
                }

                    
                    if(isFirstMovement===100){
                        
                    }else{
                        var aumentarLuz = cc.ScaleBy.create(1,20,20);
                        var novoBackground; // Para remover objetos de desafio do mapa
                        var novaPergunta; // Para remover objetos de desafio do mapa
                        var perguntaRespondida; // Para substituir o ícone da pergunta
                        if (accelEvent.x<-0.2){



                                    ////cc.log("Move Left!");
                                    if( (currentSpritePosition[1]>0) && 
                                        (string[currentSpritePosition[0]][currentSpritePosition[1]-1]!==1) ){
                                        ////cc.log("Pode mover para a esquerda!");
                                        sprite.runAction(sequenceMoveLeft);
                                        sombra.runAction(sequenceSombraMoveLeft);
                                        isFirstMovement = moveLeft(); // Move left in the string
                                        if(isFirstMovement===false){
                                            novoBackground = cc.Sprite.create(asset.labirinto_grama_png);
                                            novoBackground.setAnchorPoint(cc.p(0,0));
                                            novoBackground.setPosition(cc.p(40*currentSpritePosition[1],                                                                                                     40*currentSpritePosition[0]));
                                            (sprite.parent).addChild(novoBackground,5);
                                            perguntaRespondida = cc.Sprite.create(asset.labirinto_questao_respondida_png);
                                            perguntaRespondida.setAnchorPoint(cc.p(0,0));
                                            perguntaRespondida.setPosition(cc.p(40*currentSpritePosition[1],                                                                                                     40*currentSpritePosition[0]));
                                            (sprite.parent).addChild(perguntaRespondida,5);
                                            }
                                    }else{
                                        ////cc.log("Impossível mover para a esquerda!");


                                    }

                            }

                        if (accelEvent.x>0.2){
                                ////cc.log("Move Right!");
                                if( (currentSpritePosition[1]<11) && 
                                        (string[currentSpritePosition[0]][currentSpritePosition[1]+1]!==1) ){
                                            ////cc.log("Pode mover para a direita!");
                                            sprite.runAction(sequenceMoveRight);
                                            sombra.runAction(sequenceSombraMoveRight);  
                                            isFirstMovement = moveRight(); // Move right in the string
                                            if(isFirstMovement===false){
                                                novoBackground = cc.Sprite.create(asset.labirinto_grama_png);
                                                novoBackground.setAnchorPoint(cc.p(0,0));
                                                novoBackground.setPosition(cc.p(40*currentSpritePosition[1],                                                                                                     40*currentSpritePosition[0]));
                                                (sprite.parent).addChild(novoBackground,5);
                                                perguntaRespondida = cc.Sprite.create(asset.labirinto_questao_respondida_png);
                                                perguntaRespondida.setAnchorPoint(cc.p(0,0));
                                                perguntaRespondida.setPosition(cc.p(40*currentSpritePosition[1],                                                                                                     40*currentSpritePosition[0]));
                                                (sprite.parent).addChild(perguntaRespondida,5);
                                                
                                            }
                                    


                                    }else{
                                        ////cc.log("Impossível mover para a direita!!");
                                    }

    //                        }
                        }
                        if (accelEvent.y<-0.2){
                                ////cc.log("Move Down!");
                                if( (currentSpritePosition[0]>0) && 
                                    (string[currentSpritePosition[0]-1][currentSpritePosition[1]]!==1) ){
                                   
                                    ////cc.log("Pode mover para a baixo!");  
                                    
                                    sprite.runAction(sequenceMoveDown);
                                    sombra.runAction(sequenceSombraMoveDown);
                                    isFirstMovement = moveDown(); // Move down in the string
                                    if(isFirstMovement===false){
                                            novoBackground = cc.Sprite.create(asset.labirinto_grama_png);
                                            novoBackground.setAnchorPoint(cc.p(0,0));
                                            novoBackground.setPosition(cc.p(40*currentSpritePosition[1],                                                                                                     40*currentSpritePosition[0]));
                                            (sprite.parent).addChild(novoBackground,5);
                                            perguntaRespondida = cc.Sprite.create(asset.labirinto_questao_respondida_png);
                                            perguntaRespondida.setAnchorPoint(cc.p(0,0));
                                            perguntaRespondida.setPosition(cc.p(40*currentSpritePosition[1],                                                                                                     40*currentSpritePosition[0]));
                                            (sprite.parent).addChild(perguntaRespondida,5);
                                            //if conseguiu pontuação máxima
                                           
//                                            sombra.runAction(aumentarLuz);
                                            
                                    }

                                    }else{
                                        ////cc.log("Impossível mover para a baixo!!");

                                    }

    //                        }
                        }
                        if (accelEvent.y>0.2){
                                ////cc.log("Move Up!");
                            if( (currentSpritePosition[0]<18) && 
                                        (string[currentSpritePosition[0]+1][currentSpritePosition[1]]!==1) ){

                                        ////cc.log("Pode mover para a cima!");
                                        sprite.runAction(sequenceMoveUp);
                                        sombra.runAction(sequenceSombraMoveUp);
                                        isFirstMovement = moveUp(); // Move up in the string
                                if(isFirstMovement===false){
                                            novoBackground = cc.Sprite.create(asset.labirinto_grama_png);
                                            novoBackground.setAnchorPoint(cc.p(0,0));
                                            novoBackground.setPosition(cc.p(40*currentSpritePosition[1],                                                                                                     40*currentSpritePosition[0]));
                                            (sprite.parent).addChild(novoBackground,5);
                                            perguntaRespondida = cc.Sprite.create(asset.labirinto_questao_respondida_png);
                                                perguntaRespondida.setAnchorPoint(cc.p(0,0));
                                                perguntaRespondida.setPosition(cc.p(40*currentSpritePosition[1],                                                                                                     40*currentSpritePosition[0]));
                                                (sprite.parent).addChild(perguntaRespondida,5);
                                            perguntaRespondida = cc.Sprite.create(asset.labirinto_questao_respondida_png);
                                            perguntaRespondida.setAnchorPoint(cc.p(0,0));
                                            perguntaRespondida.setPosition(cc.p(40*currentSpritePosition[1],                                                                                                     40*currentSpritePosition[0]));
                                            (sprite.parent).addChild(perguntaRespondida,5);
                                            
                                            }
                                    }else{
                                        ////cc.log("Impossível mover para a Cima!!");

                                    }

                        }
                    
                    }
                    
                }
            }, this);
        }
        
        return true;
    },
    
    pausar: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                pause();
                break;
        }
    },
    
  
});



function delay(ms) {
           ms += new Date().getTime();
           while (new Date() < ms){}
        }

function play(){
    var sceneq = new QuestionScene();
    cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,sceneq));    
    
}

function pause(){
    var scenep = new PauseScene();
    cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,scenep));    
    //if(pause_exit_game===true){
    //    cc.director.popScene();
    //}
    
}



function endGame(){
    if (pontuacao>=700){
        pontuacao = 0;
        var fimVerde = new FimVerdeScene();
        cc.director.pushScene(new cc.TransitionZoomFlipAngular(2,fimVerde));    
    }else{
        pontuacao = 0;
        var fimVermelho = new FimVermelhoScene();
        cc.director.pushScene(new cc.TransitionZoomFlipAngular(2,fimVermelho));    
    }
//    alert("End game!");
    
}


var closeGame = function(){
};






var LabirintoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        if (INITTIALAZED===false){
            this._super();
            var labirintolayer = new LabirintoLayer();
            layerCopiaExterno = labirintolayer;
            var sc = new cc.ScaleBy(20);
            labirintolayer.runAction(sc);
            this.addChild(labirintolayer);
            labirintolayer.setScale(5);
        }
    }
});




// Scene two
