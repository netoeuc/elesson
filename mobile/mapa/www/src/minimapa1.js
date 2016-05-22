var INITTIALIZED_2 = false;
var MiniMapLayer1 = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        var size = cc.winSize;
        
        
        var menuItem1 = new cc.MenuItemFont("Teste", pop);
        var menu = new cc.Menu(menuItem1);
        menu.alignItemsVertically();
        this.addChild(menu);
        
        if(status >=1 && status <=5){
            var sp2 = new cc.Sprite.create(asset.Mini_mapa1_png);
            sp2.setAnchorPoint(cc.p(0,0));
            sp2.setPosition(cc.p(0,0));
            this.addChild(sp2);
        }
        if(status >=6 && status <=10){
            var sp2 = new cc.Sprite.create(asset.Mini_mapa2_png);
            sp2.setAnchorPoint(cc.p(0,0));
            sp2.setPosition(cc.p(0,0));
            this.addChild(sp2);
        }
        if(status >= 11 && status <= 15){
            var sp2 = new cc.Sprite.create(asset.Mini_mapa3_png);
            sp2.setAnchorPoint(cc.p(0,0));
            sp2.setPosition(cc.p(0,0));
            this.addChild(sp2);
        }
        if(status >=16 && status <= 20){
            var sp2 = new cc.Sprite.create(asset.Mini_mapa4_png);
            sp2.setAnchorPoint(cc.p(0,0));
            sp2.setPosition(cc.p(0,0));
            this.addChild(sp2);
        }
        
        
    }
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
