var backGroundImg,backGround,bananaImg,obstacleImg,obstacleGrp,score,obstacles,monkey,monkeyImg,ground,survivaltime,gameState,PLAY,END,bananaGrp,bananas,monkeyImg2;

function preload(){
  backGroundImg = loadImage("jungle.jpg");
  bananaImg = loadImage("banana.png");
  monkeyImg =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacleImg = loadImage("stone.png");
  monkeyImg2=loadImage("Monkey_05.png");
}

function setup() {
  createCanvas(400, 400);
  
  backGround = createSprite(400,200);
  backGround.addImage("bg", backGroundImg);
  backGround.velocityX=-2;
  
  ground = createSprite(200,360,1200,20);
  ground.visible=false;
  
  monkey = createSprite(50,360);
  monkey.addAnimation("monkeyRunning", monkeyImg); 
  monkey.scale=0.15;
  
  bananaGrp = createGroup();
  obstacleGrp = createGroup();
  
  survivaltime=0;
  
   
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  
}

function draw() {
  background(220);
  drawSprites();  
  backGround.velocityX=-4; 
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
   if (backGround.x<0){
    backGround.x=backGround.width/2;
  }
  
   
  fill("black"); 
  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
  text("SURVIVAL TIME=" + survivaltime,170,50);   

  
  
  if (gameState === PLAY){
    if (keyDown("space") && monkey.y >= 200){
      monkey.velocityY = -12 ;
      
      
    }
    
    monkey.velocityY = monkey.velocityY + 0.35;
    monkey.collide(ground);
    if (frameCount%80===0){
      survivaltime=1+survivaltime;
    }
    
    
  
    if (obstacleGrp.isTouching(monkey)){
    monkey.scale=monkey.scale-0.0015;
    
    
  
    }
    
    if (survivaltime%1===0){
      ground.velocityX=ground.velocityX-1;
      bananaGrp.velocityX=bananaGrp.velocityX-1;
      obstacleGrp.velocityX=obstacleGrp.velocityX-1;
      
    }
    
    if (bananaGrp.isTouching(monkey)){
   bananas.destroy();
   monkey.scale=monkey.scale+0.0002;
   
    } 
    
    if (monkey.scale<=0.0839){
    gameState=END;
  }
  
  
  banana();
  obstacle();
  }
  
  
  
  if (gameState===END){
    bananaGrp.destroyEach();
    obstacleGrp.destroyEach();
    obstacleGrp.setVelocityXEach(0);
    ground.velocityX=0;
    monkey.velocityY=0;
    backGround.velocityX=0;
    fill("yellow");
    textSize(40);
    textFont("georgia");
    text("GAMEOVER",80,195);
    textSize(25);
    text("Monkey has no energy",65,215);
    monkey.destroy();
    survivaltime=survivaltime;
    obstacleGrp.setLifetimeEach(-1);
    bananaGrp.setLifetimeEach(-1);
    bananaGrp.setVelocityXEach(0);
   
  }
  
    
  
}

function banana(){
  if (World.frameCount%80===0){
    bananas = createSprite(399,random(120,200));
    bananas.addImage(bananaImg);
    bananas.scale=0.05;
    bananas.velocityX=-4;
    bananas.lifetime=100;
    bananaGrp.add(bananas);
   
   
  }
}

function obstacle(){
  if (World.frameCount%300===0){
    obstacles = createSprite(400,355);
    obstacles.addImage(obstacleImg);
    obstacles.scale = 0.1;
    obstacles.velocityX=-5;
    obstacles.lifetime=80;
    obstacleGrp.add(obstacles);

   
  }



  

}