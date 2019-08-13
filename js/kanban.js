function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id = "drag");
}

function drop(e) {
    var data = e.dataTransfer.getData("text");

    e.preventDefault();
    e.stopPropagation();

    if (e.target === document.body) {
        document.querySelector("#" + data).remove();
    } else {
        if (e.target.className === "section") {
            e.target.appendChild(document.querySelector("#" + data));
        } else if (e.target.className === "item") {
            e.target.parentElement.appendChild(document.querySelector("#" + data));
        }
        document.querySelector("#" + data).removeAttribute("id");
    }
    updateCounter();
}

function makeNewTask(section, content, e) {
    var taskNameField, newItem;

    if (e) {
        e.preventDefault();
    }
    taskNameField = document.querySelector("#taskName");
        if (content === "input") {
        content = taskNameField.value;
    }
    content = content.split("+");

    for (var i = 0; i < content.length; i++) {
        newItem = document.createElement("div");
        newItem.className = "item";
        newItem.draggable = true;
        newItem.textContent = content[i].trim();
        newItem.addEventListener("dragstart", drag);
        document.querySelector("#" + section).appendChild(newItem);
    }
    updateCounter();
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

function updateCounter() {
    var counter, i, sections, sectionId, items;
    sections = document.querySelectorAll(".section");

    for (i = 0; i < sections.length; i++) {
        sectionId = document.querySelectorAll(".section")[i].id;
        counter = document.querySelectorAll(".section .counter");
        items = document.querySelectorAll("#" + sectionId + " .item").length;
        counter[i].textContent = "(" + items + ")";
    }
}

function init() {
    var sections, items, i, formField, taskNameField, typeMessage;

    sections = document.querySelectorAll(".section");
    items = document.querySelectorAll(".item");
    formField = document.querySelector("form");
    taskNameField = document.querySelector("#taskName");
    typeMessage = [
        "Here you can type in a new task",
        "Drag an item on the background to delete it",
        "Create multiple tasks at once by dividing your inputs with a +"
    ];
    var index = getRandomInt(0, typeMessage.length);
    taskNameField.value = typeMessage[index];

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
            var index = getRandomInt(0, typeMessage.length);
            this.value = typeMessage[index];
        }
    });
    window.addEventListener("unload", saveBoard);
    window.addEventListener("DOMContentLoaded", loadBoard);
}

init();
