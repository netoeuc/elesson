/* globals cc, asset */

var INITTIALIZED_vermelho = false;
var FimVermelhoLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        // reproduzir efeito sonoro (não venceu)
        
        var size = cc.winSize;
           
        

        var backgroundVermelho = new cc.Sprite.create(asset.telaFim_red_png); 
        backgroundVermelho.setAnchorPoint(cc.p( 0, 0 ));
        backgroundVermelho.setPosition(cc.p(0, 0));
        this.addChild(backgroundVermelho, -1);
        
        
        var backToMap1 = new ccui.Button();
        backToMap1.loadTextures(asset.telaFim_buttonMap_png);
        backToMap1.setAnchorPoint(cc.p(0,0));  
        backToMap1.setPosition(cc.p(100, 100));
        backToMap1.addTouchEventListener(this.sairDoJogo3, this);
        this.addChild(backToMap1);
        
        
        
        
        
//         para o POST
        
            conectoufimVermelhoPOSTPOST = false;

            var logoLoadingfimVermelhoPOSTPOST = new cc.Sprite.create(asset.loading_eLeassons_png);

            logoLoadingfimVermelhoPOSTPOST.setAnchorPoint(cc.p( 0.5, 0.5 ));
            logoLoadingfimVermelhoPOSTPOST.setPosition(cc.p(240, 400));
            this.addChild(logoLoadingfimVermelhoPOSTPOST, 100, 100); //tag = 100

             var backgroundLoadingfimVermelhoPOSTPOST = new cc.Sprite.create(asset.loading_background_png);

            backgroundLoadingfimVermelhoPOSTPOST.setAnchorPoint(cc.p( 0, 0 ));
            backgroundLoadingfimVermelhoPOSTPOST.setPosition(cc.p(0, 0));
            backgroundLoadingfimVermelhoPOSTPOST.opacity = 100;
            this.addChild(backgroundLoadingfimVermelhoPOSTPOST, 99, 99); // tag = 99





            var labelLoadingYourDatafimVermelhoPOSTPOST = new ccui.RichText();
            labelLoadingYourDatafimVermelhoPOSTPOST.setAnchorPoint(cc.p(0,0));
            labelLoadingYourDatafimVermelhoPOSTPOST.ignoreContentAdaptWithSize(false);
            labelLoadingYourDatafimVermelhoPOSTPOST.width = size.width-80;
            labelLoadingYourDatafimVermelhoPOSTPOST.height = 65;
            var labelLoadingYourDataTextfimVermelhoPOSTPOST = new ccui.RichElementText(1, cc.color.WHITE, 255,"Sending your results... ", "Helvetica", 20);
            labelLoadingYourDatafimVermelhoPOSTPOST.setLineBreakOnSpace(true);
            labelLoadingYourDatafimVermelhoPOSTPOST.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
            labelLoadingYourDatafimVermelhoPOSTPOST.pushBackElement(labelLoadingYourDataTextfimVermelhoPOSTPOST);
            labelLoadingYourDatafimVermelhoPOSTPOST.setPosition(cc.p(-50, 200));
            this.addChild(labelLoadingYourDatafimVermelhoPOSTPOST, 101, 101); // tag = 101


            loadingErrorLabelfimVermelhoPOSTPOST = new ccui.RichText();
            loadingErrorLabelfimVermelhoPOSTPOST.setAnchorPoint(cc.p(0,0));
            loadingErrorLabelfimVermelhoPOSTPOST.ignoreContentAdaptWithSize(false);
            loadingErrorLabelfimVermelhoPOSTPOST.width = size.width-80;
            loadingErrorLabelfimVermelhoPOSTPOST.height = 65;
            var loadingErrorLabelTextfimVermelhoPOSTPOST = new ccui.RichElementText(1, cc.color.WHITE, 255,"You have no Internet Connection...", "Helvetica", 20);
            loadingErrorLabelfimVermelhoPOSTPOST.setLineBreakOnSpace(true);
            loadingErrorLabelfimVermelhoPOSTPOST.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
            loadingErrorLabelfimVermelhoPOSTPOST.pushBackElement(loadingErrorLabelTextfimVermelhoPOSTPOST);
            loadingErrorLabelfimVermelhoPOSTPOST.setPosition(cc.p(-100, 220));
//            this.addChild(loadingErrorLabel, 101);


            loadingErrorImgfimVermelhoPOSTPOST = new cc.Sprite.create(asset.loading_error_png);
            loadingErrorImgfimVermelhoPOSTPOST.setAnchorPoint(cc.p( 0.5, 0.5 ));
            loadingErrorImgfimVermelhoPOSTPOST.setPosition(cc.p(235, 420));
//            this.addChild(loadingErrorImg, 100);


            loadingErrorButtonfimVermelhoPOSTPOST= new ccui.Button();
            loadingErrorButtonfimVermelhoPOSTPOST.loadTextures(asset.loading_tryAgain_png);
            loadingErrorButtonfimVermelhoPOSTPOST.setAnchorPoint(cc.p(0,0));   

            loadingErrorButtonfimVermelhoPOSTPOST.addTouchEventListener(this.conectarNovamentefimVermelhoPOSTPOST, this);
            loadingErrorButtonfimVermelhoPOSTPOST.setPosition(cc.p(170,200));
//            this.addChild(loadingErrorButton, 12);


            
            var xhrfimVermelhoPOSTPOST = cc.loader.getXMLHttpRequest();
        
            
            var xhr = cc.loader.getXMLHttpRequest();    
            xhrfimVermelhoPOSTPOST.open( "POST", "http://requestb.in/1ghmdn31" );
            xhrfimVermelhoPOSTPOST.setRequestHeader( "Content-Type", "text/plain" );
//            var arguementsfimVermelhoPOSTPOST = "Olha o POST funcionando!";
            xhrfimVermelhoPOSTPOST.send( resultadoParaPost );
            var respostaTempfimVermelhoPOSTPOST = xhrfimVermelhoPOSTPOST.responseText;
            //cc.log( "resultadoTemp = "+respostaTemp );




            xhrfimVermelhoPOSTPOST.onreadystatechange = function ()
            {
                //cc.log( "Networking away" );
                //cc.log(xhr.readyState);
                //cc.log(xhr.status);
                //cc.log("net = "+semInternet);
                //cc.log("aqui = "+xhr.readyState);
                if ( xhrfimVermelhoPOSTPOST.readyState == 4 && ( xhrfimVermelhoPOSTPOST.status >= 200 && xhrfimVermelhoPOSTPOST.status <= 207 ) )
                {
                    var httpStatusfimVermelhoPOSTPOST = xhrfimVermelhoPOSTPOST.statusText;
                    //cc.log( httpStatus );

                    var responsefimVermelhoPOSTPOST = xhrfimVermelhoPOSTPOST.responseText;
                    //cc.log( response );
                    copiaLayerfimVermelhoPOSTPOST.getChildByTag(99).opacity = 0;

                    //corrigindo bug
                    copiaLayerfimVermelhoPOSTPOST.removeChildByTag(200);
                    copiaLayerfimVermelhoPOSTPOST.removeChildByTag(201);
                    copiaLayerfimVermelhoPOSTPOST.removeChildByTag(202);
                    //corrigindo bug

                    copiaLayerfimVermelhoPOSTPOST.removeChildByTag(100);
                    copiaLayerfimVermelhoPOSTPOST.removeChildByTag(101);
                    conectoufimVermelhoPOSTPOST = true;
                    checkInternetConnectionfimVermelhoPOSTPOST();
                    


                }else{
                    if(xhrfimVermelhoPOSTPOST.status == 0){
                        //cc.log("reasyState=0");
                        checkInternetConnectionfimVermelhoPOSTPOST();
                    }
                }
                //cc.log(xhr.readyState);
            };

            checkInternetConnectionTimeOutfimVermelhoPOSTPOST();
            
            
            
        
        
        // para o POST
        
        
        
        // APLICAR AS MUDANCAS NO ARQUIVO/BANCO AQUI
        
        
        if(tentativas===1){ // para ter 3 tentativas, checagem deve ser feita no 1
            tentativas = 3;
            status=Number(status)+1;
            idLabirintoAtual=Number(idLabirintoAtual)+1;
            // POST(resultadoParaPost);
            // POST (não passou);
        }else{
            tentativas-=1;
            idLabirintoAtual = Number(idLabirintoAtual)+1;
        }
        
        
        return true;
    },
    
    sairDoJogo3: function(sender, type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                fimVermelhoPOST_exit_game = false;
                var fimVermelhoPOST_exit_game = false; // Para sair do jogo a partir do fimVermelhoPOST
                //var pontuacao = 0;
                
                
                idLabirintoAtual = Number(idLabirintoAtual)+1;
                if (idLabirintoAtual===31){
                    idLabirintoAtual = 0;
                }
        
                INITTIALIZED_Acel = false;
                INITTIALIZED_histplat = false;
                INITTIALAZED = false;
                cc.audioEngine.end();
                //cc.director.popToSceneStackLevel(2);
                INITTIALIZED_minimapa = false;
                var minimapa = new MiniMapScene1();
                cc.director.runScene(minimapa);
                //pop();
                break;
        }
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

    


var FimVermelhoScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_vermelho = true;
            this._super();
            var fimvermelholayer = new FimVermelhoLayer();
            this.addChild(fimvermelholayer);
    }
});

