let player; //Player Sprite Variable
let playerCount = 0; //Amount of Player Sprite Copies -1
let speedDrift = 0.05; //Variable for slowing to a stop after being in movement
let maxSpeed = 3;

function setup() {
  new Canvas(windowWidth,windowHeight);
  camera.zoom = 1;

  floor = new Sprite(windowWidth/2, windowHeight/2+50, 500, 40, 'static');
  floor.color = 'blue';
  world.gravity.y = 10;
}

function draw() {
  background(220);
    fill(0);
    spriteSpawn();
    spriteMove();
  }


function spriteSpawn() {
        if(playerCount === 0) {
            player = new Sprite(windowWidth/2, windowHeight/2, 30, 30);
            playerCount++;
            player.vel.x = 0;
            player.vel.y = 0;
            player.rotationLock = true;
            player.bounciness = 0;
    }
}

function spriteMove() {
  //slow to a stop after being in motion
      if(player.vel.x > 0) {
      player.vel.x -= speedDrift;
      }
      if(player.vel.x < 0) {
      player.vel.x += speedDrift;
      }

      //keyboard input 'wasd'
    if(player.colliding(floor)) {
      if(kb.presses(" ")) { //up
        player.vel.y = -6;
        }
      }

    if(player.vel.x < maxSpeed && player.vel.x > -maxSpeed) { //so long as player movement is within max speed
      if(kb.pressing("a")) { //left
      player.vel.x -= 1;
      }
      if(kb.pressing("d")) { //right
      player.vel.x += 1;
      }
    }

    if(kb.pressing('shift')) {
      maxSpeed = 6;
    } else {
      maxSpeed = 3;
    }
  }

  function spriteAttack() {
    if(player.triggersAttack()) {

    }
  }
