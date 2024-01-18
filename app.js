const mainArea = document.querySelector(".mainArea");
const inputTodo = document.querySelector(".inputTodo");
const toDoListArea = document.querySelector(".toDoList");
const addTaskButton = document.querySelector(".addTaskButton");
const title = document.querySelector(".title");
const themeSwitchButton = document.querySelector(".themeSwitch");
const toggler = document.querySelector(".themeToggler");

let index = 0;

// change the background theme: light/dark

// themeSwitchButton.addEventListener("click", () => {
//   mainArea.classList.add("dark");
//   title.classList.add("darkTitle");
//   inputTodo.classList.add("darkInput");
//   addTaskButton.classList.add("darkAddTaskButton");
//   toDoListArea.querySelector("span").classList.add("darkFont");
// });

themeSwitchButton.addEventListener("click", changeTheme);
function changeTheme() {
  mainArea.classList.toggle("dark");
  title.classList.toggle("darkTitle");
  toggler.classList.toggle("darkToggler");
  inputTodo.classList.toggle("darkInput");
  addTaskButton.classList.toggle("darkAddTaskButton");
  if (toDoListArea.querySelector("span") !== null) {
    Object.values(toDoListArea.querySelectorAll("span")).forEach((value) => {
      value.classList.toggle("darkToggler");
    });
  }
}

// add task in todo list
function addTask(e) {
  index++;
  e.preventDefault();
  //   console.log("started working");
  // create a new list item to add task
  const newListItem = document.createElement("li");
  // Assign class to list element
  newListItem.className = `task_${index}`;

  // create child elements of list elements
  const taskText = document.createElement("span");
  const editButton = document.createElement("button");
  const completedButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  //   Add values and className to each child elements
  if (inputTodo.value.trim() === "") {
    alert("Task description is empty. Enter a task to add");
    return;
  }
  //   console.log(inputTodo.value);
  taskText.textContent = inputTodo.value.trim();
  newListItem.appendChild(taskText);

  editButton.innerText = "edit";
  editButton.classList.add(`editButton_${index}`);
  completedButton.innerText = "completed";
  completedButton.classList.add(`completedButton_${index}`);

  deleteButton.innerText = "delete";
  deleteButton.classList.add(`deleteButton_${index}`);

  newListItem.appendChild(editButton);
  newListItem.appendChild(completedButton);
  newListItem.appendChild(deleteButton);

  toDoListArea.appendChild(newListItem);

  //edit task
  editButton.addEventListener("click", editTask);

  //mark task is completed on clicking completed button
  completedButton.addEventListener("click", markTaskcompleted);

  //delete task
  deleteButton.addEventListener("click", deleteTask);

  // clear the input field
  inputTodo.value = "";
}

// function to edit task
const editTask = (e) => {
  let classIndex = e.target.className.split("_")[1];
  let task = document.querySelector(`.task_${classIndex}`);
  let taskText = task.querySelector("span");

  const newText = prompt("Edit task:", taskText.textContent);
  if (newText !== null) {
    taskText.textContent = newText;
  }
};

// function to mark a task completed
const markTaskcompleted = (e) => {
  //   console.log(e.target); // working
  let classIndex = e.target.className.split("_")[1];
  //   console.log(classIndex); // working
  let task = document.querySelector(`.task_${classIndex}`);
  //   console.log(task); // working
  //   console.log(task.querySelector("span")); // working
  let text = task.querySelector("span").textContent;
  task.querySelector("span").innerHTML = `<del>${text}<del>`;
};

// function to delete a task
const deleteTask = (e) => {
  let classIndex = e.target.className.split("_")[1];
  let task = document.querySelector(`.task_${classIndex}`);
  toDoListArea.removeChild(task);
};

const inputForm = document.querySelector(".inputTodoForm");
inputForm.addEventListener("submit", addTask);
