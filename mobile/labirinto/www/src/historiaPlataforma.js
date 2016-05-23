/* globals cc, asset */

var pontuacaoMaximaNaQuestao = 200;
var INITTIALIZED_2 = false;
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
                var cenaTouch = new TouchScene();
                cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,cenaTouch));
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
var HistoriaPlataformaScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_2 = true;
            this._super();
            var historiaplataformalayer = new HistoriaPlataformaLayer();
            this.addChild(historiaplataformalayer);
    }
});

