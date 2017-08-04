/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function GroupObject(){
    this.mobject = [];
    this.mXform = new Transform(); 

}

GroupObject.prototype.addToGroup = function (object){
    this.mobject.push(object);
}

GroupObject.prototype.getXform = function () { return this.mXform; };
