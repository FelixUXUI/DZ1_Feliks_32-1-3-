const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[a-zA-Z0-9._-]+@gmail\.com$/;

gmailButton.addEventListener("click", () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'ok';
        gmailResult.style.color = '#00ff00';
    } else {
        gmailResult.innerHTML = 'not ok';
        gmailResult.style.color = '#ff0000';
    }
});



//MOVE BLOCK

const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let currentPosition = 0;

function moveChildBlock() {
    if (currentPosition < parentBlock.offsetWidth - childBlock.offsetWidth) {
        currentPosition += 3;
        childBlock.style.left = `${currentPosition}px`;

        requestAnimationFrame(moveChildBlock);
    } else if (currentPosition > 448) {
        currentPosition = 448;
        childBlock.style.left = `${currentPosition}px`;
    }
}


moveChildBlock();


