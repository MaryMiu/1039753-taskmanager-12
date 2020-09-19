const TASK_COUNT = 22;

import {
  render,
  renderPosition
} from "./utils/render.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import BoardPresenter from "./presenter/board.js";
import {
  generateTask
} from "./mock/task.js";
import {
  generateFilter
} from "./mock/filter.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new SiteMenuView(), renderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), renderPosition.BEFOREEND);
boardPresenter.init(tasks);
