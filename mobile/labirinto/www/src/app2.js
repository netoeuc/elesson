/* globals cc, asset */

var INITTIALIZED_2 = false;
var HelloWorldLayer2 = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        
        var size = cc.winSize;


        var menuItem1 = new cc.MenuItemFont("Pop!", pop);
        var menu = new cc.Menu(menuItem1);
        menu.alignItemsVertically();
        this.addChild(menu);
        return true;
    }
});


var pop = function(){
    cc.log("Foi!");
    var scene = new HelloWorldScene();
    cc.director.runScene(scene);
};
var HelloWorldScene2 = cc.Scene.extend({
    onEnter:function () {
//        if (INITTIALIZED_2===false){
            INITTIALIZED_2 = true;
            this._super();
            var layer = new HelloWorldLayer2();
            this.addChild(layer);
//        }
    }
});

