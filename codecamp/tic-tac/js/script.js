(function(){
  // game class
  var Game = function() {
    // private attribute
    var graphic = [];
    this.playerLetter = '';
    this.computerLetter = '';
    this.play = 0;
    // player, computer, ties
    this.score = [0, 0, 0];
    var board = ['', '', '',
                 '', '', '',
                 '', '', ''];

    this.refreshScore = function() {
      var doc = document;
      doc.getElementById('player').innerHTML = this.score[0];
      doc.getElementById('computer').innerHTML = this.score[1];
      doc.getElementById('tie').innerHTML = this.score[2];
    };

    // public method
    this.getLetter = function() {
      this.playerLetter =  prompt('X or O?').toUpperCase();
      this.computerLetter = this.playerLetter === 'X' ? 'O' : 'X';
    };
    // public method
    this.resetBoard = function() {
      board = ['', '', '', '', '', '', '', '', ''];
      this.play = 0;
    };

    this.getBoard = function() {
      return board;
    };

    this.copyBoard = function() {
      var cloneBoard = [];
      for (var j in board) {
        cloneBoard.push(board[j]);
      }
      return cloneBoard;
    };

    this.whoGoesFirst = function() {
      if (Math.floor(Math.random() * 2 - 1) === 0) {
        console.log('computer');
        return 'computer';
      } else {
        console.log('player');
        return 'player';
      }
    };

    this.printBoard = function() {
      var cells = document.querySelectorAll('.cell');
      graphic = [];
      for (var i = 0; i < cells.length; i++) {
        graphic.push(cells[i].innerHTML);
        cells[i].innerHTML = board[i];
        cells[i].className = 'cell ' + (board[i] === 'X' ? 'yellow' : 'blue');
      }
      return graphic;
    };

    this.nextTurn = function() {
      this.makeMove(this.getBoard(), this.computerMove(), this.computerLetter);
      this.printBoard();
      if (this.isBoardFull()) {
        document.getElementById('message').innerHTML = 'It\'s a tie!';
        this.score[2]++;
        this.playAgain();
      } else if (this.isWinner(this.getBoard(), this.computerLetter)) {
        document.getElementById('message').innerHTML = 'You\'ve lost :(';
        this.score[1]++;
        this.playAgain();
      }
    };

    this.isWinner = function(board, letter) {
              // across the board
      return ((board[0] === letter && board[1] === letter && board[2] === letter) ||
              (board[3] === letter && board[4] === letter && board[5] === letter) ||
              (board[6] === letter && board[7] === letter && board[8] === letter) ||
              // down the board
              (board[0] === letter && board[3] === letter && board[6] === letter) ||
              (board[1] === letter && board[4] === letter && board[7] === letter) ||
              (board[2] === letter && board[5] === letter && board[8] === letter) ||
              // diagonal
              (board[0] === letter && board[4] === letter && board[8] === letter) ||
              (board[2] === letter && board[4] === letter && board[6] === letter)
            );
    };

    this.playAgain = function() {
      this.resetBoard();
      this.refreshScore();
    };

    this.isFreeSpace = function(board, move) {
      return board[move] === '';
    };

    this.isBoardFull = function() {
      for (var i = 0; i < 10; i++) {
        if (this.isFreeSpace(board, i)) {
          return false;
        }
      }
      return true;
    };

    this.makeMove = function(board, position, letter) {
      board[position] = letter;
    };

    this.chooseRandomMove = function(board, movesList) {
      for (var i = 0; i < movesList.length; i++) {
        if (this.isFreeSpace(board, movesList[i])) {
          return movesList[i];
        }
      }
    };

    this.computerMove = function() {
      // check if can win in the next move
      for (var i = 0; i < 10; i++) {
        var copy = this.copyBoard();
        if (this.isFreeSpace(copy, i)) {
          this.makeMove(copy, i, this.computerLetter);
          if (this.isWinner(copy, this.computerLetter)) {
            this.play++;
            return i;
          }
        }
      }
      // check if the player can win in the next move and block
      for (var i = 0; i < 10; i++) {
        var copy = this.copyBoard();
        if (this.isFreeSpace(copy, i)) {
          this.makeMove(copy, i, this.playerLetter);
          if (this.isWinner(copy, this.playerLetter)) {
            this.play++;
            return i;
          }
        }
      }
      // check if the player has played a corner
      console.log(this.play);
      if (this.play === 1) {
        console.log('first play!!');
        for (var i = 0; i < 10; i++) {
          var copy = this.copyBoard();
          if (i === 0 || i === 2 || i === 6 || i === 8) {
            if (!(this.isFreeSpace(copy, i)) && this.isFreeSpace(copy, 4)) {
              this.play++;
              return 4;
            }
          }
        }
      }

      // check if player has two opposite corners (fork)
      if (board[0] === this.playerLetter && board[8] === this.playerLetter ||
          board[2] === this.playerLetter && board[6] === this.playerLetter) {
        this.play++;
        return this.chooseRandomMove(this.copyBoard(), [1, 3, 5, 7]);
      }

      // https://en.wikipedia.org/wiki/Tic-tac-toe
      // https://inventwithpython.com/chapter10.html
      
      // check if any corner is free
      var move = this.chooseRandomMove(this.copyBoard(), [0, 8, 2, 6]);
      if (move >= 0) {
        this.play++;
        return move;
      }
      // check if center is free
      if (this.isFreeSpace(this.copyBoard(), 4)) return 4;
      // move to one side
      return this.chooseRandomMove(this.copyBoard(), [1, 3, 5, 7]);
    };
  };
  var tic = new Game();
  tic.getLetter();
  if (tic.whoGoesFirst() === 'player') {
    console.log('Your turn!');
  } else {
    tic.makeMove(tic.getBoard(), tic.computerMove(), tic.computerLetter);
    tic.printBoard();
  }

  // events
  window.addEventListener('DOMContentLoaded', ready, false);
  function ready() {
    window.addEventListener('click', clickEvent, false);
  }

  function clickEvent(e) {
    var el = e.target;
    if (el.nodeName.toLowerCase() === 'td') {
      var screenIndex = el.getAttribute('data-cell');
      if (tic.isFreeSpace(tic.getBoard(), screenIndex)) {
        tic.makeMove(tic.getBoard(), screenIndex, tic.playerLetter);
        tic.play++;
        tic.printBoard();

        if (tic.isBoardFull()) {
          document.getElementById('message').innerHTML = 'It\'s a tie!';
          tic.score[2]++;
          tic.playAgain();
        } else if (tic.isWinner(tic.getBoard(), tic.playerLetter)) {
          document.getElementById('message').innerHTML = 'Congratulations! You\'ve won!';
          tic.score[0]++;
          tic.playAgain();
        }
        tic.nextTurn();
        tic.printBoard();
      }
    }
  }
}());