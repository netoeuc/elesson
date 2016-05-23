/* globals cc, asset */

var INITTIALIZED_Acel = false;
var AcelerometroLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        
        
        var backgroundHistoriaLabirinto = new cc.Sprite.create(asset.telaInicio_acelerometroLabirinto_png); 
        backgroundHistoriaLabirinto.setAnchorPoint(cc.p( 0, 0 ));
        backgroundHistoriaLabirinto.setPosition(cc.p(0, 0));
        this.addChild(backgroundHistoriaLabirinto, -1);
        
        cc.log("está aqui");
        
        var next2 = new ccui.Button();
        next2.loadTextures(asset.telaFim_buttonMap_png);
        next2.setAnchorPoint(cc.p(0,0));  
        next2.setPosition(cc.p(350, 50));
        next2.addTouchEventListener(this.touchEvent, this);
        this.addChild(next2);
        
      
        
        
        return true;
    },
    
    touchEvent: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                var cenaLabirinto = new LabirintoScene();
                cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,cenaLabirinto));
                break;
        }
    },
    
});

    


var AcelerometroScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_Acel = true;
            this._super();
            var acelerometrolayer = new AcelerometroLayer();
            this.addChild(acelerometrolayer);
    }
});

