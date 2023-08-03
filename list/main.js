const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);
/*When the page is fully loaded (DOMContentLoaded event),
 we call the loadTasks function to load tasks from localStorage 
 and display them on the page.*/

// Add new task to the list
function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName === '') return;

  const taskItem = createTaskItem(taskName);
  taskList.appendChild(taskItem);

  saveTasksToLocalStorage();
  taskInput.value = '';
}
/*When the user adds a new task, we get the input value,
 trim any extra spaces, and create a new task item by calling the createTaskItem */ 

 

// Create a new task item
function createTaskItem(name) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${name}</span>
    <div>
      <button class="delete" onclick="deleteTask(this)">Delete</button>
      <button onclick="editTask(this)">Update</button>
    </div>
  `;
  return li;
}
/*The createTaskItem function takes a task name and creates an HTML list item (li)
 with buttons for deleting and updating the task.*/ 


// Delete a task from the list
function deleteTask(btn) {
  const listItem = btn.parentNode.parentNode;
  taskList.removeChild(listItem);

  saveTasksToLocalStorage();
}
/*When the user clicks the "Delete" button, the deleteTask function is called,
 and it removes the corresponding task item from the list. */



// Edit the task name
function editTask(btn) {
  const listItem = btn.parentNode.parentNode;
  const taskName = listItem.querySelector('span').textContent;
  const newName = prompt('Edit task name:', taskName);
  listItem.querySelector('span').textContent = newName.trim();
  saveTasksToLocalStorage();
}
/*When the user clicks the "Update" button, the editTask function is called, 
and it allows the user to edit the task name by using a prompt. */ 
//The new task name is then displayed on the page.



// Save tasks to localStorage
function saveTasksToLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll('li span').forEach(span => tasks.push(span.textContent));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//The saveTasksToLocalStorage function saves the tasks from the list to localStorage, 
//so they are preserved even after the page is reloaded



// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
  });
}
//The loadTasks function retrieves the tasks from localStorage and displays them on the page.
