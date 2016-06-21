/* globals cc, asset */
var respostaCertaPlataforma;
var pontuacaoMaximaNaQuestao = 200;
var INITTIALIZED_2 = false;
var QuestionLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        var size = cc.winSize;
        
        respostaCertaPlataforma = 0;
        
        // TODO
        var pontuacaoLabel = new cc.LabelTTF("Worth: "+ 200 +" points","Arial");
        pontuacaoLabel.setFontSize(15);
        pontuacaoLabel.setPosition(cc.p(size.width-70, size.height-20));
        this.addChild(pontuacaoLabel, 1, 0); //zOrder = 1, Tag = 0
        
        var questionLabel = new ccui.RichText();
        questionLabel.ignoreContentAdaptWithSize(false);
        questionLabel.width = size.width-100;
        questionLabel.height = size.height-100;
        var questionLabel_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "Answer T (True) or F (False):", "Helvetica", 20);
        questionLabel.setLineBreakOnSpace(true);
        questionLabel.setTextHorizontalAlignment(cc.Text_ALIGNMENT_RIGHT);
        questionLabel.pushBackElement(questionLabel_r1);
        questionLabel.x = size.width/2;
        questionLabel.y = size.height/2;
        
        this.addChild(questionLabel);
        
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
//        scrollView.setBackGroundImage(asset.HelloWorld_png);
        scrollView.setContentSize(cc.size((size.height/2),(size.width/2) ));
        scrollView.setInnerContainerSize(cc.size(size.width-100,size.height-100));
        scrollView.setAnchorPoint(cc.p(0,0));
        scrollView.setPosition(cc.p(50,450));
//        this.addChild(scrollView);
        
        
        var text = new ccui.RichText();
        text.ignoreContentAdaptWithSize(false);
        text.width = size.width-100;
        text.height = size.height-100;
        var r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "Aqui temos um texto com 300 caracteres.  Esse será o tamanho máximo do texto que o professor vai colocar para a interpretação de texto (True or False). Aqui temos um texto com 300 caracteres. Esse será o tamanho máximo do texto que o professor vai colocar para a interpretação de texto (True or False)Aqui temos um texto com 300 caracteres.", "Helvetica", 20);
        text.setLineBreakOnSpace(true);
//        text.setTextHorizontalAlignment(cc.Text_ALIGNMENT_RIGHT);
        text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        text.pushBackElement(r1);
        text.x = (size.width/2);
        text.y = (size.height/2)-50;
        
//        scrollView.addChild(text);
        this.addChild(text);
        
        
        var checkBox1 = new ccui.CheckBox();
        checkBox1.actionTag = 1;
        checkBox1.loadTextures(asset.desafio_checkboxUnchecked_png, asset.desafio_checkboxUnchecked,asset.desafio_checkboxChecked_png);
        checkBox1.x = 50;
        checkBox1.y = 390-20;
        checkBox1.addEventListener(this.selectedStateEvent, this);
        this.addChild(checkBox1, 1, 1); // zOrder = 1, Tag = 1
        var alternativa1 = new ccui.RichText();
        alternativa1.setAnchorPoint(cc.p(0,0));
        alternativa1.ignoreContentAdaptWithSize(false);
        alternativa1.width = size.width-80;
        alternativa1.height = 65;
        var alternativa1_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "CORRETA Essa é a alternativa 1! Essa é a alternativa 1! Essa é a alternativa 1! ", "Helvetica", 20);
        alternativa1.setLineBreakOnSpace(true);
        alternativa1.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        alternativa1.pushBackElement(alternativa1_r1);
        alternativa1.x = -120;
        alternativa1.y = 295;
        this.addChild(alternativa1);
        
        
        
        var checkBox2 = new ccui.CheckBox();
        checkBox2.loadTextures(asset.desafio_checkboxUnchecked_png, asset.desafio_checkboxUnchecked,asset.desafio_checkboxChecked_png);
        checkBox2.x = 50;
        checkBox2.y = 330-20;
        checkBox2.addEventListener(this.selectedStateEvent, this);
        this.addChild(checkBox2, 1, 2); // zOrder = 1, Tag = 2
        var alternativa2 = new ccui.RichText();
        alternativa2.setAnchorPoint(cc.p(0,0));
        alternativa2.ignoreContentAdaptWithSize(false);
        alternativa2.width = size.width-80;
        alternativa2.height = 65;
        var alternativa2_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "Essa é a alternativa 2! Essa é a alternativa 2! Essa é a alternativa 2! Essa é a alt 2!", "Helvetica", 20);
        alternativa2.setLineBreakOnSpace(true);
        alternativa2.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        alternativa2.pushBackElement(alternativa2_r1);
        alternativa2.x = -120;
        alternativa2.y = 235;
        this.addChild(alternativa2);
        
        
        var checkBox3 = new ccui.CheckBox();
        checkBox3.loadTextures(asset.desafio_checkboxUnchecked_png, asset.desafio_checkboxUnchecked,asset.desafio_checkboxChecked_png);
        checkBox3.x = 50;
        checkBox3.y = 270-20;
        checkBox3.addEventListener(this.selectedStateEvent, this);
        this.addChild(checkBox3, 1, 3); // zOrder = 1, Tag = 3
        var alternativa3 = new ccui.RichText();
        alternativa3.setAnchorPoint(cc.p(0,0));
        alternativa3.ignoreContentAdaptWithSize(false);
        alternativa3.width = size.width-80;
        alternativa3.height = 65;
        var alternativa3_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "Essa é a alternativa 3! Essa é a alternativa 3! Essa é a alternativa 3! Essa é a alt 3!", "Helvetica", 20);
        alternativa3.setLineBreakOnSpace(true);
        alternativa3.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        alternativa3.pushBackElement(alternativa3_r1);
        alternativa3.x = -120;
        alternativa3.y = 175;
        this.addChild(alternativa3);
        
        
        var checkBox4 = new ccui.CheckBox();
        checkBox4.loadTextures(asset.desafio_checkboxUnchecked_png, asset.desafio_checkboxUnchecked,asset.desafio_checkboxChecked_png);
        checkBox4.x = 50;
        checkBox4.y = 210-20;
        checkBox4.addEventListener(this.selectedStateEvent, this);
        this.addChild(checkBox4, 1, 4); // zOrder = 1, Tag = 4
        var alternativa4 = new ccui.RichText();
        alternativa4.setAnchorPoint(cc.p(0,0));
        alternativa4.ignoreContentAdaptWithSize(false);
        alternativa4.width = size.width-80;
        alternativa4.height = 65;
        var alternativa4_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "CORRETA Essa é a alternativa 4! Essa é a alternativa 4! Essa é a alternativa 4!", "Helvetica", 20);
        alternativa4.setLineBreakOnSpace(true);
        alternativa4.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        alternativa4.pushBackElement(alternativa4_r1);
        alternativa4.x = -120;
        alternativa4.y = 115;
        this.addChild(alternativa4);
        
        
        
        var checkBox5 = new ccui.CheckBox();
        checkBox5.loadTextures(asset.desafio_checkboxUnchecked_png, asset.desafio_checkboxUnchecked,asset.desafio_checkboxChecked_png);
        checkBox5.x = 50;
        checkBox5.y = 150-20;
        checkBox5.addEventListener(this.selectedStateEvent, this);
        this.addChild(checkBox5, 1, 5); // zOrder = 1, Tag = 5
        var alternativa5 = new ccui.RichText();
        alternativa5.setAnchorPoint(cc.p(0,0));
        alternativa5.ignoreContentAdaptWithSize(false);
        alternativa5.width = size.width-80;
        alternativa5.height = 65;
        var alternativa5_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "Essa é a alternativa 5! Essa é a alternativa 5! Essa é a alternativa 5! Essa é a alt 5!", "Helvetica", 20);
        alternativa5.setLineBreakOnSpace(true);
        alternativa5.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        alternativa5.pushBackElement(alternativa5_r1);
        alternativa5.x = -120;
        alternativa5.y = 45;
        this.addChild(alternativa5);
        
        
        
        

        var answerButton = new ccui.Button();
        answerButton.loadTextures(asset.desafio_answerButton_png);
        answerButton.x = size.width/1.3;
        answerButton.y = 45;
        answerButton.addTouchEventListener(this.touchEvent, this);
        this.addChild(answerButton);
        

        
        
        
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
                    popPergunta();
                    pontuacao+=pontuacaoMaximaNaQuestao;
                    cc.log("pontuacao = "+pontuacao);
                    layerCopiaExterno.getChildByTag(10).setString("Points: "+pontuacao);
                    pontuacaoMaximaNaQuestao = 200;
                }else{
                    pontuacaoMaximaNaQuestao-=60;
                    if (pontuacaoMaximaNaQuestao>=80){
                        parent.getChildByTag(0).setString("Worth: "+ pontuacaoMaximaNaQuestao +" points","Arial");
                    }else{
                        // TODO
                        // nao pontuou
                        pontuacaoMaximaNaQuestao = 0;
                        // Reproduzir som de erro
                        cc.log(pop);
                        popPergunta();
                        pontuacaoMaximaNaQuestao = 200;
                    }
                    
                }
                break;
        }
    }
    
});

    

var popPergunta = function(){
    ////cc.log("Foi!");
    // Se acertou de primeira, 200 pontos.
    // Se acertou de segunda, 140 pontos.
    // Se acertou de terceira, 80 pontos.
    //pontuacao+=pontuacaoMaximaNaQuestao;
    //acertouDePrimeira = (pontuacaoMaximaNaQuestao===200);
    ////cc.log(pontuacaoMaximaNaQuestao);
    ////cc.log(pontuacao);
    pontuacaoMaximaNaQuestao = 200; // para a proxima qeustao
    
    //layerCopiaExterno.getChildByTag(10).setString("Points: "+pontuacao);
//    if(acertouDePrimeira){
//        ////cc.log("aumentou sombra");
//        layerCopiaExterno.getChildByTag(0).runAction(cc.ScaleBy.create(0,1.1,1.1));
//    }
    
    cc.director.popScene();
};
var QuestionScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_2 = true;
            this._super();
            var questionlayer = new QuestionLayer();
            this.addChild(questionlayer);
    }
});

