function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id = "drag");
}

function drop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    var data = ev.dataTransfer.getData("text");

    if (ev.target === document.body) {
        document.querySelector("#" + data).remove();
        return;
    } else if (ev.target.className === "section") {
        ev.target.appendChild(document.querySelector("#" + data));
    } else if (ev.target.className === "item") {
        ev.target.parentElement.appendChild(document.querySelector("#" + data));
    } else if (ev.target === document.body) {
        document.querySelector("#" + data).remove();
        return;
    }
    document.querySelector("#" + data).removeAttribute("id");
}

function makeNewTask(ev) {
    var toDoSection = document.querySelector(".section");
    var taskNameField = document.querySelector("#taskName");
    var newItem = document.createElement("div");
    newItem.className = "item";
    newItem.draggable = true;
    if (taskNameField.value) {
        newItem.textContent = taskNameField.value;
    } else {
        return;
    }
    newItem.addEventListener("dragstart", drag);
    toDoSection.appendChild(newItem);
    ev.preventDefault();
}

function saveBoard() {
    var items, i, sectionName;
    items = document.querySelectorAll(".item");
    localStorage.clear();
    for (i = 0; i < items.length; i++) {

        sectionName = items[i].parentElement.id;
        console.log(sectionName);
        localStorage.setItem(sectionName + "_" + i, items[i].textContent);
    }
}

function loadBoard() {
    var i, x, sectioName, newItem;
    for (i = 0; i < localStorage.length; i++) {
        x = localStorage.key(i);
        sectionName = x.substr(0, x.indexOf('_'));

        newItem = document.createElement("div");
        newItem.className = "item";
        newItem.draggable = true;
        newItem.textContent = localStorage.getItem(x);
        newItem.addEventListener("dragstart", drag);
        document.querySelector("#"+sectionName).appendChild(newItem);
    }
}

function init() {
    var sections, items, i, formField, taskNameField;

    sections = document.querySelectorAll(".section");
    items = document.querySelectorAll(".item");
    formField = document.querySelector("form");
    taskNameField = document.querySelector("#taskName");

    for (i = 0; i < sections.length; i++) {
        sections[i].addEventListener("drop", drop);
        sections[i].addEventListener("dragover", allowDrop);
    }

    for (i = 0; i < items.length; i++) {
        items[i].addEventListener("dragstart", drag);
    }
    document.body.addEventListener("drop", drop);
    document.body.addEventListener("dragover", allowDrop);

    formField.addEventListener("submit", makeNewTask);
    taskNameField.addEventListener("focus", function() {
        this.value = "";
    });
    taskNameField.addEventListener("blur", function() {
        if (this.value === "") {
            this.value = "Here you can type in a new task";
        }
    });
    window.addEventListener("beforeunload", saveBoard);
    window.addEventListener("DOMContentLoaded", loadBoard);
}

init();
