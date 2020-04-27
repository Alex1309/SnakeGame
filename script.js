var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const BOX_SIZE = 28;
const GRID_SIZE = 16;
const CANVAS_SIZE = BOX_SIZE * GRID_SIZE;
let x = (CANVAS_SIZE/2)-BOX_SIZE;
let y = (CANVAS_SIZE/2)-BOX_SIZE;
let xFood = CANVAS_SIZE-(3*BOX_SIZE);
let yFood = CANVAS_SIZE-(3*BOX_SIZE);
let mSnake = [];
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
let key = RIGHT;
let score = 0;
let maxlenght = 1;
const image = document.getElementById("fruit");
let move;


function drawTable() {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
        ctx.fillStyle = "#FFE899";
        ctx.fillRect(0 + BOX_SIZE * i, 0 + BOX_SIZE * j, BOX_SIZE, BOX_SIZE);
      } else {
        ctx.fillStyle = "#FFF5AA";
        ctx.fillRect(0 + BOX_SIZE * i, 0 + BOX_SIZE * j, BOX_SIZE, BOX_SIZE);
      }
    }
  }
}
function drawSnake(x, y, i, dx, dy) {
  if (i == mSnake.length - 1) {
    ctx.strokeStyle = "#0B7814";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, dx, dy);
    ctx.fillStyle = "#1BB927";
    ctx.fillRect(x, y, dx, dy);
  } else {
    ctx.strokeStyle = "#0B7814";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, dx, dy);
    ctx.fillStyle = "#0BE11B";
    ctx.fillRect(x, y, dx, dy);
  }
}
function clearSnake(x, y, i, j) {
  ctx.clearRect(x, y, i, j);
}
function drawFood(xFood, yFood, i, j) {
  ctx.drawImage(image, xFood, yFood, i, j);
}
function randomFood() {
  xFood = BOX_SIZE * Math.floor(Math.random() * (GRID_SIZE - 1));
  yFood = BOX_SIZE * Math.floor(Math.random() * (GRID_SIZE - 1));
  for(let h=0;h<mSnake.length;h++){
    if(xFood===mSnake[h].x && yFood===mSnake[h].y){
      randomFood();
    }else{
    drawFood(xFood, yFood, BOX_SIZE, BOX_SIZE);
    }
  }
}
function lostGame() {
 
  let m = mSnake[mSnake.length - 1].x;
  let n = mSnake[mSnake.length - 1].y;
  for (let z = 0; z < mSnake.length - 1; z++) {
    if (m === mSnake[z].x && n === mSnake[z].y) {
      stopMovingSnake();
      swal({
        icon: 'lost.png',
        text: "" + score,
        button: "Jugar de nuevo",
      }).then(function() {
        x = (CANVAS_SIZE/2)-BOX_SIZE;
        y = (CANVAS_SIZE/2)-BOX_SIZE;
        xFood = CANVAS_SIZE-(3*BOX_SIZE);
        yFood = CANVAS_SIZE-(3*BOX_SIZE);
        maxlenght=1;
        drawFood(xFood, yFood, BOX_SIZE, BOX_SIZE);
        score=0;
        document.getElementById("score").innerHTML = score;
        mSnake=[];
        key = RIGHT;
        movingSnake();
        });
    }
  }
}

drawTable();
drawFood(xFood, yFood, BOX_SIZE, BOX_SIZE);

window.onkeydown = function onKeyDown(event) {
  let newKey = event.keyCode;
  if (Math.abs(newKey - key) === 2) {
    return;
  }if (!(newKey===RIGHT ||newKey===LEFT || newKey===UP || newKey===DOWN) ) {
    return;
  }
  key = newKey;
}
function moveSnake() {
  clearSnake(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  if (key == RIGHT) {
    x += BOX_SIZE;
    if (x > CANVAS_SIZE - BOX_SIZE) x = 0;
  }
  if (key == LEFT) {
    x -= BOX_SIZE;
    if (x < 0) x = CANVAS_SIZE - BOX_SIZE;
  }
  if (key == UP) {
    y -= BOX_SIZE;
    if (y < 0) y = CANVAS_SIZE - BOX_SIZE;
  }
  if (key == DOWN) {
    y += BOX_SIZE;
    if (y > CANVAS_SIZE - BOX_SIZE) y = 0;
  }
  if (x === xFood && y === yFood) {
    randomFood();
    maxlenght++;
    score++;
    document.getElementById("score").innerHTML = score;
  }
  mSnake.push({ x: x, y: y });
  drawTable();

  for (let i = 0; i < mSnake.length; i++) {
    drawSnake(mSnake[i].x, mSnake[i].y, i, BOX_SIZE, BOX_SIZE);
  }
  if (mSnake.length > maxlenght) {
    mSnake.shift();
  }
  drawFood(xFood, yFood, BOX_SIZE, BOX_SIZE);
  if(score>1){
    lostGame();
  }
}
function movingSnake() {
  move =setInterval(moveSnake, 100);
}
function stopMovingSnake() {
  clearInterval(move);
}

movingSnake();
