var boy, boyImg
var werewolf,werewolfImg, vampire, vampireImg, zombie,zombieImg
var  castle,castleImg
var coins,obstacles
var gameOver, gameOverImg
var lives , liveImg
var coinsGroup,obstaclesGroup
var restart, restartImg

var PLAY = 1;
var END = 0;
var gameState = PLAY;

 var score=0;
var life = 3;

function preload(){

  boyImg = loadImage("sprites/boy.png");
  werewolf = loadImage("sprites/werewolf.png");
  vampire = loadImage("sprites/vampire.png");
  zombie = loadImage("sprites/zombie.png");
  castleImg = loadImage("sprites/castle.jpeg")
  coinImg = loadImage("sprites/coin.png");
  gameOverImg = loadImage("sprites/game over.jpg");
  liveImg = loadImage("sprites/lives.png");
  restartImg = loadImage("sprites/restart.jpg")
  spookySound = loadSound("sprites/wolf-howling-140235.mp3 ")
}

 function setup(){
 
  canvas = createCanvas(windowWidth, windowHeight);

  castle = createSprite(width/2, 0, windowWidth, windowHeight);
  castle.addImage(castleImg);
  castle.scale = 3;
  castle.velocityX = -2;

  live1 = createSprite(width/4-350,50,10,10);
  live1.addImage(liveImg);
  live1.scale = 0.2;

  live2 = createSprite(width/4-300,50,10,10);
  live2.addImage(liveImg);
  live2.scale = 0.2;

  live3 = createSprite(width/4-250,50,10,10);
  live3.addImage(liveImg);
  live3.scale = 0.2;
  
  boy = createSprite(50,windowHeight-165, 50, 50);
  boy.addImage(boyImg);

  ground = createSprite(windowWidth/2, windowHeight-50, windowWidth, 20)
  
  gameOver = createSprite(220,200)
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;

  restart = createSprite(260,200)
  restart.addImage(restartImg);
  restart.scale = 0.2;
  
   coinsGroup = new Group();
   obstaclesGroup = new Group();
 }

function draw(){

    background("black");

    fill("red");
    textSize(20)
    text("Score:"+score, windowWidth-200,40)
 
    if(gameState == PLAY){

      gameOver.visible = false;
      restart.visible = false;
      ground.visible = false;

      if(keyDown("space") ){
        boy.velocityX = 5;
      }
      if(keyDown(UP_ARROW ) && boy.y>= 100){
        boy.velocityY = -6 ;
       console.log(boy.y);
      }
      if(castle.x<50 ){
        castle.x = 450
      }
    
      boy.velocityY = boy.velocityY+0.8
      boy.collide(ground);
    
      spawnCoins();
     spawnObstacles();

     if(boy.isTouching(coinsGroup)){
      
      for (let i = 0; i < coinsGroup.length; i++) {
       if (coinsGroup[i].isTouching(boy)) {
        coinsGroup[i].destroy();
        score = score +10
       }
      }
     
    }
  
    if(boy.isTouching(obstaclesGroup)){
      
      for (let i = 0; i < obstaclesGroup.length; i++) {
        if (obstaclesGroup[i].isTouching(boy)) {
         obstaclesGroup[i].destroy();
         life = life -1;
         console.log(life);
        }
      }
      
    }
     
    if (life ===2) {
      live3.remove();
    }
    if (life ===1) {
      live2.remove();
    }
    if (life ===0) {
      live1.remove();
      gameState == END;
    }
  }


  if (gameState == END) {
    
    obstaclesGroup.destroyEach();
    coinsGroup.destroyEach();

    boy.velocityX = 0;
    boy.velocityY = 0;

    gameOver.visible = "true";
    restart.visible = "true";
    
      if(mousePressedOver(restart)) 
          {
                reset();
          }

  }
    
  
 
  
  

    drawSprites();
}

function spawnCoins(){

  if(World.frameCount % 100 === 0) {
    coins = createSprite(windowWidth,windowHeight/2+180,40,50);
    coins.addImage(coinImg);
    coins.scale = 0.4;
    coins.velocityX = -4;
    coinsGroup.add(coins);
    coins.debug = true;
  }
}

function spawnObstacles(){
  
  if(World.frameCount % 130 === 0) {
    obstacles = createSprite(random(windowWidth/4,windowWidth/2), random(windowHeight-165,windowHeight/2), 40,50);
    obstacles.setCollider("circle",0,0,50)
    obstacles.debug = true;
  
    var rand = Math.round(random(1,3));
 switch(rand) {
  case 1: obstacles.addImage(werewolf);
          break;
  case 2: obstacles.addImage(vampire);
          break;
  case 3: obstacles.addImage(zombie);
          break;
  default: break;
}

obstacles.lifetime = 120;
boy.depth = obstacles.depth;
boy.depth = boy.depth+1;

obstaclesGroup.add(obstacles);
}
 
 function reset() {
  
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
}
  
}


