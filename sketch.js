var dogImg, happyDogImg, dog, database, foodS, foodStock, button1, button2, fedTime, lastFed;
var foodObj, gameState, state, bedroom, garden, washroom, sadDog;
var currentTime;

function preload()
{
	dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happy dog.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  sadDog = loadImage("images/Lazy.png");
}

function setup() {
	createCanvas(700, 700);
  database = firebase.database();
  dog = createSprite(600,200);
  dog.addImage("dog", dogImg);
  dog.scale = 0.15;
  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  feed = createButton("feed the dog");
  feed.position(890,65);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800, 65);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

  readState = database.ref("gameState");
  readState.on("value", function(data){
    gameState=data.val;
  });
}


function draw() { 
  background("green");
  foodObj.display();

  fedTime= database.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("last fed : " + lastFed%12 + "PM", 150, 30)
  }
  else if(lastFed==0){
    text("last fed: 12 AM", 150, 30);
  }
  else{
    text("last fed: " + lastFed + "AM", 150, 30);
  }

  if(gameState=="hungry"){
    feed.show();
    addFood.show();
    dog.addImage("sad", sadDog);
   
  }
  else{
    feed.hide();
    addFood.hide();
    dog.remove();
  }

  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("bathing");
    foodObj.washroom();
  }
  else{
      update("hungry")
      foodObj.display();
    }

//text("currentTime", 220, 200);

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}
