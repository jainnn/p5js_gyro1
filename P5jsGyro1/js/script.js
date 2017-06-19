var forceX = 0;
var forceY = 0;
var bulles = [];

function windowResized() { // plein écran au resize aussi
	resizeCanvas(windowWidth, windowHeight);
}
function setup(){
	// une canvas plein écran
	createCanvas(windowWidth, windowHeight);

	// démarrer gyrojs, pour mettre à jour forceX et forceY
	gyro.frequency = 10; // rafraichir 10 fois par secondes
	gyro.startTracking(function(o) {
        // o.x, o.y, o.z for accelerometer
        // o.alpha, o.beta, o.gamma for gyro
        forceX = o.gamma/50;
        forceY = o.beta/50;
    });

    // création des bulles
    for (var i = 0; i < 5; i++) {
    	bulles[i] = new Bulle();
    };
}
function draw(){
	background('#FFFFFF'); // fond blanc

	fill(0); // afficher les forces
	text("forceX : "+forceX, 30, 30);
	text("forceY : "+forceY, 30, 50);
    fill('#ECECEC');

	// update des bulles
	for (var i = 0; i < bulles.length; i++) {
		bulles[i].update();
	};
}

function Bulle(){
	this.x = width/2; // démarre au centre
	this.y = height/2;
	this.vitx = random(2, 12);
	this.vity = random(2, 12);
	this.diam = random(20, 60);
}
Bulle.prototype = {
	update: function(){

		// la vitesse est proportionnée aux forces actuelles
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
