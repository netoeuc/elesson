  


/* globals cc, asset */

var INITTIALIZED_CertificateLayer = false;
var CertificateLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        var fimDeJogo = new cc.Sprite.create(asset.tela_fim_jogo_png);
        fimDeJogo.setAnchorPoint(cc.p(0,0));
        fimDeJogo.setPosition(cc.p(0,0));
        this.addChild(fimDeJogo);    
      
        
        
        return true;
    },
    
    
    
    
     
    
    
    
});

    


var CertificateScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_historiaLab = true;
            this._super();
            var certificateLayerlayer = new CertificateLayer();
            this.addChild(certificateLayerlayer);
    }
});

