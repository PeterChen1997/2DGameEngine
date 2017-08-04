/*
 * File: BlueLevel.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame: false, SceneFileParser: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BlueLevel() {
    // audio clips: supports both mp3 and wav formats
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";

    // scene file name
    this.kSceneFile = "assets/BlueLevel.xml";
    
    // all squares
    this.mSqSet = [];        // these are the Renderable objects

    // The camera to view the scene
    this.mCamera = null;
    this.mCamera2 = null;
}
gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function () {
    // load the scene file
    console.log("Blue loadScene");
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);

    // loads the audios
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

BlueLevel.prototype.unloadScene = function () {
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();

    // unload the scene flie and loaded resources
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);

    var nextLevel = new MyGame();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

BlueLevel.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    // Step A: Read in the camera
    this.mCamera = sceneParser.parseCamera();
    
    this.mCamera2 = sceneParser.parseCamera2();


    this.mCx2 = this.mCamera2.getViewport()[0];
    this.mCy2 = this.mCamera2.getViewport()[1];
    this.centerX = this.mCamera.getWCCenter()[0];
    this.centerY = this.mCamera.getWCCenter()[1];
    this.mC1W = this.mCamera.getWCWidth();
    // Step B: Read all the squares
    sceneParser.parseSquares(this.mSqSet);

    // now start the bg music ...
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BlueLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: draw all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
    
    this.mCamera2.setupViewProjection();

    // Step  C: draw all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera2.getVPMatrix());
    }
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
BlueLevel.prototype.update = function () {
    // For this very simple game, let's move the first square
    var xform = this.mSqSet[1].getXform();
    var deltaX = 0.05;

    /// Move right and swap ovre
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(12, 60);
        }
    }

       if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.mCx2 += deltaX*10;
//        console.log(this.mCx);
         this.mCamera2.setViewport( [this.mCx2,this.mCy2, 100, 100]);
        if ( this.mCx2 > 600) { // this is the right-bound of the window
             this.mCx2 = 0;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.mCy2 += deltaX*10;
//        console.log(this.mCx);
         this.mCamera2.setViewport( [this.mCx2,this.mCy2, 100, 100]);
        if ( this.mCy2 > 400) { // this is the right-bound of the window
             this.mCy2 = 0;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.mCy2 -= deltaX*10;
//        console.log(this.mCx);
         this.mCamera2.setViewport( [this.mCx2,this.mCy2, 100, 100]);
        if ( this.mCy2 < 0) { // this is the right-bound of the window
             this.mCy2 = 400;
        }
    }
   if (gEngine.Input.isKeyReleased(gEngine.Input.keys.A)) {
        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.mCx2 -= deltaX*50;
//        console.log(this.mCx);
         this.mCamera2.setViewport( [this.mCx2,this.mCy2, 100, 100]);
        if ( this.mCx2 < 0) { // this is the right-bound of the window
             this.mCx2 = 600;
        }
    } 
    
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.F)) {
//        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.centerY += deltaX;
//        console.log(this.mCx);
         this.mCamera.setWCCenter(this.centerX,this.centerY);
//        if ( this.mCx < 0) { // this is the right-bound of the window
//             this.mCx = 600;
//        }
    }
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V)) {
//        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.centerY -= deltaX;
//        console.log(this.mCx);
         this.mCamera.setWCCenter(this.centerX,this.centerY);
//        if ( this.mCx < 0) { // this is the right-bound of the window
//             this.mCx = 600;
//        }
    }
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
//        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.centerX -= deltaX;
//        console.log(this.mCx);
         this.mCamera.setWCCenter(this.centerX,this.centerY);
//        if ( this.mCx < 0) { // this is the right-bound of the window
//             this.mCx = 600;
//        }
    }
    
     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.B)) {
//        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.centerX += deltaX;
//        console.log(this.mCx);
         this.mCamera.setWCCenter(this.centerX,this.centerY);
//        if ( this.mCx < 0) { // this is the right-bound of the window
//             this.mCx = 600;
//        }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
//        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.mC1W -= deltaX*5;
//        console.log(this.mCx);
         this.mCamera.setWCWidth(this.mC1W);
//        if ( this.mCx < 0) { // this is the right-bound of the window
//             this.mCx = 600;
//        }
    }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
//        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.mC1W += deltaX*5;
//        console.log(this.mCx);
         this.mCamera.setWCWidth(this.mC1W);
//        if ( this.mCx < 0) { // this is the right-bound of the window
//             this.mCx = 600;
//        }
    }


    // Step A: test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Q)) {

            gEngine.GameLoop.stop();
        
    }
};