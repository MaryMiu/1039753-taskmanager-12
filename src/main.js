const TASK_COUNT = 22;
const TASKS_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
import {
  render,
  renderPosition
} from "./utils.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import BoardView from "./view/board.js";
import SortView from "./view/sort.js";
import TaskListView from "./view/task-list.js";
import TaskView from "./view/task.js";
import TaskEditView from "./view/task-edit.js";
import LoadMoreButtonView from "./view/load-more-button.js";
import {
  generateTask
} from "./mock/task.js";
import {
  generateFilter
} from "./mock/filter.js";

const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(taskListElement, taskComponent.getElement(), renderPosition.BEFOREEND);
};

render(siteHeaderElement, new SiteMenuView().getElement(), renderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), renderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), renderPosition.BEFOREEND);
render(boardComponent.getElement(), new SortView().getElement(), renderPosition.AFTERBEGIN);

const taskListComponent = new TaskListView();
render(boardComponent.getElement(), taskListComponent.getElement(), renderPosition.BEFOREEND);
render(taskListComponent.getElement(), new TaskEditView(tasks[0]).getElement(), renderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASKS_COUNT_PER_STEP); i++) {
  renderTask(taskListComponent.getElement(), tasks[i]);
}

if (tasks.length > TASKS_COUNT_PER_STEP) {
  let renderedTasksCount = TASKS_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), renderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {

    evt.preventDefault();
    tasks
      .slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => renderTask(taskListComponent.getElement(), task));

    renderedTasksCount += TASKS_COUNT_PER_STEP;

    if (renderedTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
