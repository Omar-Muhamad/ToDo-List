function Task(description, index) {
  this.description = description;
  this.index = index;
  this.completed = false;
}
const addTask = (description) => {
  const storedData = JSON.parse(localStorage.getItem('storedData'));
  const task = new Task(description, storedData.length);
  storedData.push(task);
  localStorage.setItem('storedData', JSON.stringify(storedData));
};
const removeTask = (index) => {
  let storedData = JSON.parse(localStorage.getItem('storedData'));
  storedData = storedData.filter((task) => task.index !== index);
  storedData = storedData.map((t, index) => {
    t.index = index;
    return t;
  });
  localStorage.setItem('storedData', JSON.stringify(storedData));
};

const removeCompletedTasks = () => {
  let storedData = JSON.parse(localStorage.getItem('storedData'));
  storedData = storedData.filter((t) => t.completed !== true);
  storedData = storedData.map((t, index) => {
    t.index = index;
    return t;
  });
  localStorage.setItem('storedData', JSON.stringify(storedData));
};

const editTask = (index, newDescription) => {
  const storedData = JSON.parse(localStorage.getItem('storedData'));
  storedData[index].description = newDescription;
  localStorage.setItem('storedData', JSON.stringify(storedData));
};

export {
  addTask, removeTask, removeCompletedTasks, editTask,
};