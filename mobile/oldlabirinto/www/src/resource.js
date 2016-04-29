var asset = {
    HelloWorld_png : "asset/HelloWorld.jpg",
    CloseNormal_png : "asset/CloseNormal.png",
    CloseSelected_png : "asset/CloseSelected.png",
    char_gif : "asset/char.gif",
    grass_gif : "asset/grass.gif",
    wall_png : "asswt/wall.png",
    wall_jpg : "asset/wall.jpg",
    chicken_gif: "asset/chicken.gif",
    bigWall_jpg: "asset/bigWall.jpg",
    question_png: "asset/question.png",
    exit_png: "asset/exit.png",
    wood_jpg: "asset/wood_pattern.jpg",
    blue_background_jpg: "asset/blue_background.jpg"
    
};

var g_resources = [];
for (var i in asset) {
    g_resources.push(asset[i]);
}
