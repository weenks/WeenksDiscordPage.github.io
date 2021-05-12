import {SNAKE_SPEED, update as updateSnake, draw as drawSnake} from "./snake.js";

import {update as updateFood, draw as drawFood} from "./food.js";

let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board")


function main(currentTime) {
    window.requestAnimationFrame(main)
    
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondSinceLastRender < 1 /SNAKE_SPEED) return 
    
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