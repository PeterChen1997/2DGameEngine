/*
 * File: EngineCore_VertexBuffer.js
 *  
 * defines the object that supports the loading and using of the buffer that 
 * contains vertex positions of a square onto the gGL context
 * 
 * Notice, this is a singleton object.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Float32Array: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || {};

// The VertexBuffer object
gEngine.VertexBuffer = (function () {
    var mSquareVertexBuffer = null;
    var mTRIVertexBuffer = null;
    // Square
    var verticesOfSquare = [
        0.2, 0.2, 0.0,
        -0.2, 0.2, 0.0,
        0.2, -0.2, 0.0,
        -0.2, -0.2, 0.0
    ];
    //Triangle
    var verticesOfTri = [
        0.0, 0.2, 0.0,
        -0.2, 0.0, 0.0,
        0.2, 0.0, 0.0
    ];

    var initialize = function () {
        var gl = gEngine.Core.getGL();

        mSquareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);

        mTRIVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mTRIVertexBuffer);//        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfTri), gl.STATIC_DRAW);
//
    };

    var getGLVertexRef = function () {
        return mSquareVertexBuffer;
    };
    var getGLTRIVertexRef = function () {
        return mTRIVertexBuffer;
    };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef,
        getGLTRIVertexRef: getGLTRIVertexRef
    };

    return mPublic;
}());

