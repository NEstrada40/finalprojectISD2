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
    if(player.colliding(floor)) { 
      if(player.vel.x > 0) {
      player.vel.x -= speedDrift;
      }
      if(player.vel.x < 0) {
      player.vel.x += speedDrift;
      }
     } else if(!player.colliding(floor)) { 
        if(player.vel.x > 0) {
        player.vel.x -= speedDrift/3;
        }
        if(player.vel.x < 0) {
        player.vel.x += speedDrift/3;
        }
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