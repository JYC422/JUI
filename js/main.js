console.log("J U I loaded");

var timer;
var timer2;
var timer3;
var counter;
var cell;
var curCount = 0;
var gameLost = false;
var multiUp = 0;
var total = 10;
var score = 0;
var points = 100;

var board = [ 0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0];

var cellTypes = [
  {name: "empty",  color: "white"},
  {name: "normal", color: "black"},
  {name: "freeze", color: "blue"},
  {name: "multi",  color: "green"},
  {name: "max",    color: "yellow"},
  {name: "super",  color: "red"}
];

var WHITE  = 0,
    BLACK  = 1,
    BLUE   = 2,
    GREEN  = 3,
    YELLOW = 4,
    RED    = 5;

var randomType = function() {
  var randomNum = Math.floor((Math.random() * 100) + 1);
  if      (randomNum < 88) return BLACK;  // 88%
  else if (randomNum < 91) return BLUE;   // 3%
  else if (randomNum < 94) return GREEN;  // 3%
  else if (randomNum < 97) return YELLOW; // 3%
  else                     return RED;    // 3%
};

// EFFECTS -------------------------------------------------------------
var freezeEffect = function() {
  clearInterval(timer2);
  setTimeout(function() {
    timer2 = setInterval(tickCell, counter);
  }, 2000);
};
var multiEffect = function() {
  multiUp++;
  points = Math.floor((1 + (multiUp * 0.1)) * points);
};
var maxEffect = function() {
  total++;
};
var superEffect = function() {
  for (var i = 0; i < board.length; i++) {
    if (board[i] < 2) board[i] = 0;
  };
};

// LOSING & PRINTSTATE ------------------------------------------------
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


// PICKCELL & FADE ----------------------------------------------------
var pickCell = function() {
  var randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * board.length);
  }
  while (board[randomIndex] !== 0);

  board[randomIndex] = randomType();

  var $fade = $("#cell" + randomIndex);

  if (board[randomIndex] > BLACK) {
    setTimeout(function() {
      $fade.animate({backgroundColor: "white"}, 1200);
      setTimeout(function() {
        board[randomIndex] = 0;
      }, 1180);
    }, 1000);
  };
};


// CLICK MOVE ---------------------------------------------------------
var click = function(evt) {
  clickValue = parseInt(this.id.substr(4));

  if (board[clickValue] > BLACK) {
    $(this).stop()
           .toggle("explode")
           .css({backgroundColor: "white"})
           .fadeIn();
  }

  if (board[clickValue] === BLACK) {
    score += points;
  } else if (board[clickValue] === BLUE) {
    freezeEffect();
    // this.hide("explode", 200);
    // this.show("puff", 150);
  } else if (board[clickValue] === GREEN) {
    multiEffect();
    // this.hide("explode", 200);
    // this.show("puff", 150);
  } else if (board[clickValue] === YELLOW) {
    maxEffect();
    // this.hide("explode", 200);
    // this.show("puff", 150);
  } else if (board[clickValue] === RED) {
    superEffect();
    // this.hide("explode", 200);
    // this.show("puff", 150);
  }
  board[clickValue] = 0;
  render();
};


// RENDER -------------------------------------------------------------
var render = function() {
  if (gameLost === false) renderBoard();
  function renderBoard() {
    board.forEach(function(cell, idx) {
      var el = $('#cell' + idx);
      el.css('background-color', cellTypes[cell].color);
    });
  };
};

// TICKS --------------------------------------------------------------
var tick = function() {
  printState();
  if (hasLost()) {
    clearInterval(timer);
    clearInterval(timer2);
    gameLost = true;
    var lose = function() {
      $(".lose").css({opacity:1});
      setTimeout(function() {
        $(".lose").css({opacity:0});
      }, 400);
    };
    timer3 = setInterval(lose, 800);
  };
  printState();
};

var tickCell = function() {
  pickCell();
  render();
  clearInterval(timer2);
  counter *= 0.99;
  timer2 = setInterval(tickCell, counter);
};


// STARTGAME ----------------------------------------------------------
var startGame = function() {
  for (var i = 0; i < board.length; i++) {
    board[i] = 0;
  };
  curCount = 0;
  gameLost = false;
  multiUp = 0;
  total = 10;
  score = 0;
  points = 100;
  counter = 800;
  printState();
  render();
  clearInterval(timer3);
  clearInterval(timer2);
  clearInterval(timer);
  timer = setInterval(tick, 10);
  timer2 = setInterval(tickCell, counter);
};


// BUTTONS ------------------------------------------------------------
$("#startgame").on('click', function() {
  $(".one").css("display", "none");
  $(".two").css("display","inline");
  $(".three").css("display","none");
  startGame();
});
$("#restart").on('click', function() {
  startGame();
});
$("#mainmenu").on('click', function() {
  $(".one").css("display", "inline");
  $(".two").css("display","none");
  $(".three").css("display","none");
});
$("#howtoplay").on('click', function() {
  $(".one").css("display", "none");
  $(".two").css("display","none");
  $(".three").css("display","inline");
});
$("#mainmenu2").on('click', function() {
  $(".one").css("display", "inline");
  $(".two").css("display","none");
  $(".three").css("display","none");
});
$("#startgame2").on('click', function() {
  $(".one").css("display", "none");
  $(".two").css("display","inline");
  $(".three").css("display","none");
  startGame();
});

// EVENTLISTENERS -----------------------------------------------------
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

  // cellEls[i].addEventListener("touchstart", click);
});
