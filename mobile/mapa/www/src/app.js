/* globals cc, asset */
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
       
        var size = cc.winSize;
        
        var menuItem1 = new cc.MenuItemImage(asset.unidade01_png,asset.unidade02_png, play); // Remover, apenas testando a transição de cenas
        var menu = new cc.Menu(menuItem1);
        
        menuItem1.setPositionY(-300);
        //menuItem1.setAnchorPoint(cc.p(0,0));
        //menuItem1.setPosition(cc.p(0,0));;
        
        //menu.alignItemsHorizontal();
        this.addChild(menu);
        
        var closeMenu = new cc.MenuItemImage(asset.CloseNormal_png, asset.CloseSelected_png, closeGame); // Adicionando o botão
        closeMenu.setAnchorPoint(cc.p(0,0));                                                            // de fechar o jogo
        closeMenu.setPosition(cc.p(size.width-40, size.height-40));
        this.addChild(closeMenu, 12);
        
        var closeGame = function(){
        cc.log("closeGame");
        };
        
        function delay(ms) {
           ms += new Date().getTime();
           while (new Date() < ms){}
        }
        
        function play(){
            cc.log("Play!");
        //    var scene = new HelloWorldScene2();
        //    cc.director.runScene(new cc.TransitionJumpZoom(0.2,scene));
            var scene = new MiniMapScene();
            delay(500);
            cc.director.pushScene(new cc.TransitionRotoZoom(1.5,scene));    
        //    var newBackgroundTile = new cc.Sprite.create(asset.grass_gif); // Adicionando background
        //    newBackgroundTile.setAnchorPoint(cc.p( 0, 0 ));
        //    newBackgroundTile.setPosition(cc.p(0*40, 1*40));
        //    HelloWorldLayer.addChild(newBackgroundTile, 2); 
        }

        /*var topMenu = new cc.Sprite.create(asset.wood_jpg); // Adicionando a barra superior para o menu
        topMenu.setAnchorPoint(cc.p( 0, 0 ));
        topMenu.setPosition(cc.p(0, size.height-40));
        this.addChild(topMenu, 11);*/
        
        /*var sp = new cc.Sprite.create(asset.mapa_png);
        sp.setAnchorPoint(cc.p(0,0));
        sp.setPosition(cc.p(0,0));
        this.addChild(sp);*/
            
        var sp2 = new cc.Sprite.create(asset.unidade01_png);
        sp2.setAnchorPoint(cc.p(0,0));
        sp2.setPosition(cc.p(0,0));
        this.addChild(sp2);
        
        /*var pinfo = cc.autopolygon.generatePolygon(asset.unidade01_png);
        var sprite = new cc.Sprite(pinfo);
        sprite.setAnchorPoint(cc.p(0,0));
        sprite.setPosition(cc.p(0,0));
        //var sp2 = new cc.Sprite(pinfo);
        this.addChild(sprite);*/
        

        /*var s = director.getWinSize();
        var item1 = new cc.MenuItemFont("Test pushScene", this.onPushScene, this);
        var item2 = new cc.MenuItemFont("Test pushScene w/transition", this.onPushSceneTran, this);
        var item3 = new cc.MenuItemFont("Quit", function () {
            cc.log("quit!")
        }, this);

        var menu = new cc.Menu(item1, item2, item3);
        menu.alignItemsVertically();
        this.addChild(menu);*/
        
        
        /*var sp3 = new cc.Sprite.create(asset.unidade02_png);
        sp3.setAnchorPoint(cc.p(0,0));
        sp3.setPosition(cc.p(0,205));
        this.addChild(sp3);
        
        var sp4 = new cc.Sprite.create(asset.unidade03_png);
        sp4.setAnchorPoint(cc.p(0,0));
        sp4.setPosition(cc.p(0,395));
        this.addChild(sp4);
        
        var sp5 = new cc.Sprite.create(asset.unidade04_png);
        sp5.setAnchorPoint(cc.p(0,0));
        sp5.setPosition(cc.p(0,590));
        this.addChild(sp5);*/
        
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});