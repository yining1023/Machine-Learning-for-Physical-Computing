// Update this following link to your own model link
const poseModelUrl = 'https://teachablemachine.withgoogle.com/models/hZbh-gmU4/';
let serial;// variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem144301';// fill in your serial port name here
// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = poseModelUrl + "model.json";
// the metatadata json file contains the text labels of your model and additional information
const metadataURL = poseModelUrl + "metadata.json";

const size = 300;
let webcamEl;
let model;
let totalClasses;
let myCanvas;
let ctx;

let outByte = 0;// for outgoing data

// A function that loads the model from the checkpoint
async function load() {
  model = await tm.posenet.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

async function loadWebcam() {
  webcamEl = await tm.getWebcam(size, size); // can change width and height
  webcamEl.play();
}

async function setup() {
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
  myCanvas = createCanvas(size, size);
  ctx = myCanvas.elt.getContext("2d");
  // Call the load function, wait until it finishes loading
  await load();
  await loadWebcam();
  predictVideo(webcamEl);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

async function predictVideo(image) {
  if (image) {
    // Prediction #1: run input through posenet
    // predictPosenet can take in an image, video or canvas html element
    const flipHorizontal = false;
    const { pose, posenetOutput } = await model.predictPosenet(
      webcamEl,
      flipHorizontal
    );
    // Prediction 2: run input through teachable machine assification model
    const prediction = await model.predict(
      posenetOutput,
      flipHorizontal,
      totalClasses
    );

    console.log('prediction', prediction)
    // Show the result
    const res = select('#res'); // select <span id="res">
    res.html(prediction[0].className);
  
    // Show the probability
    const prob = select('#prob'); // select <span id="prob">
    prob.html(prediction[0].probability.toFixed(2));

    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      ctx.drawImage(webcamEl, 0, 0);
      tm.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tm.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }

    if (prediction[0].className === 'sit') {
      outByte = 1;
    } else if (prediction[0].className === 'stand') {
      outByte = 2;
    } else {
      outByte = 0;
    }
    // send it out the serial port:
    console.log('outByte: ', outByte)
    serial.write(outByte);
    
    // Wait for 0.2 second before classifying again
    setTimeout(() => predictVideo(webcamEl), 200);
  }
}
