/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ZIViews() {
//    this.kMinionSprite = "assets/Consolas-72.png";//数字
    this.kMinionSprite = null;
    this.kBound = "assets/Bound.png";
    this.mCamera = null;
    //Zoomed InteractiveBound Views
    this.mzivT = null;//小视口
    this.mzivL = null;
    this.mzivR = null;
    this.mzivB = null;
    this.mSpriteSource = null;
    this.mIntertactiveBound = null;

    this.width = null;
    this.height = null;

    this.mMove = null;
    this.mX = null;
    this.mY = null;

    this.mConstColorShader = null;
    this.img = null;
    this.mWidth = 0;
    this.mHeight = 0;
}



gEngine.Core.inheritPrototype(ZIViews, Mainview);
//没有完成调用MainView :: mInteractiveObject

ZIViews.prototype.loadScene = function (src) {
    // Step A: loads the textures    
    // 看是否能通过读取第一个Loadscene 来完成 图片的读取
    this.kMinionSprite = src;
    console.log(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBound);

};


ZIViews.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kBound);

};






ZIViews.prototype.initialize = function () {
    // Step A: set up the cameras

    var img = new Image();

    img.src = this.kMinionSprite;
    this.mWidth = img.width;
    this.mHeight = img.height;

    this.width = this.mWidth / 10;
    this.height = this.mHeight / 10;



    this.mzivT = new Camera(
            vec2.fromValues(0, this.width), // position of the camera
            this.width, // width of camera
            [75, 182, 90, 90]           // viewport (orgX, orgY, width, height)
            );
    this.mzivT.setBackgroundColor([1, 1, 1, 1]);
    this.mzivR = new Camera(
            vec2.fromValues(this.width, 0), // position of the camera
            this.width, // width of camera
            [121, 90, 90, 90]           // viewport (orgX, orgY, width, height)
            );
    this.mzivR.setBackgroundColor([1, 1, 1, 1]);
    this.mzivL = new Camera(
            vec2.fromValues(-this.width, 0), // position of the camera
            this.width, // width of camera
            [29, 90, 90, 90]           // viewport (orgX, orgY, width, height)
            );
    this.mzivL.setBackgroundColor([1, 1, 1, 1]);
    this.mzivB = new Camera(
            vec2.fromValues(0, -this.width), // position of the camera
            this.width, // width of camera
            [75, 0, 90, 90]           // viewport (orgX, orgY, width, height)
            );
    this.mzivB.setBackgroundColor([1, 1, 1, 1]);

    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader 
            "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader





// 浮动框的四个矩形
    this.mTSq = new Renderable(this.mConstColorShader);
    this.mTSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mBSq = new Renderable(this.mConstColorShader);
    this.mBSq.setColor([0.1, 0.9, 0.1, 1]);
    this.mLSq = new Renderable(this.mConstColorShader);
    this.mLSq.setColor([0.1, 0.1, 0.9, 1]);
    this.mRSq = new Renderable(this.mConstColorShader);
    this.mRSq.setColor([0.1, 0.1, 0.1, 1]);
//    console.log("flag");
    this.mSpriteSource = new SpriteRenderable(this.kMinionSprite);//大图
    this.mSpriteSource.setColor([1, 1, 1, 0]);//白
    this.mSpriteSource.getXform().setPosition(0, 0);
    this.mSpriteSource.getXform().setSize(this.mWidth, this.mHeight);

    this.mIntertactiveBound = new SpriteRenderable(this.kBound);//浮动框
    this.mIntertactiveBound.setColor([1, 1, 1, 0]);
    this.mIntertactiveBound.getXform().setPosition(0, 0);
    this.mIntertactiveBound.getXform().setSize(this.mWidth / 5, this.mWidth / 5);



    this.mTSq.getXform().setPosition(
            this.mIntertactiveBound.getXform().getXPos(),
            this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
    this.mTSq.getXform().setSize(20, 20);


    this.mBSq.getXform().setPosition(
            this.mIntertactiveBound.getXform().getXPos(),
            this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
    this.mBSq.getXform().setSize(20, 20);

    this.mLSq.getXform().setPosition(
            this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2,
            this.mIntertactiveBound.getXform().getYPos());
    this.mLSq.getXform().setSize(20, 20);
    //alert(this.mLSq.getXform().getXPos());

    this.mRSq.getXform().setPosition(
            this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2,
            this.mIntertactiveBound.getXform().getYPos());
    this.mRSq.getXform().setSize(20, 20);


};

ZIViews.prototype.draw = function () {
    // Step A: clear the canvas
//    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mzivT.setupViewProjection();

    // Step  C: Draw everything

    this.mSpriteSource.draw(this.mzivT.getVPMatrix());
    this.mIntertactiveBound.draw(this.mzivT.getVPMatrix());

    this.mTSq.draw(this.mzivT.getVPMatrix());
    this.mBSq.draw(this.mzivT.getVPMatrix());
    this.mLSq.draw(this.mzivT.getVPMatrix());
    this.mRSq.draw(this.mzivT.getVPMatrix());

    this.mzivR.setupViewProjection();
    this.mSpriteSource.draw(this.mzivR.getVPMatrix());
    this.mIntertactiveBound.draw(this.mzivR.getVPMatrix());

    this.mTSq.draw(this.mzivR.getVPMatrix());
    this.mBSq.draw(this.mzivR.getVPMatrix());
    this.mLSq.draw(this.mzivR.getVPMatrix());
    this.mRSq.draw(this.mzivR.getVPMatrix());

    this.mzivB.setupViewProjection();
    this.mSpriteSource.draw(this.mzivB.getVPMatrix());
    this.mIntertactiveBound.draw(this.mzivB.getVPMatrix());

    this.mTSq.draw(this.mzivB.getVPMatrix());
    this.mBSq.draw(this.mzivB.getVPMatrix());
    this.mLSq.draw(this.mzivB.getVPMatrix());
    this.mRSq.draw(this.mzivB.getVPMatrix());

    this.mzivL.setupViewProjection();
    this.mSpriteSource.draw(this.mzivL.getVPMatrix());
    this.mIntertactiveBound.draw(this.mzivL.getVPMatrix());

    this.mTSq.draw(this.mzivL.getVPMatrix());
    this.mBSq.draw(this.mzivL.getVPMatrix());
    this.mLSq.draw(this.mzivL.getVPMatrix());
    this.mRSq.draw(this.mzivL.getVPMatrix());

};




ZIViews.prototype.updateT = function (x, y) {

    this.mzivT.setWCCenter(x, y);
//    this.mIntertactiveBound.getXform().setPosition(x,y-this.mWidth/10);
    this.mTSq.getXform().setPosition(x,y);
};

ZIViews.prototype.updateB = function (x, y) {

    this.mzivB.setWCCenter(x, y);
//    this.mIntertactiveBound.getXform().setPosition(x,y+this.mWidth/10);
    this.mBSq.getXform().setPosition(x,y);
};
ZIViews.prototype.updateL = function (x, y) {

    this.mzivL.setWCCenter(x, y);
//    this.mIntertactiveBound.getXform().setPosition(x + this.mWidth/10,y);
    this.mLSq.getXform().setPosition(x,y);
};
ZIViews.prototype.updateR = function (x, y) {

    this.mzivR.setWCCenter(x, y);
//    this.mIntertactiveBound.getXform().setPosition(x-this.mWidth/10,y);
    this.mRSq.getXform().setPosition(x,y);
};

ZIViews.prototype.updateI = function (x,y,height,width) {
    this.mIntertactiveBound.getXform().setPosition(x,y);
    this.mIntertactiveBound.getXform().setHeight(height);
    this.mIntertactiveBound.getXform().setWidth(width);
    
    this.mzivT.setWCWidth(width/2);
    this.mzivB.setWCWidth(width/2);
    this.mzivR.setWCWidth(height/2);
    this.mzivL.setWCWidth(height/2);
};



//ZIViews.prototype.getBoundPos = function (){
//    return  this.mIntertactiveBound.getXform().getPosition();   
//};



