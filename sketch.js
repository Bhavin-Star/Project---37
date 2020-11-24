var trex_r, trex_c, trex, trex2, trex2image, trex2g,
ground,ground2, ground_i, ground_s,
score, gamestate,  
gameover, gameoveri, 
restart1, restarti, 
sound1, sound2, sound3, s1, s2, s3 ;

var cloudsgroup, cloudimage, obstaclesgroup, o1, o2, o3, o4, o5, o6;

function preload(){
  
  trex_r = loadAnimation('images/trex1.png', 'images/trex3.png', 'images/trex4.png');
  trex_c = loadAnimation('images/trex_collided.png');
  ground_s = loadImage('images/ground2.png');
  
  cloudimage = loadImage('images/cloud.png');
  o1 = loadImage('images/obstacle1.png');
  o2 = loadImage('images/obstacle2.png');
  o3 = loadImage('images/obstacle3.png');
  o4 = loadImage('images/obstacle4.png');
  o5 = loadImage('images/obstacle5.png');
  o6 = loadImage('images/obstacle6.png');
  
  gameoveri = loadImage('images/gameOver.png');
  restarti = loadImage('images/restart.png');

  s1 = loadSound('sound/jump.mp3');
  s2 = loadSound("sound/checkPoint.mp3");
  s3 = loadSound('sound/die.mp3');

}

function setup() {
  createCanvas(displayWidth,displayHeight-115);
  
  camera.position.x = width/2;
  camera.position.y = height/2
  
  trex = createSprite(displayWidth/2-650,displayHeight-200,50,50);
  trex.addAnimation('running',trex_r);
  trex.addAnimation("collided",trex_c);
  trex.scale = 0.5;
  
  ground = createSprite(displayWidth/2,displayHeight-200,displayWidth*2,10);
  ground.addImage('ground',ground_s);
  
  ground_i = createSprite(displayWidth/2,displayHeight-195,displayWidth*2,10);
  ground_i.visible = false;
  
  cloudsgroup = new Group();
  obstaclesgroup = new Group();
  console.log(mouseY)
  score = 0;
  gamestate = 'play'
  
  gameover = createSprite(displayWidth/2,70,75,75); 
  gameover.addImage(gameoveri);
  gameover.scale = 0.5;
  
  restart1 = createSprite(displayWidth/2,120,50,50);
  restart1.addImage(restarti);
  restart1.scale = 0.5;
  
}

function draw() {
  background(180);
  
if (gamestate == 'play'){
  
  restart1.visible = false;
  gameover.visible = false;

  
  ground.velocityX = -5;
  

  score = score + Math.round(getFrameRate()/60);
  textSize(18)
  fill('black');
  text ("Score: " + score, 50,50);  
   
  trex.collide(ground_i);
  
    
  if (keyDown('space') && (trex.y >= displayHeight-235)){
  trex.velocityY = -15;
  s1.play();

  }
  trex.velocityY = trex.velocityY + 1;
 
   if (ground.x < displayWidth/2-300){
   ground.x = displayWidth/2; 
  }

  
  }

  if (trex.isTouching(obstaclesgroup)){
    gamestate = 'end';
    
  }
  
  spawnClouds();
  spawnobstacles();

  if (gamestate == 'end'){

   trex.velocityY = 0;
   obstaclesgroup.destroyEach(-1);
   cloudsgroup.destroyEach();
   ground.velocityX = 0;
 
 trex.changeAnimation('collided', trex_c);
    
  if (mousePressedOver(restart1)){
    restart();
  }
   
    restart1.visible = true;
    gameover.visible = true;
  }
  
  drawSprites();
    
  if (gamestate == 'end'){
          
    textSize(18);
    fill('black');
    text ('Your Score: ' +score, 50, 50);
  }
  //console.log(mouseY)
  
}
function spawnobstacles(){

  if(World.frameCount % 50 === 0){
      var cactus = createSprite(displayWidth, displayHeight-195-25, 50, 50);
      cactus.velocityX = -7;
      
      // add random obstacles
      var rand = Math.round(random(1,6));
      
    switch(rand){
    case 1: cactus.addImage(o1);
    break;
    
    case 2: cactus.addImage(o2);
    break;
    
    case 3: cactus.addImage(o3);
    break;
    
    case 4: cactus.addImage(o4);
    break;
    
    case 5: cactus.addImage(o5);
    break;
    
    case 6: cactus.addImage(o6);
    break;
   }
      cactus.scale = 0.5;
      cactus.lifetime = 300;
      obstaclesgroup.add(cactus);
      obstaclesgroup.collide(ground_i);

  }
  }

function spawnClouds() {
  
  // To spawn the clouds after every 60th frame
 if (World.frameCount %  60 === 0 ){
      var cloud = createSprite(displayWidth,displayHeight-350,670,100,100);
      cloud.velocityX = -5;
      cloud.addImage(cloudimage);
      
      cloud.scale = 0.7;
     
     // To make clouds appear at random heights and add lifetime to it
      
      cloud.lifetime = 200;
  
    // To adjust Trex's depth
      trex.depth = cloud.depth + 1;
      cloudsgroup.add(cloud); 
      
}
}
function restart(){

  gamestate = 'play'
  score = 0;
  trex.visible = true;
  trex.changeAnimation('running',trex_r);

}



