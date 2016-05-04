/* globals cc, asset */
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        
        var sp = new cc.Sprite.create(asset.mapa_png);
        sp.setAnchorPoint(cc.p(0,0));
        sp.setPosition(cc.p(0,0));
        this.addChild(sp);
        
        var sp2 = new cc.Sprite.create(asset.unidade01_png);
        sp2.setAnchorPoint(cc.p(0,0));
        sp2.setPosition(cc.p(0,0));
        this.addChild(sp2);
        
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