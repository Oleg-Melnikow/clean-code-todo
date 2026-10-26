const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createNewElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.assign(element, attributes);

  return element;
};

const createNewTaskElement = (taskTitle) => {
  const checkBox = createNewElement('input', { type: 'checkbox' });
  const label = createNewElement('label', { className: 'task', textContent: taskTitle });
  const editInput = createNewElement('input', { type: 'text', className: 'task' });
  const editButton = createNewElement('button', { className: 'edit' }, 'Edit');

  const deleteButton = createNewElement('button', { className: 'delete' });
  const deleteButtonImg = createNewElement('img', { src: './remove.svg', alt: 'remove' });
  deleteButton.append(deleteButtonImg);

  const taskItem = createNewElement('li');
  taskItem.append(checkBox, label, editInput, editButton, deleteButton);

  return taskItem;
};

const addTask = function () {
  const taskTitle = taskInput.value.trim();
  if (!taskTitle) return;
  const taskItem = createNewTaskElement(taskTitle);

  incompleteTaskList.append(taskItem);
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
    const taskText = editInput.value.trim();
    if (!taskText) return;

    label.textContent = editInput.value;
    editButton.textContent = 'Edit';
  } else {
    editInput.value = label.textContent;
    editButton.textContent = 'Save';
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
