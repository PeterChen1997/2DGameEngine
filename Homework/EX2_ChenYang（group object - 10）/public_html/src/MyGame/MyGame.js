/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, Camera: false, mat4: false, vec3: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {

    gEngine.Core.initializeWebGL(htmlCanvasID);

    this.mCamera = new Camera(
            vec2.fromValues(20, 60), // center of the WC
            20, // width of WC
            [20, 40, 600, 300],         // viewport (orgX, orgY, width, height)
            [1,0,0,1],//边框颜色
            5   //边框宽度
            );
    this.mCamera2 = new Camera(
            vec2.fromValues(20, 62),
            10,
            [400, 370, 100, 100],
            [0,0,1,1],
            5
            );


    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);        // Clear the canvas

    this.mCamera.setupViewProjection();
    var vpMatrix = this.mCamera.getVPMatrix();
    
    var car = new MyGame.prototype.createACar(17, 60, 3, 3);
    console.log(car.mobject.length);
    for (var i = 0; i < car.mobject.length; i++) {
        car.mobject[i].draw(vpMatrix);
        console.log(car.mobject[i]);
    }
    
    var stack = new MyGame.prototype.createAStack(20, 58, 4, 4);
    console.log(stack.mobject.length);
    for (var i = 0; i < car.mobject.length; i++) {
        stack.mobject[i].draw(vpMatrix);
        console.log(stack.mobject[i]);
    }
    
    var car2 = new MyGame.prototype.createACar(24, 61, 1, 1);
    for (var i = 0; i < car2.mobject.length; i++) {
        car2.mobject[i].draw(vpMatrix);
        console.log(car2.mobject[i]);
    }
    
    var stack2 = new MyGame.prototype.createAStack(26, 59, 2, 2);
    for (var i = 0; i < stack2.mobject.length; i++) {
        stack2.mobject[i].draw(vpMatrix);
        console.log(stack2.mobject[i]);
    }



    this.mCamera2.setupViewProjection();
    var vpMatrix2 = this.mCamera2.getVPMatrix();

    for (var i = 0; i < car.mobject.length; i++) {
        car.mobject[i].draw(vpMatrix2);
        console.log(car.mobject[i]);
    }
    
    for (var i = 0; i < car.mobject.length; i++) {
        stack.mobject[i].draw(vpMatrix2);
        console.log(stack.mobject[i]);
    }
    
    for (var i = 0; i < car2.mobject.length; i++) {
        car2.mobject[i].draw(vpMatrix2);
        console.log(car2.mobject[i]);
    }
    
    for (var i = 0; i < stack2.mobject.length; i++) {
        stack2.mobject[i].draw(vpMatrix2);
        console.log(stack2.mobject[i]);
    }
}



MyGame.prototype.createACar = function (x, y, w, h) {
    var car = new GroupObject();

    this.mConstColorShader = null;
    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader 
            "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader

    console.log(this.mConstColorShader);
    var body = new Renderable(this.mConstColorShader);
    var tlight = new Renderable(this.mConstColorShader);
    var blight = new Renderable(this.mConstColorShader);

    console.log(body);

    car.addToGroup(body);
    car.addToGroup(tlight);
    car.addToGroup(blight);



    var xf = body.getXform();
    xf.setSize(w, h);
    xf.setPosition(x, y);
    body.setColor([0.25, 0.25, 0.95, 1]);

    xf = blight.getXform();
    xf.setSize(w / 5, h / 5);
    xf.setPosition(x + w / 4, y + h / 4);
    blight.setColor([1, 0, 0, 1]);

    xf = tlight.getXform();
    xf.setSize(w / 5, h / 5);
    xf.setPosition(x + w / 4, y - h / 4);
    tlight.setColor([1, 1, 1, 1]);




    return car;
};


MyGame.prototype.createAStack = function (x, y, w, h) {
    var stack = new GroupObject();

    this.mConstColorShader = null;
    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader 
            "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader

    console.log(this.mConstColorShader);


    var top = new Renderable(this.mConstColorShader);
    var mid = new Renderable(this.mConstColorShader);
    var bot = new Renderable(this.mConstColorShader);

    stack.addToGroup(bot);
    stack.addToGroup(mid);
    stack.addToGroup(top);

    var xf = bot.getXform();
    xf.setSize(w, h);
    xf.setPosition(x, y);
    bot.setColor([0.3, 0.8, 0.7, 1]);

    xf = mid.getXform();
    xf.setSize(0.67 * w, 0.67 * h);
    xf.setPosition(x, y);
    mid.setColor([0.9, 0.7, 0.7, 1]);


    xf = top.getXform();
    xf.setSize(0.34 * w, 0.34 * h);
    xf.setPosition(x, y);

    top.setColor([0.6, 0.6, 0.9, 1]);

    console.log(stack);


    return stack;
};