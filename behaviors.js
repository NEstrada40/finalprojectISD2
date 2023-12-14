function playerAttack() { //function for "attack mode" which is just high speed
    if (mouse.pressing() && keyIsDown(68)) {
    player.vel.x = 12;
      } else if (mouse.pressing() && keyIsDown(65) ) {
      player.vel.x = -12;
      } else if (player.vel.x == 0) {
        
    }
  }
  
  function enemyMove(enemy) {  //function for enemies moving towards the player, always
    if(player.position.x > enemy.position.x) {
      enemy.vel.x = 2;
    }
    if(player.position.x < enemy.position.x) {
      enemy.vel.x = -2;
    }
  
  }
  
  function spriteMove() {  // Slow to a stop after being in motion
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
  
    if (player.vel.x < maxSpeed && player.vel.x > -maxSpeed) { //player controlled movement
      if (keyIsDown(65)) { // A
        player.vel.x -= 1; // Left
      }
      if (keyIsDown(68)) { // D
        player.vel.x += 1; //Right
      }
    }
  
    if (keyIsDown(SHIFT)) { //"sprint" feature
      maxSpeed = 6;
    } else {
      maxSpeed = 3;
    }
  
    // player moves according to their current velocity
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
  
    if (player.vel.x > 10 || player.vel.x < -10)
    player.color = 'red';
  }
  
