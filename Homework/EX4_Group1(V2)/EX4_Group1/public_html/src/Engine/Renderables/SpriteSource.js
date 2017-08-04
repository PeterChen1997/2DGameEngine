/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global SpriteRenderable, Renderable, gEngine */

"use strict"; 
function SpriteSource(myTexture,color,width,squareWidth){
    this.mTexture=myTexture;
    this.mBorder= new ImageBorder(color,width,squareWidth);
    SpriteRenderable.call(this,myTexture);
}
gEngine.Core.inheritPrototype(SpriteSource, SpriteRenderable);
SpriteSource.prototype.initialize=function(){
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);
    var w=texInfo.mWidth;
    var h=texInfo.mHeight;
    this.getXform().setSize(70, 70*h/w);
    this.mBorder.initialize(this.getXform());
};
SpriteSource.prototype.draw=function(vpMatrix,borderNotNeeded){
    
    this.initialize();
    SpriteRenderable.prototype.draw.call(this,vpMatrix);
    if(!borderNotNeeded)this.mBorder.draw(vpMatrix);
};
