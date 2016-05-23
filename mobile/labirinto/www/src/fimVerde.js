/* globals cc, asset */

var INITTIALIZED_fimverde = false;
var FimVerdeLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        var size = cc.winSize;
        
        var backgroundVerde = new cc.Sprite.create(asset.telaFim_green_png); 
        backgroundVerde.setAnchorPoint(cc.p( 0, 0 ));
        backgroundVerde.setPosition(cc.p(0, 0));
        this.addChild(backgroundVerde, -1);
        
        var backToMap2 = new ccui.Button();
        backToMap2.loadTextures(asset.telaFim_buttonMap_png);
        backToMap2.setAnchorPoint(cc.p(0,0));  
        backToMap2.setPosition(cc.p(120, 200));
        this.addChild(backToMap2);
        
        var tryAgain2 = new ccui.Button();
        tryAgain2.loadTextures(asset.telaFim_buttonTryAgain_png);
        tryAgain2.setAnchorPoint(cc.p(0,0));  
        tryAgain2.setPosition(cc.p(260, 200));
        this.addChild(tryAgain2);
        
        
        // APLICAR AS MUDANCAS NO ARQUIVO/BANCO AQUI
        // ENVIAR PARA O SERVIDOR (POST)
        
        
        return true;
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

