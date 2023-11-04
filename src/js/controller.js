export default class Controller {
  constructor(view, model){
    this.model = model;
    this.view = view;
  };

  
  
  init() {
  
    this.view.bindGameResetEvent(event => {
      event.preventDefault();
      this.view.closeNotification();
      this.model.reset();
      this.view.clearMoves();
      this.view.setTurnIndicator(this.model.game.currentPlayer);
      this.view.updateScoreBord(this.model.stats.playerWithStats[0].wins, this.model.stats.playerWithStats[1].wins, this.model.stats.draw)
    });
  
    this.view.bindNewRoundEvent(event => {
      event.preventDefault();
      this.model.newRound();
      this.view.closeNotification();
      this.view.clearMoves();
      this.view.setTurnIndicator(this.model.game.currentPlayer);
      this.view.updateScoreBord(this.model.stats.playerWithStats[0].wins, this.model.stats.playerWithStats[1].wins, this.model.stats.draw)
    });
  
    this.view.bindPlayerMoveEvent((box) => {
  
      const existingMove = this.model.game.moves.find((move) => move.boxId === +box.id);
  
      if (existingMove){
        return;
      }
  
      //Place an icon of the current player in a box
      this.view.handlePlayerMove(box, this.model.game.currentPlayer);
  
      //Advance to the next state by pushing a move to the moves array
      this.model.playerMove(+box.id)
  
      if (this.model.game.status.isComplete){
  
        this.view.openNotification(this.model.game.status.winner ? `${this.model.game.status.winner.name} wins!` : 'It is Draw!')
        return
      }
  
      //Set the next player's turn indicator
      this.view.setTurnIndicator(this.model.game.currentPlayer);
  
  
    });
  
  }
  
}

// window.addEventListener("load", init);