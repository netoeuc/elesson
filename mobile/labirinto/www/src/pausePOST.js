/* globals cc, asset */


var INITTIALIZED_pausePOST = false;
var conectoupausePOST = false;
var copiaLayerpausePOST;
var loadingErrorLabelpausePOST;
var loadingErrorImgpausePOST;
var loadingErrorButtonpausePOST;
var size;

var PausePOSTLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        cc.log("entrouNoPausePOST");
        size = cc.winSize;
//        copiaLayerMinimapa = this;
        conectoupausePOST = false;
        copiaLayerpausePOST = this;
        
        
        var backgroundpausePOST = new cc.Sprite.create(asset.pause_background_png); 
        backgroundpausePOST.setAnchorPoint(cc.p( 0, 0 ));
        backgroundpausePOST.setPosition(cc.p(0, 0));
        this.addChild(backgroundpausePOST, -1);
        
        var voltarButton = new ccui.Button();
        voltarButton.loadTextures(asset.pause_decline_png);
        voltarButton.setAnchorPoint(cc.p(0,0));
        voltarButton.setPosition(cc.p(60, 50));
//        voltarButton.x = (size.width/2);
//        voltarButton.y = (size.heigth/2);
//        voltarButton.addTouchEventListener(this.voltarAoJogo, this);
        this.addChild(voltarButton);
        
        var sairButton = new ccui.Button();
        sairButton.loadTextures(asset.pause_accept_png);
        sairButton.setAnchorPoint(cc.p(0,0));
        sairButton.setPosition(cc.p(270, 50));
//        sairButton.addTouchEventListener(this.sairDoJogo, this);
        this.addChild(sairButton);
        
        
        
//         para o POST
        
            conectoupausePOST = false;

            var logoLoadingpausePOST = new cc.Sprite.create(asset.loading_eLeassons_png);

            logoLoadingpausePOST.setAnchorPoint(cc.p( 0.5, 0.5 ));
            logoLoadingpausePOST.setPosition(cc.p(240, 400));
            this.addChild(logoLoadingpausePOST, 100, 100); //tag = 100

             var backgroundLoadingpausePOST = new cc.Sprite.create(asset.loading_background_png);

            backgroundLoadingpausePOST.setAnchorPoint(cc.p( 0, 0 ));
            backgroundLoadingpausePOST.setPosition(cc.p(0, 0));
            backgroundLoadingpausePOST.opacity = 100;
            this.addChild(backgroundLoadingpausePOST, 99, 99); // tag = 99





            var labelLoadingYourDatapausePOST = new ccui.RichText();
            labelLoadingYourDatapausePOST.setAnchorPoint(cc.p(0,0));
            labelLoadingYourDatapausePOST.ignoreContentAdaptWithSize(false);
            labelLoadingYourDatapausePOST.width = size.width-80;
            labelLoadingYourDatapausePOST.height = 65;
            var labelLoadingYourDataTextpausePOST = new ccui.RichElementText(1, cc.color.WHITE, 255,"Sending your results... ", "Helvetica", 20);
            labelLoadingYourDatapausePOST.setLineBreakOnSpace(true);
            labelLoadingYourDatapausePOST.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
            labelLoadingYourDatapausePOST.pushBackElement(labelLoadingYourDataTextpausePOST);
            labelLoadingYourDatapausePOST.setPosition(cc.p(-50, 200));
            this.addChild(labelLoadingYourDatapausePOST, 101, 101); // tag = 101


            loadingErrorLabelpausePOST = new ccui.RichText();
            loadingErrorLabelpausePOST.setAnchorPoint(cc.p(0,0));
            loadingErrorLabelpausePOST.ignoreContentAdaptWithSize(false);
            loadingErrorLabelpausePOST.width = size.width-80;
            loadingErrorLabelpausePOST.height = 65;
            var loadingErrorLabelTextpausePOST = new ccui.RichElementText(1, cc.color.WHITE, 255,"You have no Internet Connection...", "Helvetica", 20);
            loadingErrorLabelpausePOST.setLineBreakOnSpace(true);
            loadingErrorLabelpausePOST.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
            loadingErrorLabelpausePOST.pushBackElement(loadingErrorLabelTextpausePOST);
            loadingErrorLabelpausePOST.setPosition(cc.p(-100, 220));
//            this.addChild(loadingErrorLabel, 101);


            loadingErrorImgpausePOST = new cc.Sprite.create(asset.loading_error_png);
            loadingErrorImgpausePOST.setAnchorPoint(cc.p( 0.5, 0.5 ));
            loadingErrorImgpausePOST.setPosition(cc.p(235, 420));
//            this.addChild(loadingErrorImg, 100);


            loadingErrorButtonpausePOST= new ccui.Button();
            loadingErrorButtonpausePOST.loadTextures(asset.loading_tryAgain_png);
            loadingErrorButtonpausePOST.setAnchorPoint(cc.p(0,0));   

            loadingErrorButtonpausePOST.addTouchEventListener(this.conectarNovamentepausePOST, this);
            loadingErrorButtonpausePOST.setPosition(cc.p(170,200));
//            this.addChild(loadingErrorButton, 12);


            
            var xhrpausePOST = cc.loader.getXMLHttpRequest();
        
            
            var xhr = cc.loader.getXMLHttpRequest();    
            xhrpausePOST.open( "POST", "http://requestb.in/ukb4gauk" );
            xhrpausePOST.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
//            var arguementspausePOST = "Olha o POST funcionando!";
            resultadoParaPost.resultado.level = Number(status)-1;
            idLabirinto = Number(idLabirintoAtual)+1;
            cc.log(resultadoParaPost);
            xhrpausePOST.send( resultadoParaPost );
            var respostaTemppausePOST = xhrpausePOST.responseText;
            //cc.log( "resultadoTemp = "+respostaTemp );




            xhrpausePOST.onreadystatechange = function ()
            {
                //cc.log( "Networking away" );
                //cc.log(xhr.readyState);
                //cc.log(xhr.status);
                //cc.log("net = "+semInternet);
                //cc.log("aqui = "+xhr.readyState);
                if ( xhrpausePOST.readyState == 4 && ( xhrpausePOST.status >= 200 && xhrpausePOST.status <= 207 ) )
                {
                    var httpStatuspausePOST = xhrpausePOST.statusText;
                    //cc.log( httpStatus );

                    var responsepausePOST = xhrpausePOST.responseText;
                    //cc.log( response );
                    copiaLayerpausePOST.getChildByTag(99).opacity = 0;

                    //corrigindo bug
                    copiaLayerpausePOST.removeChildByTag(200);
                    copiaLayerpausePOST.removeChildByTag(201);
                    copiaLayerpausePOST.removeChildByTag(202);
                    //corrigindo bug

                    copiaLayerpausePOST.removeChildByTag(100);
                    copiaLayerpausePOST.removeChildByTag(101);
                    conectoupausePOST = true;
                    checkInternetConnectionpausePOST();
                    


                }else{
                    if(xhrpausePOST.status === 0){
                        //cc.log("reasyState=0");
                        checkInternetConnectionpausePOST();
                    }
                }
                //cc.log(xhr.readyState);
            };

            checkInternetConnectionTimeOutpausePOST();
            
            
            
        
        
        // para o POST
        
        
        
        
        
        
        

        
        
        
        return true;
    },
    
    
    
    conectarNovamentepausePOST: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                INITTIALIZED_pausePOST = false;
                conectou = false;
                var cenaTryAgainConnectionpausePOST = new PausePOSTScene();
                copiaLayerpausePOST = cenaTryAgainConnectionpausePOST;
                cc.director.runScene(cenaTryAgainConnectionpausePOST);
                break;
        }
    },
    
});

    

var popPausePOST = function(){
//    if (pausePOST_exit_game===true){
//        cc.log(pausePOST_exit_game);
//        cc.audioEngine.end();
//        cc.director.popToSceneStackLevel(0);
//    }else{
//        cc.log("else");
//        // substituir
//        //cc.director.popScene();
//        cc.director.pushScene(); // 1 -> mapa, 2 -> minimapa, 3 -> labirinto/plataforma, 4 -> pausePOST     
//    }
    cc.director.popScene();
    
    
};

var checkInternetConnectionpausePOST = function(){
    if(!conectoupausePOST){
        copiaLayerpausePOST.removeChildByTag(100);
        copiaLayerpausePOST.removeChildByTag(101);
        copiaLayerpausePOST.getChildByTag(99).opacity = 200;
        copiaLayerpausePOST.addChild(loadingErrorImgpausePOST, 100, 200);
        copiaLayerpausePOST.addChild(loadingErrorLabelpausePOST, 100, 201);
        copiaLayerpausePOST.addChild(loadingErrorButtonpausePOST, 100, 202);
    }else{
        cc.log("voltando pelo pausePOST");
        
        
        INITTIALIZED_Acel = false;
        INITTIALIZED_histplat = false;
        INITTIALIZED_plat = false;
        INITTIALIZED_histplat = false;
        INITTIALIZED_toque = false;
        INITTIALAZED = false;
        cc.audioEngine.end();
        //cc.director.popToSceneStackLevel(2);
        INITTIALIZED_minimapa=false;
        INITTIALIZED_pausePOST=false;
        
        
        var sairDoJogoScene = new MiniMapScene1();
        cc.director.runScene(sairDoJogoScene);
    }
    
};



var checkInternetConnectionTimeOutpausePOST = function(){
    setTimeout(function(){
    if(!conectoupausePOST){
        copiaLayerpausePOST.removeChildByTag(100);
        copiaLayerpausePOST.removeChildByTag(101);
        copiaLayerpausePOST.getChildByTag(99).opacity = 200;
        copiaLayerpausePOST.addChild(loadingErrorImgpausePOST, 100, 200);
        copiaLayerpausePOST.addChild(loadingErrorLabelpausePOST, 100, 201);
        copiaLayerpausePOST.addChild(loadingErrorButtonpausePOST, 100, 202);
    }
    
}, 20000);};


var PausePOSTScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_pausePOST = true;
            this._super();
            var pausePOSTlayer = new PausePOSTLayer();
            this.addChild(pausePOSTlayer);
    }
});

