import Character from './character.js';
import Position from './position.js';
import Player from './player.js';
import Keyboard from './keyboardState.js';
import KeyboardState from './keyboardState.js';



const loadImage = url => {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
};

class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name, x, y) {
    const buffer = document.createElement('canvas');
    buffer.width = this.width;
    buffer.height = this.height;
    buffer
      .getContext('2d')
      .drawImage(
        this.image,
        x * this.width,
        y * this.height,
        this.width,
        this.height,
        0,0,
        this.width,
        this.height
      );
    this.tiles.set(name, buffer);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }
}

class Arena {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.lastTime;
    this.characters = [];
    this.sprites;
    this.player = new Player('Nakke', {x: 0, y: 0});
    this.input = new Keyboard();

    this.input.listenTo(window);
    this.input.addMapping(37, keyState => this.player.move(keyState, 'left'));
    this.input.addMapping(38, keyState => this.player.move(keyState, 'up'));
    this.input.addMapping(39, keyState => this.player.move(keyState, 'right'));
    this.input.addMapping(40, keyState => this.player.move(keyState, 'down'));

    const callback = ms => {
      if (this.lastTime) {
        this.update((ms - this.lastTime) / 1000);
      }

      this.lastTime = ms;
      requestAnimationFrame(callback);
    };

    loadImage('../images/player.png')
      .then(image => {
        this.sprites = new SpriteSheet(image, 7, 16);
        this.sprites.define('player', 0, 0);
        callback();
      });
  }

  update(dt) {
    this.drawBackground();
    this.drawCharacters();
  }

  drawCharacters() {
    this.sprites.draw('player', this.context, this.player.position.x, this.player.position.y);
  }

  drawBackground() {
    this.context.fillStyle = 'rgba(255, 255, 255, 1)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = 'rgba(0, 0, 0, 1)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

const canvas = document.getElementById('arena-canvas');
const arena = new Arena(canvas);