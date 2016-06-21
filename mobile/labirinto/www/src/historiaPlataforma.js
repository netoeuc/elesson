/* globals cc, asset */

var INITTIALIZED_histplat = false;
var HistoriaPlataformaLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        cc.audioEngine.end();
        cc.audioEngine.playMusic(asset.plataforma_musica_mp3, true);
        
        
        
        var backgroundHistoriaPlataforma = new cc.Sprite.create(asset.telaInicio_historiaPlataforma_png); 
        backgroundHistoriaPlataforma.setAnchorPoint(cc.p( 0, 0 ));
        backgroundHistoriaPlataforma.setPosition(cc.p(0, 0));
        this.addChild(backgroundHistoriaPlataforma, -1);
        
        
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
                var cenaTouch = new TouchScene();
                cc.director.pushScene(new cc.TransitionMoveInR(0.5,cenaTouch));
                break;
        }
    },
    
    
    
});

    


var HistoriaPlataformaScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_histplat = true;
            this._super();
            var historiaplataformalayer = new HistoriaPlataformaLayer();
            this.addChild(historiaplataformalayer);
    }
});

