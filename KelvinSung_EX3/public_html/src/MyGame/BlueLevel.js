/*
 * File: BlueLevel.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine, Scene, MyGame, SceneFileParser, gSharedCameraName */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BlueLevel() {
    // scene file name
    this.kSceneFile = "assets/BlueLevel.xml";
    // all squares
    this.mSqSet = [];        // these are the Renderable objects

    // The camera to view the scene
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function () {
    // load the scene file
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

BlueLevel.prototype.unloadScene = function () {
    // unload the scene flie and loaded resources
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

    var nextLevel = new MyGame();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

BlueLevel.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    // Step A: Read in the camera
    this.mCamera = sceneParser.parseCamera();

    // Step B: Read all the squares
    sceneParser.parseSquares(this.mSqSet);
    
    // retrieve small view camera information
    this.mSmallCamera = gEngine.ResourceMap.retrieveAsset(gSharedCameraName);
};

BlueLevel.prototype.drawCamera = function (vp) {
// Step  C: draw all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(vp);
    }
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BlueLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.drawCamera(this.mCamera.getVPMatrix());

    this.mSmallCamera.setupViewProjection();
    this.drawCamera(this.mSmallCamera.getVPMatrix());
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
BlueLevel.prototype.update = function () {    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        gEngine.GameLoop.stop();
    }
};