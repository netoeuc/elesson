var asset = {
    HelloWorld_png : "asset/HelloWorld.jpg",
    CloseNormal_png : "asset/CloseNormal.png",
    CloseSelected_png : "asset/CloseSelected.png",
    mapa_png : "asset/mapa.png",
    unidade01_png : "asset/unidade01.png",
    unidade02_png : "asset/unidade02.png",
    unidade03_png : "asset/unidade03.png",
    unidade04_png : "asset/unidade04.png",
    mapateste_jpg : "asset/mapateste.jpg"
};

var g_resources = [];
for (var i in asset) {
    g_resources.push(asset[i]);
}
