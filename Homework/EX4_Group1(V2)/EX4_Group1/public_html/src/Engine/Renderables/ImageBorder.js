/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Renderable, TextureRenderable, gEngine */

function ImageBorder(color,width,squareWidth){
    this.mColor=color;
    this.mWidth=width;
    this.mSquareWidth=squareWidth;
    this.mTextureXform=null;
    this.mTBound=new Renderable();
    this.mLBound=new Renderable();
    this.mRBound=new Renderable();
    this.mBBound=new Renderable();
    
    this.mLLSquare=new Renderable();
    this.mLRSquare=new Renderable();
    this.mHLSquare=new Renderable();
    this.mHRSquare=new Renderable();
    
    
    //Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getTextureShader());
}

ImageBorder.prototype.initialize=function(texture){    
    this.mTextureXform=texture;
    var x=this.mTextureXform.getXPos();
    var y=this.mTextureXform.getYPos();
    var w=this.mTextureXform.getWidth();
    var h=this.mTextureXform.getHeight();
    
    this.mRBound.setColor(this.mColor);
    this.mLBound.setColor(this.mColor);
    this.mBBound.setColor(this.mColor);
    this.mTBound.setColor(this.mColor);
    
    this.mLLSquare.setColor([1,0,0,1]);
    this.mLRSquare.setColor([0,1,0,1]);
    this.mHLSquare.setColor([0,0,1,1]);
    this.mHRSquare.setColor([1,1,0,1]);
    
    
    this.mRBound.getXform().setPosition(x+w/2+this.mWidth/2,y);
    this.mRBound.getXform().setWidth(this.mWidth);
    this.mRBound.getXform().setHeight(h+2*this.mWidth);
    this.mLBound.getXform().setPosition(x-w/2-this.mWidth/2,y);
    this.mLBound.getXform().setWidth(this.mWidth);
    this.mLBound.getXform().setHeight(h+2*this.mWidth);
    this.mTBound.getXform().setPosition(x,y+h/2+this.mWidth/2);
    this.mTBound.getXform().setWidth(w+2*this.mWidth);
    this.mTBound.getXform().setHeight(this.mWidth);
    this.mBBound.getXform().setPosition(x,y-h/2-this.mWidth/2);
    this.mBBound.getXform().setWidth(w+2*this.mWidth);
    this.mBBound.getXform().setHeight(this.mWidth);
    
    this.mLLSquare.getXform().setPosition(x-w/2-this.mWidth/2,y-h/2-this.mWidth/2);
    this.mLRSquare.getXform().setPosition(x+w/2+this.mWidth/2,y-h/2-this.mWidth/2);
    this.mHLSquare.getXform().setPosition(x-w/2-this.mWidth/2,y+h/2+this.mWidth/2);
    this.mHRSquare.getXform().setPosition(x+w/2+this.mWidth/2,y+h/2+this.mWidth/2);
    this.mLLSquare.getXform().setHeight(this.mSquareWidth);
    this.mLLSquare.getXform().setWidth(this.mSquareWidth);
    
    this.mLRSquare.getXform().setHeight(this.mSquareWidth);
    this.mLRSquare.getXform().setWidth(this.mSquareWidth);
    
    this.mHLSquare.getXform().setHeight(this.mSquareWidth);
    this.mHLSquare.getXform().setWidth(this.mSquareWidth);
    
    this.mHRSquare.getXform().setHeight(this.mSquareWidth);
    this.mHRSquare.getXform().setWidth(this.mSquareWidth);

};
ImageBorder.prototype.draw=function(vpMatrix){
    this.mLBound.draw(vpMatrix);
    this.mRBound.draw(vpMatrix);
    this.mTBound.draw(vpMatrix);
    this.mBBound.draw(vpMatrix);
    this.mHRSquare.draw(vpMatrix);
    this.mHLSquare.draw(vpMatrix);
    this.mLRSquare.draw(vpMatrix);
    this.mLLSquare.draw(vpMatrix);

};


