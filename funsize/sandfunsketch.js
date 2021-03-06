//This code is a modified version of @therewasaguy's music viz example:
//https://github.com/therewasaguy/p5-music-viz/blob/gh-pages/demos/01d_beat_detect_amplitude/sketch.js

var img1;
var img2;
var imageToDraw;
var imgW;
var imgH;

var soundFile;
var amplitude;

var backgroundColor;

var numCols = 6;
var numRows = 4;
var padding = 20;
var gridColor;
var gridShadowColor;
var shouldDrawGrid = false;
var shouldRotateGrid = false;
var gridRotateDirection = 1;
var gridRotateSpeed = 0.5;
var drawGridShadow = false;

var shouldRotate = false;
var rotation = 0;

var overlayMinThreshold = 0.15;
var overlayMaxThreshold = 0.5;

// :: Beat Detect Variables
// how many draw loop frames before the beatCutoff starts to decay
// so that another beat can be triggered.
// frameRate() is usually around 60 frames per second,
// so 20 fps = 3 beats per second, meaning if the song is over 180 BPM,
// we wont respond to every beat.
var beatHoldFrames = 30;

// what amplitude level can trigger a beat?
var beatThreshold = 0.11; 

// When we have a beat, beatCutoff will be reset to 1.1*beatThreshold, and then decay
// Level must be greater than beatThreshold and beatCutoff before the next beat can trigger.
var beatCutoff = 0;
var beatDecayRate = 0.98; // how fast does beat cutoff decay?
var framesSinceLastBeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.

function preload() {
  img1 = loadImage("Funsize.png");
  img2 = loadImage("Funsize-Fits-All.png");
  imageToDraw = img1;
  soundFile = loadSound("Darude-Sandstorm.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setImageSize();

  backgroundColor = color(random(0,255), random(0,255), random(0,255));
  gridColor = color(random(0,255), random(0,255), random(0,255));
  gridShadowColor = color(random(0,255), random(0,255), random(0,255));

  amplitude = new p5.Amplitude();

  soundFile.play();

  amplitude.setInput(soundFile);
  amplitude.smooth(0.9);
  
  angleMode(DEGREES);
}

function draw() {
  background(backgroundColor);

  if (shouldDrawGrid) {
    drawGrid();
  }

  var level = amplitude.getLevel();
  detectBeat(level);
  var distortScale = map(level, 0, 1, 1, 4);
  if (shouldRotate) {
    rotation = random(-5, 5);
  } else {
    rotation = 0;
  }
  push();
    translate(windowWidth/2, windowHeight/2); 
    scale(1 * distortScale);
    rotate(rotation * distortScale);
    image(imageToDraw, -imgW/2, -imgH/2, imgW, imgH);
  pop();

  if (level > overlayMinThreshold) {
    var flash = random(0,2);
    if (flash <= 0.5) {
      gridColor = color(random(0,255), random(0,255), random(0,255));
      gridShadowColor = color(random(0,255), random(0,255), random(0,255));
    }
    var show = random(0, 2);
    if (show <= 1) {
      var alphaScale = map(level, overlayMinThreshold, overlayMaxThreshold, 50, 255);
      var newColor = color(random(0,255), random(0,255), random(0,255));
      newColor.setAlpha(alphaScale);
      fill(newColor);
      rect(0, 0, windowWidth, windowHeight);
    }
  }
}

function drawGrid() {
  var squareW = (windowWidth - (padding * (numCols + 1)))/numCols;
  var squareH = (windowHeight - (padding * (numRows + 1)))/numRows;
  noStroke();
  for (i = 0; i < numCols; i++){
    for (j = 0; j < numRows; j++){
      if (shouldRotateGrid) {
        if (drawGridShadow) {
          push();
          rectMode(CENTER);
          translate(-(padding/1.5) + ((padding + squareW) * i), (padding*1.5) + ((padding + squareH) * j));
          rotate(gridRotateDirection * frameCount * gridRotateSpeed);
          fill(gridShadowColor);
          rect(0, 0, squareW, squareH);
          pop();
        }
        push();
        rectMode(CENTER);
        translate(padding + ((padding + squareW) * i), padding + ((padding + squareH) * j));
        rotate(gridRotateDirection * frameCount * gridRotateSpeed);
        fill(gridColor);
        rect(0, 0, squareW, squareH);
        pop();
      }
      else {
        if (drawGridShadow) {
          fill(gridShadowColor);
          rect((padding + ((padding + squareW) * i)) - (padding * 1), (padding + ((padding + squareH) * j), squareW, squareH) + (padding * 1));
        }
        fill(gridColor);
        rect(padding + ((padding + squareW) * i), padding + ((padding + squareH) * j), squareW, squareH);
      }
    } 
  }
}

function detectBeat(level) {
  if (level  > beatCutoff && level > beatThreshold){
    onBeat();
    beatCutoff = level *1.2;
    framesSinceLastBeat = 0;
  } else{
    if (framesSinceLastBeat <= beatHoldFrames){
      framesSinceLastBeat ++;
    }
    else{
      beatCutoff *= beatDecayRate;
      beatCutoff = Math.max(beatCutoff, beatThreshold);
    }
  }
}

function onBeat() {
  backgroundColor = color(random(0,255), random(0,255), random(0,255));
  gridColor = color(random(0,255), random(0,255), random(0,255));
  gridShadowColor = color(random(0,255), random(0,255), random(0,255));
  shouldRotate = !shouldRotate;
  if (shouldRotate) {
    imageToDraw = (random() < 0.75 ? img1 : img2);
  }
  else {
    imageToDraw = (random() < 0.75 ? img2 : img1);
  }
  shouldDrawGrid = random() > 0.4;
  shouldRotateGrid = random() > 0.2;
  gridRotateDirection = (random(0, 2) <= 1 ? -1 : 1);
  gridRotateSpeed = random(0.5, 2.5);
  drawGridShadow = (random(0, 2) <= 1 ? true : false);
  numCols = round(random(1,30));
  numRows = round(random(1,30));
  padding = round(random(0,25));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setImageSize()
  background(0);
}

function mousePressed() {
  userStartAudio();
}

function keyPressed() {
  userStartAudio();
}

function setImageSize() {
  imgW = windowWidth * 0.65;
  imgH = windowHeight * 0.65;
}