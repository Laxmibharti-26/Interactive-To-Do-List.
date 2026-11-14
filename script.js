
document.addEventListener("DOMContentLoaded", function () {

    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const taskCount = document.getElementById("taskCount");

    let tasks = [];

    // Load tasks from LocalStorage
    try {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));

        if (Array.isArray(savedTasks)) {
            tasks = savedTasks.filter(function (task) {
                return task &&
                    typeof task.text === "string" &&
                    typeof task.completed === "boolean";
            });
        }
    } catch (error) {
        tasks = [];
    }

    // Save tasks
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Display tasks
    function displayTasks() {
        taskList.innerHTML = "";

        tasks.forEach(function (task, index) {

            const li = document.createElement("li");

            if (task.completed) {
                li.classList.add("completed");
            }

            const span = document.createElement("span");
            span.className = "task-text";
            span.textContent = task.text;

            span.addEventListener("click", function () {
                toggleTask(index);
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";

            deleteBtn.addEventListener("click", function () {
                deleteTask(index);
            });

            li.appendChild(span);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });

        const remainingTasks = tasks.filter(function (task) {
            return !task.completed;
        }).length;

        taskCount.textContent =
            remainingTasks + " tasks remaining";
    }

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        tasks.push({
            text: taskText,
            completed: false
        });

        saveTasks();
        displayTasks();

        taskInput.value = "";
        taskInput.focus();
    }

    // Mark task as completed
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;

        saveTasks();
        displayTasks();
    }

    // Delete task
    function deleteTask(index) {
        tasks.splice(index, 1);

        saveTasks();
        displayTasks();
    }

    // Add button click event
    addBtn.addEventListener("click", addTask);

    // Add task using Enter key
    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Show saved tasks when page loads
    displayTasks();

});
