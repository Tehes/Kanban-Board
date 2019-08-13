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
        return;
    } else if (e.target.className === "section") {
        e.target.appendChild(document.querySelector("#" + data));
    } else if (e.target.className === "item") {
        e.target.parentElement.appendChild(document.querySelector("#" + data));
    }
    document.querySelector("#" + data).removeAttribute("id");
}

function makeNewTask(section, content, e) {
    var taskNameField, newItem;

    if (e) {
		e.preventDefault();
	}
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
