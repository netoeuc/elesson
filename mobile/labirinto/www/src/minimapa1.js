var INITTIALIZED_minimapa = false;
var conectou = false;
var copiaLayerMinimapa;
var loadingErrorLabel;
var loadingErrorImg;
var loadingErrorButton;
var semInternet = false;
var contagemSemInternet = 100;
var MiniMapLayer1 = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        cc.audioEngine.end();
        cc.audioEngine.playMusic(asset.mapa_musica_mp3, true);
        INITTIALIZED_minimapa = true;
        var size = cc.winSize;
        numeroPerguntaQuizLabirinto = 0;
        resultadoParaPost = ["codigoDoAluno",[],[]];
        copiaLayerMinimapa = this;
        
        var logoLoading = new cc.Sprite.create(asset.loading_eLeassons_png);
        
        logoLoading.setAnchorPoint(cc.p( 0.5, 0.5 ));
        logoLoading.setPosition(cc.p(240, 400));
        this.addChild(logoLoading, 100, 100); //tag = 100
        
         var backgroundLoading = new cc.Sprite.create(asset.loading_background_png);
        
        backgroundLoading.setAnchorPoint(cc.p( 0, 0 ));
        backgroundLoading.setPosition(cc.p(0, 0));
        backgroundLoading.opacity = 100;
        this.addChild(backgroundLoading, 99, 99); // tag = 99
        
       
        
        
        
        var labelLoadingYourData = new ccui.RichText();
        labelLoadingYourData.setAnchorPoint(cc.p(0,0));
        labelLoadingYourData.ignoreContentAdaptWithSize(false);
        labelLoadingYourData.width = size.width-80;
        labelLoadingYourData.height = 65;
        var labelLoadingYourDataText = new ccui.RichElementText(1, cc.color.WHITE, 255,"Getting new questions...", "Helvetica", 20);
        labelLoadingYourData.setLineBreakOnSpace(true);
        labelLoadingYourData.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        labelLoadingYourData.pushBackElement(labelLoadingYourDataText);
        labelLoadingYourData.setPosition(cc.p(-50, 200));
        this.addChild(labelLoadingYourData, 101, 101); // tag = 101
        
        
        
        
        
        
        
        
        loadingErrorLabel = new ccui.RichText();
        loadingErrorLabel.setAnchorPoint(cc.p(0,0));
        loadingErrorLabel.ignoreContentAdaptWithSize(false);
        loadingErrorLabel.width = size.width-80;
        loadingErrorLabel.height = 65;
        var loadingErrorLabelText = new ccui.RichElementText(1, cc.color.WHITE, 255,"You have no Internet Connection...", "Helvetica", 20);
        loadingErrorLabel.setLineBreakOnSpace(true);
        loadingErrorLabel.setTextHorizontalAlignment(cc.Text_ALIGNMENT_CENTER);
        loadingErrorLabel.pushBackElement(loadingErrorLabelText);
        loadingErrorLabel.setPosition(cc.p(-50, 200));
//        this.addChild(loadingErrorLabel, 101);
        
        
        loadingErrorImg = new cc.Sprite.create(asset.loading_error_png);
        loadingErrorImg.setAnchorPoint(cc.p( 0.5, 0.5 ));
        loadingErrorImg.setPosition(cc.p(240, 400));
//        this.addChild(loadingErrorImg, 100);
        
        
        loadingErrorButton= new ccui.Button();
        loadingErrorButton.loadTextures(asset.loading_tryAgain_png);
        loadingErrorButton.setAnchorPoint(cc.p(0,0));   

        loadingErrorButton.addTouchEventListener(this.conectarNovamente, this);
        loadingErrorButton.setPosition(cc.p(200,180));
//        this.addChild(loadingErrorButton, 12);
        
        
        
        
        
        var xhr = cc.loader.getXMLHttpRequest();
        
        xhr.open( "GET", "http://loterias.pe.hu/api/megasena/resultado/1719" );
        xhr.setRequestHeader( "Content-Type", "text/plain" );
        xhr.send( );
        
        
                                      
        xhr.onreadystatechange = function ()
        {
            cc.log( "Networking away" );
                                      
            if ( xhr.readyState == 4 && ( xhr.status >= 200 && xhr.status <= 207 ) )
            {
                var httpStatus = xhr.statusText;
                cc.log( httpStatus );

                var response = xhr.responseText;
                cc.log( response );
                conectou = true;
                if(!semInternet){
                    copiaLayerMinimapa.removeChildByTag(99);
                    copiaLayerMinimapa.removeChildByTag(100);
                    copiaLayerMinimapa.removeChildByTag(101);
                }
                
            }else{
                contagemSemInternet-=1;
                cc.log(contagemSemInternet);
                if(contagemSemInternet===0){
                    semInternet = true;
                    copiaLayerMinimapa.removeChildByTag(100);
                    copiaLayerMinimapa.removeChildByTag(101);
                    copiaLayerMinimapa.addChild(loadingErrorImg);
                    copiaLayerMinimapa.addChild(loadingErrorLabel);
                    copiaLayerMinimapa.addChild(loadingErrorButton);
                    //alert("You have no Internet Connection!");
                }
            }
        };
        
       
        
        
        //-------- GET --------//
        //getDados();
        
        var retornoGetQuestoes = 
            {"listaQuestoes":[
                {
                    "id":1,
                    "questao": "To learn English, you _____ to work very hard, but just _____ practicing"+
                                "and you will learn it!",
                    "resposta1": "have/keep" ,
                    "resposta2": "have/still",
                    "resposta3": "has/keep",
                    "resposta4": "have/kept",
                    "resposta5": "had/keep",
                    "respostaCorreta": 'a',
                    "level":1
                },
                
                {
                    "id":2,
                    "questao": "You are _____ than you think!",
                    "resposta1": "more smart" ,
                    "resposta2": "smater",
                    "resposta3": "still",
                    "resposta4": "also",
                    "resposta5": "being",
                    "respostaCorreta": 'b',
                    "level":1
                    
                },
                
                {
                    "id":3,
                    "questao": "You _______ such a good student!",
                    "resposta1": "are" ,
                    "resposta2": "am",
                    "resposta3": "is",
                    "resposta4": "have",
                    "resposta5": "has",
                    "respostaCorreta": 'a',
                    "level":1
                    
                },
                
                {
                    "id":4,
                    "questao": "Pergunta de teste 4",
                    "resposta1": "Resposta A" ,
                    "resposta2": "Resposta B",
                    "resposta3": "Resposta C",
                    "resposta4": "Resposta D (certa)",
                    "resposta5": "Resposta E",
                    "respostaCorreta": 'd',
                    "level":1
                    
                },
                
                {
                    "id":5,
                    "questao": "Pergunta de teste 5",
                    "resposta1": "Resposta A" ,
                    "resposta2": "Resposta B (certa)",
                    "resposta3": "Resposta C",
                    "resposta4": "Resposta D",
                    "resposta5": "Resposta E",
                    "respostaCorreta": 'b',
                    "level":1
                    
                    
                },
                
                
                
                
            ]
                
            };

        
        
//        
//        userInfo.setItem("pergunta1", "To learn English, you _____ to work very hard, but just _____ practicing and you will learn it!");
//        userInfo.setItem("pergunta1_alternativa1", "have/keep");
//        userInfo.setItem("pergunta1_alternativa2", "have/still");
//        userInfo.setItem("pergunta1_alternativa3", "has/keep");
//        userInfo.setItem("pergunta1_alternativa4", "have/kept");
//        userInfo.setItem("pergunta1_alternativa5", "had/keep");
//        userInfo.setItem("pergunta1_respostaCerta", 'a');
//        userInfo.setItem("pergunta1_idQuestao", 0);
//        
//        userInfo.setItem("pergunta2", "You are _____ than you think!");
//        userInfo.setItem("pergunta2_alternativa1", "more smart");
//        userInfo.setItem("pergunta2_alternativa2", "smater");
//        userInfo.setItem("pergunta2_alternativa3", "still");
//        userInfo.setItem("pergunta2_alternativa4", "also");
//        userInfo.setItem("pergunta2_alternativa5", "being");
//        userInfo.setItem("pergunta2_respostaCerta", 'b');
//        userInfo.setItem("pergunta2_idQuestao", 1);
//        
//
//        
//        userInfo.setItem("pergunta3", "You _______ such a good student!");
//        userInfo.setItem("pergunta3_alternativa1", "are");
//        userInfo.setItem("pergunta3_alternativa2", "am");
//        userInfo.setItem("pergunta3_alternativa3", "is");
//        userInfo.setItem("pergunta3_alternativa4", "have");
//        userInfo.setItem("pergunta3_alternativa5", "has");
//        userInfo.setItem("pergunta3_respostaCerta", 'a');
//        userInfo.setItem("pergunta3_idQuestao", 2);
//        
//        
//        userInfo.setItem("pergunta4", "Pergunta de teste 4");
//        userInfo.setItem("pergunta4_alternativa1", "Resposta A");
//        userInfo.setItem("pergunta4_alternativa2", "Resposta B");
//        userInfo.setItem("pergunta4_alternativa3", "Resposta C");
//        userInfo.setItem("pergunta4_alternativa4", "Resposta D (certa)");
//        userInfo.setItem("pergunta4_alternativa5", "Resposta E");
//        userInfo.setItem("pergunta4_respostaCerta", 'd');
//        userInfo.setItem("pergunta4_idQuestao", 3);
//        
//        userInfo.setItem("pergunta5", "Pergunta de teste 5");
//        userInfo.setItem("pergunta5_alternativa1", "Resposta A");
//        userInfo.setItem("pergunta5_alternativa2", "Resposta B (certa)");
//        userInfo.setItem("pergunta5_alternativa3", "Resposta C");
//        userInfo.setItem("pergunta5_alternativa4", "Resposta D");
//        userInfo.setItem("pergunta5_alternativa5", "Resposta E");
//        userInfo.setItem("pergunta5_respostaCerta", "b");
//        userInfo.setItem("pergunta5_idQuestao", 4);
//        
//        
//        
//        resultadoParaPost[1] = 
//            [userInfo.getItem("pergunta1_idQuestao"),
//            userInfo.getItem("pergunta2_idQuestao"),
//            userInfo.getItem("pergunta3_idQuestao"),
//            userInfo.getItem("pergunta4_idQuestao"),
//            userInfo.getItem("pergunta5_idQuestao")];
//        
        
        
        
        
        userInfo.setItem("pergunta1", retornoGetQuestoes.listaQuestoes[0].questao);
        userInfo.setItem("pergunta1_alternativa1", retornoGetQuestoes.listaQuestoes[0].resposta1);
        userInfo.setItem("pergunta1_alternativa2", retornoGetQuestoes.listaQuestoes[0].resposta2);
        userInfo.setItem("pergunta1_alternativa3", retornoGetQuestoes.listaQuestoes[0].resposta3);
        userInfo.setItem("pergunta1_alternativa4", retornoGetQuestoes.listaQuestoes[0].resposta4);
        userInfo.setItem("pergunta1_alternativa5", retornoGetQuestoes.listaQuestoes[0].resposta5);
        userInfo.setItem("pergunta1_respostaCerta", retornoGetQuestoes.listaQuestoes[0].respostaCorreta);
        userInfo.setItem("pergunta1_idQuestao", retornoGetQuestoes.listaQuestoes[0].id);
        
        
        
        userInfo.setItem("pergunta2", retornoGetQuestoes.listaQuestoes[1].questao);
        userInfo.setItem("pergunta2_alternativa1", retornoGetQuestoes.listaQuestoes[1].resposta1);
        userInfo.setItem("pergunta2_alternativa2", retornoGetQuestoes.listaQuestoes[1].resposta2);
        userInfo.setItem("pergunta2_alternativa3", retornoGetQuestoes.listaQuestoes[1].resposta3);
        userInfo.setItem("pergunta2_alternativa4", retornoGetQuestoes.listaQuestoes[1].resposta4);
        userInfo.setItem("pergunta2_alternativa5", retornoGetQuestoes.listaQuestoes[1].resposta5);
        userInfo.setItem("pergunta2_respostaCerta", retornoGetQuestoes.listaQuestoes[1].respostaCorreta);
        userInfo.setItem("pergunta2_idQuestao", retornoGetQuestoes.listaQuestoes[1].id);
        
        
        
        userInfo.setItem("pergunta3", retornoGetQuestoes.listaQuestoes[2].questao);
        userInfo.setItem("pergunta3_alternativa1", retornoGetQuestoes.listaQuestoes[2].resposta1);
        userInfo.setItem("pergunta3_alternativa2", retornoGetQuestoes.listaQuestoes[2].resposta2);
        userInfo.setItem("pergunta3_alternativa3", retornoGetQuestoes.listaQuestoes[2].resposta3);
        userInfo.setItem("pergunta3_alternativa4", retornoGetQuestoes.listaQuestoes[2].resposta4);
        userInfo.setItem("pergunta3_alternativa5", retornoGetQuestoes.listaQuestoes[2].resposta5);
        userInfo.setItem("pergunta3_respostaCerta", retornoGetQuestoes.listaQuestoes[2].respostaCorreta);
        userInfo.setItem("pergunta3_idQuestao", retornoGetQuestoes.listaQuestoes[2].id);
        
        userInfo.setItem("pergunta4", retornoGetQuestoes.listaQuestoes[3].questao);
        userInfo.setItem("pergunta4_alternativa1", retornoGetQuestoes.listaQuestoes[3].resposta1);
        userInfo.setItem("pergunta4_alternativa2", retornoGetQuestoes.listaQuestoes[3].resposta2);
        userInfo.setItem("pergunta4_alternativa3", retornoGetQuestoes.listaQuestoes[3].resposta3);
        userInfo.setItem("pergunta4_alternativa4", retornoGetQuestoes.listaQuestoes[3].resposta4);
        userInfo.setItem("pergunta4_alternativa5", retornoGetQuestoes.listaQuestoes[3].resposta5);
        userInfo.setItem("pergunta4_respostaCerta", retornoGetQuestoes.listaQuestoes[3].respostaCorreta);
        userInfo.setItem("pergunta4_idQuestao", retornoGetQuestoes.listaQuestoes[3].id);
        
        
        userInfo.setItem("pergunta5", retornoGetQuestoes.listaQuestoes[4].questao);
        userInfo.setItem("pergunta5_alternativa1", retornoGetQuestoes.listaQuestoes[4].resposta1);
        userInfo.setItem("pergunta5_alternativa2", retornoGetQuestoes.listaQuestoes[4].resposta2);
        userInfo.setItem("pergunta5_alternativa3", retornoGetQuestoes.listaQuestoes[4].resposta3);
        userInfo.setItem("pergunta5_alternativa4", retornoGetQuestoes.listaQuestoes[4].resposta4);
        userInfo.setItem("pergunta5_alternativa5", retornoGetQuestoes.listaQuestoes[4].resposta5);
        userInfo.setItem("pergunta5_respostaCerta", retornoGetQuestoes.listaQuestoes[4].respostaCorreta);
        userInfo.setItem("pergunta5_idQuestao", retornoGetQuestoes.listaQuestoes[4].id);
        
        
        
        
        
        resultadoParaPost[1] = 
            [userInfo.getItem("pergunta1_idQuestao"),
            userInfo.getItem("pergunta2_idQuestao"),
            userInfo.getItem("pergunta3_idQuestao"),
            userInfo.getItem("pergunta4_idQuestao"),
            userInfo.getItem("pergunta5_idQuestao")];
        
        
        //-------- GET --------//
        
        
        
        var INITTIALAZED = false;
        var INITTIALIZED_plat = false;
        
        var topMenu = new cc.Sprite.create(asset.mapa_barraTopo_png); // Adicionando a barra superior para o menu
        topMenu.setAnchorPoint(cc.p( 0, 0 ));
        topMenu.setPosition(cc.p(0, size.height-40));
        this.addChild(topMenu, 11);
        
        //adicionando o botão de voltar ao mapa global
        var btnVoltar = new ccui.Button();
        btnVoltar.loadTextures(asset.mapa_pause_png);
        btnVoltar.setAnchorPoint(cc.p(0,0));
        btnVoltar.addTouchEventListener(this.voltar, this); //pop
        btnVoltar.setPosition(cc.p(size.width-40, size.height-40));
        this.addChild(btnVoltar,12);
        
        if(status >=1 && status <=5){
            var sp2 = new cc.Sprite.create(asset.Mini_mapa1_png);
            sp2.setAnchorPoint(cc.p(0,0));
            sp2.setPosition(cc.p(0,0));
            this.addChild(sp2);

            switch(status){
                case '1':
                    //chamada para o labirinto nivel 1
//                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
//                    sp2.setAnchorPoint(cc.p(0,0));
//                    sp2.setPosition(cc.p(60,100));
//                    this.addChild(sp2);    
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarHistoriaLabirinto, this);
                    sp2.setPosition(cc.p(60,100));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(200,180));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(320,300));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(290,480));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(140,580));
                    this.addChild(sp2);
                break;
                    
                case '2':
                    cc.log('entrou');
                    
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(60,100));
                    this.addChild(sp2);

                    //Chamada para o labirinto nivel 2
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(200,180));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));   
        
                    sp2.addTouchEventListener(this.chamarLabirinto, this);
                    sp2.setPosition(cc.p(200,180));
                    this.addChild(sp2, 12);
        
                    

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(320,300));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(290,480));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(140,580));
                    this.addChild(sp2);
                break;
                    
                case '3':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(60,100));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(200,180));
                    this.addChild(sp2);

                    //Chamada para o labirinto nivel 3
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(320,300));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));   
        
                    sp2.addTouchEventListener(this.chamarLabirinto, this);
                    sp2.setPosition(cc.p(320,300));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(290,480));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(140,580));
                    this.addChild(sp2);
                break;
                    
                case '4':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(60,100));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(200,180));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(320,300));
                    this.addChild(sp2);

                    //Chamada para o labirinto nivel 4
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(290,480));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));   
        
                    sp2.addTouchEventListener(this.chamarLabirinto, this);
                    sp2.setPosition(cc.p(290,480));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(140,580));
                    this.addChild(sp2);
                break;
                
                case '5':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(60,100));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(200,180));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(320,300));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(290,480));
                    this.addChild(sp2);

                    //Chamada para o labirinto nivel 5
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(140,580));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));   
        
                    sp2.addTouchEventListener(this.chamarLabirinto, this);
                    sp2.setPosition(cc.p(140,580));
                    this.addChild(sp2, 12);
                break;
            }
        }
        if(status >=6 && status <=10){
            var sp2 = new cc.Sprite.create(asset.Mini_mapa2_png);
            sp2.setAnchorPoint(cc.p(0,0));
            sp2.setPosition(cc.p(0,0));
            this.addChild(sp2);
            
            switch(status){
                case '6':
                    //chamada para o labirinto nivel 6
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(100,50));
                    this.addChild(sp2); */
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));   
        
                    sp2.addTouchEventListener(this.chamarLabirinto, this);
                    sp2.setPosition(cc.p(100,50));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(210,135));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(230,300));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,450));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(220,530));
                    this.addChild(sp2);
                break;
                    
                case '7':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(100,50));
                    this.addChild(sp2);                

                    //chamada para o labirinto nivel 7
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(210,135));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));   
        
                    sp2.addTouchEventListener(this.chamarLabirinto, this);
                    sp2.setPosition(cc.p(210,135));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(230,300));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,450));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(220,530));
                    this.addChild(sp2);
                break;
                    
                case '8':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(100,50));
                    this.addChild(sp2);                

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(210,135));
                    this.addChild(sp2);

                    //chamada para o labirinto nivel 8
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(230,300));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));   
        
                    sp2.addTouchEventListener(this.chamarLabirinto, this);
                    sp2.setPosition(cc.p(230,300));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,450));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(220,530));
                    this.addChild(sp2);
                break;
                    
                case '9':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(100,50));
                    this.addChild(sp2);                

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(210,135));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(230,300));
                    this.addChild(sp2);

                    //chamada para o labirinto nivel 9
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,450));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));   
        
                    sp2.addTouchEventListener(this.chamarLabirinto, this);
                    sp2.setPosition(cc.p(150,450));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(220,530));
                    this.addChild(sp2);
                break;
                
                case '10':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(100,50));
                    this.addChild(sp2);                

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(210,135));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(230,300));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,450));
                    this.addChild(sp2);

                    //chamada para o labirinto nivel 10
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(220,530));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));   
        
                    sp2.addTouchEventListener(this.chamarLabirinto, this);
                    sp2.setPosition(cc.p(220,530));
                    this.addChild(sp2, 12);
                break;
            }
        }
        if(status >= 11 && status <= 15){
            var sp2 = new cc.Sprite.create(asset.Mini_mapa3_png);
            sp2.setAnchorPoint(cc.p(0,0));
            sp2.setPosition(cc.p(0,0));
            this.addChild(sp2);
            
            switch(status){
                case '11':
                    //chamada para o labirinto nivel 11
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,125));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarHistoriaPlataforma, this);
                    sp2.setPosition(cc.p(150,125));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(345,180));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(280,390));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(70,480));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(270,540));
                    this.addChild(sp2);
                break;
                    
                case '12':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,125));
                    this.addChild(sp2);                

                    //chamada para o labirinto nivel 12
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(345,180));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarPlataforma, this);
                    sp2.setPosition(cc.p(345,180));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(280,390));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(70,480));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(270,540));
                    this.addChild(sp2);
                break;
                    
                case '13':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,125));
                    this.addChild(sp2);                

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(345,180));
                    this.addChild(sp2);

                    //chamada para o labirinto nivel 13
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(280,390));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarPlataforma, this);
                    sp2.setPosition(cc.p(280,390));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(70,480));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(270,540));
                    this.addChild(sp2);
                break;
                    
                case '14':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,125));
                    this.addChild(sp2);                

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(345,180));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(280,390));
                    this.addChild(sp2);

                    //chamada para o labirinto nivel 14
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(70,480));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarPlataforma, this);
                    sp2.setPosition(cc.p(70,480));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(270,540));
                    this.addChild(sp2);
                break;
                
                case '15':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,125));
                    this.addChild(sp2);                

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(345,180));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(280,390));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(70,480));
                    this.addChild(sp2);

                    //chamada para o labirinto nivel 15
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(270,540));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarPlataforma, this);
                    sp2.setPosition(cc.p(270,540));
                    this.addChild(sp2, 12);
                break;
            }
        }
        if(status >=16 && status <= 20){
            var sp2 = new cc.Sprite.create(asset.Mini_mapa4_png);
            sp2.setAnchorPoint(cc.p(0,0));
            sp2.setPosition(cc.p(0,0));
            this.addChild(sp2);
            
            switch(status){
                case '16':
                    //chamada para o labirinto nivel 16
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,90));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarPlataforma, this);
                    sp2.setPosition(cc.p(340,90));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,220));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,350));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,500));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,640));
                    this.addChild(sp2);
                break;
                    
                case '17':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,90));
                    this.addChild(sp2);                

                    //chamada para o labirinto nivel 17
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,220));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarPlataforma, this);
                    sp2.setPosition(cc.p(340,220));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,350));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,500));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,640));
                    this.addChild(sp2);
                break;
                    
                case '18':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,90));
                    this.addChild(sp2);                

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,220));
                    this.addChild(sp2);

                    //chamada para o labirinto nivel 18
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,350));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarPlataforma, this);
                    sp2.setPosition(cc.p(340,350));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,500));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,640));
                    this.addChild(sp2);
                break;
                    
                case '19':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,90));
                    this.addChild(sp2);                

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,220));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,350));
                    this.addChild(sp2);

                    //chamada para o labirinto nivel 19
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,500));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarPlataforma, this);
                    sp2.setPosition(cc.p(340,500));
                    this.addChild(sp2, 12);

                    var sp2 = new cc.Sprite.create(asset.estagioIndisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,640));
                    this.addChild(sp2);
                break;
                
                case '20':
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,90));
                    this.addChild(sp2);                

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,220));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,350));
                    this.addChild(sp2);

                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,500));
                    this.addChild(sp2);

                    //chamada para o labirinto nivel 20
                    /*var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,640));
                    this.addChild(sp2);*/
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
        
                    sp2.addTouchEventListener(this.chamarPlataforma, this);
                    sp2.setPosition(cc.p(340,640));
                    this.addChild(sp2, 12);
                break;
            }
        }
        
        
    },
    
    
    chamarHistoriaLabirinto: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                if(conectou){
                    var cenaLabirintoMiniMap = new HistoriaLabirintoScene();
                    cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,cenaLabirintoMiniMap));
                }
                break;
        }
    },
    
    chamarHistoriaPlataforma: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                if(conectou){
                    var cenaPlataformaMiniMap = new HistoriaPlataformaScene();
                    cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,cenaPlataformaMiniMap));
                }
                break;
        }
    },
    
    chamarLabirinto: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                if(conectou){
                    var cenaLabirintoMiniMap = new LabirintoScene();
                    cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,cenaLabirintoMiniMap));
                }
                break;
        }
    },
    
    chamarPlataforma: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                if(conectou){
                    var cenaPlataformaMiniMap = new PlataformaScene();
                    //cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,cenaPlataformaMiniMap));
                    cc.director.runScene(cenaPlataformaMiniMap)
                }
                break;
        }
    },
    
    voltar: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                pop();
                break;
        }
    },
    
    chamarHistoriaPlataforma: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                var cenaTryAgainConnection = new MiniMapScene1();
                cc.director.runScene(cenaTryAgainConnection);
                break;
        }
    },
    
});


var pop = function(){
    cc.log("Foi!");
    //cc.director.popScene();
    var voltarScene = new GlobalMapScene();
    cc.director.runScene(voltarScene);
};
var MiniMapScene1 = cc.Scene.extend({
    onEnter:function () {
            
            this._super();
        cc.log("foi");
            if (INITTIALIZED_minimapa===false){
                cc.log("foi2");
                this._super();
                var minimapaLayerlayer = new MiniMapLayer1();
                layerCopiaExternoMinimapa = minimapaLayerlayer;
                this.addChild(minimapaLayerlayer);
            }
    }
});
