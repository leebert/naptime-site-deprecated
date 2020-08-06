var xPos = 0;
var zDogLogoIllo;
var zDogLogoAnchor;
var zDogLogoEye = [];
var zDogLogoZee = [];
var eyeWidth = 200;
var eyeHeight = eyeWidth/2;
var zeeVertOffset = eyeHeight - 25;
var zeeWidth = eyeWidth/3.5;
var zeeHeight = zeeWidth*1.15;
var zBaseLogoThickness = 20;
var zLogoThickness = zBaseLogoThickness/2;
var zZoom = 4;
var zBaseRotSpeed = 0.05
var zRotSpeed = zBaseRotSpeed/2;
var zIsDragging = false;
var zDefaultColor = ["#FF5A78", "#D34862", "#963446", "#63222D"];
var zDragColor = ["#3ECCF9", "#37B5DD", "#2D8FAE", "#1D5F73"];
var zeeDepthOffset = -zLogoThickness - 2;
var eggShowing = false;
var zDogCanvas;
var gridCanvas;
var effectsCloser;
var logoGrid = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var gridColCount = 0;
var gridRowCount = 0;
var gridItemWidth = 0;
var gridItemHeight = 0;
var currentX = 0;
var currentY = 0;
var currentCol = -1;
var currentRow = -1;
var currentItemId = -1;
var currentItemAngleRange = 90;
var otherItemAngleRange = 10;
var otherItemAngleScale = 0.95;

window.addEventListener('load', js_ef_load);

function js_ef_toggleEgg(shouldShow) {
    if (shouldShow == eggShowing) { return; }

    if (localStorage.getItem("layout") == "one") {  
        if (shouldShow) {
            js_ef_computeDynamicValues();
            eggShowing = true;
            zDogCanvas.style.opacity = 1;
            zDogCanvas.style.pointerEvents = "auto";
            effectsCloser.style.opacity = 1;
            effectsCloser.style.pointerEvents = "auto";
            js_ef_Animate();
        }
        else {
            zDogCanvas.style.opacity = 0;
            zDogCanvas.style.pointerEvents = "none";
            effectsCloser.style.opacity = 0;
            effectsCloser.style.pointerEvents = "none";
            setTimeout(function() { eggShowing = false; }, 250);
        }
    }
    else {
        if (shouldShow) {
            eggShowing = true;
            js_ef_drawGridLogo();
            js_ef_computeGridUpdates();
            js_ef_cycleRando();
            gridCanvas.style.opacity = 1;
            gridCanvas.style.pointerEvents = "auto";
            effectsCloser.style.opacity = 1;
            effectsCloser.style.pointerEvents = "auto";
        }
        else {
            gridCanvas.style.opacity = 0;
            gridCanvas.style.pointerEvents = "none";
            effectsCloser.style.opacity = 0;
            effectsCloser.style.pointerEvents = "none";
            setTimeout(function() { 
                eggShowing = false; 
                js_ef_removeGridLogo();
            }, 250);
        }
    }
}

function js_ef_load(event) {
    window.addEventListener("resize", js_ef_handleResize);
    window.addEventListener("mousemove", js_ef_handleMouseMove);
    document.getElementById("js-close-effect").addEventListener("click", js_ef_handleClose);

    zDogCanvas = document.getElementsByClassName("c-zdog-canvas")[0];
    zDogCanvas.setAttribute("height", window.innerHeight);
    zDogCanvas.setAttribute("width", window.innerWidth);
    gridCanvas = document.getElementById("c-grid-canvas");
    gridCanvas.style.height = window.innerHeight;
    gridCanvas.style.width = window.innerWidth;
    gridItemWidth = Math.ceil(window.innerWidth/logoGrid[0].length);
    gridItemHeight = Math.ceil(window.innerHeight/logoGrid.length);
    gridColCount = Math.ceil(window.innerWidth/gridItemWidth);
    gridRowCount = Math.ceil(window.innerHeight/gridItemHeight);
    effectsCloser = document.getElementById("c-effects-close");

    js_ef_drawZdogLogo();
}

function js_ef_handleClose(event) {
    js_ef_toggleEgg(false);
}

function js_ef_handleMouseMove(event) {
    currentX = event.clientX;
    currentY = event.clientY;
    if (!eggShowing) { return; }
    if (localStorage.getItem("layout") == "one") {  
        js_ef_computeDynamicValues();
    }
    else {
        js_ef_computeGridUpdates();
    }
}

function js_ef_computeDynamicValues() {
    var thickness = Math.max(2, (currentX/window.innerWidth * zBaseLogoThickness));
    for(var i = 0; i < zDefaultColor.length; i++) { 
        var zOffset = Math.max(i, (thickness * 1.05) * i);
        zDogLogoEye[i].stroke = thickness;
        zDogLogoEye[i].translate.z = -zOffset;
        zDogLogoZee[i].stroke = thickness;
        zDogLogoZee[i].translate.z = -zOffset;
    }
    var speed = Math.max(0.001, (currentY/window.innerHeight * zBaseRotSpeed));
    zRotSpeed = speed;
}

function js_ef_handleResize(event) {
    zDogCanvas.setAttribute("height", window.innerHeight);
    zDogCanvas.setAttribute("width", window.innerWidth);
    gridCanvas.style.height = window.innerHeight;
    gridCanvas.style.width = window.innerWidth;
    gridItemWidth = Math.ceil(window.innerWidth/logoGrid[0].length);
    gridItemHeight = Math.ceil(window.innerHeight/logoGrid.length);
    gridColCount = Math.ceil(window.innerWidth/gridItemWidth);
    gridRowCount = Math.ceil(window.innerHeight/gridItemHeight);
    js_ef_toggleEgg(false);
}

function js_ef_drawZdogLogo() {
    zDogLogoIllo = new Zdog.Illustration({
        // set canvas with selector
        element: '.c-zdog-canvas',
        zoom: zZoom,
        dragRotate: true,
      });

      zDogLogoAnchor = new Zdog.Anchor({
        addTo: zDogLogoIllo,
        translate: { x: -(eyeWidth/2), y: -(eyeHeight + zeeHeight)/2.5, z: zLogoThickness*2 },
      });

      for(var i = 0; i < zDefaultColor.length; i++) {
        var zOffset = -(zLogoThickness * 1.05) * i;
        eye = new Zdog.Shape({
            addTo: zDogLogoAnchor,
            path: [
              { x: 0, y: 0 },   // start
              { arc: [
                { x:  eyeWidth/2, y: eyeHeight }, // corner
                { x:  eyeWidth, y:  0 }, // end point
              ]},
            ],
            closed: false,
            stroke: zLogoThickness,
            color: zDefaultColor[i],
            translate: { z: zOffset },
          });

          zDogLogoEye.push(eye);
    
        zee = new Zdog.Shape({
            addTo: zDogLogoAnchor,
            path: [
                { x: 0, y: zeeVertOffset }, // start at top left
                { x:  zeeWidth, y: zeeVertOffset }, // line to top right
                { x: 0, y:  zeeVertOffset + zeeHeight }, // line to bottom left
                { x:  zeeWidth, y:  zeeVertOffset + zeeHeight }, // line to bottom right
              ],
            closed: false,
            stroke: zLogoThickness,
            color: zDefaultColor[i],
            translate: { x: zeeWidth*1.25, y: 0, z: zOffset },
          });

          zDogLogoZee.push(zee);

      }

      new Zdog.Dragger({
        startElement: zDogLogoIllo.element,
        onDragStart: function(pointer) { 
            zIsDragging = true;
            for(var i = 0; i < zDefaultColor.length; i++) { 
                zDogLogoEye[i].color = zDragColor[i];
                zDogLogoZee[i].color = zDragColor[i];
            }
        },
        onDragMove: function( pointer, moveX, moveY ) {

        },
        onDragEnd: function() {
            zIsDragging = false;
            for(var i = 0; i < zDefaultColor.length; i++) { 
                zDogLogoEye[i].color = zDefaultColor[i];
                zDogLogoZee[i].color = zDefaultColor[i];
            }
        },
      });
}

function js_ef_Animate() {
    if (!eggShowing) { return; }
    if (!zIsDragging) {
        // rotate illo each frame
        zDogLogoIllo.rotate.y += zRotSpeed;
    }
    zDogLogoIllo.updateRenderGraph();
    // animate next frame
    requestAnimationFrame( js_ef_Animate );
}

function js_ef_drawGridLogo() {
    var id = 0;
    for (var x = 0; x < gridRowCount; x++){
        for (var y = 0; y < gridColCount; y++) {
            var item = document.createElement("div");
            item.id = id;
            id++;
            item.classList.add("c-grid-item");
            item.style.width = gridItemWidth + "px";
            item.style.height = gridItemHeight + "px";
            item.style.left = (gridItemWidth * y) + "px";
            item.style.top = (gridItemHeight * x) + "px";
            if (logoGrid[x][y] == 1) {
                item.style.backgroundColor = zDefaultColor[zDefaultColor.length-1];
                item.classList.add("fadeOne");
            }
            else {
                item.style.backgroundColor = zDragColor[zDragColor.length-1];
                item.classList.add("fadeTwo");
            }
            gridCanvas.appendChild(item);
        }
    }
}

function js_ef_removeGridLogo() {
    while (gridCanvas.firstChild) {
        gridCanvas.firstChild.remove();
    }
}

function js_ef_computeGridUpdates() {
    var row = Math.ceil(currentX/gridItemWidth) - 1;
    var col = Math.ceil(currentY/gridItemHeight) - 1;

    js_ef_affectCurrentItem(row, col);

    if (col == currentCol && row == currentRow) { return; }

    currentCol = col;
    currentRow = row;
    var id = 0;
    for (var x = 0; x < gridRowCount; x++){
        for (var y = 0; y < gridColCount; y++) {
            let item = document.getElementById(id);
            item.style.backgroundImage = "none";
            item.style.zIndex = 0;
            item.style.boxShadow = "none";
            item.style.transition = "background-color 0.1s, transform 0.3s";
            var a = currentCol - x;
            var b = currentRow - y;
            var d = Math.min(Math.ceil(Math.sqrt(a*a+b*b)), zDefaultColor.length-1); 
            if (d == 0) { 
                currentItemId = id; 
                item.style.zIndex = 10000;
                item.style.boxShadow = "0 0 40px 20px " + (logoGrid[x][y] == 1 ? zDefaultColor[0] : zDragColor[0]);
                item.style.transition = "background-color 0s, transform 0";
            }
            var p = (d + 0.001)/((zDefaultColor.length-1) + 0.001);
            var s = Zdog.lerp( 1, otherItemAngleScale, p);
            var dl = (d * .025);
            var c = zDragColor[d];
            if (logoGrid[x][y] == 1) {
                c = zDefaultColor[d];
            }
            item.style.transitionDelay = dl + "s";
            item.style.backgroundColor = c;
            var rd = zDefaultColor.length-1 - d;
            item.style.transform = "rotateX(" + js_c_randomInteger(-rd * otherItemAngleRange, rd * otherItemAngleRange) + "deg) rotateY(" + js_c_randomInteger(-rd * otherItemAngleRange, rd * otherItemAngleRange) + "deg) scale(" + s + "," + s + ")";
            id++;
        }
    }
}

function js_ef_affectCurrentItem(row, col) {
    if (currentItemId != -1) {
        var c1 = zDragColor[0];
        if (logoGrid[col][row] == 1) {
            var c1 = zDefaultColor[0];
        }
        var px = currentX%gridItemWidth/gridItemWidth;
        var py = currentY%gridItemHeight/gridItemHeight;
        var rx = Zdog.lerp(-currentItemAngleRange, currentItemAngleRange, px);
        var ry = Zdog.lerp(-currentItemAngleRange, currentItemAngleRange, py);
        document.getElementById(currentItemId).style.backgroundImage = "radial-gradient(farthest-side at " + px*100 + "% " + py*100 + "%,white," + c1 + ")";
        document.getElementById(currentItemId).style.transform = "rotateX(" + ry + "deg) rotateY(" + rx + "deg) scale(1.05,1.05)";
    }
}

function js_ef_cycleRando(){
    var id = js_c_randomInteger(0, gridColCount*gridRowCount);
    while (id == currentItemId) {
        id = js_c_randomInteger(0, gridColCount*gridRowCount);
    }
    var element = document.getElementById(id);
    if (element == null) { return; }
    var animClass = element.classList.contains("fadeOne") ? "colorFadeOne" : "colorFadeTwo";
    element.style.animation = animClass + " " + js_c_randomInteger(1, 10) + "s";
    console.log("id-" + id + ", a-" + element.style.animation);
    if (!eggShowing) { return; }
    setTimeout(js_ef_cycleRando, js_c_randomInteger(250, 2000));
}