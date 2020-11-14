var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var balls =[];//array of ball object
var mySound; // object from sound class

//check if is it touch or mouse event 
var istouch = false;
var ismouse = false;

// let the canvas width and height get the window width and hight
canvas.width =window.innerWidth; 
canvas.height = window.innerHeight;

//funcition that return random number from range that spicfy by the parameters max and min
function random(max , min) {
  var num = Math.floor(Math.random() * (max - min) + min) ;
  return num;
}

//class sound that create audio element and take the src as parameter for his consrctor 
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play( );
    }}

//class mouse that track the pointer x and y cooradints  
function mouse(x,y){
  this.dx = x;
  this.dy = y;
}

//object from mouse class
var mousePos = new mouse(0,0);

//canvas event handlers for the touch events
canvas.addEventListener("touchstart", function(evt){
  istouch=true;
  ismouse = false;
 mousePos.dx = evt.touches[0].clientX;
 mousePos.dy = evt.touches[0].clientY;
 evt.preventDefault();
});

canvas.addEventListener("touchmove", function(evt){
 istouch=true;
 ismouse = false;
 mousePos.dx = evt.touches[0].clientX;
 mousePos.dy = evt.touches[0].clientY;
 evt.preventDefault();

});

canvas.addEventListener("touchend", function(evt){
 mousePos.dx = 0;
 mousePos.dy = 0;
 evt.preventDefault();
});

canvas.addEventListener("touchcancel", function(evt){
 evt.preventDefault();
});
//canvas event handlers for the mouse events
canvas.addEventListener('mousemove', function(evt) {
if (istouch){
  evt.preventDefault();
  istouch = false;
  ismouse = true;
}
else{
mousePos.dx = evt.clientX;
mousePos.dy = evt.clientY;
}

});

canvas.addEventListener('mouseout', function() {
  if (istouch){
  evt.preventDefault();
  istouch = false;
  ismouse = true;
}
mousePos.dx = 0;
mousePos.dy = 0;
});

//class Ball that create balls
function Ball(){
  this.dx = random(6,0);
  this.dy = random(8,2);
  this.size = random(60,10);
  var maxWidth = canvas.width - this.size;
  var maxHight = canvas.height - this.size;
  this.bx = random(maxWidth,this.size+1); 
  this.by = random(maxHight,this.size+1);
  this.color = "rgba(" + random(255,0) + ", " + random(255,0) + ", " + random(255,0) + ", " + Math.random()*1 + ")";

//function that move ball object
  this.moveball=function(){
 ctx.fillStyle = this.color ;
 ctx.beginPath();
 ctx.arc(this.bx, this.by, this.size, 0, 2 * Math.PI);
 ctx.fill();
 
 if (this.bx < this.size || this.bx > canvas.width - this.size ) {
        this.dx=-this.dx;
  }

 if (this.by < this.size || this.by > canvas.height - this.size ) {   
        this.dy=-this.dy;
    }

    this.bx+=this.dx;
    this.by+=this.dy;
};

//function that draw bigger ball object
this.drawbigger = function() {
ctx.fillStyle = this.color ;
ctx.beginPath();
ctx.arc(this.bx, this.by, this.size+10, 0, 2 * Math.PI);
ctx.fill();

 if (this.bx < this.size || this.bx > canvas.width - this.size ) {
        this.dx=-this.dx;
  }

 if (this.by < this.size || this.by > canvas.height - this.size ) {   
        this.dy=-this.dy;
    }

    this.bx+=this.dx;
    this.by+=this.dy;
};

//function check if pointer overlap with ball object
this.eventoverlap = function() {
if (mousePos.dx <= (this.bx + this.size) &&  mousePos.dx >= (this.bx - this.size)){
if (mousePos.dy <= (this.by + this.size) &&  mousePos.dy >= (this.by - this.size)){
	return true;
}
}

};
}

//create ball objects in the balls array
for (var i = 0 ; i < 70 ; i++){
	balls[i] = new Ball();
}


mySound = new sound("boing2.wav");


function start(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.clearRect(0, 0, canvas.width, canvas.height);
for (var i = 0 ; i < 70 ; i++){
	if (balls[i].eventoverlap()) {
  mySound.play();
	balls[i].drawbigger();
}else
	balls[i].moveball();
}
 window.requestAnimationFrame(start);	
}

 window.requestAnimationFrame(start);	

