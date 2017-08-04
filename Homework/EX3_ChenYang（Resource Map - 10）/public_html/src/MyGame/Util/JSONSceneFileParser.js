

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function JSONSceneFileParser(sceneFilePath) {
    this.mSceneJSON = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}



JSONSceneFileParser.prototype._getElm = function (tagElm) {
    var index = 0;
    for(var i = 0;i < this.mSceneJSON.length;i ++){
        if(this.mSceneJSON[i] == tagElm){
            index = i;
            break;
        }
    }
    
    
    console.log(this.mSceneJSON[tagElm]);
    return this.mSceneJSON[tagElm];
};

JSONSceneFileParser.prototype.parseCamera = function () {
    var camElm = this._getElm("Camera");
    console.log(camElm["Width"]);
    var cx = Number(camElm["Center"][0]);
    var cy = Number(camElm["Center"][1]);
    var w = Number(camElm["Width"]);
    var viewport = camElm["Viewport"];
    var bgColor = camElm["BgColor"];
    // make sure viewport and color are number
    var j;
    for (j = 0; j < 4; j++) {
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }

    var cam = new Camera(
        vec2.fromValues(cx, cy),  // position of the camera
        w,                        // width of camera
        viewport                  // viewport (orgX, orgY, width, height)
        );
    cam.setBackgroundColor(bgColor);
    return cam;
};

JSONSceneFileParser.prototype.parseCamera2 = function () {
    var camElm = this._getElm("Camera");
    console.log(camElm["Width"]);
    var cx = Number(camElm["Center"][0]);
    var cy = Number(camElm["Center"][1]);
    var w = Number(camElm["Width"])/2;
    var viewport = [370,370,100,100];
    var bgColor = [0,1,0.5];
    // make sure viewport and color are number
    var j;
    for (j = 0; j < 4; j++) {
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }

    var cam = new Camera(
        vec2.fromValues(cx, cy),  // position of the camera
        w,                        // width of camera
        viewport                  // viewport (orgX, orgY, width, height)
        );
    cam.setBackgroundColor(bgColor);
    console.log("执行c2");
    return cam;
};


JSONSceneFileParser.prototype.parseSquares = function (sqSet) {
    var elm = this._getElm("Square");
    var i, j, x, y, w, h, r, c, sq;
    console.log(elm[0]["Width"]);
    for (i = 0; i < elm.length; i++) {
        x = Number(elm[i]["Pos"][0]);
        y = Number(elm[i]["Pos"][1]);
        w = Number(elm[i]["Width"]);
        h = Number(elm[i]["Height"]);
        r = Number(elm[i]["Rotation"]);
        c = elm[i]["Color"];
        sq = new Renderable(gEngine.DefaultResources.getConstColorShader());
        // make sure color array contains numbers
        for (j = 0; j < 4; j++) {
            c[j] = Number(c[j]);
        }
        sq.setColor(c);
        sq.getXform().setPosition(x, y);
        sq.getXform().setRotationInDegree(r); // In Degree
        sq.getXform().setSize(w, h);
        sqSet.push(sq);
    }
};
