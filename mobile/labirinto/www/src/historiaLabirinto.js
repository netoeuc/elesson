/* globals cc, asset */

var INITTIALIZED_historialab = false;
var HistoriaLabirintoLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        cc.audioEngine.end();
        cc.audioEngine.playMusic(asset.labirinto_musica_mp3, true);
        
        
        var backgroundHistoriaLabirinto = new cc.Sprite.create(asset.telaInicio_historiaLabirinto_png); 
        backgroundHistoriaLabirinto.setAnchorPoint(cc.p( 0, 0 ));
        backgroundHistoriaLabirinto.setPosition(cc.p(0, 0));
        this.addChild(backgroundHistoriaLabirinto, -1);
        
        cc.log("está aqui");
        
        var next1 = new ccui.Button();
        next1.loadTextures(asset.telaFim_buttonMap_png);
        next1.setAnchorPoint(cc.p(0,0));  
        next1.setPosition(cc.p(350, 50));
        next1.addTouchEventListener(this.touchEvent, this);
        this.addChild(next1);
        
      
        
        
        return true;
    },
    
    
    
    
     touchEvent: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                var cenaAcelerometro = new AcelerometroScene();
                cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,cenaAcelerometro));
                break;
        }
    },
    
    
    
});

    


var HistoriaLabirintoScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_historiaLab = true;
            this._super();
            var historialabirintolayer = new HistoriaLabirintoLayer();
            this.addChild(historialabirintolayer);
    }
});

