import {
  COLORS
} from "../constants.js";
import {
  getRandomInteger
} from "../utils/common.js";

const generateDescription = () => {
  const description = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];

  return description[getRandomInteger(0, description.length - 1)];
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));
  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

const generateRepeating = () => {
  return {
    mo: Boolean(getRandomInteger(0, 1)),
    tu: Boolean(getRandomInteger(0, 1)),
    we: Boolean(getRandomInteger(0, 1)),
    th: Boolean(getRandomInteger(0, 1)),
    fr: Boolean(getRandomInteger(0, 1)),
    sa: Boolean(getRandomInteger(0, 1)),
    su: Boolean(getRandomInteger(0, 1))
  };
};

const getRandomColor = () => {

  return COLORS[getRandomInteger(0, COLORS.length - 1)];
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null ?
    generateRepeating() : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: generateDescription(),
    dueDate,
    repeating,
    color: getRandomColor(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isArchive: Boolean(getRandomInteger(0, 1))
  };
};
