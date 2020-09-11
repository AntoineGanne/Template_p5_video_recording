let lines = []
let nb_lines = 6*1
let bias = 120*2
let w = 8

var capturer = new CCapture( {
    format: 'png',
	framerate: 24,
	verbose: true
  } );
  
  var canvas ;
  var video ;
  var videoStream ;
  var mediaRecorder ;
  var chunks = [];

function setup() {
  canvas = createCanvas(1080, 1080);
  for(let i=0;i<nb_lines;i++){
    append(lines,(i/nb_lines)*(height+bias))
  }
  console.log(lines)


  // video = document.querySelector("video");
  // videoStream = canvas.elt.captureStream(30); // the parameter is the desired framerate, see the MDN doc for more info
  // mediaRecorder = new MediaRecorder(videoStream);

  // mediaRecorder.ondataavailable = function(e) {
  //   chunks.push(e.data);
  // };
  
  // mediaRecorder.onstop = function(e) {
  //   var blob = new Blob(chunks, { 'type' : 'video/mp4' });
  //   // chunks = [];
  //   var videoURL = URL.createObjectURL(blob);
  //   video.src = videoURL;
  // };
}




function draw() {
  if(frameCount == 1) capturer.start()
  // if(frameCount == 1){
  //   mediaRecorder.start();
  // }
  
  blendMode(BLEND)
  background(0);
  blendMode(DIFFERENCE  )
  strokeWeight(w)
  for(let i=0;i<nb_lines;i++){
    let y= lines[i]%(height+bias)
    
    strokeWeight(w+y/100)
    stroke(255,0,0)
    line(0,y-bias,width,y)
    stroke(0,255,0)
    line(0,y-bias+w/2,width,y+w*0.25)
    
    stroke(0,0,255)
    line(0,y-bias+w,width,y+w*0.5)
    
    
    lines[i] = y+1 
  }
  
  noStroke()
  

  
  
  blendMode(DIFFERENCE  )
  fill(255,255,255)
  circle(width*0.52,height/2,width*0.8)
  
    blendMode(SCREEN  )
    fill('#A878EB')
    circle(width*0.48,height/2,width*0.8)
  
  if(frameCount == 220){
    noLoop();
    console.log('finished recording.');
    capturer.stop();

    // default save, will download automatically a file called {name}.extension (webm/gif/tar)
    capturer.save();
  }

  // if(frameCount == 219){
  //   mediaRecorder.requestData()
  //   mediaRecorder.stop()
  // }

  
  // handle saving the frame
  console.log('capturing frame');
  capturer.capture(document.getElementById('defaultCanvas0'));

  
}

