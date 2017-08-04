/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, BlueLevel: false, Camera: false, Renderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gSharedCameraName = "gSmallCamera";

function MyGame() {
    this.kSceneFile = "assets/scene.json";

    // The camera to view the scene
    this.mCamera = null;

    // the hero and the support objects
    this.mHero = null;
    this.mSupport = null;
    this.mAllSq = [];
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {   
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, 
            gEngine.TextFileLoader.eTextFileType.eTextFile);
};


MyGame.prototype.unloadScene = function() {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile, 
        gEngine.TextFileLoader.eTextFileType.eTextFile);

    // store the state of small camera for further use.
    gEngine.ResourceMap.storeAsset(gSharedCameraName, this.mSmallCamera);
    
    // Step B: starts the next level
    // starts the next level
    var nextLevel = new BlueLevel();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.drawCamera(this.mCamera);
    this.drawCamera(this.mSmallCamera);
};


MyGame.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    var vp = camera.getVPMatrix();
    var i;
    for (i = 0; i<this.mAllSq.length; i++) {
        this.mAllSq[i].draw(vp);
    }
};