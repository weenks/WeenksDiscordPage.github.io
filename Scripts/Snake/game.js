let lastRenderTime = 0;

function main(currentTime) {
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
    window.requestAnimationFrame(main)
    lastRenderTime = currentTime;
    console.log(secondSinceLastRender);
}

window.requestAnimationFrame(main)