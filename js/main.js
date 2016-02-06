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
      $fade.animate({backgroundColor: "white"}, 700);
      setTimeout(function() {
        board[randomIndex] = 0;
      }, 690);
    }, 1000);
  };
};


// CLICK MOVE ---------------------------------------------------------
var click = function(evt) {
  clickValue = parseInt(this.id.substr(4));
  if (board[clickValue] > BLACK) {
    $(this).stop()
           .toggle("explode", {pieces:16})
           .css({backgroundColor: "white"})
           .fadeIn();
  };
  if      (board[clickValue] === BLACK) score += points;
  else if (board[clickValue] === BLUE)  freezeEffect();
  else if (board[clickValue] === GREEN) multiEffect();
  else if (board[clickValue] === YELLOW) maxEffect();
  else if (board[clickValue] === RED) superEffect();
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
var audio = document.getElementById("tomb");
var mute = document.getElementById('mute');
mute.onclick = function() {
  audio.muted = !audio.muted;
};
audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);


// EVENTLISTENERS -----------------------------------------------------
document.addEventListener("DOMContentLoaded", function(evt) {
  var cellEls = document.querySelectorAll("td");
  for (var i = 0; i < board.length; i++) {
    cellEls[i].addEventListener("click", click);
  };
});
