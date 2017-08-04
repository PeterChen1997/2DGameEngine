/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
 TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
 FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.mainview = new Mainview();

}

gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    this.mainview.loadScene();
};

MyGame.prototype.unloadScene = function () {
    this.mainview.unloadScene();
    // Step B: starts the next level
    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    this.mainview.initialize();

};


MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    this.mainview.draw();


};


MyGame.prototype.update = function () {
    this.mainview.update();

};