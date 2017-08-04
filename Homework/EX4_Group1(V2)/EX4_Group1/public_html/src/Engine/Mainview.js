/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global vec2, gEngine, Scene */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Mainview() {
//    this.kMainImage = "assets/Consolas-72.png";//数字
    this.kMainImage = "assets/minion_sprite.png";//昆虫
    //this.kMainImage = "assets/Consolas-72.png";
    this.kBound = "assets/Bound.png";
    this.kFontCon16 = "assets/fonts/Consolas-16";

    this.mCamera = null;

    this.mIntertactiveBound = null;//小视口
    this.mSpriteSource = null;//图片

    this.mConstColorShader = null;
    this.mBgSq = null;//背景大矩形
    this.msBgSq = null;//背景小矩形
    this.img = null;
    this.mWidth = 0;
    this.mHeight = 0;

    this.ziview = new ZIViews();
    
        
    //this.mMainImage = null;
    this.mBound=[];
    this.mBoundExpanded=false;
    this.mBorder=null;
    
    this.mAnimaCamera=null;
    this.mNum=0;
    this.mTime=0;
    this.ACAMERA_DEFAULT_SIZE=200;

    this.mTextCon16=null;
}

gEngine.Core.inheritPrototype(Mainview, Scene);

Mainview.prototype.loadScene = function () {
    // Step A: loads the textures    
    gEngine.Textures.loadTexture(this.kMainImage);
    gEngine.Textures.loadTexture(this.kBound);
    
    gEngine.Fonts.loadFont(this.kFontCon16);

    this.ziview.loadScene(this.kMainImage);

};


Mainview.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMainImage);
    gEngine.Textures.unloadTexture(this.kBound);
    this.ziview.unloadScene();
    
    gEngine.Fonts.unloadFont(this.kFontCon16);
    // unload the Texture
    // Step B: starts the next level
    var nextLevel = new GameOver();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};


//Mainview.prototype._initText = function (font, posX, posY, color, textH) {
//    font.setColor(color);
//    font.getXform().setPosition(posX, posY);
//    font.setTextHeight(textH);
//};


Mainview.prototype.initialize = function () {
    // Step A: set up the cameras
    this.ziview.initialize();

    var img = new Image();
    img.src = this.kMainImage;
    this.mWidth = img.width;
    this.mHeight = img.height;

    this.mCamera = new Camera(// 右边的视图
            vec2.fromValues(0, 0), // position of the camera
            this.mWidth * 1.1, // width of camera
            [240, 0, 400, 480]           // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);


    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader 
            "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader
    //背景矩形
    this.mBgSq = new Renderable(this.mConstColorShader);
    this.mBgSq.setColor([0, 0, 0, 0.6]);
    this.msBgSq = new Renderable(this.mConstColorShader);
    this.msBgSq.setColor([0.8, 0.8, 0.8, 1]);

    //图片的四个矩形
    this.mTLSq = new Renderable(this.mConstColorShader);
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mTRSq = new Renderable(this.mConstColorShader);
    this.mTRSq.setColor([0.1, 0.9, 0.1, 1]);
    this.mBRSq = new Renderable(this.mConstColorShader);
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);
    this.mBLSq = new Renderable(this.mConstColorShader);
    this.mBLSq.setColor([0.1, 0.1, 0.1, 1]);

// 浮动框的四个矩形
    this.mTSq = new Renderable(this.mConstColorShader);
    this.mTSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mBSq = new Renderable(this.mConstColorShader);
    this.mBSq.setColor([0.1, 0.9, 0.1, 1]);
    this.mLSq = new Renderable(this.mConstColorShader);
    this.mLSq.setColor([0.1, 0.1, 0.9, 1]);
    this.mRSq = new Renderable(this.mConstColorShader);
    this.mRSq.setColor([0.1, 0.1, 0.1, 1]);

    this.mSpriteSource = new SpriteRenderable(this.kMainImage);//大图
    this.mSpriteSource.setColor([1, 1, 1, 0]);//白
    this.mSpriteSource.getXform().setPosition(0, 0);
    this.mSpriteSource.getXform().setSize(this.mWidth, this.mHeight);


    
    /*
    
        this.mCamera = new Camera(
        vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [300, 0, 724, 576]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
*/
    // Step B: Create the font and minion images using sprite
    /*
    this.mMainImage = new SpriteSource(this.kMainImage,[0.1,0.2,0.2,1],0.2,3);
    this.mMainImage.setColor([1, 1, 1, 0]);
    this.mMainImage.getXform().setPosition(0, 0);
    */
    for(var i=0;i<5;i++){
        this.mBound[i]=new TextureRenderable(this.kBound);
    }
    //this.mBound[0].getXform().setPosition(35,35);
    //this.mBound[0].getXform().setSize(12,12);
    
    
    
    this.mIntertactiveBound = this.mBound[0];//浮动框
    this.mIntertactiveBound.setColor([1, 1, 1, 0]);//透明
    this.mIntertactiveBound.getXform().setPosition(0, 0);
    this.mIntertactiveBound.getXform().setSize(this.mWidth / 5, this.mWidth / 5);
    
    
    
    
    this.mAnimaCamera=new Camera(
            vec2.fromValues(this.mBound[0].getXform().getXPos(),this.mBound[0].getXform().getYPos()),
            this.mBound[0].getXform().getWidth(),
            [0,300,this.ACAMERA_DEFAULT_SIZE,this.ACAMERA_DEFAULT_SIZE]
    );
    this.mAnimaCamera.setBackgroundColor([0.6, 1, 0.8, 1]);








    //保持它是一个正方形！！这里ZIViews里面也是这么设置的！更改较为麻烦


    //两个矩形叠加产生边框
    this.mBgSq.getXform().setPosition(0, 0);
    this.mBgSq.getXform().setSize(this.mWidth + 3, this.mHeight + 3);

    this.msBgSq.getXform().setPosition(0, 0);
    this.msBgSq.getXform().setSize(this.mWidth, this.mHeight);

    //四个角落的彩色矩形
    this.mTLSq.getXform().setPosition(-this.mWidth / 2, this.mHeight / 2);
    this.mTLSq.getXform().setSize(50, 50);
    this.mTRSq.getXform().setPosition(this.mWidth / 2, this.mHeight / 2);
    this.mTRSq.getXform().setSize(50, 50);
    this.mBLSq.getXform().setPosition(-this.mWidth / 2, -this.mHeight / 2);
    this.mBLSq.getXform().setSize(50, 50);
    this.mBRSq.getXform().setPosition(this.mWidth / 2, -this.mHeight / 2);
    this.mBRSq.getXform().setSize(50, 50);
    //上下左右的四个小矩形
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
    
    
    
    
    this.mTextCon16 = new FontRenderable("Consolas 16: in black");
    this.mTextCon16.setFont(this.kFontCon16);
    this._initText(this.mTextCon16, -530, -650, [0, 0, 0, 1], 40);
};

Mainview.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
Mainview.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.ziview.draw();
    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    // Step  C: Draw everything
    this.mBgSq.draw(this.mCamera.getVPMatrix());
    this.msBgSq.draw(this.mCamera.getVPMatrix());

    this.mSpriteSource.draw(this.mCamera.getVPMatrix());
    this.mIntertactiveBound.draw(this.mCamera.getVPMatrix());

    this.mTLSq.draw(this.mCamera.getVPMatrix());
    this.mTRSq.draw(this.mCamera.getVPMatrix());
    this.mBRSq.draw(this.mCamera.getVPMatrix());
    this.mBLSq.draw(this.mCamera.getVPMatrix());

    this.mTSq.draw(this.mCamera.getVPMatrix());
    this.mBSq.draw(this.mCamera.getVPMatrix());
    this.mLSq.draw(this.mCamera.getVPMatrix());
    this.mRSq.draw(this.mCamera.getVPMatrix());
    
    
    //this.mMainImage.draw(this.mAnimaCamera.getVPMatrix(),true);
    // Step  B: Activate the drawing Camera
    //this.mCamera.setupViewProjection();
    // Step  C: Draw everything
    //this.mMainImage.draw(this.mCamera.getVPMatrix());
    
    this.mBound[0].draw(this.mCamera.getVPMatrix());
    if(this.mBoundExpanded){
        for(var i=1;i<5;i++){
            this.mBound[i].draw(this.mCamera.getVPMatrix());
        }
    }
            
    
    
    
    this.mTextCon16.draw(this.mCamera.getVPMatrix());
    this.mAnimaCamera.setupViewProjection();
    this.mSpriteSource.draw(this.mAnimaCamera.getVPMatrix());
    
};



Mainview.prototype.update = function () {
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
        this.mBoundExpanded=!this.mBoundExpanded;
   }
   for(var i=1;i<5;i++){
            this.mBound[i].getXform().setSize(this.mBound[i-1].getXform().getWidth(),this.mBound[i-1].getXform().getHeight());
            this.mBound[i].getXform().setPosition(this.mBound[i-1].getXform().getXPos()+this.mBound[i-1].getXform().getWidth(),this.mBound[i-1].getXform().getYPos());
    }
    this.mTime++;
    var h=this.mBound[this.mNum].getXform().getHeight();
    var w=this.mBound[this.mNum].getXform().getWidth();
   if(this.mTime>=gEngine.GameLoop.kFPS){
       this.mTime+=-gEngine.GameLoop.kFPS;
       this.mAnimaCamera.setWCCenter(this.mBound[this.mNum].getXform().getXPos(),this.mBound[this.mNum].getXform().getYPos());
       this.mAnimaCamera.setWCWidth(w);
       if(w>=h){
           this.mAnimaCamera.setViewport([this.mAnimaCamera.getViewport()[0],this.mAnimaCamera.getViewport()[1],this.ACAMERA_DEFAULT_SIZE,this.ACAMERA_DEFAULT_SIZE*h/w]);
       }else{
           this.mAnimaCamera.setViewport([this.mAnimaCamera.getViewport()[0],this.mAnimaCamera.getViewport()[1],this.ACAMERA_DEFAULT_SIZE*w/h,this.ACAMERA_DEFAULT_SIZE]);
       }
       this.mNum++;
       if(this.mNum>=5)this.mNum+=-5;
   }
   
   
    var delta = 5;
    var xform = this.mIntertactiveBound.getXform();
    var updateZIV=function () {
    this.ziview.updateI(
            this.mTSq.getXform().getXPos(),
            this.mRSq.getXform().getYPos(),
            this.mTSq.getXform().getYPos() - this.mBSq.getXform().getYPos(),
            this.mRSq.getXform().getXPos() - this.mLSq.getXform().getXPos()
            );

    this.ziview.updateT(this.mTSq.getXform().getXPos(), this.mTSq.getXform().getYPos());
    this.ziview.updateB(this.mBSq.getXform().getXPos(), this.mBSq.getXform().getYPos());
    this.ziview.updateR(this.mRSq.getXform().getXPos(), this.mRSq.getXform().getYPos());
    this.ziview.updateL(this.mLSq.getXform().getXPos(), this.mLSq.getXform().getYPos());
};

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {
        var sdelta = 0.1 * delta;
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
            //updata小视窗
            updateZIV.call(this);
            xform.incYPosBy(sdelta);
            if (xform.getYPos() > this.mHeight / 2 - this.mIntertactiveBound.getXform().getHeight() / 2) { // this is the right-bound of the window
                xform.incYPosBy(-sdelta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
            xform.incYPosBy(-sdelta);
            updateZIV.call(this);

            if (xform.getYPos() < -this.mHeight / 2 + this.mIntertactiveBound.getXform().getHeight() / 2) { // this is the right-bound of the window
                xform.incYPosBy(sdelta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
            xform.incXPosBy(sdelta);
            updateZIV.call(this);

            if (xform.getXPos() > this.mWidth / 2 - this.mIntertactiveBound.getXform().getWidth() / 2) { // this is the right-bound of the window
                xform.incXPosBy(-sdelta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
            xform.incXPosBy(-sdelta);
            updateZIV.call(this);

            if (xform.getXPos() < -this.mWidth / 2 + this.mIntertactiveBound.getXform().getWidth() / 2) {  // this is the left-bound of the window
                xform.incXPosBy(sdelta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
            xform.incHeightBy(sdelta);
            updateZIV.call(this);
            if (xform.getHeight() > this.mHeight) {
                xform.incHeightBy(-sdelta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
            xform.incHeightBy(-sdelta);
            updateZIV.call(this);
            if (xform.getHeight() < 10) { // this is the right-bound of the window
                xform.incHeightBy(sdelta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
            xform.incWidthBy(sdelta);
            updateZIV.call(this);
            if (xform.getWidth() > this.mWidth) { // this is the right-bound of the window
                xform.incWidthBy(-sdelta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
            xform.incWidthBy(-sdelta);
            updateZIV.call(this);
            if (xform.getWidth() < 10) {  // this is the left-bound of the window
                xform.incWidthBy(sdelta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());


        }
    } else {
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
            xform.incYPosBy(delta);
            updateZIV.call(this);
            if (xform.getYPos() > this.mHeight / 2 - this.mIntertactiveBound.getXform().getHeight() / 2) { // this is the right-bound of the window
                xform.incYPosBy(-delta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
            xform.incYPosBy(-delta);
            updateZIV.call(this);
            if (xform.getYPos() < -this.mHeight / 2 + this.mIntertactiveBound.getXform().getHeight() / 2) { // this is the right-bound of the window
                xform.incYPosBy(delta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
            xform.incXPosBy(delta);
            updateZIV.call(this);
            if (xform.getXPos() > this.mWidth / 2 - this.mIntertactiveBound.getXform().getWidth() / 2) { // this is the right-bound of the window
                xform.incXPosBy(-delta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
            xform.incXPosBy(-delta);
            updateZIV.call(this);
            if (xform.getXPos() < -this.mWidth / 2 + this.mIntertactiveBound.getXform().getWidth() / 2) {  // this is the left-bound of the window
                xform.incXPosBy(delta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
            xform.incHeightBy(delta);
            updateZIV.call(this);

            if (xform.getHeight() > this.mHeight) {
                xform.incHeightBy(-delta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
            xform.incHeightBy(-delta);
            updateZIV.call(this);
            if (xform.getHeight() < 10) { // this is the right-bound of the window
                xform.incHeightBy(delta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
            xform.incWidthBy(delta);
            updateZIV.call(this);
            if (xform.getWidth() > this.mWidth) { // this is the right-bound of the window
                xform.incWidthBy(-delta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());

        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
            xform.incWidthBy(-delta);
            updateZIV.call(this);
            if (xform.getWidth() < 10) {  // this is the left-bound of the window
                xform.incWidthBy(delta);
            }
            this.mTSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() + this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mBSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos(), this.mIntertactiveBound.getXform().getYPos() - this.mIntertactiveBound.getXform().getHeight() / 2);
            this.mLSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() - this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
            this.mRSq.getXform().setPosition(this.mIntertactiveBound.getXform().getXPos() + this.mIntertactiveBound.getXform().getWidth() / 2, this.mIntertactiveBound.getXform().getYPos());
        }
    }
    this.mTextCon16.setText("Status:Bound Pos=("+this.mBound[0].getXform().getXPos()+","+this.mBound[0].getXform().getYPos()+") Size=("+this.mBound[0].getXform().getWidth().toPrecision(4)+","+this.mBound[0].getXform().getHeight().toPrecision(4)+")");
};



