let taskArray = [];
const obj = {
    task: "Learn Javascript",
    countDelete: 0,
    done: false
};
const obj2 = {
    task: "Listen to a new music genre",
    countDelete: 1,
    done: false
};
const obj3 = {
    task: "Task 3",
    countDelete: 0,
    done: true
};

taskArray.push(obj);
taskArray.push(obj2);
taskArray.push(obj3);

console.log(taskArray);
displayTask(taskArray);

function displayTask(taskArray) {
    const taskList = document.getElementById("task-data");
    taskList.innerHTML = '';

    const visibleTasks = taskArray.filter(task => task.countDelete < 2);

    visibleTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const doneClass = task.done ? 'done' : '';
        const deleteClass = task.countDelete === 1 ? 'marked-delete' : '';

        taskDiv.innerHTML = `  
            <div class="container">
                <form class="taskform2">
                    <label class="${doneClass} ${deleteClass}">${task.task}</label>            
                    <button type="button" class="blue-tick" onclick="toggleTaskDone(${index})"><i class="fa-solid fa-check"></i></button>
                    <button type="button" class="red-delete" onclick="markTaskAsDeleted(${index})"><i class="fa-regular fa-trash-can"></i></button>
                </form>       
            </div>
        `;
        taskList.appendChild(taskDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const taskform = document.getElementById('taskform');
    if (taskform) {
        taskform.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(event) {
    event.preventDefault();
    const formId = event.target.id;

    if (formId === 'taskform') {
        const task = document.querySelector('input[name="task"]').value;

        const newTask = {
            task: task,
            countDelete: 0,
            done: false,
        };
        addTaskToArray(newTask);
    }
}

function addTaskToArray(task) {
    taskArray.push(task);
    displayTask(taskArray);
    alert("Task added successfully!");
    document.getElementById('taskform').reset();
}

function toggleTaskDone(index) {
    taskArray[index].done = true; 
    displayTask(taskArray); 
}

function markTaskAsDeleted(index) {
    taskArray[index].countDelete += 1; 
    displayTask(taskArray); 
}
