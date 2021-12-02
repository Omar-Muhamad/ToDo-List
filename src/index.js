import './style.css';
import changeStatus from './utils.js';

const data = [
  {
    description: 'Workout',
    completed: false,
    index: 2,
  },
  {
    description: 'Finish today Lessons',
    completed: false,
    index: 1,
  },
  {
    description: 'Grocery Shopping',
    completed: false,
    index: 3,
  },
];

function add(data) {
  const listItems = document.getElementById('listItems');
  const checked = data.completed;
  const item = `
    <li class="item" data-index=${data.index}>
      <input  ${checked === true ? 'checked' : ''} type="checkbox" class="checkBox" data-index=${data.index}>
      <p type="text" contenteditable class="toDoText  ${checked === true ? 'checked' : ''}" data-index=${data.index}>${data.description}</p>
      <button class="deleteBtn" data-index=${data.index}><i class="far fa-trash-alt" ></i></button>
    </li>
  `;
  listItems.innerHTML += item;
}

function initialLoad() {
  const storedData = JSON.parse(localStorage.getItem('storedData')) || data;
  if (storedData) {
    storedData.sort((a, b) => (a.index - b.index))
      .forEach((data) => {
        add(data);
      });
  }
  localStorage.setItem('storedData', JSON.stringify(storedData));

  const listItems = document.getElementById('listItems');
  listItems.addEventListener('change', changeStatus);
}

initialLoad();
