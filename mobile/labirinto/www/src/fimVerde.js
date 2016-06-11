/* globals cc, asset */

var INITTIALIZED_fimverde = false;
var FimVerdeLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        // reproduzir efeito sonoro (venceu)
        
        var size = cc.winSize;
        
        var backgroundVerde = new cc.Sprite.create(asset.telaFim_green_png); 
        backgroundVerde.setAnchorPoint(cc.p( 0, 0 ));
        backgroundVerde.setPosition(cc.p(0, 0));
        this.addChild(backgroundVerde, -1);
        
        var backToMap2 = new ccui.Button();
        backToMap2.loadTextures(asset.telaFim_buttonMap_png);
        backToMap2.setAnchorPoint(cc.p(0,0));  
        backToMap2.setPosition(cc.p(100, 100));
        backToMap2.addTouchEventListener(this.sairDoJogo2, this);
        this.addChild(backToMap2);
        
        
        
        // APLICAR AS MUDANCAS NO ARQUIVO/BANCO AQUI
        // ENVIAR PARA O SERVIDOR (POST)
        
        tentativas = 3;
        resultadoParaPost.resultado.level = status;
        status=Number(status)+1;
        userInfo.setItem("status",Number(userInfo.getItem("status"))+1);
//        idLabirintoAtual = Number(idLabirintoAtual)+1;
        idLabirintoAtual = Math.floor((Math.random() * 100) + 1)%31;;
        // POST(resultadoParaPost);
//        var sairDoJogoSceneFimVerde = new FimVerdePOSTScene();
//        cc.director.runScene(sairDoJogoSceneFimVerde);
        
        // POST (passou de fase!)
        
        
        return true;
    },
    
    sairDoJogo2: function(sender, type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                pause_exit_game = false;
                var pause_exit_game = false; // Para sair do jogo a partir do pause
                //var pontuacao = 0;
                //idLabirintoAtual = Number(idLabirintoAtual)+1;
                if (idLabirintoAtual===31){
//                    idLabirintoAtual = 0;
                    idLabirintoAtual = Math.floor((Math.random() * 100) + 1)%31;;
                }
                INITTIALIZED_Acel = false;
                INITTIALIZED_histplat = false;
                INITTIALAZED = false;
                cc.audioEngine.end();
                //cc.director.popToSceneStackLevel(2);
                INITTIALIZED_minimapa = false;
                //var minimapa = new MiniMapScene1();
                //cc.director.runScene(minimapa);
                
                var sairDoJogoSceneFimVerde = new FimVerdePOSTScene();
                cc.director.runScene(sairDoJogoSceneFimVerde);
        
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

    


var FimVerdeScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_fimverde = true;
            this._super();
            var fimverdelayer = new FimVerdeLayer();
            this.addChild(fimverdelayer);
    }
});

