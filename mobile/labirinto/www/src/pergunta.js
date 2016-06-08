/* globals cc, asset */

var arrayPerguntas = ["primeira P", "segunda P"];
var arrayTipoPergunta = ["tipo 1 (V ou F)", "tipo 2 ( Resposta Correta)"];

//var JSON = {
//    
//    "pergunta":[
//        "Corpo primeira pergunta",
//        "Corpo segunda pergunta",
//        "Corpo terceira pergunta",
//        "Corpo quarta pergunta",
//        "Corpo quinta pergunta"
//        ],
//     "resposta":[
//        "Corpo primeira resposta",
//        "Corpo segunda resposta",
//        "Corpo terceira resposta",
//        "Corpo quarta resposta",
//        "Corpo segunda resposta"
//        ],
//};

var idPergunta;
var idQuestaoAtual;
var pontuacaoMaximaNaQuestao = 200;
var INITTIALIZED_2 = false;
var QuestionLayer = cc.Layer.extend({
    sprite:null,
     ctor:function () {
        this._super();
        
        var size = cc.winSize;
        
        var background = new cc.Sprite.create(asset.desafio_background_png);
        background.setAnchorPoint(cc.p( 0, 0 ));
        background.setPosition(cc.p(0, 0));
        this.addChild(background, -1);
        
        // TODO
        var pontuacaoLabel = new cc.LabelTTF("Worth: "+ 200 +" points","Arial");
        pontuacaoLabel.setFontSize(15);
        pontuacaoLabel.setPosition(cc.p(size.width-70, size.height-20));
        this.addChild(pontuacaoLabel, 1, 0); //zOrder = 1, Tag = 0
        
        // TODO
        // Pegando todos os valores do arquivo
        
        tipoDaQuestao = 2;
        indice = 0;
        
        //num = 1;
        //var idPergunta;
        switch(tipoDaQuestao){
            
            case 1:
                //TIPO PERGUNTA V ou F
                var questionLabel = new ccui.RichText();
                questionLabel.ignoreContentAdaptWithSize(false);
                questionLabel.width = size.width-100;
                questionLabel.height = size.height-100;
                var questionLabel_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "Pergunta de V ou F", "Helvetica", 20);
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
                
                //PERGUNTAS
                var text = new ccui.RichText();
                text.ignoreContentAdaptWithSize(false);
                text.width = size.width-100;
                text.height = size.height-100;
               // var r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, JSON.pergunta[indice], "Helvetica", 20);
//                 var r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, resposta[0].getItem("pergunta1"), "Helvetica", 20);
                var r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "Did you like the film?\nNo, I _____\n______ was wrong with it?\nThe actors weregood but the story was too sentimental.", "Helvetica", 20);
                text.setLineBreakOnSpace(true);
        //        text.setTextHorizontalAlignment(cc.Text_ALIGNMENT_RIGHT);
                text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                text.pushBackElement(r1);
                text.x = (size.width/2);
                text.y = (size.height/2)-50;

        //        scrollView.addChild(text);
                this.addChild(text);

                //RESPOSTAS

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
                var alternativa1_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, perguntasDatabase[numeroPerguntaQuizLabirinto].getItem("pergunta1_alternativa1"), "Helvetica", 20);
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
                var alternativa2_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, perguntasDatabase[numeroPerguntaQuizLabirinto].getItem("pergunta1_alternativa2"), "Helvetica", 20);
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
                var alternativa3_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, perguntasDatabase[numeroPerguntaQuizLabirinto].getItem("pergunta1_alternativa3"), "Helvetica", 20);
                alternativa3.setLineBreakOnSpace(false);
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
                var alternativa4_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, perguntasDatabase[numeroPerguntaQuizLabirinto].getItem("pergunta1_alternativa4"), "Helvetica", 20);
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
                var alternativa5_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, perguntasDatabase[numeroPerguntaQuizLabirinto].getItem("pergunta1_alternativa5"), "Helvetica", 20);
                alternativa5.setLineBreakOnSpace(true);
                alternativa5.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
                alternativa5.pushBackElement(alternativa5_r1);
                alternativa5.x = -120;
                alternativa5.y = 45;
                this.addChild(alternativa5);
        
                break;
                
            case 2:
                
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
                
                var questionLabel = new ccui.RichText();
                questionLabel.ignoreContentAdaptWithSize(false);
                questionLabel.width = size.width-100;
                questionLabel.height = size.height-100;
                var questionLabel_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, "Answer the question:", "Helvetica", 20);
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
                
                //PERGUNTAS
    
                var text = new ccui.RichText();
                text.ignoreContentAdaptWithSize(false);
                text.width = size.width-100;
                text.height = size.height-100;
                var r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta), "Helvetica", 20);
                text.setLineBreakOnSpace(true);
        //        text.setTextHorizontalAlignment(cc.Text_ALIGNMENT_RIGHT);
                text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                text.pushBackElement(r1);
                text.x = (size.width/2);
                text.y = (size.height/2)-30;

        //        scrollView.addChild(text);
                this.addChild(text);

                //RESPOSTAS

                var checkBox1 = new ccui.CheckBox();
                checkBox1.actionTag = 1;
                checkBox1.loadTextures(asset.desafio_checkboxUnchecked_png, asset.desafio_checkboxUnchecked,asset.desafio_checkboxChecked_png);
                checkBox1.x = 50;
                checkBox1.y = 390-20;
                checkBox1.addEventListener(this.selectedcheckBox1, this);
                this.addChild(checkBox1, 1, 1); // zOrder = 1, Tag = 1
                var alternativa1 = new ccui.RichText();
                alternativa1.setAnchorPoint(cc.p(0,0));
                alternativa1.ignoreContentAdaptWithSize(false);
                alternativa1.width = size.width-80;
                alternativa1.height = 65;
                var alternativa1_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa1"), "Helvetica", 20);
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
                checkBox2.addEventListener(this.selectedcheckBox2, this);
                this.addChild(checkBox2, 1, 2); // zOrder = 1, Tag = 2
                var alternativa2 = new ccui.RichText();
                alternativa2.setAnchorPoint(cc.p(0,0));
                alternativa2.ignoreContentAdaptWithSize(false);
                alternativa2.width = size.width-80;
                alternativa2.height = 65;
                var alternativa2_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa2"), "Helvetica", 20);
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
                checkBox3.addEventListener(this.selectedcheckBox3, this);
                this.addChild(checkBox3, 1, 3); // zOrder = 1, Tag = 3
                var alternativa3 = new ccui.RichText();
                alternativa3.setAnchorPoint(cc.p(0,0));
                alternativa3.ignoreContentAdaptWithSize(false);
                alternativa3.width = size.width-80;
                alternativa3.height = 65;
                var alternativa3_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa3"), "Helvetica", 20);
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
                checkBox4.addEventListener(this.selectedcheckBox4, this);
                this.addChild(checkBox4, 1, 4); // zOrder = 1, Tag = 4
                var alternativa4 = new ccui.RichText();
                alternativa4.setAnchorPoint(cc.p(0,0));
                alternativa4.ignoreContentAdaptWithSize(false);
                alternativa4.width = size.width-80;
                alternativa4.height = 65;
                var alternativa4_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa4"), "Helvetica", 20);
                alternativa4.setLineBreakOnSpace(false);
                alternativa4.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
                alternativa4.pushBackElement(alternativa4_r1);
                alternativa4.x = -120;
                alternativa4.y = 115;
                this.addChild(alternativa4);

                var checkBox5 = new ccui.CheckBox();
                checkBox5.loadTextures(asset.desafio_checkboxUnchecked_png, asset.desafio_checkboxUnchecked,asset.desafio_checkboxChecked_png);
                checkBox5.x = 50;
                checkBox5.y = 150-20;
                checkBox5.addEventListener(this.selectedcheckBox5, this);
                this.addChild(checkBox5, 1, 5); // zOrder = 1, Tag = 5
                var alternativa5 = new ccui.RichText();
                alternativa5.setAnchorPoint(cc.p(0,0));
                alternativa5.ignoreContentAdaptWithSize(false);
                alternativa5.width = size.width-80;
                alternativa5.height = 65;
                var alternativa5_r1 = new ccui.RichElementText(1, cc.color.WHITE, 255, userInfo.getItem(idPergunta+"_alternativa5"), "Helvetica", 20);
                alternativa5.setLineBreakOnSpace(true);
                alternativa5.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
                alternativa5.pushBackElement(alternativa5_r1);
                alternativa5.x = -120;
                alternativa5.y = 45;
                this.addChild(alternativa5);

                break;

        }

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
    
    selectedcheckBox1: function(sender, type){
        switch(type){
                case ccui.CheckBox.EVENT_UNSELECTED:
                   //fazer nada
                    break;
                 case ccui.CheckBox.EVENT_SELECTED:
                
                 var parent = sender.parent;
                 this.getChildByTag(1).setSelected(true);
                 this.getChildByTag(2).setSelected(false);
                 this.getChildByTag(3).setSelected(false);
                 this.getChildByTag(4).setSelected(false);
                 this.getChildByTag(5).setSelected(false);
                       
                    break; 
        }
    },
    
    selectedcheckBox2: function(sender, type){
        switch(type){
                case ccui.CheckBox.EVENT_UNSELECTED:
                   //fazer nada
                    break;
                 case ccui.CheckBox.EVENT_SELECTED:
                
                 var parent = sender.parent;
                 this.getChildByTag(1).setSelected(false);
                 this.getChildByTag(2).setSelected(true);
                 this.getChildByTag(3).setSelected(false);
                 this.getChildByTag(4).setSelected(false);
                 this.getChildByTag(5).setSelected(false);
                       
                    break; 
        }
    },

    selectedcheckBox3: function(sender, type){
        switch(type){
                case ccui.CheckBox.EVENT_UNSELECTED:
                   //fazer nada
                    break;
                 case ccui.CheckBox.EVENT_SELECTED:
                
                 var parent = sender.parent;
                 this.getChildByTag(1).setSelected(false);
                 parent.getChildByTag(2).setSelected(false);
                 parent.getChildByTag(3).setSelected(true);
                 parent.getChildByTag(4).setSelected(false);
                 parent.getChildByTag(5).setSelected(false);
                       
                    break; 
        }
    },
    
    selectedcheckBox4: function(sender, type){
        switch(type){
                case ccui.CheckBox.EVENT_UNSELECTED:
                   //fazer nada
                    break;
                 case ccui.CheckBox.EVENT_SELECTED:
                
                 var parent = sender.parent;
                 this.getChildByTag(1).setSelected(false);
                 parent.getChildByTag(2).setSelected(false);
                 parent.getChildByTag(3).setSelected(false);
                 parent.getChildByTag(4).setSelected(true);
                 parent.getChildByTag(5).setSelected(false);
                       
                    break; 
        }
    },
    
     selectedcheckBox5: function(sender, type){
        switch(type){
                case ccui.CheckBox.EVENT_UNSELECTED:
                   //fazer nada
                    break;
                 case ccui.CheckBox.EVENT_SELECTED:
                
                 var parent = sender.parent;
                 this.getChildByTag(1).setSelected(false);
                 parent.getChildByTag(2).setSelected(false);
                 parent.getChildByTag(3).setSelected(false);
                 parent.getChildByTag(4).setSelected(false);
                 parent.getChildByTag(5).setSelected(true);
                       
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
                if (tipoDaQuestao == 1) {
                    
                var parent = sender.parent;
    
                var resposta = [true, false, false, false, true];
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
                }else{
                    
                    pontuacaoMaximaNaQuestao-=60;
                    if (pontuacaoMaximaNaQuestao>=80){
                        parent.getChildByTag(0).setString("Worth: "+ pontuacaoMaximaNaQuestao +" points","Arial");
                    }else{
                        // TODO
                        // nao pontuou
                        pontuacaoMaximaNaQuestao = 0;
                        // Reproduzir som de erro
                        popPergunta();


                    }  
                }
                
                }
                
                 if (tipoDaQuestao == 2) {
                    
                var parent = sender.parent;
                var respostaTemp = userInfo.getItem(idPergunta+"_respostaCerta");
                     cc.log("idPergunta = " + idPergunta);
                     cc.log("respostaTemp = "+respostaTemp);
                var resposta;
                cc.log(respostaTemp);
                switch (respostaTemp){
                    case 'a':
                        resposta = [true, false, false, false, false];
                        break;
                    case 'b':
                        resposta = [false, true, false, false, false];
                        break;
                    case 'c':
                        resposta = [false, false, true, false, false];
                        break;
                    case 'd':
                        resposta = [false, false, false, true, false];
                        break;
                    case 'e':
                        resposta = [false, false, false, false, true];
                        break;
                    
                }

                //var resposta = [true, false, false, false, false];
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
                }else{
                    pontuacaoMaximaNaQuestao-=60;
                    if (pontuacaoMaximaNaQuestao>=80){
                        parent.getChildByTag(0).setString("Worth: "+ pontuacaoMaximaNaQuestao +" points","Arial");
                    }else{
                        // TODO
                        // nao pontuou
                        pontuacaoMaximaNaQuestao = 0;
                        // Reproduzir som de erro
                        popPergunta();
                    } 
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
    pontuacao+=pontuacaoMaximaNaQuestao;
    acertouDePrimeira = (pontuacaoMaximaNaQuestao===200);
//    resultadoParaPost.resultado.respostas[incrementoPost].idQuestao = idQuestaoAtual;
    resultadoParaPost.resultado.respostas[incrementoPost].idQuestao = resultadoParaPost.resultado.respostas[incrementoPost].idQuestao;
    resultadoParaPost.resultado.respostas[incrementoPost].pontuacao = pontuacaoMaximaNaQuestao;
    incrementoPost=Number(incrementoPost)+1;
    if (incrementoPost===5){
        incrementoPost = 0;
    }
    ////cc.log(pontuacaoMaximaNaQuestao);
    ////cc.log(pontuacao);
    pontuacaoMaximaNaQuestao = 200; // para a proxima qeustao
    layerCopiaExterno.getChildByTag(10).setString("Pontos: "+pontuacao);
//    if(acertouDePrimeira){
//        ////cc.log("aumentou sombra");
//        layerCopiaExterno.getChildByTag(0).runAction(cc.ScaleBy.create(0,1.1,1.1));
//    }
//    cc.log("antes = "+numeroPerguntaQuizLabirinto);
    numeroPerguntaQuizLabirinto=Number(numeroPerguntaQuizLabirinto)+1;
//    cc.log("depois = "+numeroPerguntaQuizLabirinto);
    if (numeroPerguntaQuizLabirinto===5){
        numeroPerguntaQuizLabirinto = 0;
    }
    cc.log(numeroPerguntaQuizLabirinto);
    cc.director.popScene();

};

var QuestionScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_2 = true;
            this._super();
            var questionlayer = new QuestionLayer();
            this.addChild(questionlayer);
            pontuacaoMaximaNaQuestao = 200;
    }

});

