var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6
var cloudImage;
var score=0;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var gameOver,gameoverImage
var restart,restartImage
var cactusGroup
var cloudsgroup
var checkPoint
var die
var jump
function preload(){
        
  trex_running =  loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cactus1=loadImage("obstacle1.png")
  cactus2=loadImage("obstacle2.png")
  cactus3=loadImage("obstacle3.png")
  cactus4=loadImage("obstacle4.png")
  cactus4=loadImage("obstacle5.png")
  cactus6=loadImage("obstacle6.png")
  
  cloudImage=loadImage("cloud.png")
  
  gameoverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  
  checkPoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("trexCollided",trex_collided)
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground1",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  
   gameOver=createSprite(300,90,100,50);
  gameOver.addImage("gameOver",gameoverImage);
  
   restart=createSprite(300,140,20,20);
  restart.addImage("restart",restartImage);
  
  cactusGroup=new Group();
 cloudsGroup=new Group();
  
}

function draw() {
  background(180);
  
  if(gamestate===PLAY){
    gameOver.visible=false;
    restart.visible=false;
  
  if(keyDown("space")&&trex.y>150) {
    trex.velocityY = -10;
    jump.play();
  }
  
  trex.velocityY = trex.velocityY + 0.6  
  
    ground.velocityX = -5;
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  score=score+Math.round(frameRate()/60)
  
 
  text("Score:"+score,520,30)
  
  if(trex.isTouching(cactusGroup)){
  gamestate=END
    die.play();
  }
    
}
  
  if(gamestate===END){
    gameOver.visible=true
    restart.visible=true
    ground.velocityX=0;
    cactusGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("trexCollided",trex_collided);
    trex.velocityY=0;
  }
  
  if(mousePressedOver(restart)){
      reset();
    }
  trex.collide(invisibleGround);
  drawSprites();
  obstacles();
  spawnclouds();
}

function obstacles(){
  
   if (frameCount%90===0){
       var cactus=createSprite(600,170,20,40)
        cactus.velocityX=-5
         cactus.scale=0.5
     
     var rand=Math.round(random(1,6))
     switch(rand){
       case 1: cactus.addImage("cactus1",cactus1)
              break;
       case 2: cactus.addImage("cactus2",cactus2)
               break;
       case 3: cactus.addImage("cactus3",cactus3)
               break;
       case 4: cactus.addImage("cactus4",cactus4)
               break;
       case 5: cactus.addImage("cactus5",cactus5)
               break;
       case 6: cactus.addImage("cactus6 ",cactus6)
               break;
       default:break;
       }
     cactus.addToGroup(cactusGroup);
     
  }
}  
  function spawnclouds(){
    if(frameCount%60===0){
      var clouds=createSprite(600,100,20,20)
       clouds.velocityX=-5
        clouds.addImage("cloud",cloudImage)
         clouds.depth=1
          trex.depth=clouds.depth+5
            clouds.addToGroup(cloudsGroup);
    }
  }

function reset(){
  gamestate=PLAY
  score=0;
  cactusGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running)
}
