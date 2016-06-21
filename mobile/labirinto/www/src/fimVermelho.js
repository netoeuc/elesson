/* globals cc, asset */
var perdeu = false;
var INITTIALIZED_vermelho = false;
var FimVermelhoLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        // reproduzir efeito sonoro (não venceu)
        
        var size = cc.winSize;
        perdeu = false;
        

        var backgroundVermelho = new cc.Sprite.create(asset.telaFim_red_png); 
        backgroundVermelho.setAnchorPoint(cc.p( 0, 0 ));
        backgroundVermelho.setPosition(cc.p(0, 0));
        this.addChild(backgroundVermelho, -1);
        
        
        var backToMap1 = new ccui.Button();
        backToMap1.loadTextures(asset.telaFim_buttonMap_png);
        backToMap1.setAnchorPoint(cc.p(0,0));  
        backToMap1.setPosition(cc.p(100, 100));
        backToMap1.addTouchEventListener(this.sairDoJogo3, this);
        this.addChild(backToMap1);
        
        
        
        // APLICAR AS MUDANCAS NO ARQUIVO/BANCO AQUI
        
        
        if(tentativas===1){ // para ter 3 tentativas, checagem deve ser feita no 1
            perdeu = true;
            tentativas = 3;
            resultadoParaPost.resultado.level = status;
            status=Number(status)+1;
            userInfo.setItem("status",Number(userInfo.getItem("status"))+1);
//            idLabirintoAtual=Number(idLabirintoAtual)+1;
            idLabirintoAtual = Math.floor((Math.random() * 100) + 1)%31;
            // POST(resultadoParaPost);
            // POST (não passou);
        }else{
            tentativas-=1;
//            idLabirintoAtual = Number(idLabirintoAtual)+1;
            idLabirintoAtual = Math.floor((Math.random() * 100) + 1)%31;
        }
        
        
        return true;
    },
    
    sairDoJogo3: function(sender, type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                pause_exit_game = false;
                var pause_exit_game = false; // Para sair do jogo a partir do pause
                //var pontuacao = 0;
                
                
                idLabirintoAtual = Math.floor((Math.random() * 100) + 1)%31;
                if (idLabirintoAtual===31){
                    idLabirintoAtual = Math.floor((Math.random() * 100) + 1)%31;
                }
        
                INITTIALIZED_Acel = false;
                INITTIALIZED_histplat = false;
                INITTIALAZED = false;
                cc.audioEngine.end();
                //cc.director.popToSceneStackLevel(2);
                INITTIALIZED_minimapa = false;
//                var minimapa = new MiniMapScene1();
//                cc.director.runScene(minimapa);
                if (perdeu){
                    var sairDoJogoSceneFimVermelho = new FimVermelhoPOSTScene();
                    cc.director.runScene(sairDoJogoSceneFimVermelho);
                }else{
                    var minimapa = new MiniMapScene1();
                    cc.director.runScene(minimapa);
                }
                //pop();
                break;
        }
    },
    
    selectedStateEvent: function(sender, type){
        switch(type){
                case ccui.CheckBox.EVENT_UNSELECTED:
                    //////cc.log("Not Selected");
                    //////cc.log(sender.isSelected());
                    break;
                 case ccui.CheckBox.EVENT_SELECTED:
                    //////cc.log("Selected");
                    break;
        }
    },
    
    
    
});

    


var FimVermelhoScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_vermelho = true;
            this._super();
            var fimvermelholayer = new FimVermelhoLayer();
            this.addChild(fimvermelholayer);
    }
});

