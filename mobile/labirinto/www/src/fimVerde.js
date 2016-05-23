/* globals cc, asset */

var pontuacaoMaximaNaQuestao = 200;
var INITTIALIZED_2 = false;
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
    
    touchEvent: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                //////cc.log("Pressionou");
                //Mudar o sprite do "answerButton" aqui
                break;
            case ccui.Widget.TOUCH_ENDED:
                //////cc.log("Pressionou");
                // TODO
                //Verificar respostas aqui
                // Resposta = [true, false, false, true, false], alterar para receber do banco
                var parent = sender.parent;
                var resposta = [true, false, false, true, false];
                ////cc.log(parent.getChildByTag(1).isSelected());
                ////cc.log(parent.getChildByTag(2).isSelected());
                ////cc.log(parent.getChildByTag(3).isSelected());
                ////cc.log(parent.getChildByTag(4).isSelected());
                ////cc.log(parent.getChildByTag(5).isSelected());
                if (resposta[0]===parent.getChildByTag(1).isSelected() && 
                    resposta[1]===parent.getChildByTag(2).isSelected() && 
                    resposta[2]===parent.getChildByTag(3).isSelected() &&
                    resposta[3]===parent.getChildByTag(4).isSelected() && 
                    resposta[4]===parent.getChildByTag(5).isSelected()){
                    pop();
                }else{
                    pontuacaoMaximaNaQuestao-=60;
                    if (pontuacaoMaximaNaQuestao>=80){
                        parent.getChildByTag(0).setString("Worth: "+ pontuacaoMaximaNaQuestao +" points","Arial");
                    }else{
                        // TODO
                        // nao pontuou
                        pontuacaoMaximaNaQuestao = 0;
                        // Reproduzir som de erro
                        pop();
                    }
                    
                }
                break;
        }
    }
    
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
var FimVerdeScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_2 = true;
            this._super();
            var fimverdelayer = new FimVerdeLayer();
            this.addChild(fimverdelayer);
    }
});

