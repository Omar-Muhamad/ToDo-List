import {
  addTask, removeTask, removeCompletedTasks, editTask,
} from './taskUtils.js';

const changeStatus = (event) => {
  const itemText = event.target.parentElement.querySelector('.toDoText');
  itemText.classList.toggle('checked');
  itemText.contentEditable = !event.target.checked;
  const storedData = JSON.parse(localStorage.getItem('storedData'));
  const { index } = event.target.dataset;
  const taskIndex = storedData.findIndex((item) => item.index.toString() === index);
  storedData[taskIndex].completed = event.target.checked;
  localStorage.setItem('storedData', JSON.stringify(storedData));
};

const renderTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('storedData'));
  const listItems = document.getElementById('listItems');
  listItems.innerHTML = '';
  if (!tasks.length) return;
  tasks.sort((a, b) => (a.index - b.index)).forEach((task) => {
    const checked = task.completed;
    const item = `
      <li class="item" data-index=${task.index}>
        <input  ${checked === true ? 'checked' : ''} type="checkbox" class="checkBox" data-index=${task.index}>
        <p type="text" contenteditable class="toDoText  ${checked === true ? 'checked' : ''}" data-index=${task.index}>${task.description}</p>
        <button class="deleteBtn" data-index=${task.index}><i class="far fa-trash-alt" ></i></button>
      </li>
    `;
    listItems.innerHTML += item;
  });
};

const addEventListeners = () => {
  const listItems = document.getElementById('listItems');
  const form = document.querySelector('.form');
  const clearAllBtn = document.querySelector('.clearCompleted');

  listItems.addEventListener('change', (event) => {
    if (event.target.classList.contains('checkBox')) {
      changeStatus(event);
    }
  });

  listItems.addEventListener('input', (event) => {
    if (event.target.classList.contains('toDoText')) {
      editTask(parseInt(event.target.dataset.index, 10), event.target.textContent);
    }
  });

  listItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn') || e.target.parentElement.classList.contains('deleteBtn')) {
      removeTask(parseInt(e.target.dataset.index || e.target.parentElement.dataset.index, 10));
      renderTasks();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    addTask(data.description);
    renderTasks();
  });

  clearAllBtn.addEventListener('click', () => {
    removeCompletedTasks();
    renderTasks();
  });
};
export { renderTasks, changeStatus, addEventListeners };