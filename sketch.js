// let ball;

// function setup() {
// 	new Canvas(500, 500);

// 	ball = new Sprite();
// 	ball.diameter = 50;
// }

// function draw() {
// 	background('gray');
// }

let player;

function setup() {
  new Canvas(windowWidth-50, windowHeight-50);
}

function draw() {
  background(220);

    fill(0);
    spriteSpawn();
    spriteMove();
  }


function spriteSpawn() {
  if (mouse.presses()) {
    player = new Sprite(mouse.x, mouse.y, 30, 30)
    player.vel.x = 0;
    player.vel.y = 0;
  }
}

function spriteMove() {

    if(kb.pressing("w")) player.vel.y = -1;
    if(kb.pressing("a")) player.vel.x = -1;
    if(kb.pressing("s")) player.vel.y = 1;
    if(kb.pressing("d")) player.vel.x = 1;
  }

// function incrementSpeed() {
//   let speedVarX = 0;
//   let speedVarY = 0;
//   if speedVarX <=5 {

//   }
  
//   speedVarX

//   speedVarY
// }