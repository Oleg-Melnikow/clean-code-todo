const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.btn--add');
const incompleteTaskList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

const createNewElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.assign(element, attributes);

  return element;
};

const createNewTaskElement = (taskTitle) => {
  const checkBox = createNewElement('input', { type: 'checkbox', className: 'task__checkbox' });
  const label = createNewElement('label', { className: 'task__label', textContent: taskTitle });
  const editInput = createNewElement('input', { type: 'text', className: 'task__input field' });

  const editButton = createNewElement('button', {
    className: 'btn btn--edit',
    textContent: 'Edit',
  });

  const deleteButton = createNewElement('button', { className: 'btn btn--del' });
  const deleteButtonImg = createNewElement('img', { src: './remove.svg', alt: 'Delete' });
  deleteButton.append(deleteButtonImg);

  const taskItem = createNewElement('li', { className: 'task' });
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
  const editInput = taskItem.querySelector('.task__input');
  const label = taskItem.querySelector('.task__label');
  const editButton = taskItem.querySelector('.btn--edit');
  const isEditMode = taskItem.classList.contains('task--edit-mode');

  if (isEditMode) {
    const taskText = editInput.value.trim();
    if (!taskText) return;

    label.textContent = taskText;
    editButton.textContent = 'Edit';
  } else {
    editInput.value = label.textContent;
    editButton.textContent = 'Save';
  }

  taskItem.classList.toggle('task--edit-mode');
};

const deleteTask = (event) => {
  const taskItem = event.target.closest('.task');
  taskItem?.remove();
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

  getElement('.btn--edit').addEventListener('click', editTask);
  getElement('.btn--del').addEventListener('click', deleteTask);
  getElement('.task__checkbox').addEventListener('change', toggleTaskStatus);
};

const initExistingTasks = () => {
  [...incompleteTaskList.children].forEach((task) => bindTaskEvents(task));
  [...completedTasksList.children].forEach((task) => {
    const checkbox = task.querySelector('.task__checkbox');
    if (checkbox) checkbox.checked = true;
    bindTaskEvents(task);
  });
};

initExistingTasks();
