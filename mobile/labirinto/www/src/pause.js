/* globals cc, asset */


var INITTIALIZED_pause = false;

var PauseLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        var size = cc.winSize;
        
        
        
        
        var voltarButton = new ccui.Button();
        voltarButton.loadTextures(asset.pause_backButton_gif);
        voltarButton.setAnchorPoint(cc.p(0,0));
        voltarButton.setPosition(cc.p((size.width/2)-80,size.height/2 ));
//        voltarButton.x = (size.width/2);
//        voltarButton.y = (size.heigth/2);
        voltarButton.addTouchEventListener(this.voltarAoJogo, this);
        this.addChild(voltarButton);
        
        var sairButton = new ccui.Button();
        sairButton.loadTextures(asset.pause_close_png);
        sairButton.setAnchorPoint(cc.p(0,0));
        sairButton.setPosition(cc.p((size.width/2)+40,size.height/2 ));
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
                pop();
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
                
                INITTIALIZED_Acel = false;
                INITTIALIZED_histplat = false;
                INITTIALAZED = false;
                cc.audioEngine.end();
                cc.director.popToSceneStackLevel(2);
                //pop();
                break;
        }
    }
    
});

    

var pop = function(){
    if (pause_exit_game===true){
        cc.log(pause_exit_game);
        cc.audioEngine.end();
        cc.director.popToSceneStackLevel(0);
    }else{
        cc.log("else");
        // substituir
        //cc.director.popScene();
        cc.director.pushScene(); // 1 -> mapa, 2 -> minimapa, 3 -> labirinto/plataforma, 4 -> pause     
    }
    
    
};
var PauseScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_pause = true;
            this._super();
            var pauselayer = new PauseLayer();
            this.addChild(pauselayer);
    }
});

