import './style.css';

const data = [
  {
    description: 'Workout',
    completed: 'false',
    index: 2,
  },
  {
    description: 'Finish today Lessons',
    completed: 'false',
    index: 1,
  },
  {
    description: 'Grocery Shopping',
    completed: 'false',
    index: 3,
  },
];

function add(data) {
  const listItems = document.getElementById('listItems');
  const item = `
    <li class="item" data-id=${data.index}>
      <input type="checkbox" data-id=${data.index}>
      <input type="text" class="toDoItem" value="${data.description}"" data-id=${data.index}>
      <button class="deleteBtn" data-id=${data.index}><i class="far fa-trash-alt" ></i></button>
    </li>
  `;
  listItems.innerHTML += item;
}

function initialLoad(data) {
  data.sort((a, b) => (a.index - b.index))
    .forEach((data) => {
      add(data);
    });
}

initialLoad(data);
