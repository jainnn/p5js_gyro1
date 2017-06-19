var forceX = 0;
var forceY = 0;
var bars = [];

function windowResized() { // Fullscreen to resize 
	resizeCanvas(windowWidth, windowHeight);
}


function setup(){
	// fullscreen canvas
	createCanvas(windowWidth, windowHeight);
	// Start gyrojs, to update forceX and forceY
	gyro.frequency = 10; // Refresh 10 times per second
	gyro.startTracking(function(o) {
        // o.x, o.y, o.z for accelerometer
        // o.alpha, o.beta, o.gamma for gyro
        forceX = o.gamma/50;
        forceY = o.beta/50;
    });

    // Creation of bars
    for (var i = 0; i < 6; i++) {
    	bars[i] = new Bar();
    }
}
function draw(){
	background(250); 
//	fill(0); // View the forces
//	text("forceX : "+forceX, 30, 30);
//	text("forceY : "+forceY, 30, 50);
  fill(30,50,220);
	// Update bubbles
	for (var i = 0; i < bars.length; i++) {
		bars[i].update();
	}
}


function Bar(){
	this.x = width/2; // Starts at the center
	this.y = height/2;
	this.vitx = random(2, 12);
	this.vity = random(2, 12);
	this.b = random(20, 60);
}



Bubble.prototype = {
	update: function(){

		// The speed is proportional to the current forces
		this.x += this.vitx * forceX;
		this.y += this.vity * forceY;

		if (this.x < this.b/2){ 
			this.x = this.b/2;
		} else if(this.x > width-this.b/2){
			this.x = width-this.b/2;
		}
		
		
		if(this.y < this.b/2){
			this.y = this.b/2;
		} else if(this.y > height-this.b/2){
			this.y = height-this.b/2;
		}
		
  rectMode(CENTER);
 // rect(this.x, this.y, this.b, this.b)
		ellipse(this.x, this.y, this.b, this.b);		
	}
}
