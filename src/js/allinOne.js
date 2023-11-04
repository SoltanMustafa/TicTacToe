
const App ={

    $:{
  
      resetBtn: document.querySelector('[data-id="reset-button"]'),
      newGameBtn: document.querySelector('[data-id="new-game-button"]'),
      boxes: document.querySelectorAll('[data-id="box"]'),
      notification: document.querySelector('[data-id="notification-holder"]'),
      playerWonText: document.querySelector('[data-id="player-won"]'),
      playAgainBtn: document.querySelector('[data-id="play-again-btn"]'),
      turn: document.querySelector('[data-id="x-turn"]'),
  
    },
  
    state:{
  
      moves: [],
  
    },
  
    getGameStatus(moves){
      
      const p1Moves = moves.filter(move => move.playerId === 1).map(move => +move.boxId)
      const p2Moves = moves.filter(move => move.playerId === 2).map(move => +move.boxId)
  
      const winningPatterns = [
        [1, 2, 3],
        [1, 5, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7],
        [4, 5, 6],
        [7, 8, 9],
      ];
  
      let winner = null
      winningPatterns.forEach(pattern => {
  
  
        const p1Wins = pattern.every(v => p1Moves.includes(v))
        const p2Wins = pattern.every(v => p2Moves.includes(v))
  
        if (p1Wins) winner = 1
        if (p2Wins) winner = 2
  
      })
  
      return{
        status: moves.length === 9 || winner != null ? 'complete' : 'in-progress', //in-progress or complete
        winner  // 1 or 2 or null
  
      }
    },
  
    init(){
      App.registerEvents()
    },
  
    registerEvents(){
      console.log(App.$.boxes)
  
      App.$.resetBtn.addEventListener("click", (event) => {
        event.preventDefault();
        console.log('Reset the game');
      });
  
      App.$.newGameBtn.addEventListener("click", (event) => {
        event.preventDefault();
        console.log('Start a new game');
      });
  
      App.$.playAgainBtn.addEventListener("click", event => {
        App.state.moves = [];
        App.$.boxes.forEach(box => box.replaceChildren());
        App.$.notification.classList.add('hidden')
      });
  
      App.$.boxes.forEach(box => {
        box.addEventListener("click", (event) => {
  
          //Check if there is already a play, if so, return early
  
          const hasMove = (boxId) => {
            const existingMove = App.state.moves.find(move => move.boxId === boxId)
            return existingMove !== undefined
          }
  
          if (hasMove(+box.id)){
            return;
          };
  
          //Determine which player icon to add to the box
  
          const lastMove = App.state.moves.at(-1);
  
          const getoppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
  
          const currentPlayer = App.state.moves.length === 0? 1: getoppositePlayer(lastMove.playerId);
  
          const nextPlayer = getoppositePlayer(currentPlayer)
  
          const icon = document.createElement("i");
          const turnIcon = document.createElement("i");
          const turnLabel = document.createElement('p');
          turnLabel.innerText = `Player ${nextPlayer}, you are up!`
  
          if (currentPlayer === 1){
            icon.classList.add('fa-solid', 'fa-xmark')
            turnIcon.classList.add('fa-solid', 'fa-o', 'yellow')
            turnLabel.classList.add('yellow') 
            
          }else{
            icon.classList.add('fa-solid', 'fa-o')
            turnIcon.classList.add('fa-solid', 'fa-xmark', 'red')
            turnLabel.classList.add('red')
          } 
  
          App.$.turn.replaceChildren(turnIcon, turnLabel);
  
          App.state.moves.push({
            boxId: +box.id,
            playerId: currentPlayer,
          });
  
          box.replaceChildren(icon);
  
  
          const game = App.getGameStatus(App.state.moves)
          
          if (game.status === 'complete'){
  
            App.$.notification.classList.remove("hidden");
  
            let message = ''
            if (game.winner){
              message = `Player ${game.winner} wins!`
            }else {
              message = `It Was Draw`
            }
  
            App.$.playerWonText.textContent = message;
          }
  
        });
      });
    }
  
  }
  
  window.addEventListener("load", App.init);
  
  