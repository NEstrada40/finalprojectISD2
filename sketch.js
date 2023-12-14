let player; // Player Sprite Variable
let enemies; //Enemy Sprite Variable
let floors; //floor sprite variable
let speedDrift = 0.05; // Variable for slowing to a stop after being in movement
let maxSpeed = 3; //variable for player current max speed;
let whenDamageWasTaken = -1000; //variable for last time damage was taken
const damageCooldownStat = 600; // variable for intervals between damage taken

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

  print(player.hp);
  player.color = 'blue';
  playerAttack();
  spriteMove();
  //text for HP
  textAlign(CENTER);
  textSize(50);
  text('🌈'+player.hp+'🌈', player.position.x, player.position.y-50);
  

 //If player dies, restart
  if (player.hp <= 0) {
    player.remove();
    floors.remove();
    enemies.remove();
    playerSpawn();
    floorSpawn(windowWidth / 2, windowHeight / 2 + 50, windowWidth, 40, 'static');
    whenDamageWasTaken = millis();
  }

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

    //take daamge unless damage on cooldown - take damage only if below attack velocity
    if (player.colliding(enemies[i]) && damageOnCooldown >= damageCooldownStat) {
      if (!(player.vel.x < -10) || !(player.vel.x > 10)) {
        player.hp -= 10;
        whenDamageWasTaken = millis();
      }

        if(player.vel.x > 10) {
            enemies[i].color = 'white';
            if(player.position.x > enemies[i].position.x) {
                enemies[i].vel.x = -200;
            }
        }
        if(player.vel.x < -10) {
            enemies[i].color = 'white';
            if(player.position.x < enemies[i].position.x) {
                enemies[i].vel.x = 200;
            }
         }
      if(player.vel.x < -10 || player.vel.x > 10) {
        enemies.splice(i, 1);
        enemies.remove;
      }
    }
  }
  
// check enemy damage cooldown
   const currentTime = millis();
   damageOnCooldown = currentTime - whenDamageWasTaken;
}
