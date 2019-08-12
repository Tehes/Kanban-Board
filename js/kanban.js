function allowDrop() {
    event.preventDefault();
}

function drag() {
    event.dataTransfer.setData("text", event.target.id = "drag");
}

function drop() {
    var data = event.dataTransfer.getData("text");

    event.preventDefault();
    event.stopPropagation();

    if (event.target === document.body) {
        document.querySelector("#" + data).remove();
        return;
    } else if (event.target.className === "section") {
        event.target.appendChild(document.querySelector("#" + data));
    } else if (event.target.className === "item") {
        event.target.parentElement.appendChild(document.querySelector("#" + data));
    }
    document.querySelector("#" + data).removeAttribute("id");
}

function makeNewTask(section, content) {
    var taskNameField, newItem;

    event.preventDefault();
    taskNameField = document.querySelector("#taskName");
    newItem = document.createElement("div");
    if (content === "input") {
        content = taskNameField.value;
    }
    newItem.className = "item";
    newItem.draggable = true;
    newItem.textContent = content;
    newItem.addEventListener("dragstart", drag);
    document.querySelector("#" + section).appendChild(newItem);
}

function loadBoard() {
    var i, x, sectioName, newItem;

    for (i = 0; i < localStorage.length; i++) {
        x = localStorage.key(i);
        sectionName = x.substr(0, x.indexOf('_'));

        makeNewTask(sectionName, localStorage.getItem(x));
    }
}

function saveBoard() {
    var items, i, sectionName;

    localStorage.clear();
    items = document.querySelectorAll(".item");
    for (i = 0; i < items.length; i++) {

        sectionName = items[i].parentElement.id;
        localStorage.setItem(sectionName + "_" + i, items[i].textContent);
    }
}

function init() {
    var sections, items, i, formField, taskNameField, typeMessage;

    sections = document.querySelectorAll(".section");
    items = document.querySelectorAll(".item");
    formField = document.querySelector("form");
    taskNameField = document.querySelector("#taskName");
    typeMessage = taskNameField.value;

    for (i = 0; i < sections.length; i++) {
        sections[i].addEventListener("drop", drop);
        sections[i].addEventListener("dragover", allowDrop);
    }
    document.body.addEventListener("drop", drop);
    document.body.addEventListener("dragover", allowDrop);
    formField.addEventListener("submit", makeNewTask.bind(null, "toDo", "input"));

    taskNameField.addEventListener("focus", function() {
        this.value = "";
    });
    taskNameField.addEventListener("blur", function() {
        if (this.value === "") {
            this.value = typeMessage;
        }
    });
    window.addEventListener("unload", saveBoard);
    window.addEventListener("DOMContentLoaded", loadBoard);
}

init();
