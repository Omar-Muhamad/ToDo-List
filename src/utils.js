function changeStatus(event) {
  if (event.target.classList.contains('checkBox')) {
    const itemText = event.target.parentElement.querySelector('.toDoText');
    itemText.classList.toggle('checked');
    itemText.contentEditable = !event.target.checked;
    const storedData = JSON.parse(localStorage.getItem('storedData'));
    const { index } = event.target.dataset;
    const taskIndex = storedData.findIndex((item) => item.index.toString() === index);
    storedData[taskIndex].completed = event.target.checked;
    localStorage.setItem('storedData', JSON.stringify(storedData));
  }
}

export default changeStatus;