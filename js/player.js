import Character from './character.js';

class Player extends Character {
  constructor(name, position) {
    super(name, position);
  }

  move(keyState, direction) {
    if (keyState) {
      switch (direction) {
        case 'left':
          this.setPosition({
            x: this.position.x - 7,
            y: this.position.y
          });
          break;
        case 'up':
          this.setPosition({
            x: this.position.x,
            y: this.position.y - 16
          })
          break;
        case 'right':
          this.setPosition({
            x: this.position.x + 7,
            y: this.position.y
          })
          break;
        case 'down':
          this.setPosition({
            x: this.position.x,
            y: this.position.y + 16
          })
          break;
      }
    }
  }
}

export default Player;