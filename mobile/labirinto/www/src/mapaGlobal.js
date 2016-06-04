/* globals cc, asset */
var GlobalMapLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        status = 16;
        this._super();
        cc.audioEngine.end();
        cc.audioEngine.playMusic(asset.mapa_musica_mp3, true);
        
        var size = cc.winSize;
        
        // status = 1;
        // usando o status definido em variaveis.js
        
        if(status >= 1 && status <=5){
            var sp = new cc.Sprite.create(asset.MapGeralBloqueado1_png);
            sp.setAnchorPoint(cc.p(0,0));
            sp.setPosition(cc.p(15,0));
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
            sp.setPosition(cc.p(15,0));
            this.addChild(sp);
            //chamada para o minimundo 2
            var menuItem1 = new cc.MenuItemImage(asset.unidade02_png,asset.unidade02_png, play); 
            // Remover, apenas testando a transição de cenas
            var menu = new cc.Menu(menuItem1);
            menuItem1.setPosition(cc.p(80,-30));
        }
        if(status >= 11 && status <= 15){
            var sp = new cc.Sprite.create(asset.MapGeralBloqueado3_png);
            sp.setAnchorPoint(cc.p(0,0));
            sp.setPosition(cc.p(15,0));
            this.addChild(sp);
            //chamada para o minimundo 2
            var menuItem1 = new cc.MenuItemImage(asset.unidade03_png,asset.unidade03_png, play); 
            // Remover, apenas testando a transição de cenas
            var menu = new cc.Menu(menuItem1);
            menuItem1.setPosition(cc.p(-40,116));
        }
        if(status >= 16 && status <= 20){
            var sp = new cc.Sprite.create(asset.MapGeral_png);
            sp.setAnchorPoint(cc.p(0,0));
            sp.setPosition(cc.p(15,0));
            this.addChild(sp);
            //chamada para o minimundo 2
            var menuItem1 = new cc.MenuItemImage(asset.unidade04_png,asset.unidade04_png, play); 
            // Remover, apenas testando a transição de cenas
            var menu = new cc.Menu(menuItem1);
            menuItem1.setPosition(cc.p(-105,270));
        }
        
        this.addChild(menu);
        
        var closeGame = function(){
            cc.log("closeGame");
        };
        
        function delay(ms) {
           ms += new Date().getTime();
           while (new Date() < ms){}
        }
        
        
        function play(){
            cc.log("Play!");
            var scene = new MiniMapScene1();
            delay(100);
            //cc.director.pushScene(new cc.TransitionMoveInR(0.5,scene));  
            INITTIALIZED_minimapa=false;
            cc.director.runScene(scene);
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