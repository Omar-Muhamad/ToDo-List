import './style.css';
import { addEventListeners, renderTasks } from './utils.js';

const initialLoad = () => {
  const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
  localStorage.setItem('storedData', JSON.stringify(storedData));
  renderTasks();
  addEventListeners();
};

initialLoad();
