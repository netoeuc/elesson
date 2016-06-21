/* globals cc, asset */

var INITTIALIZED_fimvermelhorPOST = false;
var INITTIALIZED_fimVermelhoPOST = false;
var conectoufimVermelhoPOST = false;
var copiaLayerfimVermelhoPOST;
var loadingErrorLabelfimVermelhoPOST;
var loadingErrorImgfimVermelhoPOST;
var loadingErrorButtonfimVermelhoPOST;
var size;
var FimVermelhoPOSTLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        // reproduzir efeito sonoro (venceu)
        
        var size = cc.winSize;
        
        copiaLayerfimVermelhoPOST = this;
        
        var backgroundVermelhoPOST = new cc.Sprite.create(asset.telaFim_red_png); 
        backgroundVermelhoPOST.setAnchorPoint(cc.p( 0, 0 ));
        backgroundVermelhoPOST.setPosition(cc.p(0, 0));
        this.addChild(backgroundVermelhoPOST, -1);
        
        var backToMap2POST = new ccui.Button();
        backToMap2POST.loadTextures(asset.telaFim_buttonMap_png);
        backToMap2POST.setAnchorPoint(cc.p(0,0));  
        backToMap2POST.setPosition(cc.p(100, 100));
//        backToMap2POST.addTouchEventListener(this.sairDoJogo2, this);
        this.addChild(backToMap2POST);
        
        
//         para o POST
        
            conectoufimVermelhoPOST = false;

            var logoLoadingfimVermelhoPOST = new cc.Sprite.create(asset.loading_eLeassons_png);

            logoLoadingfimVermelhoPOST.setAnchorPoint(cc.p( 0.5, 0.5 ));
            logoLoadingfimVermelhoPOST.setPosition(cc.p(240, 400));
            this.addChild(logoLoadingfimVermelhoPOST, 100, 100); //tag = 100

             var backgroundLoadingfimVermelhoPOST = new cc.Sprite.create(asset.loading_background_png);

            backgroundLoadingfimVermelhoPOST.setAnchorPoint(cc.p( 0, 0 ));
            backgroundLoadingfimVermelhoPOST.setPosition(cc.p(0, 0));
            backgroundLoadingfimVermelhoPOST.opacity = 100;
            this.addChild(backgroundLoadingfimVermelhoPOST, 99, 99); // tag = 99





            var labelLoadingYourDatafimVermelhoPOST = new ccui.RichText();
            labelLoadingYourDatafimVermelhoPOST.setAnchorPoint(cc.p(0,0));
            labelLoadingYourDatafimVermelhoPOST.ignoreContentAdaptWithSize(false);
            labelLoadingYourDatafimVermelhoPOST.width = size.width-80;
            labelLoadingYourDatafimVermelhoPOST.height = 65;
            var labelLoadingYourDataTextfimVermelhoPOST = new ccui.RichElementText(1, cc.color.WHITE, 255,"Sending your results... ", "Helvetica", 20);
            labelLoadingYourDatafimVermelhoPOST.setLineBreakOnSpace(true);
            labelLoadingYourDatafimVermelhoPOST.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
            labelLoadingYourDatafimVermelhoPOST.pushBackElement(labelLoadingYourDataTextfimVermelhoPOST);
            labelLoadingYourDatafimVermelhoPOST.setPosition(cc.p(-50, 200));
            this.addChild(labelLoadingYourDatafimVermelhoPOST, 101, 101); // tag = 101


            loadingErrorLabelfimVermelhoPOST = new ccui.RichText();
            loadingErrorLabelfimVermelhoPOST.setAnchorPoint(cc.p(0,0));
            loadingErrorLabelfimVermelhoPOST.ignoreContentAdaptWithSize(false);
            loadingErrorLabelfimVermelhoPOST.width = size.width-80;
            loadingErrorLabelfimVermelhoPOST.height = 65;
            var loadingErrorLabelTextfimVermelhoPOST = new ccui.RichElementText(1, cc.color.WHITE, 255,"You have no Internet Connection...", "Helvetica", 20);
            loadingErrorLabelfimVermelhoPOST.setLineBreakOnSpace(true);
            loadingErrorLabelfimVermelhoPOST.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
            loadingErrorLabelfimVermelhoPOST.pushBackElement(loadingErrorLabelTextfimVermelhoPOST);
            loadingErrorLabelfimVermelhoPOST.setPosition(cc.p(-100, 220));
//            this.addChild(loadingErrorLabel, 101);


            loadingErrorImgfimVermelhoPOST = new cc.Sprite.create(asset.loading_error_png);
            loadingErrorImgfimVermelhoPOST.setAnchorPoint(cc.p( 0.5, 0.5 ));
            loadingErrorImgfimVermelhoPOST.setPosition(cc.p(235, 420));
//            this.addChild(loadingErrorImg, 100);


            loadingErrorButtonfimVermelhoPOST= new ccui.Button();
            loadingErrorButtonfimVermelhoPOST.loadTextures(asset.loading_tryAgain_png);
            loadingErrorButtonfimVermelhoPOST.setAnchorPoint(cc.p(0,0));   

            loadingErrorButtonfimVermelhoPOST.addTouchEventListener(this.conectarNovamentefimVermelhoPOST, this);
            loadingErrorButtonfimVermelhoPOST.setPosition(cc.p(170,200));
//            this.addChild(loadingErrorButton, 12);


            
            var xhrfimVermelhoPOST = cc.loader.getXMLHttpRequest();
        
            
            var xhr = cc.loader.getXMLHttpRequest();    
            xhrfimVermelhoPOST.open( "POST", apiURL+"api/student/questions/answers" );
            xhrfimVermelhoPOST.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
//            var arguementsfimVermelhoPOST = "Olha o POST funcionando!";
            //cc.log(resultadoParaPost);
            //cc.log("foi aqui");
            var param1POSTvermelho = JSON.stringify(resultadoParaPost);
            var param2POSTvermelho = userInfo.getItem("sessao");
            var argumentsPOSTvermelho = "jra="+param1POSTvermelho+"&se="+param2POSTvermelho;
            xhrfimVermelhoPOST.send( argumentsPOSTvermelho );
            var respostaTempfimVermelhoPOST = xhrfimVermelhoPOST.responseText;
            ////cc.log( "resultadoTemp = "+respostaTemp );




            xhrfimVermelhoPOST.onreadystatechange = function ()
            {
                ////cc.log( "Networking away" );
                ////cc.log(xhr.readyState);
                ////cc.log(xhr.status);
                ////cc.log("net = "+semInternet);
                ////cc.log("aqui = "+xhr.readyState);
                if ( xhrfimVermelhoPOST.readyState == 4 && ( xhrfimVermelhoPOST.status >= 200 && xhrfimVermelhoPOST.status <= 207 ) )
                {
                    var httpStatusfimVermelhoPOST = xhrfimVermelhoPOST.statusText;
                    ////cc.log( httpStatus );

                    var responsefimVermelhoPOST = xhrfimVermelhoPOST.responseText;
                    ////cc.log( response );
                    copiaLayerfimVermelhoPOST.getChildByTag(99).opacity = 0;

                    //corrigindo bug
                    copiaLayerfimVermelhoPOST.removeChildByTag(200);
                    copiaLayerfimVermelhoPOST.removeChildByTag(201);
                    copiaLayerfimVermelhoPOST.removeChildByTag(202);
                    //corrigindo bug

                    copiaLayerfimVermelhoPOST.removeChildByTag(100);
                    copiaLayerfimVermelhoPOST.removeChildByTag(101);
                    conectoufimVermelhoPOST = true;
                    checkInternetConnectionfimVermelhoPOST();
                    


                }else{
                    if(xhrfimVermelhoPOST.status === 0){
                        ////cc.log("reasyState=0");
                        
                        checkInternetConnectionfimVermelhoPOST();
                    }
                }
                ////cc.log(xhr.readyState);
            };

            checkInternetConnectionTimeOutfimVermelhoPOST();
            
            
            
        
        
        // para o POST
        
        
        
        
        
        
        return true;
    },
    
    conectarNovamentefimVermelhoPOST: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                INITTIALIZED_fimVermelhoPOST = false;
                conectoufimVermelhoPOST = false;
                var cenaTryAgainConnectionfimVermelhoPOST = new FimVermelhoPOSTScene();
                copiaLayerfimVermelhoPOST = cenaTryAgainConnectionfimVermelhoPOST;
                cc.director.runScene(cenaTryAgainConnectionfimVermelhoPOST);
                break;
        }
    },
    
});

    

var popfimVermelhoPOST = function(){
//    if (fimVermelhoPOST_exit_game===true){
//        //cc.log(fimVermelhoPOST_exit_game);
//        cc.audioEngine.end();
//        cc.director.popToSceneStackLevel(0);
//    }else{
//        //cc.log("else");
//        // substituir
//        //cc.director.popScene();
//        cc.director.pushScene(); // 1 -> mapa, 2 -> minimapa, 3 -> labirinto/plataforma, 4 -> fimVermelhoPOST     
//    }
    cc.director.popScene();
    
    
};

var checkInternetConnectionfimVermelhoPOST = function(){
    //cc.log("checando conexão...:");
    if(!conectoufimVermelhoPOST){
        copiaLayerfimVermelhoPOST.removeChildByTag(100);
        copiaLayerfimVermelhoPOST.removeChildByTag(101);
        copiaLayerfimVermelhoPOST.getChildByTag(99).opacity = 200;
        copiaLayerfimVermelhoPOST.addChild(loadingErrorImgfimVermelhoPOST, 100, 200);
        copiaLayerfimVermelhoPOST.addChild(loadingErrorLabelfimVermelhoPOST, 100, 201);
        copiaLayerfimVermelhoPOST.addChild(loadingErrorButtonfimVermelhoPOST, 100, 202);
    }else{
        //cc.log("voltando pelo fimVermelhoPOST");
        
        
        INITTIALIZED_Acel = false;
        INITTIALIZED_histplat = false;
        INITTIALIZED_plat = false;
        INITTIALIZED_histplat = false;
        INITTIALIZED_toque = false;
        INITTIALAZED = false;
        cc.audioEngine.end();
        //cc.director.popToSceneStackLevel(2);
        INITTIALIZED_minimapa=false;
        INITTIALIZED_fimVermelhoPOST=false;
        
        
        var sairDoJogoScene = new MiniMapScene1();
        cc.director.runScene(sairDoJogoScene);
    }
    
};



var checkInternetConnectionTimeOutfimVermelhoPOST = function(){
    setTimeout(function(){
    if(!conectoufimVermelhoPOST){
        copiaLayerfimVermelhoPOST.removeChildByTag(100);
        copiaLayerfimVermelhoPOST.removeChildByTag(101);
        copiaLayerfimVermelhoPOST.getChildByTag(99).opacity = 200;
        copiaLayerfimVermelhoPOST.addChild(loadingErrorImgfimVermelhoPOST, 100, 200);
        copiaLayerfimVermelhoPOST.addChild(loadingErrorLabelfimVermelhoPOST, 100, 201);
        copiaLayerfimVermelhoPOST.addChild(loadingErrorButtonfimVermelhoPOST, 100, 202);
    }
    
}, 20000);};

    


var FimVermelhoPOSTScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_fimvermelhorPOST = true;
            this._super();
            var fimvermelhorPOSTlayer = new FimVermelhoPOSTLayer();
            this.addChild(fimvermelhorPOSTlayer);
    }
});

