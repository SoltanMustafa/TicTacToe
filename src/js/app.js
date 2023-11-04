import View from './view.js';
import Model from './model.js'


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


function init() {
  const view = new View();
  const model = new Model(players);

  view.bindGameResetEvent(event => {
    event.preventDefault();
    view.closeNotification();
    model.reset();
    view.clearMoves();
    view.setTurnIndicator(model.game.currentPlayer);
    view.updateScoreBord(model.stats.playerWithStats[0].wins, model.stats.playerWithStats[1].wins, model.stats.draw)
  });

  view.bindNewRoundEvent(event => {
    event.preventDefault();
    model.newRound();
    view.closeNotification();
    view.clearMoves();
    view.setTurnIndicator(model.game.currentPlayer);
    view.updateScoreBord(model.stats.playerWithStats[0].wins, model.stats.playerWithStats[1].wins, model.stats.draw)
  });

  view.bindPlayerMoveEvent((box) => {

    const existingMove = model.game.moves.find((move) => move.boxId === +box.id);

    if (existingMove){
      return;
    }

    //Place an icon of the current player in a box
    view.handlePlayerMove(box, model.game.currentPlayer);

    //Advance to the next state by pushing a move to the moves array
    model.playerMove(+box.id)

    if (model.game.status.isComplete){

      view.openNotification(model.game.status.winner ? `${model.game.status.winner.name} wins!` : 'It is Draw!')
      return
    }

    //Set the next player's turn indicator
    view.setTurnIndicator(model.game.currentPlayer);


  });

}

window.addEventListener("load", init);
