//board
let board;
let boardWidth = 720;
let boardHeight = 540;
let context; 

//player
let playerWidth = 100;
let playerHeight = 85;
let playerVelocityX = 240;
let playerinitialposX = 180;
let playerinitialposY = boardHeight-185;

//wolf
let wolfinitialposY=playerinitialposY+15;
let wolfWidth=100;
let wolfHeight=200;
let wolfinitialposX=window.innerWidth/2-wolfWidth;

//egg
let egg;
let eggs=[];
let eggWidth = 25;
let eggHeight = 30;

//chicken
let chickenWidth=50;
let chickenHeight=50;
let chickenpositionX=window.innerWidth/2+90;
let chickenpositionY=window.innerHeight/2-147;

//score
let score = 0;
let losepoint = 0.0;

let deg =30;

const intervalTime = 1000;
const movementAmount = 15;
let chickenspeedTime=500;

let intervalspeed = 0;

//rabbit
let rabbitAppear = false;

let player = {
    x : playerinitialposX,
    y : playerinitialposY,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX
}
let wolf;

//mode
let easyMode =false;
let normalMode =false;
let standardMode =false;
let extremeMode =false;


//sounds
const step = new Audio('sounds/Footstep.wav');
const catching = new Audio('sounds/bigSelect.wav');
const freeze = new Audio('sounds/freeze.wav');
const chickenbawk = new Audio('sounds/chicken_bawk1.wav');
const chickencluck= new Audio('sounds/chicken_cluck.wav');
const fall = new Audio('sounds/sell.wav');
const levelup = new Audio('sounds/achievement.wav');
const rabbitsound = new Audio('sounds/dialogueCharacter.wav');
const losesound = new Audio('sounds/cowboy_dead.wav');
const pashalka = new Audio('sounds/pogodi.mp3');
const konec = new Audio('sounds/koncovvk.mp3');

window.onload = function() {
    const rectangle = document.getElementById("rectangle");
    const startButton = document.getElementById("start-button");
    const backgroundScreen = document.getElementById('backgroundintro');
    backgroundScreen.classList.remove('hidden');
    startButton.addEventListener("click", function() {
        backgroundScreen.classList.add('hidden');
        rectangle.style.display = "none";
        startButton.style.display = "none";
      });

      document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
          const value = event.target.value;
          if (value === 'easy') {
            easyMode =true;
          } else if (value === 'normal') {
            normalMode =true;
          } else if (value === 'standard') {
            standardMode =true;
          } else if (value === 'extreme') {
            extremeMode =true;
          }
        });
      });
      
    rectangle.style.display = "block";
    startButton.style.display = "block";

}

function start(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw initial player
    playerImg = new Image();
    playerImg.src = "images/down.png";
    playerImg.onload = function() {
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
    }

    wolf = document.createElement('div');
    wolf.style.width = 100+"px";
    wolf.style.height = 200+"px";
    wolf.style.backgroundImage = "url(images/wolf.png)";
    wolf.style.position = "absolute";
    wolf.style.top = wolfinitialposY+"px";
    wolf.style.left = wolfinitialposX+"px";
    document.body.appendChild(wolf);

    setTimeout(createEgg, 1000);
    setTimeout (createrabbit,1500);
    requestAnimationFrame(update);
    
    document.addEventListener("keyup", movePlayer);

}

function FreezePlayer(){
    if(FreezeThePlayer){

        freeze.play();
        if(playerImg.src.endsWith("images/up.png")){
            playerImg.src = "images/freezedup.png";
        }else if(playerImg.src.endsWith("images/down.png")){
            playerImg.src = "images/freezeddown.png";
        }else if(playerImg.src.endsWith("images/up_flipped.png")){
            playerImg.src = "images/freezedup_flipped.png";
        }else if(playerImg.src.endsWith("images/down_flipped.png")){
            playerImg.src = "images/freezeddown_flipped.png";
        }
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
        wolf.style.backgroundImage= "url(images/freezedwolf.png)";
        document.removeEventListener("keyup", movePlayer);
        setTimeout(() => {
          FreezeThePlayer = false;
        wolf.style.backgroundImage="url(images/wolf.png)";
          document.addEventListener("keyup", movePlayer);
        }, 1500);
    }
}

function createrabbit(){

    if(losepoint>3){
        return;
    }
  const randomTime = Math.floor(Math.random() * (10000 - 5000 + 1) + 5000);

  const rabbit = document.createElement('div');
  rabbit.style.width = 100+"px";
  rabbit.style.height = 100+"px";
  rabbit.style.backgroundImage = "url(images/bunny.png)";
  rabbit.style.position = "absolute";
  rabbit.classList.add('rabbit');

  rabbit.style.top = window.innerHeight/2-227+"px";
  rabbit.style.left = window.innerWidth/2-233+"px";
  document.body.appendChild(rabbit);
  rabbitAppear = true;
  rabbitsound.play();

  setTimeout(function(){
    rabbit.remove();
    rabbitAppear=false;
  }, 5000);

  setTimeout(() => {
    createrabbit();
  }, randomTime);
}

let FreezerEggSpawned=false;
let FreezeThePlayer=false;
let stopMoving = false;

function createEgg() {
    const eggs = [];
    let eggFrequency=3000;

    if(losepoint>3){
        return;
    }
    //const eggspawn = setInterval(() =>{
    function spawnEgg(){
        if(losepoint>3){
            return;
        }

        if (stopMoving) {
            clearInterval(intervalId);
            egg.remove();
            eggs.splice(eggs.indexOf(egg), 1);
          return;
        }
    const egg = document.createElement('div');
    egg.classList.add('egg');

    egg.style.width = eggWidth+"px";
    egg.style.height = eggHeight+"px";
   // egg.style.backgroundColor = "red";
    egg.style.position = "absolute";

    if(extremeMode){
        setInterval(function(){
            eggFrequency-=100;
        },5000);
    const freezerAppear = Math.floor(Math.random() * 10) + 1;

    // If the  number is 1, create a "freezer egg"
    if (freezerAppear === 1) {
      egg.classList.add('freezer-egg');
    }
}
    let randomNumber = Math.floor(Math.random() * 4) + 1;
  
    if(easyMode){
        if(losepoint<=1.5){
        randomNumber = Math.floor(Math.random() * 2) + 1;
        if(randomNumber === 2){
            randomNumber = 3;
        }
    }else
        randomNumber = Math.random() < 0.5 ? 2 : 4;

    }else if(normalMode){
        if (losepoint === 0) {
            while (randomNumber === 2){
              randomNumber = Math.floor(Math.random() * 4) + 1;
            }
          } else if (losepoint === 0.5 || losepoint === 1) {
            while (randomNumber === 4){
                randomNumber = Math.floor(Math.random() * 4) + 1;
              }
          } else if (losepoint === 1.5 || losepoint === 2) {
            while (randomNumber === 1){
                randomNumber = Math.floor(Math.random() * 4) + 1;
              }
          } else if (losepoint >= 2.5) {
            while (randomNumber === 3){
                randomNumber = Math.floor(Math.random() * 4) + 1;
              }
          }
    }


    let posx,posy;

    if (randomNumber === 1) {
        posx = window.innerWidth/2-275;
        posy = window.innerHeight/2-120+10;
    } else if (randomNumber === 2) {
        posx = window.innerWidth/2-275;
        posy = window.innerHeight/2+15;
    } else if (randomNumber === 3) {
        posx = window.innerWidth/2+260-eggWidth/2;
        posy = window.innerHeight/2-110;
    } else if (randomNumber === 4) {
        posx = window.innerWidth/2+260-eggWidth/2;
        posy = window.innerHeight/2+17;
    }

    egg.style.left = posx + "px";
    egg.style.top = posy + "px";

    document.body.appendChild(egg);
    eggs.push({ egg, posx, posy });
  
    let count = 0;

    const intervalId = setInterval(() => {
        if(losepoint>3){
            return;
        }

        if (stopMoving) {
            clearInterval(intervalId);
            egg.remove();
            eggs.splice(eggs.indexOf(egg), 1);
          return;
        }
        count++;
  
        if (count === 5) {
            if(checkifcontact(randomNumber)){
                catching.play();
                clearInterval(intervalId);
                egg.remove(); 
                eggs.splice(eggs.indexOf(egg), 1);
                if(egg.classList.contains('freezer-egg')){
                    FreezeThePlayer=true;
                    FreezePlayer();
                    return;
                }
                else{
                score+=10;

                if(score>0 && score%100 === 0){
                    levelup.play();
                }
                if(score >= 990){
                    konec.play();
                    pashalka.play();
                    score = 0;
                }
                if(score === 200 || score === 500){
                    createchicken();
                }
                if(easyMode){
                    intervalspeed+=5;
                }else if(normalMode || standardMode){
                    intervalspeed+=15;
                }else
                    intervalspeed+=20;
                return;
            }
            }else
            {
            if(randomNumber<=2){
                egg.style.top=window.innerHeight/2+145 + "px";
                egg.style.left=window.innerWidth/2-275+100 + "px";}
            else{
                egg.style.top=window.innerHeight/2+145 + "px";
                egg.style.left=window.innerWidth/2+260-100-eggWidth/2 + "px";
        }
        clearInterval(intervalId);
        setTimeout(function(){
        egg.remove();
        },1000);
        eggs.splice(eggs.indexOf(egg), 1);

        if(egg.classList.contains('freezer-egg')){
            FreezeThePlayer=false;
            return;
        }
        fall.play();
        setTimeout(() => {
            fall.pause();
          }, 1000);

        if(rabbitAppear){
            losepoint+=0.5;
            }else
        losepoint++;
        createchicken(losepoint,randomNumber);
        intervalspeed=0;

        stopMoving = true;
        setTimeout(() => {
        stopMoving = false;
        }, 2000);
  
        return;
    }
        }
  
        if (randomNumber === 1 || randomNumber === 2) {
          posx+=movementAmount+10;
          posy+=movementAmount;
        } else if (randomNumber === 3 || randomNumber === 4) {
          posx-=movementAmount+10;
          posy+=movementAmount;
        }
        step.play();
        deg+=30;
        egg.style.transform="rotate(" + deg + "deg)";
        egg.style.left = posx + "px";
        egg.style.top = posy + "px";

      }, chickenspeedTime);

      if (score%100 ===0 ) {
        eggFrequency = 3000;
        intervalspeed=0;
      }else 
        eggFrequency= Math.max(eggFrequency-=intervalspeed*15,1000);
      clearInterval(eggspawn);
      eggspawn = setInterval(spawnEgg, eggFrequency);
    }
    let eggspawn = setInterval(spawnEgg, eggFrequency);
  }

  function checkifcontact(a) {
    if(losepoint>3){
        return;
    }

    if( a===1 ){
    return (player.y === playerinitialposY-135) && (player.x === playerinitialposX);
    }else if(a === 2){
    return (player.x === playerinitialposX) && (player.y === playerinitialposY);
    }else if(a === 3){
    return (player.y === playerinitialposY-135) && (player.x === boardWidth-playerinitialposX-playerWidth);
    }else
    return (player.y === playerinitialposY) && (player.x === boardWidth-playerinitialposX-playerWidth);
  }
  
let isBlinking=false;
let chickens=[];

function createchicken(losepoint, randomNumber){

    if(score === 200 || score === 500){
        for(let i=0;i<chickens.length;i++){
        chickens[i].remove();
        }
        losepoint = 0;
        return;
    }

    if(losepoint>3){
        gameover();
        return;
    }

    let ChickNumber = Math.round(losepoint);
    const chicken = document.createElement("div");
    chicken.classList.add('object');

    chickenbawk.play();
    chicken.style.width = chickenWidth+"px";
    chicken.style.height = chickenHeight+"px";
    chicken.style.backgroundImage = "url(images/chicken.png)";
    chicken.style.position = 'absolute';

    chicken.style.top=chickenpositionY+"px";
    chicken.style.left=chickenpositionX-ChickNumber*60+120+"px";

    document.body.appendChild(chicken);
    chickens.push(chicken);


    if(rabbitAppear){
        chickencluck.play();
        Blinkchicken(chicken);
        RunningChick(randomNumber);
    }
}

function Blinkchicken(chicken){

    if(losepoint>3){
        return;
    }
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
        isBlinking=true;
      chicken.style.visibility = blinkCount % 2 ? 'visible' : 'hidden';
      blinkCount++;

      if (Number.isInteger(losepoint)) {
        isBlinking=false;
        chicken.style.visibility = 'visible'; // Restore visibility after blinking
        clearInterval(blinkInterval);
      }
  }, 500);
}

function RunningChick(randomNumber){

    if(losepoint>3){
        return;
    }

    stopMoving=true;
    let chickenSpeed=49;
    let stepCount=0;
    const runningchick = document.createElement("div");

    runningchick.style.width = chickenWidth+"px";
    runningchick.style.height = chickenHeight+"px";
    runningchick.style.backgroundImage = "url(images/runningchick.png)";
    
    runningchick.style.position = 'absolute';

    if(randomNumber<=2){
        runningchick.style.transform = "scaleX(-1)";
        runningchick.style.top=window.innerHeight/2+145 + "px";
        runningchick.style.left=window.innerWidth/2-275+100 + "px";}
    else{
        runningchick.style.top=window.innerHeight/2+145 + "px";
        runningchick.style.left=window.innerWidth/2+260-100-eggWidth/2 + "px";
}
    
    document.body.appendChild(runningchick);

    const step = setInterval(() =>{
    if(stepCount===3){
        stopMoving=false;
        clearInterval(step);
        runningchick.remove();
    }
    if(randomNumber<=2){
        runningchick.style.left = parseInt(runningchick.style.left) - (chickenSpeed+6) + 'px';
    }else
        runningchick.style.left = parseInt(runningchick.style.left) + chickenSpeed + 'px';
    stepCount++;
},1000);
}

let playerImg;

function update() {
    requestAnimationFrame(update);

    if(losepoint>3){
        
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    context.drawImage(playerImg, player.x, player.y, player.width, player.height);
    

    context.fillStyle="black";
    context.font="85px DS-DIGI";
    context.fillText(score, 400, 110);
}

function movePlayer(e) {
    
    if(losepoint>3){
        return;
    }


    if (e.code == "KeyA") {
        player.x = playerinitialposX; //move left <-
        wolf.style.left=wolfinitialposX+"px";
        wolf.style.transform = "scaleX(1)";
        if(player.y === playerinitialposY){
        playerImg.src = "images/down.png";
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
        }else{
        playerImg.src = "images/up.png";
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
        }

    }
    else if (e.code == "KeyD") {
        player.x = boardWidth-playerinitialposX-playerWidth;
        wolf.style.left=wolfinitialposX+wolfWidth+"px"; 
        wolf.style.transform = "scaleX(-1)";//move right ->

        if(player.y === playerinitialposY){
            playerImg.src = "images/down_flipped.png";
            context.drawImage(playerImg, player.x, player.y, player.width, player.height);
            }else{
            playerImg.src = "images/up_flipped.png";
            context.drawImage(playerImg, player.x, player.y, player.width, player.height);
            }


    }else if(e.code == "KeyW"){
        player.y = playerinitialposY-135; //up

        if(player.x === playerinitialposX){
            playerImg.src = "images/up.png";
            context.drawImage(playerImg, player.x, player.y, player.width, player.height);
            }else{
            playerImg.src = "images/up_flipped.png";
            context.drawImage(playerImg, player.x, player.y, player.width, player.height);
            }

    }else if(e.code == "KeyS"){
        player.y = playerinitialposY; //down

        if(player.x === playerinitialposX){
            playerImg.src = "images/down.png";
            context.drawImage(playerImg, player.x, player.y, player.width, player.height);
            }else{
            playerImg.src = "images/down_flipped.png";
            context.drawImage(playerImg, player.x, player.y, player.width, player.height);
            }
    }



}

function gameover(){
    losesound.play();
    const gameOverScreen = document.getElementById('game-over');
    gameOverScreen.classList.remove('hidden');
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', () => {
      gameOverScreen.classList.add('hidden');
      location.reload();
    });
}