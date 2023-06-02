var boy, boyImg
var werewolf, werewolfImg, vampire, vampireImg, zombie, zombieImg
var castle, castleImg
var coins, obstacles
var gameOver, gameOverImg
var lives, liveImg
var coinsGroup, obstaclesGroup
var restart, restartImg

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var life = 3;

function preload() {

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
  spookySound2 = loadSound("sprites/zombie-growl-3-6863.mp3 ")
}

function setup() {

  canvas = createCanvas(displayWidth, displayHeight);

  castle = createSprite(width / 2,height/2 , displayWidth, displayHeight);
  castle.addImage(castleImg);
  castle.scale = 2;
  castle.velocityX = -2;

  live1 = createSprite(width / 4 - 350, 50, 10, 10);
  live1.addImage(liveImg);
  live1.scale = 0.2;

  live2 = createSprite(width / 4 - 300, 50, 10, 10);
  live2.addImage(liveImg);
  live2.scale = 0.2;

  live3 = createSprite(width / 4 - 250, 50, 10, 10);
  live3.addImage(liveImg);
  live3.scale = 0.2;

  boy = createSprite(50, windowHeight - 178, 50, 50);
  boy.addImage(boyImg);
  

  ground = createSprite(width / 2, height-30, width, 20)
  ground.visible = false;

  gameOver = createSprite(500, 400)
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.4;

  restart = createSprite(700, 400)
  restart.addImage(restartImg);
  restart.visible = false;
  restart.scale = 0.1;

  coinsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {

  background(600,800);

  fill("red");
  textSize(20)
  text("Score:" + score, windowWidth - 200, 40)

  if (gameState == PLAY) {

    if (castle.x < 500) {
      castle.x = width/2
    }

    console.log(boy.x);

    if (keyWentDown("space") && boy.x< width-100) {
      boy.velocityX = 5;
    }

    if(keyWentUp("space")){
      boy.velocityX = 0;
    }

    if (keyDown(UP_ARROW) && boy.y >= 100) {
      boy.velocityY = -6;
      console.log(boy.y);
    }

    boy.velocityY = boy.velocityY + 2
    boy.collide(ground);

    spawnCoins();
    spawnObstacles();

    if (boy.isTouching(coinsGroup)) {

      for (let i = 0; i < coinsGroup.length; i++) {
        if (coinsGroup[i].isTouching(boy)) {
          coinsGroup[i].destroy();
          score = score + 10
        }
      }

    }

    if (boy.isTouching(obstaclesGroup)) {

      for (let i = 0; i < obstaclesGroup.length; i++) {
        if (obstaclesGroup[i].isTouching(boy)) {
          obstaclesGroup[i].destroy();
          life = life - 1;
          console.log(life);
        }
      }

    }

    if (life === 2) {
      live3.remove();
    }
    if (life === 1) {
      live2.remove();
    }
    if (life === 0) {
      live1.remove();
      gameState = END;
    }
  }


  if (gameState == END) {

    obstaclesGroup.destroyEach();
    coinsGroup.destroyEach();

    boy.velocityX = 0;
    boy.velocityY = 0;

    gameOver.visible = "true";
    restart.visible = "true";

    castle.velocityX = 0;

    if (mousePressedOver(restart)) {
      reset();
    }

  }

  
  drawSprites();
}

function spawnCoins() {

  if (World.frameCount % 100 === 0) {
    coins = createSprite(windowWidth, windowHeight / 2 + 180, 40, 50);
    coins.addImage(coinImg);
    coins.scale = 0.4;
    coins.velocityX = -4;
    coinsGroup.add(coins);
    coins.debug = true;
  }
}

function spawnObstacles() {

  if (World.frameCount % 70 === 0) {
    obstacles = createSprite(random(windowWidth / 4, windowWidth / 2), random(windowHeight - 165, windowHeight / 2), 40, 50);
    obstacles.setCollider("circle", 0, 0, 50)
    obstacles.debug = true;
   
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: obstacles.addImage(werewolf);
      spookySound.play();
      break;
      case 2: obstacles.addImage(vampire);
      break;
      case 3: obstacles.addImage(zombie);
      spookySound2.play();
      break;
      default: break;
    }

    obstacles.lifetime = 70;
    boy.depth = obstacles.depth;
    boy.depth = boy.depth + 1;
   
    obstaclesGroup.add(obstacles);
  }

  function reset () {

    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
  }

}


