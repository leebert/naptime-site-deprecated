// This code is a modified version of @therewasaguy's music viz example:
// https://github.com/therewasaguy/p5-music-viz/blob/gh-pages/demos/01d_beat_detect_amplitude/sketch.js

var img1;
var img2;
var imageToDraw;
var imgW;
var imgH;

var soundFile;
var amplitude;

var backgroundColor;
var fillColor;
var waveTimer = 0;
var waveSpeed;
var waveSize;
var waveSpacing;
var waveVariance;
var waveX;
var waveY;
var firstHit = true;

var shouldRotate = false;
var rotation = 0;

var overlayMinThreshold = 0.4;

// :: Beat Detect Variables
// how many draw loop frames before the beatCutoff starts to decay
// so that another beat can be triggered.
// frameRate() is usually around 60 frames per second,
// so 20 fps = 3 beats per second, meaning if the song is over 180 BPM,
// we wont respond to every beat.
var beatHoldFrames = 30;

// what amplitude level can trigger a beat?
var beatThreshold = 0.27; 

// When we have a beat, beatCutoff will be reset to 1.1*beatThreshold, and then decay
// Level must be greater than beatThreshold and beatCutoff before the next beat can trigger.
var beatCutoff = 0;
var beatDecayRate = 0.98; // how fast does beat cutoff decay?
var framesSinceLastBeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.

function preload() {
  img1 = loadImage("Funsize.png");
  img2 = loadImage("Funsize-Fits-All.png");
  imageToDraw = img1;
  soundFile = loadSound("311-Amber.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setImageSize();

  backgroundColor = randomWithAlpha();
  fillColor = randomWithAlpha();
  fill(randomNoAlpha());
  updateWaves();

  amplitude = new p5.Amplitude();

  soundFile.play();

  amplitude.setInput(soundFile);
  amplitude.smooth(0.9);
  
  noStroke();
}

function draw() {
  background(backgroundColor);

  drawWaves()

  var level = amplitude.getLevel();
  detectBeat(level);
  var distortScale = map(level, 0, 1, 1, 2);
  if (shouldRotate) {
    rotation = random(radians(-3), radians(3));
  } else {
    rotation = 0;
  }
  
  push();
  translate(windowWidth/2, windowHeight/2); 
  scale(1 * distortScale);
    rotate(rotation);
    image(imageToDraw, -imgW/2, -imgH/2, imgW, imgH);
  pop();
  
  if (level > overlayMinThreshold) {
    var newColor = color(random(0,255), random(0,255), random(0,255), 64);
    fill(newColor);
    rect(0, 0, windowWidth, windowHeight);
    fill(fillColor);
  }
}

function drawWaves() {
  // make a x and y grid of ellipses
  for (let x = 0; x <= windowWidth; x = x + waveSize + waveSpacing) {
    for (let y = 0; y <= windowHeight; y = y + waveSize + waveSpacing) {
      // starting point of each circle depends on mouse position
      const xAngle = map(waveX, 0, windowWidth, -waveVariance * PI, waveVariance * PI, true);
      const yAngle = map(waveY, 0, windowHeight, -waveVariance * PI, waveVariance * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / windowWidth) + yAngle * (y / windowHeight);

      // each particle moves in a circle
      const myX = x + waveSpacing * cos(2 * PI * waveTimer + angle);
      const myY = y + waveSpacing * sin(2 * PI * waveTimer + angle);

      ellipse(myX, myY, waveSize); // draw particle
    }
  }

  waveTimer = waveTimer + waveSpeed;
}

function updateWaves() {
  fillColor = randomNoAlpha();
  fill(fillColor);
  waveX = random(0, windowWidth);
  waveY = random(0, windowHeight);
  waveSpeed = random(0.005, 0.01);
  waveSize = random(10, 40);
  waveSpacing = waveSize*2;
  waveVariance = map(waveSize, 10, 40, 2, 8);
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
  backgroundColor = randomWithAlpha();
  shouldRotate = random() < 0.4 ;
  imageToDraw = (random() < 0.75 ? img1 : img2);
  if (firstHit || random() > 0.75) {
    updateWaves();
    firstHit = false;
  }
}

function randomWithAlpha() {
  return color(random(0,255), random(0,255), random(0,255), random(5,15));
}

function randomNoAlpha() {
  return color(random(0,255), random(0,255), random(0,255));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setImageSize()
  background(0);
  updateWaves();
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