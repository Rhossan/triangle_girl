(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvasWidth = 500;
var canvasHeight = 1000;
var SIZE = 20;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 500,
canvas.height = 900;
var keys = [];

class Player{
  constructor(posX, posY, size){
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.dx = 0;
    this.dy = 0;
    this.speed = 10;
  }
}

Player.prototype.draw = function(){
  heightTriangle = Math.sqrt(Math.pow(this.size,2) - Math.pow(this.size/2,2));
  ctx.fillStyle = 'yellow';

  ctx.beginPath();
  ctx.moveTo(this.posX,this.posY);
  firstVertex = [this.posX - (this.size/2), this.posY + heightTriangle];
  ctx.lineTo(firstVertex[0], firstVertex[1]);
  ctx.stroke();
  secondVertex = [this.posX + (this.size/2), this.posY + heightTriangle];
  ctx.lineTo(secondVertex[0], secondVertex[1]);
  ctx.stroke();
  ctx.lineTo(this.posX, this.posY);
  ctx.stroke();
  ctx.fill();
  // beginShape();
  // vertex(this.xPos, this.yPos);
  // vertex(this.xPos - (this.size/2), this.yPos + heightTriangle);
  // vertex(this.xPos + (this.size/2), this.yPos + heightTriangle);
  // endShape(CLOSE);
  // fill();
};
    // ctx.beginPath();
    // ctx.rect(20, 40, 50, 50);
    // ctx.fillStyle = "#FF0000";
    // ctx.fill();
    // ctx.closePath();

    // ctx.beginPath();
    // ctx.moveTo(50, 10);
    // ctx.lineTo(10, 70);
    // ctx.lineTo(90, 70);
    // ctx.fillStyle = 'yellow';
    // ctx.fill();

    // ctx.beginPath();
    // ctx.moveTo(canvas.width/2, canvas.height-10);
    // ctx.lineTo(10, 70);
    // ctx.lineTo(90, 70);
    // ctx.fillStyle = 'yellow';
    // ctx.fill();
var player = new Player(canvas.width/2, canvas.height-SIZE-50, SIZE);
console.log(player);
player.draw();

function update(){
  // check keys
    if (keys[32]) {
        // space
    }
    if (keys[39]) {
        // right arrow
        if (player.dx < player.speed) {

          player.dx++;

        }

    }
    if (keys[37]) {
        // left arrow
        if (player.dy > -player.speed) player.dx--;
    }
    player.dx *= 0.8;
    player.posX += player.dx;
    player.posY += player.dy;

    ctx.clearRect(0, 0,this.canvas.width, this.canvas.height);
    player.draw()
  requestAnimationFrame(update);
}

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load",function(){
    update();
});

function createGame(){
  // canvas = createCanvas(canvasWidth,canvasHeight);


}
