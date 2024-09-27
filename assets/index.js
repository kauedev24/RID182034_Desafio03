const getTodayDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() +1;
    const year = date.getFullYear();
    
    return `${day}/0${month}/${year}`;
}

const tasks = [];

const promiseToRemove = (cardID) => new Promise((resolve) => {
    const cardItem = document.getElementById(cardID);

    setTimeout(() => {
        resolve(cardItem.remove());
    }, 900);
})

const taskCompleted = async (cardID, titleID, buttonID) => {
    const cardItem = document.getElementById(cardID);
    const title = document.getElementById(titleID);
    const button = document.getElementById(buttonID);
    const complete = document.createElement("img");

    complete.src = "assets/img/complete.svg"; 

    title.style = "text-decoration: line-through; color: rgb(143,152,168)";

    cardItem.removeChild(button);
    cardItem.appendChild(complete);

    setTimeout(() => {
        cardItem.style.opacity = "0";
        promiseToRemove(cardID);        
    }, 4000);
}

const createCard = (task) => {
    const cardItem = document.createElement("li");
    const infoContainer = document.createElement("div");
    const title = document.createElement("h2");
    const labelDate = document.createElement("div");
    const label = document.createElement("span");
    const date = document.createElement("p");
    const button = document.createElement("button");
    const taskID = task.id;
    const cardID = `card-${taskID}`;
    const buttonID = `done-btn-${taskID}`;
    const titleID = `title-${taskID}`;

    cardItem.id = cardID;
    button.id = buttonID;
    title.id = titleID;

    cardItem.className = "card";
    infoContainer.className = "info";
    title.className = "title-task";
    labelDate.className = "label-date";
    button.className = "done-btn";

    title.textContent = task.name;
    label.textContent = task.label;
    date.textContent = `Criado em: ${task.creationDate}`;
    button.textContent = "Concluir";

    button.onclick = () => taskCompleted(cardID, titleID, buttonID);

    cardItem.appendChild(infoContainer);
    infoContainer.appendChild(title);
    infoContainer.appendChild(labelDate);
    labelDate.appendChild(label);
    labelDate.appendChild(date);
    cardItem.appendChild(button);

    return cardItem;
}

const createItemList = (task) => {
    const list = document.getElementById("task-list");
    const cardItem = createCard(task);

    list.appendChild(cardItem);

    return list;
}

const getInfoTask = (event) => {
    event.preventDefault();

    const id = tasks.length === 0 ? 1 : tasks.length +1;
    const name = event.target.elements[0].value;
    const label = event.target.elements[1].value;
    const date = getTodayDate();
    const checked = false;
    const task = { id: id, name: name, label: label, creationDate: date, checked: checked };

    tasks.push(task);
    createItemList(task);
}

window.onload = function() {

    const form = document.getElementById("form-components");
    form.addEventListener("submit", getInfoTask);

    tasks.forEach((task) => {
        createItemList(task);
    })
}
