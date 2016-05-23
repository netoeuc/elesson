var INITTIALIZED_2 = false;
var MiniMapLayer1 = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        cc.audioEngine.end();
        cc.audioEngine.playMusic(asset.mapa_musica_mp3, true);
        
        
        var size = cc.winSize;
        
        var topMenu = new cc.Sprite.create(asset.mapa_barraTopo_png); // Adicionando a barra superior para o menu
        topMenu.setAnchorPoint(cc.p( 0, 0 ));
        topMenu.setPosition(cc.p(0, size.height-40));
        this.addChild(topMenu, 11);
        
        //adicionando o botão de voltar ao mapa global
        var btnVoltar = new ccui.Button();
        btnVoltar.loadTextures(asset.mapa_pause_png);
        btnVoltar.setAnchorPoint(cc.p(0,0));
        btnVoltar.addTouchEventListener(pop);
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
                    var sp2 = new cc.Sprite.create(asset.estagioConcluido_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(60,100));
                    this.addChild(sp2);

                    //Chamada para o labirinto nivel 2
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(200,180));
                    this.addChild(sp2);
                    
                    var sp2= new ccui.Button();
                    sp2.loadTextures(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));   
        
                    

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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(290,480));
                    this.addChild(sp2);

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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(140,580));
                    this.addChild(sp2);
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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(100,50));
                    this.addChild(sp2);                

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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,450));
                    this.addChild(sp2);

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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(220,530));
                    this.addChild(sp2);
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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(150,125));
                    this.addChild(sp2);                

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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(70,480));
                    this.addChild(sp2);

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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(270,540));
                    this.addChild(sp2);
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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,90));
                    this.addChild(sp2);                

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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,500));
                    this.addChild(sp2);

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
                    var sp2 = new cc.Sprite.create(asset.estagioDisponivel_png);
                    sp2.setAnchorPoint(cc.p(0,0));
                    sp2.setPosition(cc.p(340,640));
                    this.addChild(sp2);
                break;
            }
        }
        
        
    },
    
    
    chamarHistoriaLabirinto: function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                var cenaLabirintoMiniMap = new HistoriaLabirintoScene();
                cc.director.pushScene(new cc.TransitionZoomFlipAngular(0.5,cenaLabirintoMiniMap));
                break;
        }
    },
});


var pop = function(){
    cc.log("Foi!");
    cc.director.popScene();
};
var MiniMapScene1 = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_2 = true;
            this._super();
            var layer = new MiniMapLayer1();
            this.addChild(layer);
    }
});
