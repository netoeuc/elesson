/* globals cc, asset */


var INITTIALIZED_pause = false;

var PauseLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        var size = cc.winSize;
        
        
        
        
        var backgroundPause = new cc.Sprite.create(asset.pause_background_png); 
        backgroundPause.setAnchorPoint(cc.p( 0, 0 ));
        backgroundPause.setPosition(cc.p(0, 0));
        this.addChild(backgroundPause, -1);
        
        var voltarButton = new ccui.Button();
        voltarButton.loadTextures(asset.pause_decline_png);
        voltarButton.setAnchorPoint(cc.p(0,0));
        voltarButton.setPosition(cc.p(60, 50));
//        voltarButton.x = (size.width/2);
//        voltarButton.y = (size.heigth/2);
        voltarButton.addTouchEventListener(this.voltarAoJogo, this);
        this.addChild(voltarButton);
        
        var sairButton = new ccui.Button();
        sairButton.loadTextures(asset.pause_accept_png);
        sairButton.setAnchorPoint(cc.p(0,0));
        sairButton.setPosition(cc.p(270, 50));
        sairButton.addTouchEventListener(this.sairDoJogo, this);
        this.addChild(sairButton);
        

        
        
        
        return true;
    },
    
    selectedStateEvent: function(sender, type){
        switch(type){
                case ccui.CheckBox.EVENT_UNSELECTED:
                    break;
                 case ccui.CheckBox.EVENT_SELECTED:
                    break;
        }
    },
    
    voltarAoJogo: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                //pop();
                cc.director.popScene();
                break;
        }
    },
    
    sairDoJogo: function(sender, type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                pause_exit_game = false;
                var pause_exit_game = false; // Para sair do jogo a partir do pause
                //var pontuacao = 0;
                
                vermelhoJaFoiEscolhido = false;
                verdeJaFoiEscolhido = false;
                amareloJaFoiEscolhido = false;
                azulJaFoiEscolhido = false;
                INITTIALIZED_plat = false;
                finished = false;
                respostaPlataformaAtual;
                pontuacaoPlataforma = 0;
                chances = 3;
                contadorFimPlataforma = 5;
                incrementoPlataforma = 0;
                pontuacao = 0;
                pontuacaoPlataforma = 0;

                INITTIALIZED_Acel = false;
                INITTIALIZED_histplat = false;
                INITTIALIZED_plat = false;
                INITTIALIZED_histplat = false;
                INITTIALIZED_toque = false;
                INITTIALAZED = false;
                cc.audioEngine.end();
                //cc.director.popToSceneStackLevel(2);
                INITTIALIZED_minimapa=false;
                incrementoPost = 0;
//                idLabirintoAtual = Number(idLabirintoAtual)+1;
                idLabirintoAtual = Math.floor((Math.random() * 100) + 1)%31;
                if(idLabirintoAtual>30){
                        idLabirintoAtual = 0;
                    }
                
                if(tentativas===1){ // para ter 3 tentativas, checagem deve ser feita no 1
                    tentativas = 3;
                    status=Number(status)+1;
                    userInfo.setItem("status",Number(userInfo.getItem("status"))+1);
//                    idLabirintoAtual=Number(idLabirintoAtual)+1;
                    //cc.log("pausePOST");
                    var sairDoJogoScene = new PausePOSTScene();
                    cc.director.runScene(sairDoJogoScene);
                    // POST (não passou)
                }else{
                    tentativas-=1;
                    var sairDoJogoScene = new MiniMapScene1();
                    cc.director.runScene(sairDoJogoScene);
//                    idLabirintoAtual = Number(idLabirintoAtual)+1;
                }
                
                
                
                //pop();
                break;
        }
    }
    
});

    

var popPause = function(){
//    if (pause_exit_game===true){
//        //cc.log(pause_exit_game);
//        cc.audioEngine.end();
//        cc.director.popToSceneStackLevel(0);
//    }else{
//        //cc.log("else");
//        // substituir
//        //cc.director.popScene();
//        cc.director.pushScene(); // 1 -> mapa, 2 -> minimapa, 3 -> labirinto/plataforma, 4 -> pause     
//    }
    cc.director.popScene();
    
    
};
var PauseScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_pause = true;
            this._super();
            var pauselayer = new PauseLayer();
            this.addChild(pauselayer);
    }
});