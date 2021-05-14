import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import { buildLevel, level1, level2 } from "./levels.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight, bricksPerRow) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;

    this.levels = [level1, level2];
    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.bricks.length === 0) {
        if(this.currentLevel == 0){
          this.currentLevel++;
          this.gamestate = GAMESTATE.NEWLEVEL;
          this.start();
        }
        else if(this.currentLevel === 1){
          this.currentLevel = 0;
          this.gamestate = GAMESTATE.NEWLEVEL;
          this.start();
        }
    }

    [...this.gameObjects, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Zen Dots";
      ctx.fillStyle = "aqua";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Zen Dots";
      ctx.fillStyle = "aqua";
      ctx.textAlign = "center";
      ctx.fillText(
        "PRESS SPACEBAR TO START",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
      ctx.fillText(
        "YOU HAVE 3 LIVES",
        this.gameWidth / 2,
        this.gameHeight / 1.7
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Zen Dots";
      ctx.fillStyle = "aqua";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
