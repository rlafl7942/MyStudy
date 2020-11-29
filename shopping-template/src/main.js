
//fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
    .then(response => response.json()) //fetch 되면
    .then(json => json.items); //json의 items만 return
}

function displayItems(items) {//HTML요소로 만들기
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
    //각각의 item을 createHTMLString 함수를 이용해 문자열로 변환
}

function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumnail">
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event,items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    
    if (key==null||value==null){
        return;
    }
    displayItems(items.filter(item => item[key]===value));
    
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', ()=> displayItems(items));
    buttons.addEventListener('click', event=>onButtonClick(event,items));
}


//main
loadItems()
    .then(items => {
        console.log(items);
        displayItems(items);
        setEventListeners(items);
})
.catch(console.log);