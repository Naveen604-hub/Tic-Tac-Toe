const welcomeScreen=document.getElementById("welcomeScreen");
const modeScreen=document.getElementById("modeScreen");
const gameContainer=document.getElementById("gameContainer");

const startBtn=document.getElementById("startBtn");
const singleBtn=document.getElementById("singleBtn");
const multiBtn=document.getElementById("multiBtn");

const cells=document.querySelectorAll(".cell");

const statusText=document.getElementById("status");

const popup=document.getElementById("popup");
const winnerText=document.getElementById("winnerText");

const xScore=document.getElementById("xScore");
const oScore=document.getElementById("oScore");
const drawScore=document.getElementById("drawScore");

let board=["","","","","","","","",""];
let currentPlayer="X";
let gameActive=false;
let singlePlayer=false;

let xWins=0;
let oWins=0;
let draws=0;

const wins=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

startBtn.onclick=()=>{
welcomeScreen.classList.add("hidden");
modeScreen.classList.remove("hidden");
};

singleBtn.onclick=()=>{
singlePlayer=true;
startGame();
};

multiBtn.onclick=()=>{
singlePlayer=false;
startGame();
};

function startGame(){
modeScreen.classList.add("hidden");
gameContainer.classList.remove("hidden");

board=["","","","","","","","",""];
currentPlayer="X";
gameActive=true;

cells.forEach(cell=>{
cell.textContent="";
cell.classList.remove("x","o");
});

statusText.textContent="Player X Turn";
}

cells.forEach(cell=>{
cell.addEventListener("click",handleClick);
});

function handleClick(){
const index=this.dataset.index;

if(board[index]!=="" || !gameActive){
return;
}

makeMove(index,currentPlayer);

if(checkResult()) return;

if(singlePlayer){

currentPlayer="O";

setTimeout(()=>{
computerMove();

if(!checkResult()){
currentPlayer="X";
statusText.textContent="Your Turn";
}
},500);

}else{

currentPlayer=currentPlayer==="X"?"O":"X";

statusText.textContent=
"Player "+currentPlayer+" Turn";
}
}

function makeMove(index,player){
board[index]=player;

cells[index].textContent=player;

if(player==="X"){
cells[index].classList.add("x");
}else{
cells[index].classList.add("o");
}
}

function computerMove(){
let empty=[];

board.forEach((v,i)=>{
if(v===""){
empty.push(i);
}
});

if(empty.length===0) return;

let random=
empty[Math.floor(Math.random()*empty.length)];

makeMove(random,"O");
}

function checkResult(){

for(let combo of wins){

let[a,b,c]=combo;

if(
board[a] &&
board[a]===board[b] &&
board[a]===board[c]
){

gameActive=false;

showWinner(board[a]+" Wins!");

if(board[a]==="X"){
xWins++;
xScore.textContent=xWins;
}else{
oWins++;
oScore.textContent=oWins;
}

return true;
}
}

if(!board.includes("")){
gameActive=false;

draws++;
drawScore.textContent=draws;

showWinner("Match Draw!");

return true;
}

return false;
}

function showWinner(msg){
winnerText.textContent=msg;
popup.classList.remove("hidden");
}

document.getElementById("playAgainBtn").onclick=()=>{
popup.classList.add("hidden");
startGame();
};

document.getElementById("restartBtn").onclick=()=>{
startGame();
};
