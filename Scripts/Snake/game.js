import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from "./snake.js";
import { outsideGrid } from "./grid.js";
import { update as updateFood, draw as drawFood } from "./food.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function redirect() {
    window.location = "../Content/SnakeMenu.html";
}


function main(currentTime) {
    if (gameOver) {
        return alert("Game Over");
    }


    window.requestAnimationFrame(main)

    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime;

    update()
    draw()
}

window.requestAnimationFrame(main)


function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}