/* globals cc, asset */

var pontuacaoMaximaNaQuestao = 200;
var INITTIALIZED_desafioplataforma = false;
var idPergunta;
var DesafioPlataformaLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        
        var size = cc.winSize;
        
        var background = new cc.Sprite.create(asset.desafio_background_png);
        background.setAnchorPoint(cc.p( 0, 0 ));
        background.setPosition(cc.p(0, 0));
        this.addChild(background, -1);
        
        // TODO
        // Pegando todos os valores do arquivo
//        var tipoDaQuestao = 1;
//        var string;
//        switch(tipoDaQuestao){
//            case 1:
//                break;
//            case 2:
//                break;
//            case 3:
//                break;
//            case 4:
//                break;
//            case 5:
//                break;
//        }
        
        
        
        //respostaDesafioPlataforma = 1;
        // TODO
        
          //TIPO PERGUNTA
                
        //var idPergunta;
        switch (numeroPerguntaQuizLabirinto){
            case 0:
                cc.log("numeroPerguntaQuizLabirinto = 0");
                idPergunta = "pergunta1";
                break;
            case 1:
                cc.log("numeroPerguntaQuizLabirinto = 1");
                idPergunta = "pergunta2";
                break;
            case 2:
                cc.log("numeroPerguntaQuizLabirinto = 2");
                idPergunta = "pergunta3";
                break;
            case 3:
                cc.log("numeroPerguntaQuizLabirinto = 3");
                idPergunta = "pergunta4";
                break;
            case 4:
                cc.log("numeroPerguntaQuizLabirinto = 4");
                idPergunta = "pergunta5";
                break;


        }
                
                    
        idQuestaoAtual = userInfo.getItem("idPergunta");
        
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
        
        
        //PERGUNTA
        
        var text = new ccui.RichText();
        text.ignoreContentAdaptWithSize(false);
        text.width = size.width-100;
        text.height = size.height-100;
        var r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta), "Helvetica", 20);
        cc.log(userInfo.getItem(idPergunta));
        text.setLineBreakOnSpace(true);
//        text.setTextHorizontalAlignment(cc.Text_ALIGNMENT_RIGHT);
        text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        text.pushBackElement(r1);
        text.x = (size.width/2);
        text.y = (size.height/2)-50;
        
//        scrollView.addChild(text);
        this.addChild(text);
        
        
         //RESPOSTAS

        var boxVermelho = new cc.Sprite.create(asset.boxVermelho_png);
        boxVermelho.setAnchorPoint(cc.p( 0, 0 ));
        boxVermelho.setPosition(cc.p(30, 320));
        this.addChild(boxVermelho);
        
        var alternativa1 = new ccui.RichText();
        alternativa1.setAnchorPoint(cc.p(0,0));
        alternativa1.ignoreContentAdaptWithSize(false);
        alternativa1.width = size.width-80;
        alternativa1.height = 65;
        var alternativa1_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa1"), "Helvetica", 20);
        cc.log(userInfo.getItem(idPergunta+"_alternativa1"));
        cc.log(userInfo.getItem(idPergunta));
        alternativa1.setLineBreakOnSpace(true);
        alternativa1.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        alternativa1.pushBackElement(alternativa1_r1);
        alternativa1.x = -120;
        alternativa1.y = 255;
        this.addChild(alternativa1);
        
        
        
        var boxVerde = new cc.Sprite.create(asset.boxVerde_png);
        boxVerde.setAnchorPoint(cc.p( 0, 0 ));
        boxVerde.setPosition(cc.p(30, 260));
        this.addChild(boxVerde);
        var alternativa2 = new ccui.RichText();
        alternativa2.setAnchorPoint(cc.p(0,0));
        alternativa2.ignoreContentAdaptWithSize(false);
        alternativa2.width = size.width-80;
        alternativa2.height = 65;
        var alternativa2_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa2"), "Helvetica", 20);
        cc.log(userInfo.getItem(idPergunta+"_alternativa2"));
        alternativa2.setLineBreakOnSpace(true);
        alternativa2.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        alternativa2.pushBackElement(alternativa2_r1);
        alternativa2.x = -120;
        alternativa2.y = 195;
        this.addChild(alternativa2);
        
        
        
        var boxAmarelo = new cc.Sprite.create(asset.boxAmarelo_png);
        boxAmarelo.setAnchorPoint(cc.p( 0, 0 ));
        boxAmarelo.setPosition(cc.p(30, 200));
        this.addChild(boxAmarelo);
       
        var alternativa3 = new ccui.RichText();
        alternativa3.setAnchorPoint(cc.p(0,0));
        alternativa3.ignoreContentAdaptWithSize(false);
        alternativa3.width = size.width-80;
        alternativa3.height = 65;
        var alternativa3_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa3"), "Helvetica", 20);
        cc.log(userInfo.getItem(idPergunta+"_alternativa3"));
        alternativa3.setLineBreakOnSpace(true);
        alternativa3.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        alternativa3.pushBackElement(alternativa3_r1);
        alternativa3.x = -120;
        alternativa3.y = 135;
        this.addChild(alternativa3);
        
        
        
        
        var boxAzul = new cc.Sprite.create(asset.boxAzul_png);
        boxAzul.setAnchorPoint(cc.p( 0, 0 ));
        boxAzul.setPosition(cc.p(30, 140));
        this.addChild(boxAzul);
        var alternativa4 = new ccui.RichText();
        alternativa4.setAnchorPoint(cc.p(0,0));
        alternativa4.ignoreContentAdaptWithSize(false);
        alternativa4.width = size.width-80;
        alternativa4.height = 65;
        
        var alternativa4_r1;
        var respostaTemp2 = userInfo.getItem(idPergunta+"_respostaCerta");
        cc.log(respostaTemp2);
        switch (respostaTemp2){
            case 'd':
                alternativa4_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa4"), "Helvetica", 20);
                break;
            case 'e':
                alternativa4_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa5"), "Helvetica", 20);
                break;
            default:
                alternativa4_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa4"), "Helvetica", 20);
                break;
        }
        
        
        

        
        
        
        cc.log(userInfo.getItem(idPergunta+"_alternativa3"));
        cc.log(userInfo.getItem(idPergunta+"_alternativa4"));
//        var alternativa4_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa3"), "Helvetica", 20);
        alternativa4.setLineBreakOnSpace(true);
        alternativa4.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        alternativa4.pushBackElement(alternativa4_r1);
        alternativa4.x = -120;
        alternativa4.y = 75;
        this.addChild(alternativa4);
        cc.log(190);
        
        
        
        
        

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
                    
                    break;
                 case ccui.CheckBox.EVENT_SELECTED:
                    
                    break;
        }
    },
    
    touchEvent: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                
                break;
            case ccui.Widget.TOUCH_ENDED:
                
                cc.director.popScene();
                break;
        }
    }
    
});

    

var DesafioPlataformaScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_desafioPlataforma = true;
            this._super();
            var desafioplataformalayer = new DesafioPlataformaLayer();
            this.addChild(desafioplataformalayer);
    }
});

