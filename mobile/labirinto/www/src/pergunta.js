/* globals cc, asset */

var INITTIALIZED_2 = false;
var QuestionLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        
        var size = cc.winSize;


        var menuItem1 = new cc.MenuItemFont("Pergunta!", pop);
        var menu = new cc.Menu(menuItem1);
        menu.alignItemsVertically();
        this.addChild(menu);
        return true;
    }
});


var pop = function(){
    cc.log("Foi!");
    cc.director.popScene();
};
var QuestionScene = cc.Scene.extend({
    onEnter:function () {
            INITTIALIZED_2 = true;
            this._super();
            var layer = new QuestionLayer();
            this.addChild(layer);
    }
});

