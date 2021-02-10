const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 0;
var END = 1;
var SERVE = 2;
var WIN = 3;
var gameState = SERVE;
var world,engine;
var fuel,fuel1;
var no1,no2,fuelgroup;

function preload(){

  ground1=loadImage("Textures.png");
  ground2=loadImage("Blue.png");
  ground5=loadImage("User.png");
  ground6=loadImage("load 14.png");

  ground7=loadImage("We.png");
  fu=loadImage("Capture2.png");
  fu0=loadImage("Capture5.png");
  fu9=loadImage("Capture0.png");

  fuel2=loadImage("Fuel can.png");
  fue2=loadImage("load 8.png");
  fue3=loadImage("load 9.png");
  fue4=loadImage("load 10.png");
  fue5=loadImage("load 11.png");
  fue6=loadImage("load 12.png");
}

function setup() {
	createCanvas(2000, 550);
	engine = Engine.create();
  world = engine.world;

  fuel = 100;

  groundObject = new ground(1000,600,1700,400);

  no9=createSprite(1000,500,3400,10);
  no9.visible=false;

  no10=createSprite(0,500,250,80);
  no10.visible=false;

  n1 = createSprite(1000,470,2000,150);
  n1.visible=false;
  
  no0 = createSprite(400,60,20,20);
  no0.addImage("it", fuel2);
  no0.scale = 0.4;
  no0.visible=false;

  no2=createSprite(0,300,170,100);
  no2.visible=false;
  no3=createSprite(0,300,30,80);
  no3.visible=false;

  nop = createSprite(1300,450,10,10);
  nop.addImage("it", ground5);
  nop.scale = 1.5;
  nop.visible=false;

  no11 = createSprite(1320,560,10,10);
  no11.addImage("it", ground6);
  no11.scale = 1;
  no11.visible=false;

  no12 = createSprite(1000,50,10,10);
  no12.addImage("it", ground7);
  no12.scale = 0.3;
  no12.visible=false;

  army1 = new soldier(1700,400,300,250);
  army2 = new truck(250,400,250,200);

  fuelgroup=new Group();

	Engine.run(engine);

}

function draw() {

  background(225);
  Engine.update(engine);

  if (gameState===SERVE){

   background(0);

   nop.visible=true;
   no11.visible=true;

    textSize(40);
    fill(11, 225, 255);
    textFont('Roboto');
    text("Press LEFT key to move Left",100,100);
    text("Press RIGHT key to move Right",100,200);

    text("You have to push Your opponent so that He can fall",100,300);
    text("There will be a limit for the fuel so collect it.",100,400);
    text("Press The PLAY Button to start.",100,500);

    if(mousePressedOver(nop)){
      
      gameState=PLAY;

    }

  }
  else if(gameState===PLAY){

    nop.visible = false;
    no11.visible = false;
    no0.visible = true;

    no2.x=army2.body.position.x-20
    no2.y=army2.body.position.y+35

    no3.x=army2.body.position.x+90
    no3.y=army2.body.position.y+60

    no10.x=army1.body.position.x-50
    no10.y=army1.body.position.y+60

    army2.display();
    army1.display();
    groundObject.display();

    image(ground2,0,450,500,150);
    image(ground2,500,450,500,150);
    image(ground2,1000,450,500,150);
    image(ground2,1500,450,500,150);
    image(ground2,2000,450,500,150);
    image(ground2,2500,450,500,150);

    image(ground1,150,400,200,30);
    image(ground1,345,400,200,30);
    image(ground1,540,400,200,30);
    image(ground1,735,400,200,30);
    image(ground1,930,400,200,30);
    image(ground1,1120,400,150,30);

    image(ground1,1260,400,150,30);
    image(ground1,1405,400,150,30);
    image(ground1,1550,400,150,30);
    image(ground1,1695,400,150,30);

   Matter.Body.setVelocity(army1.body,{x:-5,y:0});

    if (no3.isTouching(fuelgroup)||no2.isTouching(fuelgroup)){

      fuel=100;
      fuelgroup.destroyEach();

    }

    if (no2.isTouching(no9)){

      gameState=END;

    }

    if (no10.isTouching(n1)){

      Matter.Body.setVelocity(army1.body,{x:0,y:0});

    }

    if (no10.isTouching(no9)){

      gameState=WIN;

    }

    if (keyDown("RIGHT")&&fuel>0){
      
      Matter.Body.setVelocity(army2.body,{x:+10,y:0});
      fuel-=0.8;

      }
      
    if (keyDown("LEFT") && fuel>0){
        Matter.Body.setVelocity(army2.body,{x:-6,y:0});
        fuel-=0.8;
        }

    if(fuel<=100){

      image(fue2,200,-300,600,650);

    }
    if(fuel<80){

      image(fue3,200,-300,600,650);

    }
     if(fuel<60){

      image(fue4,200,-300,600,650);

    }

    if(fuel<40 ){

      image(fue5,200,-300,600,650);

    }

    if(fuel<=0){

      image(fue6,200,-300,600,650);

    }
    if (frameCount % 200 === 0){

      no12.visible=true;

    }

    if (no12.visible===true){

      textSize(20);
      fill(139,37,35);
      textFont('Georgia');
      text("Press SPACE to Sprint",900,150);

    }

    if (keyDown("SPACE") && no12.visible===true){

      Matter.Body.setVelocity(army2.body,{x:150,y:0});
      Matter.Body.setVelocity(army1.body,{x:150,y:0});
      no12.visible = false;

    }

        if (frameCount % 90 === 0 && fuel<=100){
          no1=createSprite(random(100,1750),0,20,20);
          no1.addImage("sprite2", fuel2);
          no1.scale = 0.5;
          no1.velocityY = 10;
          no1.lifetime = 50;
          no1.setCollider("rectangle",20,-80,100,100);
          fuelgroup.add(no1);
        }

  }else if(gameState===WIN){

    background(0)
    no0.visible=false;
    no1.visible=false;
    no12.visible = false;
    image(fu9,500,150,300,150);

    textSize(40);
    fill(232, 255, 135);
    textFont('Georgia');
    text("Do You Wonna play Again?",100,450);

    textSize(40);
    fill(111, 255, 135);
    textFont('Georgia');
    text("Just Press CTRL and R.",100,500);

  }else if(gameState===END){

    background(0);

    no0.visible=false;
    no1.visible=false;
    no12.visible = false;

    textSize(40);
    fill("red");
    textFont('Helvetica');
    text("OH NO YOU FAILED NO PROBLEM",100,400);

    textSize(40);
    fill(232, 255, 135);
    textFont('Georgia');
    text("YOU CAN TRY AGAIN",100,450);

    textSize(40);
    fill(232, 255, 135);
    textFont('Georgia');
    text("Just Press CTRL and R.",100,500);

    image(fu0,500,150,200,100);

  }

drawSprites();

}