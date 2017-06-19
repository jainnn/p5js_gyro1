var forceX = 0;
var forceY = 0;
var bubbles = [];

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

    // Creation of bubbles
    for (var i = 0; i < 5; i++) {
    	bubbles[i] = new Bubble();
    };
}
function draw(){
	background('#FFFFFF'); // White background

	fill(0); // View the forces
	text("forceX : "+forceX, 30, 30);
	text("forceY : "+forceY, 30, 50);
    fill('#ECECEC');

	// Update bubbles
	for (var i = 0; i < bulles.length; i++) {
		bubbles[i].update();
	};
}

function Bubble(){
	this.x = width/2; // Starts at the center
	this.y = height/2;
	this.vitx = random(2, 12);
	this.vity = random(2, 12);
	this.diam = random(20, 60);
}
Bubble.prototype = {
	update: function(){

		// The speed is proportional to the current forces
		this.x += this.vitx * forceX;
		this.y += this.vity * forceY;

		if(this.x < this.diam/2){
			this.x = this.diam/2;
		} else if(this.x > width-this.diam/2){
			this.x = width-this.diam/2;
		}
		if(this.y < this.diam/2){
			this.y = this.diam/2;
		} else if(this.y > height-this.diam/2){
			this.y = height-this.diam/2;
		}

		ellipse(this.x, this.y, this.diam, this.diam);		
	}
}