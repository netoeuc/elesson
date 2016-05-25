/* globals cc, asset */
var stopGame = false;
var INITTIALIZED_plat = false;
var PlataformaLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        var sizePlataforma = cc.winSize;
        
        var pontuacaoPlataforma = 0;
        var respostaAtual = -1;
        
        
        var pontuacaoLabelPlataforma = new cc.LabelTTF("Points: "+pontuacaoPlataforma);
        pontuacaoLabelPlataforma.setFontSize(30);
        pontuacaoLabelPlataforma.setAnchorPoint(cc.p(0,0));
        pontuacaoLabelPlataforma.setPosition(cc.p(10, sizePlataforma.height-40));
        this.addChild(pontuacaoLabelPlataforma, 12, 10); //zOrder = 1, Tag = 10
        
        var closeMenuPlataforma = new ccui.Button();
        closeMenuPlataforma.loadTextures(asset.labirinto_pause_png);
        closeMenuPlataforma.setAnchorPoint(cc.p(0,0));   
        
        closeMenuPlataforma.addTouchEventListener(this.pausar, this);
        closeMenuPlataforma.setPosition(cc.p(sizePlataforma.width-40, sizePlataforma.height-40));
        this.addChild(closeMenuPlataforma, 12);
        
        var topMenuPlataforma = new cc.Sprite.create(asset.labirinto_barra_png); // Adicionando a barra superior para o menu
        topMenuPlataforma.setAnchorPoint(cc.p( 0, 0 ));
        topMenuPlataforma.setPosition(cc.p(0, sizePlataforma.height-40));
        this.addChild(topMenuPlataforma, 11);
        
        
        
        
        var backgroundHistoriaPlataforma = new cc.Sprite.create(asset.telaInicio_historiaPlataforma_png); 
        backgroundHistoriaPlataforma.setAnchorPoint(cc.p( 0, 0 ));
        backgroundHistoriaPlataforma.setPosition(cc.p(0, 0));
        this.addChild(backgroundHistoriaPlataforma, -1);
        
        
        
        var spriteChar = new cc.Sprite.create(asset.lab_char_1_frente_png); 
        spriteChar.setAnchorPoint( cc.p( 0.5, 0.5 ) ); 
        spriteChar.setPosition(cc.p(sizePlataforma.width/2,(sizePlataforma.height/2)-10));
        this.addChild(spriteChar, 10, 0); // tag = 0
        
        
        var tileBlue = new ccui.Button();
        tileBlue.loadTextures(asset.plataforma_blueTileUnselected_png, asset.plataforma_blueTileSelected_png);
        tileBlue.setAnchorPoint(cc.p(0,0));  
        tileBlue.setPosition(cc.p(15, 300));
        tileBlue.addTouchEventListener(this.touchEventBlue, this);
        this.addChild(tileBlue);
        var tileRed = new ccui.Button();
        tileRed.loadTextures(asset.plataforma_redTileUnselected_png, asset.plataforma_redTileSelected_png);
        tileRed.setAnchorPoint(cc.p(0,0));  
        tileRed.setPosition(cc.p(315, 300));
        tileRed.addTouchEventListener(this.touchEventRed, this);
        this.addChild(tileRed);
        var tileGreen = new ccui.Button();
        tileGreen.loadTextures(asset.plataforma_greenTileUnselected_png, asset.plataforma_greenTileSelected_png);
        tileGreen.setAnchorPoint(cc.p(0,0));  
        tileGreen.setPosition(cc.p(165, 450));
        tileGreen.addTouchEventListener(this.touchEventGreen, this);
        this.addChild(tileGreen);
        var tileYellow = new ccui.Button();
        tileYellow.loadTextures(asset.plataforma_yellowTileUnselected_png,asset.plataforma_yellowTileSelected_png);
        tileYellow.setAnchorPoint(cc.p(0,0));  
        tileYellow.setPosition(cc.p(165, 150));
        tileYellow.addTouchEventListener(this.touchEventYellow, this);
        this.addChild(tileYellow);
        
        
        
        return true;
    },
    
    
    
    
     touchEventBlue: function(sender,type){
        if (!stopGame){
            switch(type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    respostaAtual = 0;
                    var moverParaAzul = new cc.MoveTo.create(0.2, cc.p(90,375));
                    sender.parent.getChildByTag(0).runAction(moverParaAzul);
                    break;
            }
        }
    },
    touchEventRed: function(sender,type){
        if (!stopGame){
            switch(type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    respostaAtual = 1;
                    
                    var moverParaVermelho = new cc.MoveTo.create(0.2, cc.p(390,375));
                    sender.parent.getChildByTag(0).runAction(moverParaVermelho);
                    break;
            }
        }
    },
    touchEventYellow: function(sender,type){
        if (!stopGame){
            switch(type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    respostaAtual = 2;
                    var moverParaAmarelo = new cc.MoveTo.create(0.2, cc.p(235,225));
                    sender.parent.getChildByTag(0).runAction(moverParaAmarelo);
                    break;
            }
        }
    },
    touchEventGreen: function(sender,type){
        if (!stopGame){
            switch(type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    respostaAtual = 3;
                    var moverParaVerde = new cc.MoveTo.create(0.2, cc.p(235,525));
                    cc.log("foi");
                    this.getChildByTag(0).runAction(moverParaVerde);
                    break;
            }
        }
    },
    
    pausar: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                pause();
                break;
        }
    },
    
});

    
function pause(){
    var scenep = new PauseScene();
    cc.director.pushScene(new cc.TransitionMoveInR(0.5,scenep));    
    //if(pause_exit_game===true){
    //    cc.director.popScene();
    //}
    
}

var PlataformaScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_plat = true;
            this._super();
            var plataformalayer = new PlataformaLayer();
            this.addChild(plataformalayer);
    }
});

