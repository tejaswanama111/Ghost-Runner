var gameState= "play";

var ghost, ghost_image;
var door, door_image, doorGroup;
var climber, climber_image, climberGroup;
var spookySound;
var invisible, invisibleGroup;
var tower, tower_image;

function preload() {

  tower_image = loadImage("tower.png");
  ghost_image = loadImage("ghost-standing.png");
  door_image = loadImage("door.png");
  climber_image = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup() {
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage(tower_image);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghost_image);
  ghost.scale = 0.3;

  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}

function draw() {
  background(0);
  
  if(gameState === "play") {
  if(keyDown("space")) {
    ghost.velocityY = -5;
    }
  
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x -3;
  }
  
   
  if(keyDown("right_arrow")) {
    ghost.x = ghost.x +3;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(tower.y >400) {
    tower.y = 300;
  }
  
  spawnDoors();
  }
  
  drawSprites();
  
   if(invisibleGroup.isTouching(ghost) || ghost.y >  600) {
   
     ghost.destroy();
     gameState = "end";
    }
  
  if(climberGroup.isTouching(ghost)) {
    
    ghost.velocityY = 0;
  }
  
  if(gameState=== "end") {
     
     tower.destroy();
     doorGroup.destroyEach();
     invisibleGroup.destroyEach();
     climberGroup.destroyEach();
    
    
     stroke("yellow");
     fill("yellow");
     textSize(30);
     text("Game Over", 200, 300);
    }
}

function spawnDoors()  {
 if(frameCount %240 === 0) {
   
   door = createSprite(200, -50);
   door.addImage(door_image);
   door.x = Math.round(random(120,400));
   door.velocityY = 1;
   door.lifetime = 800;
   
   ghost.depth = door.depth +1;
   
   climber = createSprite(200, 10);
   climber.addImage(climber_image);
   climber.velocityY = 1;
   climber.lifetime = 800;
   climber.x = door.x;
   
   invisible = createSprite(200,15);
   invisible.width = climber.width;
   invisible.velocityY = 1;
   invisible.height = 2;
   invisible.x = door.x;
   invisible.debug = true;
   
   doorGroup.add(door);
   climberGroup.add(climber);
   invisibleGroup.add(invisible);
 }
}