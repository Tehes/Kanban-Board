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
    }
    else if (ev.target.className === "section") {
        ev.target.appendChild(document.querySelector("#" + data));
    } else if (ev.target.className === "item") {
        ev.target.parentElement.appendChild(document.querySelector("#" + data));
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
}

init();
