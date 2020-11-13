var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var balls =[];
var ball = 0 ;
var mySound;
var istouch = false;
var ismouse = false;
canvas.width =window.innerWidth;
canvas.height = window.innerHeight;


function random(max , min) {
  var num = Math.floor(Math.random() * (max - min) + min) ;
  return num;
}


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play( );
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
function mouse(x,y){
  this.dx = x;
  this.dy = y;}
var mousePos = new mouse(0,0);

canvas.addEventListener("touchstart", function(evt){
  istouch=true;
  ismouse = false;
 mousePos.dx = evt.touches[0].clientX;
 mousePos.dy = evt.touches[0].clientY;
 console.log("in touch move  " + mousePos.dx );
});

canvas.addEventListener("touchmove", function(evt){
 istouch=true;
 ismouse = false;
 mousePos.dx = evt.touches[0].clientX;
 mousePos.dy = evt.touches[0].clientY;
 console.log("in touch move  " + mousePos.dx );
});


canvas.addEventListener("touchend", function(evt){
 mousePos.dx = 0;
 mousePos.dy = 0;
 console.log("in touch end  " + mousePos.dx );
});

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

canvas.addEventListener('mouseout', function(evt) {
  if (istouch){
  evt.preventDefault();
  istouch = false;
  ismouse = true;
}
mousePos.dx = 0;
mousePos.dy = 0;
});

function Ball(){
  this.dx = random(6,0);
  this.dy = random(8,2);
  this.size = random(60,10);
  var maxWidth = canvas.width - this.size;
  var maxHight = canvas.height - this.size;
  this.bx = random(maxWidth,this.size+1); 
  this.by = random(maxHight,this.size+1);
  this.color = "rgba(" + random(255,0) + ", " + random(255,0) + ", " + random(255,0) + ", " + Math.random()*1 + ")";
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

this.bigger = function() {
if (mousePos.dx <= (this.bx + this.size) &&  mousePos.dx >= (this.bx - this.size)){
if (mousePos.dy <= (this.by + this.size) &&  mousePos.dy >= (this.by - this.size)){
	return true;
}
}

};
}

for (var i = 0 ; i < 70 ; i++){
	balls[i] = new Ball();
}
mySound = new sound("boing2.wav");


function start(){
canvas.width =window.innerWidth;
canvas.height = window.innerHeight;
ctx.clearRect(0, 0, canvas.width, canvas.height);
for (var i = 0 ; i < 70 ; i++){
	if (balls[i].bigger()) {
  mySound.play();
	balls[i].drawbigger();
}else
	balls[i].moveball();
}
 window.requestAnimationFrame(start);	
}

 window.requestAnimationFrame(start);	

