/* globals cc, asset */

var INITTIALIZED_historiaApp3 = false;
var HistoriaApp3Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        cc.audioEngine.end();
        cc.audioEngine.playMusic(asset.labirinto_musica_mp3, true);
        
        
        var backgroundHistoriaLabirinto = new cc.Sprite.create(asset.telaInicio_historiaApp3_png); 
        backgroundHistoriaLabirinto.setAnchorPoint(cc.p( 0, 0 ));
        backgroundHistoriaLabirinto.setPosition(cc.p(0, 0));
        this.addChild(backgroundHistoriaLabirinto, -1);
        
        cc.log("está aqui");
        
        var next1 = new ccui.Button();
        next1.loadTextures(asset.telaFim_buttonMap_png);
        next1.setAnchorPoint(cc.p(0,0));  
        next1.setPosition(cc.p(100, 50));
        next1.addTouchEventListener(this.touchEvent, this);
        this.addChild(next1);
        
      
        
        
        return true;
    },
    
    
    
    
     touchEvent: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                var cenaApp3Global = new GlobalMapScene();
                cc.director.pushScene(new cc.TransitionMoveInR(0.5,cenaApp3Global));
                break;
        }
    },
    
    
    
});

    


var HistoriaApp3Scene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_historiaApp3 = true;
            this._super();
            var historiaApp3layer = new HistoriaApp3Layer();
            this.addChild(historiaApp3layer);
    }
});

