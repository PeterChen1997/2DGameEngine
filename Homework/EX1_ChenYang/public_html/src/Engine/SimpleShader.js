/* 
 * File: SimpleShader.js
 * 
 * Implements a SimpleShader object.
 * 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, alert: false, XMLHttpRequest: false, alert: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

//<editor-fold desc="constructor">
// constructor of SimpleShader object
function SimpleShader(vertexShaderPath, fragmentShaderPath,square) {
    // instance variables
    // 实例变量
    // Convention: all instance variables: mVariables
    //惯例：所有实例变量命名为mVariables
    this.mCompiledShader = null;  // 在webgl上下文中引用已编译的着色器
    this.mShaderVertexPositionAttribute = null; // 引用着色器中的SquareVertexPosition
    this.mPixelColor = null;                    // pixelColor uniform in the fragment shader


    var gl = gEngine.Core.getGL();//获得画布的环境

    // start of constructor code
    // 构造函数代码的开始
    // 
    // Step A: 加载编译两个着色器
    var vertexShader = this._loadAndCompileShader(vertexShaderPath, gl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

    // Step B: Create and link the shaders into a program.
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);

    // Step C: check for error
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }

    // Step D: Gets a reference to the aSquareVertexPosition attribute within the shaders.
    //获取对着色器中aSquareVertexPosition属性的引用。
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(
        this.mCompiledShader, "aSquareVertexPosition");

    // Step E: Activates the vertex buffer loaded in EngineCore_VertexBuffer.js
    //激活加载到EngineCore_VertexBuffer.js中的顶点缓冲区
    console.log(square);
    if(square === true)
        gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    else
        gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLTRIVertexRef());

    
    
    // Step F: Describe the characteristic of the vertex position attribute
    //描述顶点位置属性的特征
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,              // each element is a 3-float (x,y.z)
        gl.FLOAT,       // data type is FLOAT
        false,          // if the content is normalized vectors
        0,              // number of bytes to skip in between elements
        0);             // offsets to the first element

    // Step G: Gets a reference to the uniform variable uPixelColor in the fragment shader
    //获取对片段着色器中的均匀变量uPixelColor的引用
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    console.log("Color:"+ this.mPixelColor);
}
//</editor-fold>

// <editor-fold desc="Public Methods">

// Access to the compiled shader
SimpleShader.prototype.getShader = function () { return this.mCompiledShader; };

// Activate the shader for rendering
//激活渲染着色器
SimpleShader.prototype.activateShader = function (pixelColor,offset_x,offset_y) {
    var gl = gEngine.Core.getGL();
    //调用程序对象，切换GPU上下文
    
    gl.useProgram(this.mCompiledShader);
    //允许GPU读取数据
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    var Tx = offset_x,Ty = offset_y,Tz = 0;
    console.log(Tx,Ty,Tz);
    var translation = gl.getUniformLocation(this.mCompiledShader, "translation");
    console.log(translation);
    gl.uniform3f(translation, Tx, Ty, Tz);
    /*
     * 格式uniform4f错误
     * 应该是uniform3f
     * 因为设置的是vec3
     * 要符合参数个数
     */
    gl.uniform4fv(this.mPixelColor, pixelColor);    
};
//-- end of public methods
// </editor-fold>

// <editor-fold desc="Private Methods">
//**-----------------------------------
// Private methods not mean to call by outside of this object
//    naming convention: starts with an "_"
// **------------------------------------

// 
// Returns a compiled shader from a shader in the dom.
// The id is the id of the script in the html tag.
SimpleShader.prototype._loadAndCompileShader = function (filePath, shaderType) {
    var gl = gEngine.Core.getGL();
    //获取画布的着色环境
    var xmlReq, shaderSource = null, compiledShader = null;

    // Step A: 从给定文件位置请求文本。
    xmlReq = new XMLHttpRequest();
    xmlReq.open('GET', filePath, false);
    try {
        xmlReq.send();
    } catch (error) {
        alert("Failed to load shader: " + filePath + " [Hint: you cannot double click index.html to run this project. " +
                "The index.html file must be loaded by a web-server.]");
        return null;
    }
    //请求返回的源文件存入shaderSource
    shaderSource = xmlReq.responseText;

    if (shaderSource === null) {
        alert("WARNING: Loading of:" + filePath + " Failed!");
        return null;
    }

    // Step B:根据类型创建着色器
    compiledShader = gl.createShader(shaderType);

    // Step C: 着色器对象关联着色器程序，编译着色器
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    // Step D: check for errors and return results (null if error)
    // The log info is how shader compilation errors are typically displayed.
    // This is useful for debugging the shaders.
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
};
//-- end of private methods
//</editor-fold>