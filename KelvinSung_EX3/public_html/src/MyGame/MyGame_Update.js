/*
 * File: MyGame_update.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Scene, BlueLevel, Camera, Renderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var kViewportDelta = 10;
    var kWCDelta = 0.1;
    
    // moving the support object at proper speed
    var sf = this.mSupport.getXform();
    sf.incXPosBy(this.mSpeed);
    if (sf.getXPos() > 30) {
        sf.setXPos(10);
    }
    
    // sping the hero object at proper speed
    var xf = this.mHero.getXform();
    xf.incRotationByDegree(this.mRate);
    
    // User viewport control
    var useV = this.mSmallCamera.getViewport();
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.A)) {
        useV[0] -= kViewportDelta;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        useV[0] += kViewportDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        useV[1] += kViewportDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        useV[1] -= kViewportDelta;
    }
    
    // User WC movement control
    var wcCenter = this.mCamera.getWCCenter();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.F)) {
        wcCenter[1] -= kWCDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V)) {
        wcCenter[1] += kWCDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.B)) {
        wcCenter[0] += kWCDelta;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
        wcCenter[0] -= kWCDelta;
    }
    
    // user WC Zoom control
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z)) {
        this.mCamera.setWCWidth(this.mCamera.getWCWidth()-kWCDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X)) {
        this.mCamera.setWCWidth(this.mCamera.getWCWidth()+kWCDelta);
    }
    
    // new scene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        gEngine.GameLoop.stop();
    }
};