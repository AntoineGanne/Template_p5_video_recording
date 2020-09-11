let angle = 0
let radius = 100

const framerate = 30
const firstFrame = 1
const lastFrame = 360

var canvas 
var video 
var videoStream 
var mediaRecorder 
var chunks = []

function setup() {
  canvas = createCanvas(400, 400);

  
  angleMode(DEGREES)

  video = document.querySelector("video");
  videoStream = canvas.elt.captureStream(framerate); // the parameter is the desired framerate, see the MDN doc for more info
  mediaRecorder = new MediaRecorder(videoStream);

  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  };
  
  mediaRecorder.onstop = function(e) {
    var blob = new Blob(chunks, { 'type' : 'video/mp4' });
    chunks = []; //reset the chunks
    var videoURL = URL.createObjectURL(blob);
    video.src = videoURL;
  };
}




function draw() {

  background(0);
  
  let x = width/2+radius*cos(angle)
  let y = height/2+radius*sin(angle)

  ellipse(x, y, 100)

  angle++

  if(frameCount == firstFrame){
    mediaRecorder.start();
  }

  if(frameCount == lastFrame){
    mediaRecorder.stop()
  }
  
}

