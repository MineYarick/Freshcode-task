let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.className = "delete-btn";

    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(li, index);
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    input.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(liElement, index) {
  liElement.classList.add("removing");

  liElement.addEventListener("transitionend", () => {
    tasks.splice(index, 1);
    renderTasks();
  }, { once: true });
}

document.getElementById("addBtn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();