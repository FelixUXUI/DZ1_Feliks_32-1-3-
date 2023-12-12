const childBlock = document.querySelector(".child_block");

const parentFreeWidth = 449;
const moveSpeedChildBlock = 6;

let positionX = 0;
let positionY = 0;

const moveBlock = () => {
    if (positionX < parentFreeWidth && positionY === 0) {
        positionX++;
        childBlock.style.left = `${positionX}px`;
        setTimeout(moveBlock, moveSpeedChildBlock);
    } else if (positionX >= parentFreeWidth && positionY < parentFreeWidth) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
        setTimeout(moveBlock, moveSpeedChildBlock);
    } else if (positionX >= 0) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
        setTimeout(moveBlock, moveSpeedChildBlock);
    } else if (positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
        setTimeout(moveBlock, moveSpeedChildBlock);
    }
};

moveBlock();

const secondsS = document.querySelector("#secondsS");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");
let restStart = 0
let timer;

startBtn.addEventListener("click", () => {
    if (!timer) {
        // Если таймер не запущен, то начинаем его
        timer = setInterval(() => {
            restStart++;
            secondsS.textContent = restStart;
        }, 1000);
    }
});

stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

resetBtn.addEventListener("click", () => {
    restStart = 0;
    secondsS.textContent = restStart;

    clearInterval(timer);
    timer = null;
});