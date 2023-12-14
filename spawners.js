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
    player.hp = 100;
  }

function keyPressed() {
    // enemy spawner
    if (keyCode === 82) { //R
      const enemy = new Sprite(windowWidth / 2 + 50, windowHeight / 2 - 60, 20, 20);
      enemies.add(enemy);
    }
  }
  
