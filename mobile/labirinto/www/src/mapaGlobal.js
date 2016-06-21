/* globals cc, asset */
var primeiraVez;
var GlobalMapLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        
        this._super();
        cc.audioEngine.end();
        cc.audioEngine.playMusic(asset.mapa_musica_mp3, true);
        
        var size = cc.winSize;
        try{
            if(userInfo.getItem("primeiraVez")){
             //   cc.log("nfoiProElse");
            }else{
             //   cc.log("foiProElse");
               // cc.log("foiProCatch");
                userInfo.setItem("primeiraVez", true);
                var sceneHistoriaApp = new HistoriaApp1Scene();
                cc.director.runScene(sceneHistoriaApp);
                    
            }
            
        }catch (err){
            
        }
        
        status = userInfo.getItem("status");
        //status = 6;
        // usando o status definido em variaveis.js
        
        if(status >= 1 && status <=5){
            var sp = new cc.Sprite.create(asset.MapGeralBloqueado1_png);
            sp.setAnchorPoint(cc.p(0,0));
            sp.setPosition(cc.p(0,0));
            this.addChild(sp);
            //chamada para o minimundo 1
            var menuItem1 = new cc.MenuItemImage(asset.unidade01_png,asset.unidade01_png, play); 
            // Remover, apenas testando a transição de cenas
            var menu = new cc.Menu(menuItem1);
            menuItem1.setPosition(cc.p(30,-230));
        }
        if(status >= 6 && status <= 10){
            var sp = new cc.Sprite.create(asset.MapGeralBloqueado2_png);
            sp.setAnchorPoint(cc.p(0,0));
            sp.setPosition(cc.p(0,0));
            this.addChild(sp);
            
            //chamada para o minimundo 2
            var menuItem1 = new cc.MenuItemImage(asset.unidade02_png,asset.unidade02_png, play); 
            // Remover, apenas testando a transição de cenas
            var menu = new cc.Menu(menuItem1);
            menuItem1.setPosition(cc.p(80,-30));
                        
            // mapa concluido 1 OK
            var menuItem2 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, null);
            var menu2 = new cc.Menu(menuItem2);
            menuItem2.setPosition(cc.p(30,-200));
            this.addChild(menu2);
        }
        if(status >= 11 && status <= 15){
            var sp = new cc.Sprite.create(asset.MapGeralBloqueado3_png);
            sp.setAnchorPoint(cc.p(0,0));
            sp.setPosition(cc.p(0,0));
            this.addChild(sp);
            
            //chamada para o minimundo 3
            var menuItem1 = new cc.MenuItemImage(asset.unidade03_png,asset.unidade03_png, play); 
            // Remover, apenas testando a transição de cenas
            var menu = new cc.Menu(menuItem1);
            menuItem1.setPosition(cc.p(-40,116));
                   
            // mapa concluido 1 OK
            var menuItem2 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, null);
            var menu2 = new cc.Menu(menuItem2);
            menuItem2.setPosition(cc.p(30,-200));
            this.addChild(menu2);
            
            // mapa concluido 2 OK
            var menuItem3 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, null);
            var menu3 = new cc.Menu(menuItem3);
            menuItem3.setPosition(cc.p(80,-30));
            this.addChild(menu3);
        }
        if(status >= 16 && status <= 20){
            var sp = new cc.Sprite.create(asset.MapGeral_png);
            sp.setAnchorPoint(cc.p(0,0));
            sp.setPosition(cc.p(0,0));
            this.addChild(sp);
            
            //chamada para o minimundo 4
            var menuItem1 = new cc.MenuItemImage(asset.unidade04_png,asset.unidade04_png, play); 
            // Remover, apenas testando a transição de cenas
            var menu = new cc.Menu(menuItem1);
            menuItem1.setPosition(cc.p(-105,270));
                           
            // mapa concluido 1 OK
            var menuItem2 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, null);
            var menu2 = new cc.Menu(menuItem2);
            menuItem2.setPosition(cc.p(30,-200));
            this.addChild(menu2);
            
            // mapa concluido 2 OK
            var menuItem3 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, null);
            var menu3 = new cc.Menu(menuItem3);
            menuItem3.setPosition(cc.p(80,-30));
            this.addChild(menu3);
            
            // mapa concluido 3 OK
            var menuItem4 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, null);
            var menu4 = new cc.Menu(menuItem4);
            menuItem4.setPosition(cc.p(-40,116));
            this.addChild(menu4);
          
        }
        if(status > 20){
            var sp = new cc.Sprite.create(asset.MapGeral_png);
            sp.setAnchorPoint(cc.p(0,0));
            sp.setPosition(cc.p(0,0));
            this.addChild(sp);
            
            //chamada para o minimundo 4
            var menuItem1 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, play); 
            // Remover, apenas testando a transição de cenas
            var menu = new cc.Menu(menuItem1);
            menuItem1.setPosition(cc.p(-100,280));
                           
            // mapa concluido 1 OK
            var menuItem2 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, null);
            var menu2 = new cc.Menu(menuItem2);
            menuItem2.setPosition(cc.p(30,-200));
            this.addChild(menu2);
            
            // mapa concluido 2 OK
            var menuItem3 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, null);
            var menu3 = new cc.Menu(menuItem3);
            menuItem3.setPosition(cc.p(80,-30));
            this.addChild(menu3);
            
            // mapa concluido 3 OK
            var menuItem4 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, null);
            var menu4 = new cc.Menu(menuItem4);
            menuItem4.setPosition(cc.p(-40,116));
            this.addChild(menu4);
            
            
//            var sp = new cc.Sprite.create(asset.MapGeral_png);
//            sp.setAnchorPoint(cc.p(0,0));
//            sp.setPosition(cc.p(0,0));
//            this.addChild(sp);
//            //chamada para o minimundo 2
//            var menuItem1 = new cc.MenuItemImage(asset.unidade04_png,asset.unidade04_png, play); 
//            // Remover, apenas testando a transição de cenas
//            var menu = new cc.Menu(menuItem1);
//            menuItem1.setPosition(cc.p(-105,270));
            
//            Este codigo exibe o certificado assim que abre o jogo
//            var sp2 = new cc.Sprite.create(asset.tela_fim_jogo_png);
//            sp2.setAnchorPoint(cc.p(0,0));
//            sp2.setPosition(cc.p(0,0));
//            this.addChild(sp2, 1000);
            
        }
        
        
        this.addChild(menu);
        
        var closeGame = function(){
           // cc.log("closeGame");
        };
        
        function delay(ms) {
           ms += new Date().getTime();
           while (new Date() < ms){}
        }
        
        
        function play(){
           // cc.log("Play!");
            var scene = new MiniMapScene1();
            delay(100);
            //cc.director.pushScene(new cc.TransitionMoveInR(0.5,scene));  
            INITTIALIZED_minimapa=false;
            cc.director.runScene(scene);
       }
        
        function setMapaConcluido(x, y){
            // level anterior OK
            var menuItem2 = new cc.MenuItemImage(asset.mapa_concluido_png,asset.mapa_concluido_png, null);
            var menu2 = new cc.Menu(menuItem2);
            menuItem2.setPosition(cc.p(x, y));
            this.addChild(menu2);
        }

        
        return true;
    }
});

var GlobalMapScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GlobalMapLayer();
        this.addChild(layer);
    }
});