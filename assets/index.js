// pega a data de hoje DD/MM/AAAA
const getTodayDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() +1;
    const year = date.getFullYear();
    
    if (month >= 10) return `${day}/${month}/${year}`;
    return `${day}/0${month}/${year}`;
}

// pega a lista local
const getTasksInLocalStorage = () => {
    const localData = JSON.parse(window.localStorage.getItem("tasks"));
    return localData ? localData : [];
}

// adiciona tarefas em lista local
const addTasksInLocalStorage = (taskCards) => {
    window.localStorage.setItem("tasks", JSON.stringify(taskCards));
}

// promessa de remoção da tarefa
const promiseToRemove = (taskID) => new Promise((resolve) => {
    const cardItem = document.getElementById(taskID);

    setTimeout(() => {
        resolve(cardItem.remove());
    }, 900);
})

// ação botão "concluir tarefa" | retorna promessa de remoção
const taskCompleted = async (taskID, titleID, buttonID) => {
    const cardItem = document.getElementById(taskID);
    const title = document.getElementById(titleID);
    const button = document.getElementById(buttonID);
    const complete = document.createElement("img");

    complete.src = "/assets/components/complete.svg"; 

    title.style = "text-decoration: line-through; color: rgb(143,152,168)";

    cardItem.removeChild(button);
    cardItem.appendChild(complete);

    setTimeout(() => {
        cardItem.style.opacity = "0";
        promiseToRemove(taskID);        
    }, 4000);

    const tasks = getTasksInLocalStorage();
    tasks[taskID-1].checked = true;
    addTasksInLocalStorage(tasks);
    createCompletedTaskCounter(tasks);
}

// cria o cartão
const createCard = (task) => {
    const cardItem = document.createElement("li");
    const infoContainer = document.createElement("div");
    const title = document.createElement("h2");
    const labelDate = document.createElement("div");
    const label = document.createElement("span");
    const date = document.createElement("p");
    const button = document.createElement("button");
    const taskID = task.id;
    const buttonID = `done-btn-${taskID}`;
    const titleID = `title-${taskID}`;

    cardItem.id = taskID;
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

    button.onclick = () => taskCompleted(taskID, titleID, buttonID);

    cardItem.appendChild(infoContainer);
    infoContainer.appendChild(title);
    infoContainer.appendChild(labelDate);
    labelDate.appendChild(label);
    labelDate.appendChild(date);
    cardItem.appendChild(button);

    return cardItem;
}

// cria um item na lista
const createItemList = (task) => {
    const list = document.getElementById("task-list");
    const cardItem = createCard(task);

    list.appendChild(cardItem);

    return list;
}

// pega as informações do forms
const getInfoTask = (event) => {
    event.preventDefault();

    const tasks = getTasksInLocalStorage();
    const id = tasks.length === 0 ? 1 : tasks.length +1;
    const name = event.target.elements[0].value;
    const label = event.target.elements[1].value;
    const date = getTodayDate();
    const checked = false;
    const task = { id: id, name: name, label: label, creationDate: date, checked: checked };
    const updateTasks = tasks.length === 0 ? [task] : [...tasks, task];

    addTasksInLocalStorage(updateTasks);
    createItemList(task);
}

// cria contador de tarefas concluidas
const createCompletedTaskCounter = (tasks) => {
    const footer = document.getElementById("footer");
    const text = document.getElementById("footer-text");
    
    let tasksCompleted; 
    if (text) tasksCompleted = text;
    else {
        const text = document.createElement("p");
        text.id = "footer-text";
        
        tasksCompleted = text;
    }

    const counter = tasks.filter(({ checked }) => checked).length;
    tasksCompleted.textContent = `${counter} tarefas concluidas`;
    footer.appendChild(tasksCompleted);

    return footer;
}

window.onload = function() {
    localStorage.clear()
    const form = document.getElementById("form-components");
    form.addEventListener("submit", getInfoTask);
    
    const tasks = getTasksInLocalStorage();
    tasks.forEach((task) => {
        if (task.checked !== true) createItemList(task);
    })

    createCompletedTaskCounter(tasks);
}
