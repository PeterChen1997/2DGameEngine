/*
 * File: MyGame_Initialize.js 
 */
/*jslint node: true, vars: true */
/*global gEngine, Scene, BlueLevel, MyGame, Camera, Renderable, vec2, gSharedCameraName */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

MyGame.prototype.initialize = function () {
    
    var jsonString = gEngine.ResourceMap.retrieveAsset(this.kSceneFile);
    var sceneInfo = JSON.parse(jsonString);
    this._parseCameras(sceneInfo);
    this._parseSquares(sceneInfo);

    this.mRate = 360 / (5 * 60);
    this.mSpeed = this.mCamera.getWCWidth() / (3 * 60);
};


MyGame.prototype._parseCameras = function (sceneInfo) {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        sceneInfo.Camera.Center,   // position of the camera
        sceneInfo.Camera.Width,    // width of camera
        sceneInfo.Camera.Viewport  // viewport (orgX, orgY, width, height)
        );
    this.mCamera.setBackgroundColor(sceneInfo.Camera.BgColor);
    
    // make sure we do not ended up sharing the same WC center
    var c = vec2.clone(sceneInfo.Camera.Center);
    if (gEngine.ResourceMap.isAssetLoaded(gSharedCameraName)) {
        this.mSmallCamera = gEngine.ResourceMap.retrieveAsset(gSharedCameraName);
    } else {
        this.mSmallCamera = new Camera(
            c,   // position of the camera
            20,
            [0, 350, 100, 100]
        );
        this.mSmallCamera.setBackgroundColor([0.3, 0.8, 0.8, 1]);
    }
};

MyGame.prototype._parseSquares = function (sceneInfo) {
    var i;
    var sq;
    for (i = 0; i<sceneInfo.Square.length; i++) {
        sq = new Renderable(gEngine.DefaultResources.getConstColorShader());
        sq.setColor(sceneInfo.Square[i].Color);
        sq.getXform().setPosition(
            sceneInfo.Square[i].Pos[0],
            sceneInfo.Square[i].Pos[1]);
        sq.getXform().setSize(
            sceneInfo.Square[i].Width,
            sceneInfo.Square[i].Height);
        sq.getXform().setRotationInDegree(
            sceneInfo.Square[i].Rotation);
            this.mAllSq.push(sq);
    }
    this.mSupport = this.mAllSq[0]; 
    this.mHero = this.mAllSq[1];
};