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
var effectsCloser;

window.addEventListener('load', js_ef_load);

function js_ef_toggleEgg(shouldShow) {
    if (shouldShow == eggShowing) { return; }
    if (shouldShow) {
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

function js_ef_load(event) {
    window.addEventListener("resize", js_ef_handleResize);
    window.addEventListener("mousemove", js_ef_handleMouseMove);
    document.getElementById("js-close-effect").addEventListener("click", js_ef_handleClose);

    zDogCanvas = document.getElementsByClassName("zdog-canvas")[0];
    effectsCloser = document.getElementById("c-effects-close");
    zDogCanvas.setAttribute("height", window.innerHeight);
    zDogCanvas.setAttribute("width", window.innerWidth);
    js_ef_drawZdogLogo();

    // var draw = SVG('c-effects-container');
    // var text = draw.text('Cooooooool 😎');
    // textPath = text.path('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80');
    // textPath.animate(1000, '<>');
    //     .plot('M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80')
    //     .loop(true, true);

    // text.textPath().animate(1000, '<>')
    //     .attr('startOffset', '60%')
    //     .loop(true, true)
    // textPath.animate(3000).during(function(pos, morph, eased){
    //     xPos = xPos > 100 ? -50 : xPos + 1
    //     textPath.x(xPos)
    // }).loop();

    // var path = draw.path('M80 10 C 150 40, 150 65, 80 95 S 10 150, 80 180');
    // path.animate(2000, '<>').plot('M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80').loop(true, true);

}

function js_ef_handleClose(event) {
    js_ef_toggleEgg(false);
}

function js_ef_handleMouseMove(event) {
    js_ef_computeDynamicValues(event.clientX, event.clientY);
}

function js_ef_computeDynamicValues(clientX, clientY) {
    var thickness = Math.max(2, (clientX/window.innerWidth * zBaseLogoThickness));
    for(var i = 0; i < zDefaultColor.length; i++) { 
        var zOffset = Math.max(i, (thickness * 1.05) * i);
        zDogLogoEye[i].stroke = thickness;
        zDogLogoEye[i].translate.z = -zOffset;
        zDogLogoZee[i].stroke = thickness;
        zDogLogoZee[i].translate.z = -zOffset;
    }
    var speed = Math.max(0.001, (clientY/window.innerHeight * zBaseRotSpeed));
    zRotSpeed = speed;
}

function js_ef_handleResize(event) {
    zDogCanvas.setAttribute("height", window.innerHeight);
    zDogCanvas.setAttribute("width", window.innerWidth);
    js_ef_toggleEgg(false);
}

function js_ef_drawZdogLogo() {
    zDogLogoIllo = new Zdog.Illustration({
        // set canvas with selector
        element: '.zdog-canvas',
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
            // console.log(pointer);
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