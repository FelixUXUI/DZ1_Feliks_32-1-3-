const photoInput = document.querySelector("#phone_input");
const photoButton = document.querySelector("#phone_button");
const photoResult = document.querySelector("#phone_result");

const regExp = /\+996 [2574]\d{2} \d{2}-\d{2}-\d{2}/

photoButton.onclick = () => {
    if (regExp.test(photoInput.value)) {
        photoResult.innerHTML = 'ok'
        photoResult.style.color = '#00ff00'
    } else {
        photoResult.innerHTML = 'not ok'
        photoResult.style.color = '#ff0000'
    }
}

const tabContentBlock = document.querySelectorAll('.tab_content_block')
const itemContentBlock = document.querySelector('.tab_content_items')
const tabBlock = document.querySelectorAll('.tab_content_item')


const hideContentBlock = () => {
    tabContentBlock.forEach(tabContentBlock => {
        tabContentBlock.style.display = 'none'
    })
    tabBlock.forEach(tabBlocks => {
        tabBlocks.classList.remove('tab_content_item_active')
    })
}

const showContent = (indexElement = 0) => {
    tabContentBlock[indexElement].style.display = 'block'
    tabBlock[indexElement].classList.add('tab_content_item_active')
}

hideContentBlock()
showContent()

itemContentBlock.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabBlock.forEach((tabBlocks, tabIndex) => {
            if (event.target === tabBlocks) {
                hideContentBlock()
                showContent(tabIndex)
            }
        })
    }
}

let slaiderIndex = 0

const autoSlaider = () => {
    hideContentBlock()
    slaiderIndex = (slaiderIndex + 1) % tabContentBlock.length
    showContent(slaiderIndex)
}
setInterval(autoSlaider, 3000)

//converter

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const converter = (element, targetElement, current) => {
    element.addEventListener('input', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../data/converter.json');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.response);
                switch (current) {
                    case 'som':
                        targetElement.value = (element.value / data.USD).toFixed(2);
                        eur.value = (element.value / data.EUR).toFixed(2);
                        break;
                    case 'usd':
                        targetElement.value = (element.value * data.USD).toFixed(2);
                        eur.value = (element.value * data.EUR / data.USD).toFixed(2);
                        break;
                    case 'eur':
                        targetElement.value = (element.value * data.EUR).toFixed(2);
                        usd.value = (element.value * data.USD / data.EUR).toFixed(2);
                        break;
                    default:
                        break;
                }
            } else {
                console.error('Error loading data:', xhr.statusText);
            }
        };
    });
};

converter(som, usd, 'som');
converter(usd, som, 'usd');
converter(eur, som, 'eur');


//card

const card = document.querySelector('.card'),
    prevBtn = document.querySelector('#btn-prev'),
    nextBtn = document.querySelector('#btn-next')

let count = 1;
const maxCount = 200;

function updateCard() {
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            card.innerHTML = `
                <p>
                    Card ${count}: ${data.title}
                </p>
                <span style="color: ${data.completed ? "green" : "red"}">${data.completed}</span>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

updateCard();

nextBtn.addEventListener('click', () => {
    count = (count % maxCount) + 1;
    updateCard();
});

prevBtn.addEventListener('click', () => {
    count = (count - 2 + maxCount) % maxCount + 1;
    updateCard();
});

fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(response => {
        console.log("Необработанный ответ: ")
        console.log(response)
        return response.json()
    })
    .then(data => {
        console.log("Обработанный ответ ")
        console.log( data)
    })
