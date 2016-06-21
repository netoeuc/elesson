/* globals cc, asset */

var INITTIALIZED_fimverdePOST = false;
var INITTIALIZED_fimVerdePOST = false;
var conectoufimVerdePOST = false;
var copiaLayerfimVerdePOST;
var loadingErrorLabelfimVerdePOST;
var loadingErrorImgfimVerdePOST;
var loadingErrorButtonfimVerdePOST;
var size;
var FimVerdePOSTLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        // reproduzir efeito sonoro (venceu)
        
        var size = cc.winSize;
        
        copiaLayerfimVerdePOST = this;
        
        var backgroundVerdePOST = new cc.Sprite.create(asset.telaFim_green_png); 
        backgroundVerdePOST.setAnchorPoint(cc.p( 0, 0 ));
        backgroundVerdePOST.setPosition(cc.p(0, 0));
        this.addChild(backgroundVerdePOST, -1);
        
        var backToMap2POST = new ccui.Button();
        backToMap2POST.loadTextures(asset.telaFim_buttonMap_png);
        backToMap2POST.setAnchorPoint(cc.p(0,0));  
        backToMap2POST.setPosition(cc.p(100, 100));
//        backToMap2POST.addTouchEventListener(this.sairDoJogo2, this);
        this.addChild(backToMap2POST);
        
        
//         para o POST
        
            conectoufimVerdePOST = false;

            var logoLoadingfimVerdePOST = new cc.Sprite.create(asset.loading_eLeassons_png);

            logoLoadingfimVerdePOST.setAnchorPoint(cc.p( 0.5, 0.5 ));
            logoLoadingfimVerdePOST.setPosition(cc.p(240, 400));
            this.addChild(logoLoadingfimVerdePOST, 100, 100); //tag = 100

             var backgroundLoadingfimVerdePOST = new cc.Sprite.create(asset.loading_background_png);

            backgroundLoadingfimVerdePOST.setAnchorPoint(cc.p( 0, 0 ));
            backgroundLoadingfimVerdePOST.setPosition(cc.p(0, 0));
            backgroundLoadingfimVerdePOST.opacity = 100;
            this.addChild(backgroundLoadingfimVerdePOST, 99, 99); // tag = 99





            var labelLoadingYourDatafimVerdePOST = new ccui.RichText();
            labelLoadingYourDatafimVerdePOST.setAnchorPoint(cc.p(0,0));
            labelLoadingYourDatafimVerdePOST.ignoreContentAdaptWithSize(false);
            labelLoadingYourDatafimVerdePOST.width = size.width-80;
            labelLoadingYourDatafimVerdePOST.height = 65;
            var labelLoadingYourDataTextfimVerdePOST = new ccui.RichElementText(1, cc.color.WHITE, 255,"Sending your results... ", "Helvetica", 20);
            labelLoadingYourDatafimVerdePOST.setLineBreakOnSpace(true);
            labelLoadingYourDatafimVerdePOST.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
            labelLoadingYourDatafimVerdePOST.pushBackElement(labelLoadingYourDataTextfimVerdePOST);
            labelLoadingYourDatafimVerdePOST.setPosition(cc.p(-50, 200));
            this.addChild(labelLoadingYourDatafimVerdePOST, 101, 101); // tag = 101


            loadingErrorLabelfimVerdePOST = new ccui.RichText();
            loadingErrorLabelfimVerdePOST.setAnchorPoint(cc.p(0,0));
            loadingErrorLabelfimVerdePOST.ignoreContentAdaptWithSize(false);
            loadingErrorLabelfimVerdePOST.width = size.width-80;
            loadingErrorLabelfimVerdePOST.height = 65;
            var loadingErrorLabelTextfimVerdePOST = new ccui.RichElementText(1, cc.color.WHITE, 255,"You have no Internet Connection...", "Helvetica", 20);
            loadingErrorLabelfimVerdePOST.setLineBreakOnSpace(true);
            loadingErrorLabelfimVerdePOST.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
            loadingErrorLabelfimVerdePOST.pushBackElement(loadingErrorLabelTextfimVerdePOST);
            loadingErrorLabelfimVerdePOST.setPosition(cc.p(-100, 220));
//            this.addChild(loadingErrorLabel, 101);


            loadingErrorImgfimVerdePOST = new cc.Sprite.create(asset.loading_error_png);
            loadingErrorImgfimVerdePOST.setAnchorPoint(cc.p( 0.5, 0.5 ));
            loadingErrorImgfimVerdePOST.setPosition(cc.p(235, 420));
//            this.addChild(loadingErrorImg, 100);


            loadingErrorButtonfimVerdePOST= new ccui.Button();
            loadingErrorButtonfimVerdePOST.loadTextures(asset.loading_tryAgain_png);
            loadingErrorButtonfimVerdePOST.setAnchorPoint(cc.p(0,0));   

            loadingErrorButtonfimVerdePOST.addTouchEventListener(this.conectarNovamentefimVerdePOST, this);
            loadingErrorButtonfimVerdePOST.setPosition(cc.p(170,200));
//            this.addChild(loadingErrorButton, 12);


            
            var xhrfimVerdePOST = cc.loader.getXMLHttpRequest();
        
            
            var xhr = cc.loader.getXMLHttpRequest();    
            xhrfimVerdePOST.open( "POST", apiURL+"api/student/questions/answers" );
            xhrfimVerdePOST.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
//            var arguementsfimVerdePOST = "Olha o POST funcionando!";
            var param1POSTverde = JSON.stringify(resultadoParaPost);
            var param2POSTverde = userInfo.getItem("sessao");
            var argumentsPOSTverde = "jra="+param1POSTverde+"&se="+param2POSTverde;
            xhrfimVerdePOST.send( argumentsPOSTverde );
            //cc.log("linha 109");
            //cc.log(resultadoParaPost);
            var respostaTempfimVerdePOST = xhrfimVerdePOST.responseText;
            ////cc.log( "resultadoTemp = "+respostaTemp );
            //cc.log(xhrfimVerdePOST.responseText);



            xhrfimVerdePOST.onreadystatechange = function ()
            {
                ////cc.log( "Networking away" );
                ////cc.log(xhr.readyState);
                ////cc.log(xhr.status);
                ////cc.log("net = "+semInternet);
                ////cc.log("aqui = "+xhr.readyState);
                 //cc.log(xhrfimVerdePOST.responseText);
                if ( xhrfimVerdePOST.readyState == 4 && ( xhrfimVerdePOST.status >= 200 && xhrfimVerdePOST.status <= 207 ) )
                {
                    var httpStatusfimVerdePOST = xhrfimVerdePOST.statusText;
                    ////cc.log( httpStatus );

                    var responsefimVerdePOST = xhrfimVerdePOST.responseText;
                    ////cc.log( response );
                    copiaLayerfimVerdePOST.getChildByTag(99).opacity = 0;

                    //corrigindo bug
                    copiaLayerfimVerdePOST.removeChildByTag(200);
                    copiaLayerfimVerdePOST.removeChildByTag(201);
                    copiaLayerfimVerdePOST.removeChildByTag(202);
                    //corrigindo bug

                    copiaLayerfimVerdePOST.removeChildByTag(100);
                    copiaLayerfimVerdePOST.removeChildByTag(101);
                    conectoufimVerdePOST = true;
                    checkInternetConnectionfimVerdePOST();
                    


                }else{
                    if(xhrfimVerdePOST.status === 0){
                        ////cc.log("reasyState=0");
                        
                        checkInternetConnectionfimVerdePOST();
                    }
                }
                ////cc.log(xhr.readyState);
            };

            checkInternetConnectionTimeOutfimVerdePOST();
            
            
            
        
        
        // para o POST
        
        
        
        
        
        
        return true;
    },
    
    conectarNovamentefimVerdePOST: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                INITTIALIZED_fimVerdePOST = false;
                conectoufimVerdePOST = false;
                var cenaTryAgainConnectionfimVerdePOST = new FimVerdePOSTScene();
                copiaLayerfimVerdePOST = cenaTryAgainConnectionfimVerdePOST;
                cc.director.runScene(cenaTryAgainConnectionfimVerdePOST);
                break;
        }
    },
    
});

    

var popfimVerdePOST = function(){
//    if (fimVerdePOST_exit_game===true){
//        //cc.log(fimVerdePOST_exit_game);
//        cc.audioEngine.end();
//        cc.director.popToSceneStackLevel(0);
//    }else{
//        //cc.log("else");
//        // substituir
//        //cc.director.popScene();
//        cc.director.pushScene(); // 1 -> mapa, 2 -> minimapa, 3 -> labirinto/plataforma, 4 -> fimVerdePOST     
//    }
    cc.director.popScene();
    
    
};

var checkInternetConnectionfimVerdePOST = function(){
    //cc.log("checando conexão...:");
    if(!conectoufimVerdePOST){
        copiaLayerfimVerdePOST.removeChildByTag(100);
        copiaLayerfimVerdePOST.removeChildByTag(101);
        copiaLayerfimVerdePOST.getChildByTag(99).opacity = 200;
        copiaLayerfimVerdePOST.addChild(loadingErrorImgfimVerdePOST, 100, 200);
        copiaLayerfimVerdePOST.addChild(loadingErrorLabelfimVerdePOST, 100, 201);
        copiaLayerfimVerdePOST.addChild(loadingErrorButtonfimVerdePOST, 100, 202);
    }else{
        //cc.log("voltando pelo fimVerdePOST");
        
        
        INITTIALIZED_Acel = false;
        INITTIALIZED_histplat = false;
        INITTIALIZED_plat = false;
        INITTIALIZED_histplat = false;
        INITTIALIZED_toque = false;
        INITTIALAZED = false;
        cc.audioEngine.end();
        //cc.director.popToSceneStackLevel(2);
        INITTIALIZED_minimapa=false;
        INITTIALIZED_fimVerdePOST=false;
        
        
        var sairDoJogoScene = new MiniMapScene1();
        cc.director.runScene(sairDoJogoScene);
    }
    
};



var checkInternetConnectionTimeOutfimVerdePOST = function(){
    setTimeout(function(){
    if(!conectoufimVerdePOST){
        copiaLayerfimVerdePOST.removeChildByTag(100);
        copiaLayerfimVerdePOST.removeChildByTag(101);
        copiaLayerfimVerdePOST.getChildByTag(99).opacity = 200;
        copiaLayerfimVerdePOST.addChild(loadingErrorImgfimVerdePOST, 100, 200);
        copiaLayerfimVerdePOST.addChild(loadingErrorLabelfimVerdePOST, 100, 201);
        copiaLayerfimVerdePOST.addChild(loadingErrorButtonfimVerdePOST, 100, 202);
    }
    
}, 20000);};

    


var FimVerdePOSTScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_fimverdePOST = true;
            this._super();
            var fimverdePOSTlayer = new FimVerdePOSTLayer();
            this.addChild(fimverdePOSTlayer);
    }
});

