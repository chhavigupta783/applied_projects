const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");
const speedSelect = document.getElementById("speed");
const controls = document.querySelectorAll(".controls button[data-dir]");

const COLS = 20;
const ROWS = 20;
const CELL = canvas.width / COLS;

let snake;
let dir;
let food;
let score;
let timerId;
let speed = parseInt(speedSelect.value, 10);

function reset() {
  snake = [{x: 9, y: 10}, {x:8, y:10}, {x:7, y:10}];
  dir = {x:1, y:0};
  placeFood();
  score = 0;
  scoreEl.textContent = score;
  setSpeed();
  loop();
}

function setSpeed(){
  speed = parseInt(speedSelect.value, 10);
  if(timerId) clearInterval(timerId);
  timerId = setInterval(step, speed);
}

function placeFood(){
  while(true){
    const x = Math.floor(Math.random()*COLS);
    const y = Math.floor(Math.random()*ROWS);
    if(!snake.some(s=>s.x===x && s.y===y)){
      food = {x,y};
      return;
    }
  }
}

function drawCell(x,y,fill){
  ctx.fillStyle = fill;
  ctx.fillRect(x*CELL+1,y*CELL+1,CELL-2,CELL-2);
}

function draw(){
  // Black background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid lines
  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  ctx.lineWidth = 1;
  for(let i=0;i<=COLS;i++){
    ctx.beginPath(); ctx.moveTo(i*CELL,0); ctx.lineTo(i*CELL,canvas.height); ctx.stroke();
  }
  for(let j=0;j<=ROWS;j++){
    ctx.beginPath(); ctx.moveTo(0,j*CELL); ctx.lineTo(canvas.width,j*CELL); ctx.stroke();
  }

  // Food and snake
  drawCell(food.x, food.y, "#f43f5e"); // food red
  drawCell(snake[0].x, snake[0].y, "#16a34a"); // snake head green
  for(let i=1;i<snake.length;i++){
    drawCell(snake[i].x, snake[i].y, "#0ea5a9"); // snake body
  }
}

function step(){
  const newHead = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

  if(newHead.x < 0) newHead.x = COLS - 1;
  if(newHead.x >= COLS) newHead.x = 0;
  if(newHead.y < 0) newHead.y = ROWS - 1;
  if(newHead.y >= ROWS) newHead.y = 0;

  if(snake.some(s => s.x === newHead.x && s.y === newHead.y)){
    gameOver();
    return;
  }

  snake.unshift(newHead);

  if(newHead.x === food.x && newHead.y === food.y){
    score += 10;
    scoreEl.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function gameOver(){
  clearInterval(timerId);
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, canvas.height/2 - 40, canvas.width, 80);
  ctx.fillStyle = "#fff";
  ctx.font = "22px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Game Over — Restart karo", canvas.width/2, canvas.height/2 + 8);
}

window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if(k==="arrowup" || k==="w") setDir(0,-1);
  if(k==="arrowdown" || k==="s") setDir(0,1);
  if(k==="arrowleft" || k==="a") setDir(-1,0);
  if(k==="arrowright" || k==="d") setDir(1,0);
});

function setDir(x,y){
  if(snake.length > 1 && snake[0].x + x === snake[1].x && snake[0].y + y === snake[1].y) return;
  dir = {x,y};
}

controls.forEach(btn => {
  btn.addEventListener("click", () => {
    const d = btn.dataset.dir;
    if(d === "up") setDir(0,-1);
    if(d === "down") setDir(0,1);
    if(d === "left") setDir(-1,0);
    if(d === "right") setDir(1,0);
  });
});

restartBtn.addEventListener("click", reset);
speedSelect.addEventListener("change", setSpeed);

function loop(){ draw(); } // initial draw
reset();
