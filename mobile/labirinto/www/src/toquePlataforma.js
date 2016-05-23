/* globals cc, asset */

var pontuacaoMaximaNaQuestao = 200;
var INITTIALIZED_2 = false;
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
                var cenaLabirinto = new PlataformaScene();
                cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,cenaLabirinto));
                break;
        }
    },
    
});

    

var pop = function(){
    ////cc.log("Foi!");
    // Se acertou de primeira, 200 pontos.
    // Se acertou de segunda, 140 pontos.
    // Se acertou de terceira, 80 pontos.
    pontuacao+=pontuacaoMaximaNaQuestao;
    acertouDePrimeira = (pontuacaoMaximaNaQuestao===200);
    ////cc.log(pontuacaoMaximaNaQuestao);
    ////cc.log(pontuacao);
    pontuacaoMaximaNaQuestao = 200; // para a proxima qeustao
    layerCopiaExterno.getChildByTag(10).setString("Pontos: "+pontuacao);
//    if(acertouDePrimeira){
//        ////cc.log("aumentou sombra");
//        layerCopiaExterno.getChildByTag(0).runAction(cc.ScaleBy.create(0,1.1,1.1));
//    }
    cc.director.popScene();
};
var TouchScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_2 = true;
            this._super();
            var touchlayer = new TouchLayer();
            this.addChild(touchlayer);
    }
});

