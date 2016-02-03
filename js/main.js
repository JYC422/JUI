console.log("J U I loaded");

var timer;
var timer2;
var cell;
var curCount = 0;
var gameLost = false;
var multiUp = 0;
var total = 10;
var score = 0;
// var totalScore = function() {
//     (1 + (multiUp * 0.1)) * score;
// };

var board = [ 0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0];

var cellTypes = [
  {name: "empty", type: 0, color: "white"},
  {name: "normal", type: 1, color: "black"},
  {name: "freeze", type: 2, color: "blue"}, // increases interval temporarily
  {name: "multi", type: 3, color: "green"}, // score multiplier x1.1
  {name: "max", type: 4, color: "yellow"},  // adds 1 to max
  {name: "super", type: 5, color: "red"}, // clears the board
];

// EFFECTS
var freezeEffect = function() {

};
var multiEffect = function() {
  multiUp++;
};
var maxEffect = function() {
  total++;
};
var superEffect = function() {

};

// LOSING
var hasLost = function() {
  var count = 0;
  for (var i = 0; i < board.length; i++) {
    if (board[i] > 0 && board[i] < 2) count++;
    if (count > total) break;
  };
  curCount = count;
  return count > total;
};
var printState = function() {
  $("#max2").text(curCount);
  $("#max4").text(total);
  $("#score2").text(score);
};


// GAMEBOARD
var pickCell = function() {
  var randomIndex;
  var randomType = function() {
    var randomNum = Math.floor((Math.random() * 100) + 1);
    if (randomNum < 88) {
      return randomType = 1;
    } else if (randomNum < 91) {
      return randomType = 2;
    } else if (randomNum < 94) {
      return randomType = 3;
    } else if (randomNum < 97) {
      return randomType = 4;
    } else {
      return randomType = 5;
    };
  };
  do {
    randomIndex = Math.floor(Math.random() * board.length);
  }
  while (board[randomIndex] !== 0);
  board[randomIndex] = randomType();
  var disappear = $("#cell" + randomIndex);
  if (randomType > 1) {
    setTimeout(function() {
      board[randomIndex] = 0;
    }, 1000);
  };
};


// MOVE
var click = function(evt) {
  clickValue = parseInt(this.id.substr(4));
  if (board[clickValue] === 1) {
    score += 10;
  } else if (board[clickValue] === 2) {
    freezeEffect();
  } else if (board[clickValue] === 3) {
    multiEffect();
  } else if (board[clickValue] === 4) {
    maxEffect();
  } else if (board[clickValue] === 5) {
    superEffect();
  }
  board[clickValue] = 0;
  render();
};


// RENDER
var render = function() {
  if (gameLost === false) {
    renderBoard();
  };
  function renderBoard() {
    board.forEach(function(cell, idx) {
      var el = $('#cell' + idx);
      el.css('background-color', cellTypes[cell].color);
    });
  };
};


// START
var tick = function() {
  printState();
  if (hasLost()) {
    clearInterval(timer);
    clearInterval(timer2);
    gameLost = true;
    console.log("YOU LOSE!");
  }
  printState();
};
var tickCell = function() {
  pickCell();
  render();
};
var startGame = function() {
  clearInterval(timer);
  clearInterval(timer2);
  console.log("STARTING GAME");
  tick();
  timer = setInterval(tick, 10);
  tickCell();
  timer2 = setInterval(tickCell, 700);
};

var start = document.getElementById("startgame");
  setTimeout(function() {
    start.onclick = startGame();
  }, 1000);


// STUFF
document.addEventListener("DOMContentLoaded", function(evt) {

  var cellEls = document.querySelectorAll("td");
  cellEls[0].addEventListener("click", click);
  cellEls[1].addEventListener("click", click);
  cellEls[2].addEventListener("click", click);
  cellEls[3].addEventListener("click", click);
  cellEls[4].addEventListener("click", click);
  cellEls[5].addEventListener("click", click);
  cellEls[6].addEventListener("click", click);
  cellEls[7].addEventListener("click", click);
  cellEls[8].addEventListener("click", click);
  cellEls[9].addEventListener("click", click);
  cellEls[10].addEventListener("click", click);
  cellEls[11].addEventListener("click", click);

  cellEls[12].addEventListener("click", click);
  cellEls[13].addEventListener("click", click);
  cellEls[14].addEventListener("click", click);
  cellEls[15].addEventListener("click", click);
  cellEls[16].addEventListener("click", click);
  cellEls[17].addEventListener("click", click);
  cellEls[18].addEventListener("click", click);
  cellEls[19].addEventListener("click", click);
  cellEls[20].addEventListener("click", click);
  cellEls[21].addEventListener("click", click);
  cellEls[22].addEventListener("click", click);
  cellEls[23].addEventListener("click", click);

  cellEls[24].addEventListener("click", click);
  cellEls[25].addEventListener("click", click);
  cellEls[26].addEventListener("click", click);
  cellEls[27].addEventListener("click", click);
  cellEls[28].addEventListener("click", click);
  cellEls[29].addEventListener("click", click);
  cellEls[30].addEventListener("click", click);
  cellEls[31].addEventListener("click", click);
  cellEls[32].addEventListener("click", click);
  cellEls[33].addEventListener("click", click);
  cellEls[34].addEventListener("click", click);
  cellEls[35].addEventListener("click", click);

  cellEls[36].addEventListener("click", click);
  cellEls[37].addEventListener("click", click);
  cellEls[38].addEventListener("click", click);
  cellEls[39].addEventListener("click", click);
  cellEls[40].addEventListener("click", click);
  cellEls[41].addEventListener("click", click);
  cellEls[42].addEventListener("click", click);
  cellEls[43].addEventListener("click", click);
  cellEls[44].addEventListener("click", click);
  cellEls[45].addEventListener("click", click);
  cellEls[46].addEventListener("click", click);
  cellEls[47].addEventListener("click", click);

  cellEls[48].addEventListener("click", click);
  cellEls[49].addEventListener("click", click);
  cellEls[50].addEventListener("click", click);
  cellEls[51].addEventListener("click", click);
  cellEls[52].addEventListener("click", click);
  cellEls[53].addEventListener("click", click);
  cellEls[54].addEventListener("click", click);
  cellEls[55].addEventListener("click", click);
  cellEls[56].addEventListener("click", click);
  cellEls[57].addEventListener("click", click);
  cellEls[58].addEventListener("click", click);
  cellEls[59].addEventListener("click", click);

  cellEls[60].addEventListener("click", click);
  cellEls[61].addEventListener("click", click);
  cellEls[62].addEventListener("click", click);
  cellEls[63].addEventListener("click", click);
  cellEls[64].addEventListener("click", click);
  cellEls[65].addEventListener("click", click);
  cellEls[66].addEventListener("click", click);
  cellEls[67].addEventListener("click", click);
  cellEls[68].addEventListener("click", click);
  cellEls[69].addEventListener("click", click);
  cellEls[70].addEventListener("click", click);
  cellEls[71].addEventListener("click", click);

  cellEls[72].addEventListener("click", click);
  cellEls[73].addEventListener("click", click);
  cellEls[74].addEventListener("click", click);
  cellEls[75].addEventListener("click", click);
  cellEls[76].addEventListener("click", click);
  cellEls[77].addEventListener("click", click);
  cellEls[78].addEventListener("click", click);
  cellEls[79].addEventListener("click", click);
  cellEls[80].addEventListener("click", click);
  cellEls[81].addEventListener("click", click);
  cellEls[82].addEventListener("click", click);
  cellEls[83].addEventListener("click", click);

  cellEls[84].addEventListener("click", click);
  cellEls[85].addEventListener("click", click);
  cellEls[86].addEventListener("click", click);
  cellEls[87].addEventListener("click", click);
  cellEls[88].addEventListener("click", click);
  cellEls[89].addEventListener("click", click);
  cellEls[90].addEventListener("click", click);
  cellEls[91].addEventListener("click", click);
  cellEls[92].addEventListener("click", click);
  cellEls[93].addEventListener("click", click);
  cellEls[94].addEventListener("click", click);
  cellEls[95].addEventListener("click", click);
});
