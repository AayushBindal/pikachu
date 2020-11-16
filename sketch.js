var PLAY = 1;
var END  = 0;
var gameState = PLAY;

var three;
var three1;
var two;
var two2;
var one ;
var one1;
var go;
var gogo;

var ground;
var ground2 , invisibleGround;

var pi1;
var pi2;
var pi3;

var obstacles;
var obstacle1, obstacle2, obstacle3 , obstacle4 , obstacle5 , obstacle6 , obstacle7 , obstacle8 , obstacle9 , obstacle10 , obstacle11 ,obstacle12 , obstacle13 , obstacle14
var obstacleGroup;

var cloud;
var cloud1;

var gameOver;
var gameover;

var soundJump;
var soundCentuary;
var soundOver;
var soundTrue;

var reset;
var resetImage;

var pause;
var pauseImage;

var pause;
var pause2;

var score = 0;

function preload() {
  ground = loadImage("ground2.png");
 
  obstacle1 = loadImage("dragon.png");
  obstacle2 = loadImage("leaf.png");
  obstacle3 = loadImage("blue.png");
  obstacle4 = loadImage("gar.png");
  obstacle5 = loadImage("ob5.png");
  obstacle6 = loadImage("leaf2.png");
  obstacle7 = loadImage("fire.png");
  obstacle8 = loadImage("bee.png");
  obstacle9 = loadImage("ewe.png");
  obstacle10 = loadImage("bb.png")
  obstacle11 = loadImage("mew.png");
  obstacle12 = loadImage("drg.png");
  obstacle13 = loadImage("image.png");
  obstacle14 = loadImage("fly.png");
  
  gameOver = loadImage("gameOver.png");
  
  reset = loadImage("reset.png");
  
  pi1 = loadAnimation("pi3.png","pi4.png","pi2.png");
  pi3 = loadImage("poped.png");
  
  cloud = loadImage("clouds.png");
  
  soundJump = loadSound("space.wav");
  soundCentuary = loadSound("cent.wav");
  soundover = loadSound("gameover.wav");
  soundTrue = loadSound("true.mp3");

  one1 = loadImage("1.png");
  two2 = loadImage("2.png");
  three3 = loadImage("3.png");
  gogo = loadImage("go.png");

  pauseImage = loadImage("pause.png");

}
function setup() {
  createCanvas(windowWidth-40,windowHeight-40);
  
  ground2 = createSprite(0,windowHeight/2+100,1000,10);
  ground2.addImage("ground",ground);
  
  
  pi2 = createSprite(windowWidth-1425,windowHeight/2+100,20,20);
  pi2.addAnimation("ani",pi1);
  pi2.addAnimation("collided",pi3);
  pi3.scale = 0.100;
  pi2.scale = 0.15;
  
  reset2 = createSprite(windowWidth/2,windowHeight/2);
  reset2.addImage("reset",reset);
  reset2.scale = 0.6;    
  
  gameover = createSprite(windowWidth/2,windowHeight/2-100);
  gameover.addImage("gameover",gameOver);
  gameover.scale = 0.6;

  pause = createSprite(windowWidth/2-50,windowHeight-100);
  pause.addImage("pauseImage",pauseImage);
  pause.scale = 0.3;
  
  invisibleGround = createSprite(windowWidth-1425,windowHeight/2+100,100,1)
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
}
function draw() {
  
  if(ground2.x < 250) {
     ground2.x = ground2.width/2;
     }
  
  if(gameState === PLAY){
     background("orange");
      
    reset2.visible = false;
    gameover.visible = false;
    
  stroke("yellow");
  textSize(18);
  fill("gold");
  text("score: "+score,10,19);
    
    if(keyDown("space") && pi2.collide(invisibleGround)) {
     pi2.velocityY = -14;
     soundJump.play();
     }

     if(mousePressedOver(pause)|| keyDown("p")){
        obstacleGroup.setVelocityXEach(0);
        cloud1.velocityX = 0;
        obstacleGroup.setLifetimeEach(-1);
     }
       
   ground2.velocityX = -4;

   //add gravity
   pi2.velocityY = pi2.velocityY + 0.4;
    
    if(score%1000 === 0 && score>0){
       soundCentuary.play();
       }
    
   obstacle();
   clouds();
    
   score = score +Math.round(getFrameRate()/60);
    
   if(pi2.isTouching(obstacleGroup)){
     soundover.play();
     gameState = END;
   }
  }

 else if(gameState === END) {
    
    background("red");
    
    pause.destroy();

    textSize(25);
    text("score: "+score,windowWidth/2-50,windowHeight-410);   
    
    reset2.visible = true;
    gameover.visible = true;
   
    ground2.velocityX = 0;
    
    pi2.velocityX = 0;
    pi2.velocityY = 0;
    
    pi2.changeAnimation("collided",pi3);
 
    obstacleGroup.setVelocityXEach(0);
    cloud1.velocityX = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(reset2) || keyDown("space")){
       restart();
    }
     }
  
  pi2.collide(invisibleGround);
  drawSprites();
}

function obstacle() {
  if(frameCount % 89 === 0){
    obstacles = createSprite(windowWidth,windowHeight/2+70,103,10);
    obstacles.velocityX = -(4 +score/200);
    var rand =  Math.round(random(1,14));
    switch(rand){
      case 1: obstacles.addImage(obstacle1);
              break;
      case 2: obstacles.addImage(obstacle2);
              break;   
      case 3: obstacles.addImage(obstacle3);   
              break;
      case 4: obstacles.addImage(obstacle4);   
              break;
      case 5: obstacles.addImage(obstacle5);   
              break;
      case 6: obstacles.addImage(obstacle6);   
              break;        
      case 7: obstacles.addImage(obstacle7);   
              break;        
      case 8: obstacles.addImage(obstacle8);   
              break;       
      case 9: obstacles.addImage(obstacle9);   
              break;       
      case 10: obstacles.addImage(obstacle10);
              break;          
      case 11: obstacles.addImage(obstacle11);   
              break;         
      case 12: obstacles.addImage(obstacle12);
              break;
      case 13: obstacles.addImage(obstacle13);   
              break;  
      case 14: obstacles.addImage(obstacle14);
      break;
      default: break;
    }   
     obstacles.scale = 0.3;
     obstacles.lifetime = 340;
     obstacleGroup.add(obstacles);
     obstacles.setCollider("rectangle",0,0,188,188);
    }
    }

   function clouds(){
     if(frameCount % 100 === 0){
       cloud1 = createSprite(windowWidth,200,10,10);
       cloud1.y = Math.round(random(30,100));
       cloud1.addImage("clouds",cloud);
       cloud1.lifetime = 340;
       cloud1.depth = pi2.depth +1;
       cloud1.scale = 0.3;
       cloud1.velocityX = -(4+ score/100);
     }
   }

    function restart(){
     gameState = PLAY;
     pause = createSprite(windowWidth/2-50,windowHeight-100);
     pause.addImage("pauseImage",pauseImage);
     pause.scale = 0.3;
     gameover.visible = false;
     cloud1.destroy();
     obstacleGroup.destroyEach();
     score = 0;
     pi2.changeAnimation("ani",pi1);
    }