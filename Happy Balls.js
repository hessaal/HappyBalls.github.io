var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var balls =[];
var ball = 0 ;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function random(max , min) {
  var num = Math.floor(Math.random() * (max - min) + min) ;
  return num;
}

function mouse(x,y){
  this.dx = x;
  this.dy = y;}
var mousePos = new mouse(0,0);

canvas.addEventListener('touchmove', function(evt) {
mousePos.dx = event.touches[0].clientX;
mousePos.dy = event.touches[0].clientY;
});

canvas.addEventListener('touchend', function(evt) {
mousePos.dx = 0;
mousePos.dy = 0;
});

canvas.addEventListener('mousemove', function(evt) {
// mousePos = getMousePos(canvas, evt); 
mousePos.dx = evt.clientX;
mousePos.dy = evt.clientY;
});

function Ball(){
  this.dx = random(2,0);
  this.dy = random(6,4);
  this.size = random(50,10);
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

for (var i = 0 ; i < 50 ; i++){
	balls[i] = new Ball();
}

function start(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
for (var i = 0 ; i < 50 ; i++){
	if (balls[i].bigger()) {
	balls[i].drawbigger();
}else
	balls[i].moveball();
}
 window.requestAnimationFrame(start);	
}


// function biggerstart(){
// ctx.clearRect(0, 0, canvas.width, canvas.height);
// for (var i = 0 ; i < 2 ; i++){
// if (i == ball){
// balls[i].drawbigger();
// }
// else {
// 	balls[i].moveball();
// }
// if (balls[i].bigger()) {
// 	ball = i;
// 	window.requestAnimationFrame(biggerstart);
// // }
// }
//  window.requestAnimationFrame(start);	
// }

 window.requestAnimationFrame(start);	
