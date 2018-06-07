(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvasWidth = 500;
var canvasHeight = 500;
var SIZE = 20;
var gameEnd = false;
var score = 0;
var lives = 3;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = canvasWidth,
canvas.height = canvasHeight;
var keys = [];
var wallLeft = {x: 150, y: 10};
var wallStackLeft = [];
wallStackLeft.push(wallLeft);

var wallRight = {x: 350, y: 10};
var wallStackRight = [];
wallStackRight.push(wallRight);


class Player{
  constructor(posX, posY, size){
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.dx = 0;
    this.dy = 0;
    this.speed = 10;
    this.firstVertex = 0;
    this.secondVertex = 0;
  }
}

Player.prototype.draw = function(){
  heightTriangle = Math.sqrt(Math.pow(this.size,2) - Math.pow(this.size/2,2));
  ctx.fillStyle = 'yellow';

  ctx.beginPath();
  ctx.moveTo(this.posX,this.posY);
  this.firstVertex = [this.posX - (this.size/2), this.posY + heightTriangle];
  ctx.lineTo(this.firstVertex[0], this.firstVertex[1]);
  ctx.stroke();
  this.secondVertex = [this.posX + (this.size/2), this.posY + heightTriangle];
  ctx.lineTo(this.secondVertex[0], this.secondVertex[1]);
  ctx.stroke();
  ctx.lineTo(this.posX, this.posY);
  ctx.stroke();
  ctx.fill();
  // var data = ctx.getImageData(firstVertex[0], firstVertex[1], 1, 1).data;
  // if (data[0] === 0 && data[1] === 0 && data[2] === 0){
  //   console.log("end-game");
  // }
  // var rgba = 'rgba(' + data[0] + ', ' + data[1] +
  //            ', ' + data[2] + ', ' + (data[3] / 255) + ')';
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
var playerLives = [new Player(10, 10, SIZE), new Player(10, 50, SIZE), new Player(10, 90, SIZE)]
console.log(player);
player.draw();
for (var i = 0; i < playerLives.length; i++) {
  playerLives[i].draw();
}
drawPixels(wallStackLeft[0].x, wallStackLeft[0].y)
drawPixels(wallStackRight[0].x, wallStackRight[0].y)


function update(){
  if (gameEnd == true){
    console.log("game donezo");
    return;
  }


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

    player.draw();
    for (var i = 0; i < playerLives.length; i++) {
      playerLives[i].draw();
    }

    var left = updateLeftStack(wallStackLeft);
    var right = updateRightStack(wallStackRight);
    if ((right.x - left.x) <= 100){
      while ((right.x - left.x) <= 100) {
        right.x ++;
        left.x --;
      }// what about check to see about the edge cases, its handled in the update method
    }
    wallStackLeft.unshift(left);
    wallStackRight.unshift(right);
    for (var i = 0; i < wallStackLeft.length; i++) {
      wallStackLeft[i].y += 10
      drawPixels(wallStackLeft[i].x, wallStackLeft[i].y)
    }
    if(wallStackLeft[wallStackLeft.length - 1].y > canvas.height) wallStackLeft.pop();

    for (var i = 0; i < wallStackRight.length; i++) {
      wallStackRight[i].y += 10
      drawPixels(wallStackRight[i].x, wallStackRight[i].y)
    }
    if(wallStackRight[wallStackRight.length - 1].y > canvas.height) wallStackRight.pop();
    score+=5;
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Score: " + score, 300, 25);


  collision();
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


function drawPixels(x, y) {
  for (var i = -10; i < 10; i+= 4) {
    for (var j = -10; j < 10; j+= 4) {
      // if (Math.random() > 0.5)
        ctx.fillStyle = ['black', 'black', 'purple'][getRandom(0,2)];
        ctx.fillRect(x+i, y+j, 4, 4);

    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function collision() {
  var data = ctx.getImageData(player.firstVertex[0], player.firstVertex[1], 1, 1).data;
  if (data[0] === 0 && data[1] === 0 && data[2] === 0 && 1 === (data[3] / 255)){
    console.log("end-game");
    playerLives.pop();
    if(!playerLives.length) {
      gameEnd = true;
      return;
    }
    else {
      var diff = wallStackRight[wallStackRight.length-1].x - wallStackLeft[wallStackLeft.length-1].x;
      player.posX = (diff/2) + wallStackLeft[wallStackLeft.length-1].x;
      return;
    }
  }
  data = ctx.getImageData(player.firstVertex[0], player.firstVertex[1], 1, 1).data;
  if (data[0] === 0 && data[1] === 0 && data[2] === 0 && 1 === (data[3] / 255)){
    console.log("end-game1");
    playerLives.pop();
    if(!playerLives.length) {
      gameEnd = true;
      return;
    }
    else {
      var diff = wallStackRight[wallStackRight.length-1].x - wallStackLeft[wallStackLeft.length-1].x;
      player.posX = (diff/2) + wallStackLeft[wallStackLeft.length-1].x;
      return;
    }
  }

  var data = ctx.getImageData(player.firstVertex[0], player.firstVertex[1], 1, 1).data;
  if (data[0] === 128 && data[1] === 0 && data[2] === 128 && 1 === (data[3] / 255)){
    console.log("end-game2");
    playerLives.pop();
    if(!playerLives.length) {
      gameEnd = true;
      return;
    }
    else {
      var diff = wallStackRight[wallStackRight.length-1].x - wallStackLeft[wallStackLeft.length-1].x;
      player.posX = (diff/2) + wallStackLeft[wallStackLeft.length-1].x;
      return;
    }
  }
  data = ctx.getImageData(player.firstVertex[0], player.firstVertex[1], 1, 1).data;
  if (data[0] === 128 && data[1] === 0 && data[2] === 128 && 1 === (data[3] / 255)){
    console.log("end-game3");
    playerLives.pop();
    if(!playerLives.length) {
      gameEnd = true;
    }
    else {
      var diff = wallStackRight[wallStackRight.length-1].x - wallStackLeft[wallStackLeft.length-1].x;
      player.posX = (diff/2) + wallStackLeft[wallStackLeft.length-1].x;
      return;
    }
  }
}

function restartGame(){

}
