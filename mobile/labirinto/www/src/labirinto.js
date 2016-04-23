var Maze = cc.Node.extend({
    ctor: 
        function() {
        this._super();
        this.WIDTH = 20;
        this.HEIGHT = 13;
        this.MAP = [
            '####################',
            '#..................#',
            '#.###.###..###.###.#',
            '#.#...#......#...#.#',
            '#.#.###.####.###.#.#',
            '#.#.#..........#.#.#',
            '#.....###. ###.....#',
            '#.#.#..........#.#.#',
            '#.#.###.####.###.#.#',
            '#.#...#......#...#.#',
            '#.###.###..###.###.#',
            '#..................#',
            '####################'
        ];
 
        // ...  code for drawing the maze has be left out
 
    }
    
    
    for ( var r = 0; r < this.HEIGHT; r++ ) {
	    for ( var c = 0; c < this.WIDTH; c++ ) {
		if ( this.MAP[ r ][ c ] == '#' ) {
		    var s = cc.Sprite.create( 'src/wall.jpg' );
		    s.setAnchorPoint( cc.p( 0, 0 ) );
		    s.setPosition( cc.p( c * 40, (this.HEIGHT - r - 1) * 40 ) );
		    this.addChild( s );
		}
	    }
	}
                          
    this.setAnchorPoint( cc.p( 0, 0 ) );
                        
});


var MenuLayer = cc.Layer.extend({
    sprite:false,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progassets. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            asset.CloseNormal_png,
            asset.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        
        return true;
    }
});




var LabirintoLayer = cc.Layer.extend({
    this.maze = new Maze();
        this.maze.setPosition( cc.p( 0, 40 ) );
        this.addChild( this.maze );
});





var labirintoLayer = cc.Layer.extend({
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

        // add a "close" icon to exit the progassets. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            asset.CloseNormal_png,
            asset.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
       
        
        return true;
    }
});


var labirintoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
        var labirintolayer = new MenuLayer();
        this.addChild(labirintolayer);
        
        
    }
});
