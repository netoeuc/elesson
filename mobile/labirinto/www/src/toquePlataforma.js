/* globals cc, asset */

var INITTIALIZED_toque = false;
var TouchLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        
        
        var backgroundHistoriaPlataforma = new cc.Sprite.create(asset.telaInicio_touchLabirinto_png); 
        backgroundHistoriaPlataforma.setAnchorPoint(cc.p( 0, 0 ));
        backgroundHistoriaPlataforma.setPosition(cc.p(0, 0));
        this.addChild(backgroundHistoriaPlataforma, -1);
        
        
        
        var next2 = new ccui.Button();
        next2.loadTextures(asset.telaFim_buttonMap_png);
        next2.setAnchorPoint(cc.p(0,0));  
        next2.setPosition(cc.p(100, 50));
        next2.addTouchEventListener(this.touchEvent, this);
        this.addChild(next2);
        
      
        
        
        return true;
    },
    
    touchEvent: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                var cenaLabirinto = new PlataformaScene();
                cc.director.pushScene(new cc.TransitionMoveInR(0.5,cenaLabirinto));
                break;
        }
    },
    
});

    


var TouchScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_toque = true;
            this._super();
            var touchlayer = new TouchLayer();
            this.addChild(touchlayer);
    }
});

