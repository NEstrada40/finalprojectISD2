let player; // Player Sprite Variable
let speedDrift = 0.05; // Variable for slowing to a stop after being in movement
let maxSpeed = 3;
let spawnTimer = 0;
let enemies;
let floors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerSpawn();
  floors = new Group(); // Create a group for floors
  floorSpawn(windowWidth / 2, windowHeight / 2 + 50, windowWidth, 40, 'static');
  enemies = new Group(); // Create a group for enemies
  world.gravity.y = 10;
}

function draw() {
  background(220);
  fill(0);

  player.color = 'blue';
  playerAttack();
  spriteMove();
  setInterval(spawnTimer, 1000);
  
  //each floor will have its properties
  for (let i = 0; i < floors.length; i++) {
    fill(floors[i].color);
    rect(floors[i].position.x, floors[i].position.y, floors[i].width, floors[i].height);
  }

  // add enemies to the enemy group
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();
    enemyMove(enemies[i]);
    enemies[i].friction = 0.5;

    if (player.colliding(enemies[i]) && player.vel.x > 10) { // Enemy turns white(dead) when collided with
      enemies[i].color = 'white';
    if(player.position.x > enemies[i].position.x) { // Collide with an enemy and remove them via launch
    enemies[i].vel.x = -200;
  }
  if (player.colliding(enemies[i]) && player.vel.x < 10) { // Enemy turns white(dead) when collided with
    enemies[i].color = 'white';
  }
  if(player.position.x > enemies[i].position.x) { // Collide with an enemy and remove them via launch
  enemies[i].vel.x = -200;
  }


  if(player.position.x < enemies[i].position.x) {
    enemies[i].vel.x = 200;
  }
      enemies.splice(i, 1);
    }
  }
}

function floorSpawn(x, y, w, h, color) {
  const floor = new Sprite(x, y, w, h);
  floor.color = color;
  floor.immovable = true;
  floor.collider = 'static';
  floors.add(floor); // when making a floor, add it to the group
}

function playerSpawn() {
  // Player properties
  player = new Sprite(windowWidth / 2, windowHeight / 2, 30, 30);
  player.vel = createVector(0, 0);
  player.rotationLock = true;
  player.bounciness = 0;
}

function playerAttack() {
  if (mouse.pressing() && keyIsDown(68)) {
  player.vel.x = 12;
    } else if (mouse.pressing() && keyIsDown(65) ) {
    player.vel.x = -12;
    } else if (player.vel.x == 0) {
      
  }
}

function enemyMove(enemy) {
//temporary, enemies move left
  if(player.position.x > enemy.position.x) {
    enemy.vel.x = 4;
  }
  if(player.position.x < enemy.position.x) {
    enemy.vel.x = -4;
  }

}

function spriteMove() {
  // Slow to a stop after being in motion
  if (player.vel.x > 0) {
    player.vel.x -= speedDrift;
  }
  if (player.vel.x < 0) {
    player.vel.x += speedDrift;
  }

  // Keyboard input 'wasd'
  if (player.colliding(floors)) {
    if (keyIsDown(32)) { // SPACE
      player.vel.y = -6;
    }
  }

  if (player.vel.x < maxSpeed && player.vel.x > -maxSpeed) {
    if (keyIsDown(65)) { // A
      player.vel.x -= 1; // Left
    }
    if (keyIsDown(68)) { // D
      player.vel.x += 1; //Right
    }
  }

  if (keyIsDown(SHIFT)) {
    maxSpeed = 6;
  } else {
    maxSpeed = 3;
  }

  // player moves with velocity
  player.position.x += player.vel.x;
  player.position.y += player.vel.y;

  //fall from veiling if you fall through the floor
  if(player.position.y >= windowHeight+5) {
    player.position.y = 0;
  }

  //looping left-to-right
  if(player.position.x >= windowWidth) {
    player.position.x = 1;
  }

  if(player.position.x <= 0) {
    player.position.x = windowWidth-1;
  }

  // if player reaches certain velocity, turn red
  if (player.vel.x > 10 || player.vel.x < -10)
  player.color = 'red';
}

function keyPressed() {
  // enemy spawner
  if (keyCode === 82) { //R
    const enemy = new Sprite(windowWidth / 2 + 50, windowHeight / 2 - 60, 20, 20);
    enemies.add(enemy);
  }
}

// function spawnTimer() {
//   const enemy = new Sprite(windowWidth / 2 + 50, windowHeight / 2 - 60, 20, 20);
//   enemies.add(enemy);
//   }
