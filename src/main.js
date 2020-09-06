const TASK_COUNT = 22;
const TASKS_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
import {
  renderTemplate,
  renderElement,
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

renderElement(siteHeaderElement, new SiteMenuView().getElement(), renderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters).getElement(), renderPosition.BEFOREEND);

const boardComponent = new BoardView();
renderElement(siteMainElement, boardComponent.getElement(), renderPosition.BEFOREEND);
renderElement(boardComponent.getElement(), new SortView().getElement(), renderPosition.AFTERBEGIN);

const taskListComponent = new TaskListView();
renderElement(boardComponent.getElement(), taskListComponent.getElement(), renderPosition.BEFOREEND);
renderElement(taskListComponent.getElement(), new TaskEditView(tasks[0]).getElement(), renderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASKS_COUNT_PER_STEP); i++) {
  renderElement(taskListComponent.getElement(), new TaskView(tasks[i]).getElement(), renderPosition.BEFOREEND);
}

if (tasks.length > TASKS_COUNT_PER_STEP) {
  let renderedTasksCount = TASKS_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();
  renderElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), renderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    let renderedTasksPerStep = ``;
    evt.preventDefault();
    tasks
      .slice(renderedTasksCount, renderedTasksCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => (renderedTasksPerStep += createTaskTemplate(task)));

    renderTemplate(taskListComponent.getElement(), renderedTasksPerStep, renderPosition.BEFOREEND);

    renderedTasksCount += TASKS_COUNT_PER_STEP;

    if (renderedTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
