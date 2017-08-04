/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
    // The shader for drawing
    this.mShader = null;
    this.mTriShader = null;
    // Step A: Initialize the webGL Context and the VertexBuffer
    //步骤一：初始化WebGL的语境和VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Step B: Create, load and compile the shaders
    //步骤B：创建、加载和编译着色器
    var gl = gEngine.Core.getGL();

    //绘制正方形
    this.mShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",        // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl",
        true);       // Path to the FragmentShader

     gEngine.Core.clearCanvas([0, 0.8, 0, 1]);
     
    this.mShader.activateShader([0, 0, 1, 1],0.3,0.3);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    this.mShader.activateShader([1, 1, 0, 1],-0.3,0.3);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    
    this.mShader.activateShader([1,0, 0, 1],-0.5,-0.5);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    // Step C3: 绘制当前激活的几何和激活的着色器
    
    //绘制三角形
    this.mTriShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",        // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl",
        false);  
    this.mTriShader.activateShader([1, 1, 1, 1],-0.3,-0.2);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0,3);
    this.mTriShader.activateShader([0, 0, 1, 1],0.3,-0.4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0,3);
    
}