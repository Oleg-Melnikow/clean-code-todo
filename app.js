const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskTitle) {
  const taskItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskTitle;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const taskItem = createNewTaskElement(taskInput.value);

  incompleteTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  taskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;
  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditMode = taskItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const tasksList = taskItem.parentNode;
  tasksList.removeChild(taskItem);
};

const toggleTaskStatus = function () {
  const taskItem = this.parentNode;
  const isChecked = this.checked;
  const targetHolder = isChecked ? completedTasksList : incompleteTaskList;

  targetHolder.append(taskItem);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = (taskListItem) => {
  const getElement = (selector) => taskListItem.querySelector(selector);

  getElement('button.edit').addEventListener('click', editTask);
  getElement('button.delete').addEventListener('click', deleteTask);
  getElement('input[type=checkbox]').addEventListener('change', toggleTaskStatus);
};

const initExistingTasks = () => {
  [...incompleteTaskList.children].forEach((task) => bindTaskEvents(task));
  [...completedTasksList.children].forEach((task) => {
    task.querySelector('input[type=checkbox]').checked = true;
    bindTaskEvents(task);
  });
};

initExistingTasks();
