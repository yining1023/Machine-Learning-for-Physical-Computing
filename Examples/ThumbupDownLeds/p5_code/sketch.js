let handpose;
let video;
let predictions = [];
let gesture = 0;
let prevGesture = 0;
let serial;// variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem144301';// fill in your serial port name here

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('error', serialError); // callback for errors
  serial.open(portName); 

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);
  
  classifyGesture();

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}

function classifyGesture() {
  if (predictions && predictions[0]) {
    const prediction = predictions[0];
    const thumbTip = prediction.landmarks[4];
    // thumbUp will be true if thumbTip's y position is higher than other points
    const thumbUp = prediction.landmarks.every(mark => mark[1] >= thumbTip[1]);
    if (thumbUp) {
      gesture = 1;
    } else {
      gesture = 2;
    }
  } else {
    gesture = 0;
  }
  console.log('gesture', gesture);
  if (prevGesture !== gesture) {
    serial.write(gesture);
    prevGesture = gesture;
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}
