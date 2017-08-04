/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, BlueLevel: false, Camera: false, Renderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
     // audio clips: supports both mp3 and wav formats
//    this.kCue = "assets/sounds/MyGame_cue.wav";
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kSceneFile = "assets/GrayLevel.json";
     this.mSqSet = [];
     this.mCamera = null;
    this.mCamera2 = null;
     


    // The camera to view the scene
    
//    this.mCx = 400;
//    this.mCy = 370;
//    this.centerX = 20;
//    this.centerY = 60;
//    this.mC1W = 20;

    // the hero and the support objects
//    this.mHero = null;
//    this.mSupport = null;
}

     gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.unloadScene = function () {
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();

    // unload the scene flie and loaded resources
//    gEngine.AudioClips.unloadAudio(this.kCue);
//        gEngine.AudioClips.unloadAudio(this.kBgClip);

    var nextLevel = new BlueLevel();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

    MyGame.prototype.loadScene = function () {
    // load the scene file
    console.log("Mygame开始load");
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eJSONFile);
    console.log("Mygame load完毕");
//    // loads the audios
    gEngine.AudioClips.loadAudio(this.kBgClip);
//    gEngine.AudioClips.loadAudio(this.kCue);
};




MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.AudioClips.stopBackgroundAudio();
//        gEngine.AudioClips.unloadAudio(this.kCue);

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
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera2.getVPMatrix());
    }
    
    
};



MyGame.prototype.initialize = function () {
    console.log("Mygame开始初始化");
    var sceneParser = new JSONSceneFileParser(this.kSceneFile);
    
    this.mCamera = sceneParser.parseCamera();
    this.mCamera2 = sceneParser.parseCamera2();
//    this.mCx = this.mCamera.getViewport()[0];
//    this.mCy = this.mCamera.getViewport()[1];
    this.mCx2 = this.mCamera2.getViewport()[0];
    this.mCy2 = this.mCamera2.getViewport()[1];
    this.centerX = this.mCamera.getWCCenter()[0];
    this.centerY = this.mCamera.getWCCenter()[1];
    this.mC1W = this.mCamera.getWCWidth();
//    console.log("mCx2:" + this.mCx2);
    
    sceneParser.parseSquares(this.mSqSet);
    console.log("Mygame初始化完毕");
        gEngine.AudioClips.playBackgroundAudio(this.kBgClip);

};




MyGame.prototype.update = function () {

    
    var deltaX = 1/9;
    
    var xform = this.mSqSet[1].getXform();
//
//
    xform.incRotationByDegree(1.2);

    xform = this.mSqSet[0].getXform();
    xform.incXPosBy(-deltaX);
        xform.incRotationByDegree(1.2);

    if (xform.getXPos() < 11) { // this is the right-bound of the window
            xform.setPosition(30, 60);
        }
        
    // Support hero movements

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
//        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.mCx2 += deltaX*10;
//        console.log(this.mCx);
         this.mCamera2.setViewport( [this.mCx2,this.mCy2, 100, 100]);
        if ( this.mCx2 > 600) { // this is the right-bound of the window
             this.mCx2 = 0;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
//        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.mCy2 += deltaX*10;
//        console.log(this.mCx);
         this.mCamera2.setViewport( [this.mCx2,this.mCy2, 100, 100]);
        if ( this.mCy2 > 400) { // this is the right-bound of the window
             this.mCy2 = 0;
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
//        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.mCy2 -= deltaX*10;
//        console.log(this.mCx);
         this.mCamera2.setViewport( [this.mCx2,this.mCy2, 100, 100]);
        if ( this.mCy2 < 0) { // this is the right-bound of the window
             this.mCy2 = 400;
        }
    }
   if (gEngine.Input.isKeyReleased(gEngine.Input.keys.A)) {
//        gEngine.AudioClips.playACue(this.kCue);
//        console.log(this.mCx);
        this.mCx2 -= deltaX*50;
//        console.log(this.mCx);
         this.mCamera2.setViewport( [this.mCx2,this.mCy2, 100, 100]);
        if ( this.mCx2 < 0) { // this is the right-bound of the window
             this.mCx2 = 600;
        }
    } 
//    
//    
//    
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

 if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {

            gEngine.GameLoop.stop();
        
    }
};