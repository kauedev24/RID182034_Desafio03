
const tasks = [
    { "name": "Implementar tela de listagem de tarefas", "label": "frontend", "creationDate": "Criado em: 21/08/2024" },
    { "name": "Criar endpoint para cadastro de tarefas", "label": "backend", "creationDate": "Criado em: 21/08/2024" },
]

const createCard = (task) => {
    const card = document.createElement("div");
    const info = document.createElement("div");
    const titleTask = document.createElement("h2");
    const labelTask = document.createElement("div");
    const label = document.createElement("span");
    const dateTask = document.createElement("p");
    
    titleTask.textContent = task.name;
    label.textContent = task.label;
    dateTask.textContent = task.creationDate;
    
    card.className = "card";
    info.className = "info";
    labelTask.className = "label-date"

    card.appendChild(info);
    info.appendChild(titleTask);
    info.appendChild(labelTask);
    labelTask.appendChild(label);
    labelTask.appendChild(dateTask);

    return card;
}

const cardList = (task) => {
    const list = document.getElementById("task-list");
    const element = document.createElement("li");
    const button = document.createElement("button");
    
    button.type = "submit";
    button.className = "done-btn";
    button.textContent = "Concluir";
    
    list.appendChild(element);
    const card = createCard(task);
    element.appendChild(card);
    card.appendChild(button);

    return list;
}

window.onload = function() {
    tasks.forEach((task) => {
        cardList(task)
    })
}