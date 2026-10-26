//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTaskList = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedTasksList = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
const createNewTaskElement = function (taskTitle) {
  const taskItem = document.createElement('li');

  //input (checkbox)
  const checkBox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteButtonImg = document.createElement('img'); //delete button image

  label.innerText = taskTitle;
  label.className = 'task';

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const taskItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  taskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditMode = taskItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const tasksList = taskItem.parentNode;
  //Remove the parent list item from the ul.
  tasksList.removeChild(taskItem);
};

const toggleTaskStatus = function () {
  const taskItem = this.parentNode;
  const isChecked = this.checked;
  const targetHolder = isChecked ? completedTasksList : incompleteTaskList;

  targetHolder.append(taskItem);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);

const bindTaskEvents = (taskListItem) => {
  const getElement = (selector) => taskListItem.querySelector(selector);

  getElement('button.edit').addEventListener('click', editTask);
  getElement('button.delete').addEventListener('click', deleteTask);
  getElement('input[type=checkbox]').addEventListener('change', toggleTaskStatus);
};

//cycle over incompleteTaskHolder ul list items
//cycle over completedTasksHolder ul list items

const initExistingTasks = () => {
  [...incompleteTaskList.children].forEach((task) => bindTaskEvents(task));
  [...completedTasksList.children].forEach((task) => {
    task.querySelector('input[type=checkbox]').checked = true;
    bindTaskEvents(task);
  });
};

initExistingTasks();

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
