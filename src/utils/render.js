import Abstract from "../view/abstract.js";

export const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, child, place) => {
  let containerElement = container;
  let childElement = child;

  if (containerElement instanceof Abstract) {
    containerElement = container.getElement();
  }

  if (childElement instanceof Abstract) {
    childElement = child.getElement();
  }

  switch (place) {
    case renderPosition.AFTERBEGIN:
      containerElement.prepend(childElement);
      break;
    case renderPosition.BEFOREEND:
      containerElement.append(childElement);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  let containerElement = container;

  if (containerElement instanceof Abstract) {
    containerElement = container.getElement();
  }
  containerElement.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }
  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};
