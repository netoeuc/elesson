/* globals cc, asset */
var stopGame = false;
var vermelhoJaFoiEscolhido = false;
var verdeJaFoiEscolhido = false;
var amareloJaFoiEscolhido = false;
var azulJaFoiEscolhido = false;
var INITTIALIZED_plat = false;
var finished = false;
var respostaPlataformaAtual;
var pontuacaoPlataforma = 0;
var chances = 3;
var idQuestaoAtual;
var idQuestaoAtualPlataforma;
var PlataformaLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        var sizePlataforma = cc.winSize;
        
        
        
        var respostaAtual;
        
        
        var alternativaTemp;
        switch (numeroPerguntaQuizLabirinto){
            case 0:
                cc.log("numeroPerguntaQuizLabirinto = 0");
                alternativaTemp = userInfo.getItem("pergunta1_respostaCerta");
                switch (alternativaTemp){
                    case 'a':
                        respostaDesafioPlataforma = 0;
                        break;
                    case 'b':
                        respostaDesafioPlataforma = 1;
                        break;
                    case 'c':
                        respostaDesafioPlataforma = 2;
                        break;
                    case 'd':
                        respostaDesafioPlataforma = 3;
                        break;
                    case 'e':
                        respostaDesafioPlataforma = 3;
                        break;
                }
                    
                break;
            case 1:
                cc.log("numeroPerguntaQuizLabirinto = 1");
                alternativaTemp = userInfo.getItem("pergunta2_respostaCerta");
                switch (alternativaTemp){
                    case 'a':
                        respostaDesafioPlataforma = 0;
                        break;
                    case 'b':
                        respostaDesafioPlataforma = 1;
                        break;
                    case 'c':
                        respostaDesafioPlataforma = 2;
                        break;
                    case 'd':
                        respostaDesafioPlataforma = 3;
                        break;
                    case 'e':
                        respostaDesafioPlataforma = 3;
                        break;
                }
                break;
            case 2:
                cc.log("numeroPerguntaQuizLabirinto = 2");
                alternativaTemp = userInfo.getItem("pergunta3_respostaCerta");
                switch (alternativaTemp){
                    case 'a':
                        respostaDesafioPlataforma = 0;
                        break;
                    case 'b':
                        respostaDesafioPlataforma = 1;
                        break;
                    case 'c':
                        respostaDesafioPlataforma = 2;
                        break;
                    case 'd':
                        respostaDesafioPlataforma = 3;
                        break;
                    case 'e':
                        respostaDesafioPlataforma = 3;
                        break;
                }
                break;
            case 3:
                cc.log("numeroPerguntaQuizLabirinto = 3");
                alternativaTemp = userInfo.getItem("pergunta4_respostaCerta");
                switch (alternativaTemp){
                    case 'a':
                        respostaDesafioPlataforma = 0;
                        break;
                    case 'b':
                        respostaDesafioPlataforma = 1;
                        break;
                    case 'c':
                        respostaDesafioPlataforma = 2;
                        break;
                    case 'd':
                        respostaDesafioPlataforma = 3;
                        break;
                    case 'e':
                        respostaDesafioPlataforma = 3;
                        break;
                }
                break;
            case 4:
                cc.log("numeroPerguntaQuizLabirinto = 4");
                alternativaTemp = userInfo.getItem("pergunta5_respostaCerta");
                switch (alternativaTemp){
                    case 'a':
                        respostaDesafioPlataforma = 0;
                        break;
                    case 'b':
                        respostaDesafioPlataforma = 1;
                        break;
                    case 'c':
                        respostaDesafioPlataforma = 2;
                        break;
                    case 'd':
                        respostaDesafioPlataforma = 3;
                        break;
                    case 'e':
                        respostaDesafioPlataforma = 3;
                        break;
                }
                break;


        }
        
        
        
        
        var pontuacaoLabel = new cc.LabelTTF("Worth: "+ ((chances)*80) +" points","Arial");
        pontuacaoLabel.setFontSize(15);
        pontuacaoLabel.setPosition(cc.p(sizePlataforma.width-70, sizePlataforma.height-60));
        this.addChild(pontuacaoLabel, 1, 2); //zOrder = 1, Tag = 2
        
       var questionLabelPlataforma = new ccui.RichText();
        questionLabelPlataforma.ignoreContentAdaptWithSize(false);
        questionLabelPlataforma.width = sizePlataforma.width-100;
        questionLabelPlataforma.height = sizePlataforma.height-100;
        cc.log((6-contadorFimPlataforma));
        var questionLabel_r1Plataforma = new ccui.RichElementText(1, cc.color.WHITE, 255, "Question "+ (6-contadorFimPlataforma) +":", "Helvetica", 30);
        questionLabelPlataforma.setLineBreakOnSpace(true);
        questionLabelPlataforma.setTextHorizontalAlignment(cc.Text_ALIGNMENT_RIGHT);
        questionLabelPlataforma.pushBackElement(questionLabel_r1Plataforma);
        questionLabelPlataforma.x = ((sizePlataforma.width/2)-40);
        questionLabelPlataforma.y = (sizePlataforma.height/2-80);
        
        this.addChild(questionLabelPlataforma);
        
        
        
        var pontuacaoLabelPlataforma = new cc.LabelTTF("Points: "+pontuacaoPlataforma);
        pontuacaoLabelPlataforma.setFontSize(30);
        pontuacaoLabelPlataforma.setAnchorPoint(cc.p(0,0));
        pontuacaoLabelPlataforma.setPosition(cc.p(10, sizePlataforma.height-40));
        this.addChild(pontuacaoLabelPlataforma, 12, 10); //zOrder = 1, Tag = 10
        
        var closeMenuPlataforma = new ccui.Button();
        closeMenuPlataforma.loadTextures(asset.labirinto_pause_png);
        closeMenuPlataforma.setAnchorPoint(cc.p(0,0));   
        
        closeMenuPlataforma.addTouchEventListener(this.pausar, this);
        closeMenuPlataforma.setPosition(cc.p(sizePlataforma.width-40, sizePlataforma.height-40));
        this.addChild(closeMenuPlataforma, 12);
        
        var topMenuPlataforma = new cc.Sprite.create(asset.labirinto_barra_png); // Adicionando a barra superior para o menu
        topMenuPlataforma.setAnchorPoint(cc.p( 0, 0 ));
        topMenuPlataforma.setPosition(cc.p(0, sizePlataforma.height-40));
        this.addChild(topMenuPlataforma, 11);
        
        
        
        
        var backgroundHistoriaPlataforma2 = new cc.Sprite.create(asset.plataforma_background_png); 
        backgroundHistoriaPlataforma2.setAnchorPoint(cc.p( 0, 0 ));
        backgroundHistoriaPlataforma2.setPosition(cc.p(0, 0));
        this.addChild(backgroundHistoriaPlataforma2, -1);
        
        
        
        var spriteChar = new cc.Sprite.create(asset.lab_char_1_frente_png); 
        spriteChar.setAnchorPoint( cc.p( 0.5, 0.5 ) ); 
        spriteChar.setPosition(cc.p(sizePlataforma.width/2,(sizePlataforma.height/2)-10));
        this.addChild(spriteChar, 10, 0); // tag = 0
        
        
        var tileBlue = new ccui.Button();
        tileBlue.loadTextures(asset.plataforma_blueTileUnselected_png, asset.plataforma_blueTileSelected_png);
        tileBlue.setAnchorPoint(cc.p(0,0));  
        tileBlue.setPosition(cc.p(15, 300));
        tileBlue.addTouchEventListener(this.touchEventBlue, this);
        this.addChild(tileBlue);
        var tileRed = new ccui.Button();
        tileRed.loadTextures(asset.plataforma_redTileUnselected_png, asset.plataforma_redTileSelected_png);
        tileRed.setAnchorPoint(cc.p(0,0));  
        tileRed.setPosition(cc.p(315, 300));
        tileRed.addTouchEventListener(this.touchEventRed, this);
        this.addChild(tileRed);
        var tileGreen = new ccui.Button();
        tileGreen.loadTextures(asset.plataforma_greenTileUnselected_png, asset.plataforma_greenTileSelected_png);
        tileGreen.setAnchorPoint(cc.p(0,0));  
        tileGreen.setPosition(cc.p(165, 450));
        tileGreen.addTouchEventListener(this.touchEventGreen, this);
        this.addChild(tileGreen);
        var tileYellow = new ccui.Button();
        tileYellow.loadTextures(asset.plataforma_yellowTileUnselected_png,asset.plataforma_yellowTileSelected_png);
        tileYellow.setAnchorPoint(cc.p(0,0));  
        tileYellow.setPosition(cc.p(165, 150));
        tileYellow.addTouchEventListener(this.touchEventYellow, this);
        this.addChild(tileYellow);
        
        
        var answerButton = new ccui.Button();
        answerButton.loadTextures(asset.plataforma_botao_seeQuestion_png);
        answerButton.x = sizePlataforma.width/1.3;
        answerButton.y = 45;
        answerButton.addTouchEventListener(this.touchEventPergunta, this);
        this.addChild(answerButton);
        
        
        return true;
    },
    
    
    
    
     touchEventBlue: function(sender,type){

        azulJaFoiEscolhido = true;
        // chances-=1; // apenas no touch_ended
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                chances-=1;
                cc.log("chances = "+chances);
                //finished = true;
                respostaAtual = 3;
                var moverParaAzul = new cc.MoveTo.create(0.2, cc.p(90,375));
                sender.parent.getChildByTag(0).runAction(moverParaAzul);
                delay(0.2);
                //azulJaFoiEscolhido = true;
                if(respostaAtual===respostaDesafioPlataforma){
                    cc.log("correct");
                    cc.audioEngine.playEffect(asset.plataforma_correct_mp3);
                    passarDeFasePlataforma(1); // 1 para "pontuou"
                }else{
                    cc.log("wrong");
                    cc.audioEngine.playEffect(asset.plataforma_wrong_mp3);
                    this.getChildByTag(2).setString("Worth: "+ ((chances)*80) +" points");
                }
                break;
        }
         
        if (chances===0){
            passarDeFasePlataforma(0); // 0 para "nao pontuou"
        }
    },
    touchEventRed: function(sender,type){
        // chances-=1; // apenas no touch_ended
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                chances-=1;
                cc.log("chances = "+chances);
                //finished = true;
                respostaAtual = 0;
                var moverParaVermelho = new cc.MoveTo.create(0.2, cc.p(390,375));
                sender.parent.getChildByTag(0).runAction(moverParaVermelho);
                delay(0.2);
                //vermelhoJaFoiEscolhido = true;
                if(respostaAtual===respostaDesafioPlataforma){
                    cc.log("correct");
                    cc.audioEngine.playEffect(asset.plataforma_correct_mp3);
                    passarDeFasePlataforma(1); // 1 para "pontuou"
                }else{
                    cc.log("wrong");
                    cc.audioEngine.playEffect(asset.plataforma_wrong_mp3);
                    this.getChildByTag(2).setString("Worth: "+ ((chances)*80) +" points");
                }
                break;
            }
        
        if (chances===0){
            passarDeFasePlataforma(0); // 0 para "nao pontuou"
        }
    },
    touchEventYellow: function(sender,type){
        //amareloJaFoiEscolhido = true;
        // chances-=1; // apenas no touch_ended
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                chances-=1;
                cc.log("chances = "+chances);
                //finished = true;
                respostaAtual = 2;
                var moverParaAmarelo = new cc.MoveTo.create(0.2, cc.p(235,225));
                sender.parent.getChildByTag(0).runAction(moverParaAmarelo);
                delay(0.2);
                //amareloJaFoiEscolhido = true;
                if(respostaAtual===respostaDesafioPlataforma){
                    cc.log("correct");
                    cc.audioEngine.playEffect(asset.plataforma_correct_mp3);
                    passarDeFasePlataforma(1); // 1 para "pontuou"
                }else{
                    cc.log("wrong");
                    cc.audioEngine.playEffect(asset.plataforma_wrong_mp3);
                    this.getChildByTag(2).setString("Worth: "+ ((chances)*80) +" points");
                }
                break;
        }
        if (chances===0){
            passarDeFasePlataforma(0); // 0 para "nao pontuou"
        }
    },
    touchEventGreen: function(sender,type){
        verdeJaFoiEscolhido = true;
        //chances-=1; apenas no touchEnded
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                chances-=1;
                cc.log("chances = "+chances);
                //finished = true;
                respostaAtual = 1;
                var moverParaVerde = new cc.MoveTo.create(0.2, cc.p(235,525));
                this.getChildByTag(0).runAction(moverParaVerde);
                //verdeJaFoiEscolhido = true;
                if(respostaAtual===respostaDesafioPlataforma){
                    cc.log("correct");
                    cc.audioEngine.playEffect(asset.plataforma_correct_mp3);
                    passarDeFasePlataforma(1); // 1 para "pontuou"
                }else{
                    cc.log("wrong");
                    cc.audioEngine.playEffect(asset.plataforma_wrong_mp3);
                    this.getChildByTag(2).setString("Worth: "+ ((chances)*80) +" points");
                }
                break;
        }

        
        if (chances===0){
            passarDeFasePlataforma(0); // 0 para "nao pontuou"
        }
    },
    
    touchEventPergunta: function(sender,type){
        var perguntaPlataformaScene = new DesafioPlataformaScene();
        cc.director.pushScene(perguntaPlataformaScene);
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


    
function pause(){
    var scenep = new PauseScene();
    cc.director.pushScene(new cc.TransitionMoveInR(0.5,scenep));    
    //if(pause_exit_game===true){
    //    cc.director.popScene();
    //}
    
}

function delay(ms) {
           ms += new Date().getTime();
           while (new Date() < ms){}
        }

function passarDeFasePlataforma(id){
    
    resultadoParaPost.resultado.respostas[incrementoPlataforma].idQuestao = resultadoParaPost.resultado.respostas[incrementoPlataforma].idQuestao;
    if(id==1){
        resultadoParaPost.resultado.respostas[incrementoPlataforma].pontuacao = ((chances+1)*80);    
    }else{
        resultadoParaPost.resultado.respostas[incrementoPlataforma].pontuacao = 0;
    }
    
    cc.log("Incrementou!");
    cc.log("Questao = "+resultadoParaPost.resultado.respostas[incrementoPlataforma].idQuestao+
           ", Pontuação = "+resultadoParaPost.resultado.respostas[incrementoPlataforma].pontuacao);
    incrementoPlataforma = Number(incrementoPlataforma)+1;
    
    
    
    if(id===1){//pontuou
        pontuacaoPlataforma+= ((chances+1)*80);
    }
    stopGame = false;
    vermelhoJaFoiEscolhido = false;
    verdeJaFoiEscolhido = false;
    amareloJaFoiEscolhido = false;
    azulJaFoiEscolhido = false;
    INITTIALIZED_plat = false;
    finished = false;
    //respostaPlataformaAtual;
    chances = 3;
    contadorFimPlataforma-=1;
    if(contadorFimPlataforma===0){
        incrementoPlataforma=0;
        contadorFimPlataforma = 5;
        endGamePlataforma();
    }else{
        numeroPerguntaQuizLabirinto = Number(numeroPerguntaQuizLabirinto)+1;
        var proximaPlataforma = new PlataformaScene();
        cc.director.runScene(proximaPlataforma);
    }
    
    
}


function endGamePlataforma(){
    if (pontuacaoPlataforma>=560){ // 70% do total (800)
        pontuacaoPlataforma = 0;
        numeroPerguntaQuizLabirinto = 0;
        var fimVerdeplataforma = new FimVerdeScene();
        cc.director.pushScene(new cc.TransitionZoomFlipAngular(2,fimVerdeplataforma));    
    }else{
        pontuacaoPlataforma = 0;
        numeroPerguntaQuizLabirinto = 0;
        var fimVermelhoplataforma = new FimVermelhoScene();
        cc.director.pushScene(new cc.TransitionZoomFlipAngular(2,fimVermelhoplataforma));    
    }
//    alert("End game!");
    
}



var PlataformaScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_plat = true;
            this._super();
            var plataformalayer = new PlataformaLayer();
            this.addChild(plataformalayer);
    }
});

