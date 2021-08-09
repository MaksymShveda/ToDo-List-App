"use strict";
//Declare part;
let taskCreationForm = document.getElementById("task-creator");
let taskCreationInput = document.getElementById("task-name-input")
let taskList = document.getElementById("tasks-box");
let taskEditor = document.querySelectorAll(".edit-button");
let tasks = [{
    id: 1239124919,
    name: "Write own ToDo App",
    done: false
}];

//Functions;
//Creating a new task;
taskCreationForm.addEventListener("submit", function(event){
    event.preventDefault();
    addTask(taskCreationInput.value);

})

function addTask(task){
    if(task != ""){
        let newTask = {
            id: Date.now(),
            name: task,
            done: false
        };
        tasks.push(newTask);
        
        taskCreationInput.value = "";
        console.log(tasks);
    }
}

//Task Editor;
//Main;
//Collecting edit buttons and give them event;
Array.from(taskEditor).forEach(function(btn){
    btn.addEventListener("click", function(){
        //calling an input for changing task name;
    let newEdit = requestForEdit(btn.previousElementSibling)
    //collecting edited task;
    newEdit.addEventListener("submit", function(event){
        event.preventDefault();
        taskEdit(newEdit);
    })

    })
    
})

function requestForEdit(taskToEdit){
    //Creating a form for edit;
    let editForm = document.createElement("form");
    let requestInput = document.createElement("input");
    requestInput.type = "text";
    requestInput.className = "request-input";
    requestInput.value=taskToEdit.textContent;
    editForm.appendChild(requestInput);
    let confirmEdit = document.createElement("button");
    confirmEdit.type = "submit";
    confirmEdit.className = "confirm-edit-button";
    editForm.appendChild(confirmEdit);
    //Displaying input and confirm button;
    taskToEdit.style.display="none";
    taskToEdit.nextElementSibling.style.display = "none";
    taskToEdit.parentNode.insertBefore(editForm, taskToEdit);
    return editForm
}
//Performing changes
function taskEdit(changedTask){
    //change data
    tasks.find(function(element){
    return element.id = changedTask.parentNode.getAttribute("data-key")
    }).name = changedTask.firstChild.value
    console.log(tasks[0])
    //giving an initial look
changedTask.nextElementSibling.textContent = changedTask.firstChild.value;
changedTask.nextElementSibling.style.display = "block";
changedTask.nextElementSibling.nextElementSibling.style.display = "block";
changedTask.remove()
}


   


function renderTasks(tasks){
    while(taskList.firstChild){
        taskList.remove(taskList.firstChild);
       }
    tasks.forEach((task)=>{
        let li = document.createElement;
        li.appendChild(document.createElement("input").setAttribute("type", "checkbox"));
    })
    
}

