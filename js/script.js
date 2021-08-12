//Declare part;
let taskCreationForm = document.getElementById("task-creator");
let taskCreationInput = document.getElementById("task-name-input");
let taskList = document.getElementById("tasks-box");
let tasks =[];

tasksFromLocalStorage(tasks);

//Functions;
//Creating a new task;
taskCreationForm.addEventListener("submit", function(event){
    event.preventDefault();
    addTask(taskCreationInput.value);

})
//add a task to data and page
function addTask(task){
    if(task != ""){
        let newTask = {
            id: Date.now(),
            name: task,
            done: false
        };
        tasks.push(newTask);
        localStorageUpdate(tasks);
        
        taskCreationInput.value = "";
        console.log(tasks);
    }
}

function refreshTasksList(tasks){
    //clear page
    while(taskList.firstChild){
        taskList.firstChild.remove();
    }
// creating a <li> for each task
    tasks.forEach(function(task){
        let li = document.createElement("li");
        li.className = "task";
        li.setAttribute("data-key",task.id);
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = task.done ? true :false;
        li.appendChild(checkbox);
        let taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.name;
        li.appendChild(taskText);
        let editButton = document.createElement("button");
        editButton.className = "edit-button";
        let image = document.createElement("img");
        image.className = "task-manage-image";
        image.setAttribute("src", "images/edit-icon.svg");
        editButton.appendChild(image);
        li.appendChild(editButton);   
        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        let deleteImage = document.createElement("img");
        deleteImage.className = "task-manage-image";
        deleteImage.setAttribute("src", "images/delete-icon.svg");
        deleteButton.appendChild(deleteImage);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    })
    let taskEditor = document.querySelectorAll(".edit-button");
    //Task editor
    //giving each "edit" button features
    Array.from(taskEditor).forEach(function(btn){
        btn.addEventListener("click", function (){
            //calling an input for changing task name;
            let newEdit = requestForEdit(btn.previousElementSibling);
            //collecting edited task;
            newEdit.addEventListener("submit", function(event){
                event.preventDefault();
                if(newEdit.firstChild.value === ""){
                    newEdit.firstChild.placeholder = "Please, write your task."
                  }
                else{
                taskEdit(newEdit);
                }
            })  
        })
    })
    let taskRemoving = document.querySelectorAll(".delete-button");
    Array.from(taskRemoving).forEach(function(btn){
        btn.addEventListener("click", function(){
            deleteTask(btn.parentNode.getAttribute("data-key"));
        })
    })
    let checkboxes = document.querySelectorAll(".checkbox");
    Array.from(checkboxes).forEach(function(cb){
        cb.addEventListener("click", function(){
            taskSuccessProgress(cb.parentNode.getAttribute("data-key"));
        })
    })
}

function requestForEdit(taskToEdit){
    //Creating a form for edit;
    let editForm = document.createElement("form");
    editForm.className = "request-form";
    let requestInput = document.createElement("input");
    requestInput.type = "text";
    requestInput.className = "request-input";
    requestInput.value=taskToEdit.textContent;
    editForm.appendChild(requestInput);
    let confirmEdit = document.createElement("button");
    confirmEdit.type = "submit";
    confirmEdit.className = "confirm-edit-button";
    let confirmIcon = document.createElement("img");
    confirmIcon.className = "task-manage-image";
    confirmIcon.setAttribute("src", "images/confirm-icon.svg");
    confirmEdit.appendChild(confirmIcon);
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
    return element.id == changedTask.parentNode.getAttribute("data-key");
    }).name = changedTask.firstChild.value;
    localStorageUpdate(tasks);
    //giving an initial look
changedTask.nextElementSibling.textContent = changedTask.firstChild.value;
changedTask.nextElementSibling.style.display = "block";
changedTask.nextElementSibling.nextElementSibling.style.display = "block";
changedTask.remove();
}
//making a task done/undone
function taskSuccessProgress(id){
    tasks.forEach(function(element){
        if(element.id == id){
            element.done = !element.done;
        }
    })
    localStorageUpdate(tasks);
}
//Delete task
function deleteTask(id){
  tasks = tasks.filter((element)=>element.id != id);
    localStorageUpdate(tasks);
}

//Local Storage
function localStorageUpdate(list){
    localStorage.setItem("tasks", JSON.stringify(list));
    refreshTasksList(list);
}

function tasksFromLocalStorage(){
    let reference = localStorage.getItem("tasks");
    if(reference){
        tasks = JSON.parse(reference);
        refreshTasksList(tasks);
    }
}   
