import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

const players = [
  {
    id: 1,
    name: "Player-1",
    iconClass: "fa-xmark",
    colorClass: "red",
  },
  {
    id: 2,
    name: "Player-2",
    iconClass: "fa-o",
    colorClass: "yellow",
  }
];

function initilize(){
  const model = new Model(players);
  const view = new View(model);
  const controller = new Controller(view, model);

  controller.init();

}

window.addEventListener("DOMContentLoaded", initilize);

