// This code is a modified version of @therewasaguy's music viz example:
// https://github.com/therewasaguy/p5-music-viz/blob/gh-pages/demos/01d_beat_detect_amplitude/sketch.js

var img1;
var img2;
var imageToDraw;
var imgW;
var imgH;

var soundFile1;
var soundFile2;
var soundFileToPlay;
var soundFile1Loaded = false;
var soundFile2Loaded = false;
var level;
var amplitude;
var distortScale;

var backgroundColor;
var fillColor;
var overlayMinThreshold;
var shouldRotate = false;
var rotation = 0;
var isChill;
var isStarted = false;

//amber
var waveTimer = 0;
var waveSpeed;
var waveSize;
var waveSpacing;
var waveVariance;
var waveX;
var waveY;
var firstHit = true;
var amberOverlayMinThreshold = 0.275;
var amberBeatThreshold = 0.14;

//sand
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
var sandOverlayMinThreshold = 0.3;
var overlayMaxThreshold = 0.5;
var sandBeatThreshold = 0.11;
var randoff;

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
  soundFile1 = loadSound("sandstorm.mp3", soundSuccess, soundError, soundProgress);
  soundFile2 = loadSound("amber.mp3", soundSuccess, soundError, soundProgress);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setImageSize();
  noStroke();  
  amplitude = new p5.Amplitude();
}

function draw() {
    if (!isStarted) { return }
    level = amplitude.getLevel();
    detectBeat(level);
    background(backgroundColor);

  if (isChill) {
    drawWaves();
    distortScale = map(level, 0, 1, 1, 2);
    if (shouldRotate) {
      rotation = random(radians(-3), radians(3));
    } else {
      rotation = 0;
    }
  }
  else {
    drawGrid();
    distortScale = map(level, 0, 1, 1, 3.5);
    if (shouldRotate) {
      rotation = random(radians(-6), radians(6));
    } else {
      rotation = 0;
    }
  }
  
  drawFunsizeImage();
  drawOverlayFlash();
}

function drawFunsizeImage() {
    push();
    translate(windowWidth/2, windowHeight/2); 
    scale(1 * distortScale);
      rotate(rotation);
      image(imageToDraw, -imgW/2, -imgH/2, imgW, imgH);
    pop();
}

function drawOverlayFlash() {
    if (level > overlayMinThreshold) {
        if (isChill) {
          if (random() < 0.75) {
            var newColor = color(random(0,255), random(0,255), random(0,255), 64);
            fill(newColor);
            rect(0, 0, windowWidth, windowHeight);
            fill(fillColor);
          }
        }
        else {
            var flash = random(0,2);
            if (flash <= 0.5) {
              gridColor = color(random(0,255), random(0,255), random(0,255));
              gridShadowColor = color(random(0,255), random(0,255), random(0,255));
            }
            if (random() < 0.3) {
              var alphaScale = map(level, overlayMinThreshold, overlayMaxThreshold, 50, 255);
              var newColor = color(random(0,255), random(0,255), random(0,255));
              newColor.setAlpha(alphaScale);
              fill(newColor);
              rect(0, 0, windowWidth, windowHeight);
            }
        }
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
  waveSpeed = random(0.005, 0.015);
  waveSize = random(10, 40);
  waveSpacing = waveSize*2;
  waveVariance = map(waveSize, 10, 40, 4, 24);
}

function drawGrid() {
    var squareW = (windowWidth - (padding * (numCols + 1)))/numCols;
    var squareH = (windowHeight - (padding * (numRows + 1)))/numRows;
    if (level > overlayMinThreshold && random() < 0.3) {
        randoff = random(-20, 20);
    }
    else {
        randoff = 0;
    }
    noStroke();
    for (i = 0; i < numCols; i++){
      for (j = 0; j < numRows; j++){
        if (shouldRotateGrid) {
          if (drawGridShadow) {
            push();
            rectMode(CENTER);
            translate(-(padding/1.5) + ((padding + squareW) * i) + randoff, (padding*1.5) + ((padding + squareH) * j) + randoff);
            rotate(radians(gridRotateDirection * frameCount * gridRotateSpeed));
            fill(gridShadowColor);
            rect(0, 0, squareW, squareH);
            pop();
          }
          push();
          rectMode(CENTER);
          translate(padding + ((padding + squareW) * i) + randoff, padding + ((padding + squareH) * j) + randoff);
          rotate(radians(gridRotateDirection * frameCount * gridRotateSpeed));
          fill(gridColor);
          rect(0, 0, squareW, squareH);
          pop();
        }
        else {
          if (drawGridShadow) {
            fill(gridShadowColor);
            rect((padding + ((padding + squareW) * i)) - (padding * 1) + randoff, (padding + ((padding + squareH) * j) + randoff, squareW, squareH) + (padding * 1));
          }
          fill(gridColor);
          rect(padding + ((padding + squareW) * i) + randoff, padding + ((padding + squareH) * j) + randoff, squareW, squareH);
        }
      } 
    }
  }

  function updateGrid() {
    shouldDrawGrid = random() > 0.4;
    shouldRotateGrid = random() > 0.2;
    gridRotateDirection = (random(0, 2) <= 1 ? -1 : 1);
    gridRotateSpeed = random(0.5, 2.5);
    drawGridShadow = (random(0, 2) <= 1 ? true : false);
    numCols = round(random(1,30));
    numRows = round(random(1,30));
    padding = round(random(0,25));
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
  if (isChill) {
    backgroundColor = randomWithAlpha();
    shouldRotate = random() < 0.4 ;
    imageToDraw = (random() < 0.75 ? img1 : img2);
    if (firstHit || random() > 0.6) {
        updateWaves();
        firstHit = false;
        beatThreshold = 0.175;
      }
  }
  else {
    backgroundColor = randomNoAlpha();
    gridColor = randomNoAlpha();
    gridShadowColor = randomNoAlpha();
    shouldRotate = !shouldRotate;
    if (shouldRotate) {
      imageToDraw = (random() < 0.75 ? img1 : img2);
    }
    else {
      imageToDraw = (random() < 0.75 ? img2 : img1);
    }
    updateGrid();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setImageSize()
  background(0);
  if (isChill) {
    updateWaves();
  }
  else {

  }
}

function setImageSize() {
  imgW = windowWidth * 0.65;
  imgH = windowHeight * 0.65;
}

function randomWithAlpha() {
    return color(random(0,255), random(0,255), random(0,255), random(5,15));
  }
  
  function randomNoAlpha() {
    return color(random(0,255), random(0,255), random(0,255));
  }

  function js_vi_energy() {
    isChill = false;
    soundFileToPlay = soundFile1;
    beatThreshold = sandBeatThreshold;
    overlayMinThreshold = sandOverlayMinThreshold;
    backgroundColor = color(random(0,255), random(0,255), random(0,255));
    gridColor = color(random(0,255), random(0,255), random(0,255));
    gridShadowColor = color(random(0,255), random(0,255), random(0,255));
    startItUp();
  }

  function js_vi_chill() {
    isChill = true;
    soundFileToPlay = soundFile2;
    beatThreshold = amberBeatThreshold;
    overlayMinThreshold = amberOverlayMinThreshold;
    backgroundColor = randomWithAlpha();
    fillColor = randomWithAlpha();
    fill(randomNoAlpha());
    updateWaves();
    startItUp();
}

  function startItUp() {
    let e = document.getElementsByClassName("chooser")[0];
    e.classList.add("fadeOut")
    document.body.removeChild(e);
    soundFileToPlay.play();
    amplitude.setInput(soundFileToPlay);
    amplitude.smooth(0.9);
    userStartAudio();
    isStarted = true;
}

function soundSuccess(event) {
    // console.log("success: " + event);
    if (event.url.startsWith("amber")){
        soundFile2Loaded = true;
    }
    else {
        soundFile1Loaded = true;
    }

    if (soundFile1Loaded && soundFile2Loaded) {
        document.getElementsByClassName("loading")[0].style.display = "none";
        document.getElementsByClassName("ready")[0].style.display = "block";    
    }
}

function soundError(event) {
    // console.log("sound error: " + event);
    document.getElementsByClassName("loading")[0].style.display = "none";
    document.getElementsByClassName("error")[0].style.display = "block";
}

function soundProgress(event) {
    // console.log("progress: " + event);
}