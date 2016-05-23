/* globals cc, asset */
var stopGame = false;
var INITTIALIZED_plat = false;
var PlataformaLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        
        var backgroundHistoriaPlataforma = new cc.Sprite.create(asset.telaInicio_historiaPlataforma_png); 
        backgroundHistoriaPlataforma.setAnchorPoint(cc.p( 0, 0 ));
        backgroundHistoriaPlataforma.setPosition(cc.p(0, 0));
        this.addChild(backgroundHistoriaPlataforma, -1);
        
        
        var next1 = new ccui.Button();
        next1.loadTextures(asset.telaFim_buttonMap_png);
        next1.setAnchorPoint(cc.p(0,0));  
        next1.setPosition(cc.p(350, 50));
        next1.addTouchEventListener(this.touchEvent, this);
        this.addChild(next1);
        
        var tileBlue = new ccui.Button();
        tileBlue.loadTextures(asset.plataforma_blueTileUnselected_png, asset.plataforma_blueTileSelected_png);
        tileBlue.setAnchorPoint(cc.p(0,0));  
        tileBlue.setPosition(cc.p(15, 300));
        tileBlue.addTouchEventListener(this.touchEvent, this);
        this.addChild(tileBlue);
        var tileRed = new ccui.Button();
        tileRed.loadTextures(asset.plataforma_redTileUnselected_png, asset.plataforma_redTileSelected_png);
        tileRed.setAnchorPoint(cc.p(0,0));  
        tileRed.setPosition(cc.p(315, 300));
        tileRed.addTouchEventListener(this.touchEvent, this);
        this.addChild(tileRed);
        var tileGreen = new ccui.Button();
        tileGreen.loadTextures(asset.plataforma_greenTileUnselected_png, asset.plataforma_greenTileSelected_png);
        tileGreen.setAnchorPoint(cc.p(0,0));  
        tileGreen.setPosition(cc.p(165, 450));
        tileGreen.addTouchEventListener(this.touchEvent, this);
        this.addChild(tileGreen);
        var tileYellow = new ccui.Button();
        tileYellow.loadTextures(asset.plataforma_yellowTileUnselected_png,asset.plataforma_yellowTileSelected_png);
        tileYellow.setAnchorPoint(cc.p(0,0));  
        tileYellow.setPosition(cc.p(165, 150));
        tileYellow.addTouchEventListener(this.touchEvent, this);
        this.addChild(tileYellow);
        
        
        
        return true;
    },
    
    
    
    
     touchEvent: function(sender,type){
        if (!stopGame){
            switch(type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    stopGame = true;
                    var cenaTouch = new TouchScene();
                    cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,cenaTouch));
                    break;
            }
        }
    },
    
    
    
});

    


var PlataformaScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_plat = true;
            this._super();
            var plataformalayer = new PlataformaLayer();
            this.addChild(plataformalayer);
    }
});

