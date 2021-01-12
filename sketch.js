var sword,sword_image;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var score = 0;
var fruitsGroup,enemyGroup;
var fruit,fruit1,fruit2,fruit3,fruit4;
var alien1,alien2;
var destroySound,gameOverSound;


function preload(){
  
  //loading required animations for all the sprites
  sword_image = loadImage("sword.png");
  gameover = loadImage("gameover.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png"); 
  fruit3 = loadImage("fruit3.png"); 
  fruit4 = loadImage("fruit4.png"); 
  alien = loadAnimation("alien1.png","alien2.png");
  destroySound = loadSound("knifeSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
  
}

function setup(){
  
  //creating the canvas
  createCanvas(400,400);
  
  //creating a sword and adding animation to it
  sword = createSprite(50,200,10,10);
  sword.addImage(sword_image);  
  sword.scale = 0.5;
  
  //creating fruit and enemy groups
  fruitsGroup = new Group();
  enemyGroup = new Group();
 
}

function draw(){
  
  background(255); 
  
  //showing score 
  textSize (20);
  text("Score: " + score,200,20);
  
  //calling the function
  fruits();
  
  //calling the function
  enemies();
 
  //keeping the gamestate as play
  if(gameState === PLAY){
    //moving the sword with the mouse's position
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
    //increasing the score on touching the fruits,destroy them and add the destroy sound
    if(sword.isTouching(fruitsGroup)){
      fruitsGroup.destroyEach();
      score = score+1;
      destroySound.play();
    }

    //changing the gamestate to end on touching the enemies and adding the gameover sound
    if(sword.isTouching(enemyGroup)){
      gameState = END;
      gameoverSound.play();
    }    
  }
  
  //changing the gamestate to end
  else if(gameState === END){   
    enemyGroup.destroyEach();
    fruitsGroup.destroyEach();
    enemyGroup.setVelocityXEach(0);
    fruitsGroup.setVelocityXEach(0);
    sword.addImage(gameover);
    sword.x = 200;
    sword.y = 200;   
  }
  
  //drawing the sprites
  drawSprites(); 
  
}

//making a function fruits 
function fruits(){
  
  //creating a sprite if framecount is divisible by 60 
  if(frameCount % 60 === 0){
    //creating the sprite and lifetime
    fruit =             createSprite(400,Math.round(random(40,370)),10,10);
    fruit.lifetime = 100;
    fruit.scale = 0.125;
    
  //adding a image to fruit as per random numbers
    var select_number = Math.round(random(1,4));
    if(select_number === 1){
      fruit.addImage(fruit1);
    }    
    else if(select_number === 2){
      fruit.addImage(fruit2);
    }    
    else if(select_number === 3){
      fruit.addImage(fruit3);
    }    
    else if(select_number === 4){
      fruit.addImage(fruit4);
    }
    
    // to randomly choose the side from where the fruit should come
    var leftside_rightside = Math.round(random(1,2));
  if(leftside_rightside === 1){
    fruit.velocityX = -4;
    fruit.x = 400;
  }
  
  else if(leftside_rightside === 2){
    fruit.velocityX = 4;
    fruit.x = 0;
  }
    
    //to increse the speed of the game as the score increases
    if(leftside_rightside === 1){
        fruit.velocityX = -(4 + 5* score/10);
      }
  
    if(leftside_rightside === 2){
      fruit.velocityX = (4 + 5* score/10);
    }
    
    //adding fruit to fruitsgroup
    fruitsGroup.add(fruit);
  }  
}

//making a function enemies
function enemies(){
  
  //creating a sprite if framecount is divisible by 200 
  if (frameCount % 200 === 0){
    //creating the sprite and giving it velocity and lifetime
    enemy = createSprite(400,Math.round(random(40,370)),10,10)
    enemy.velocityX = -4;    
    enemy.lifetime = 100;
    enemy.addAnimation("alienAnimation",alien);   
    
  // to randomly choose the side from where the enemy should come
    var left_right = Math.round(random(1,2));
  if(left_right === 1){
    enemy.velocityX = -4;
    enemy.x = 400;
  }
  
  else if(left_right === 2){
    enemy.velocityX = 4;
    enemy.x = 0;
  }
    
    // to increase the speed of the game as the score increases
    if(left_right === 1){
        enemy.velocityX = -(4 + 4* score/10);
      }
  
    if(left_right === 2){
      enemy.velocityX = (4 + 4* score/10);
    }
    
    //adding enemy to enemygroup
    enemyGroup.add(enemy);
  }
  
}