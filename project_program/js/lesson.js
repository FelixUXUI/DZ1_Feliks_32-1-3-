const photoInput = document.querySelector("#phone_input");
const photoButton = document.querySelector("#phone_button");
const photoResult = document.querySelector("#phone_result");

const regExp = /\+996 [2574]\d{2} \d{2}-\d{2}-\d{2}/

photoButton.onclick = () => {
    if (regExp.test(photoInput.value)) {
        photoResult.innerHTML = 'ok'
        photoResult.style.color = '#00ff00'
    }else {
        photoResult.innerHTML = 'not ok'
        photoResult.style.color = '#ff0000'
    }
}