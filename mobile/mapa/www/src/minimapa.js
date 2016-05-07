var INITTIALIZED_2 = false;
var MiniMapLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        var size = cc.winSize;

        var menuItem1 = new cc.MenuItemFont("Pergunta!", pop);
        var menu = new cc.Menu(menuItem1);
        menu.alignItemsVertically();
        this.addChild(menu);
        
        var sp2 = new cc.Sprite.create(asset.unidade01_png);
        sp2.setAnchorPoint(cc.p(0,0));
        sp2.setPosition(cc.p(0,250));
        this.addChild(sp2)
    }
});


var pop = function(){
    cc.log("Foi!");
    cc.director.popScene();
};
var MiniMapScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_2 = true;
            this._super();
            var layer = new MiniMapLayer();
            this.addChild(layer);
    }
});
