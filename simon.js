let gameSeq = [];
let userSeq = []; // gameSeq and userSeq: Arrays to store the game-generated sequence and the user's input sequence, respectively.

let h2 = document.querySelector("h2"); // h2: A reference to an <h2> HTML element, likely used to display the current level.

let btns = ["yellow", "red", "purple", "green"]; // btns: An array containing the class names of the buttons that will flash: "yellow", "red", "purple", and "green".

let started = false; // started: A boolean flag to track if the game has started.
let level = 0; // level: A variable to keep track of the current level.
let highestScore = localStorage.getItem("highestScore") ? parseInt(localStorage.getItem("highestScore")) : 0; // highestScore: A variable to keep track of the highest score.

//This event listener starts the game when any key is pressed for the first time. It sets the started flag to true and calls the levelUp function to begin the game.
document.addEventListener("keypress", function() { 
  if (started == false) {
    console.log("Game is started");
    started = true;

    levelUp();
  }
});

// The levelUp function increments the level and flashes a randomly chosen button.
// The btnFlash function handles the visual flashing effect for the buttons.
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function() {
    btn.classList.remove("flash");
  }, 500);
}

//userflash: Adds a "userflash" class to the button when the user clicks it, then removes the class after 500 milliseconds.
function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function() {
    btn.classList.remove("userflash");
  }, 500);
}

//levelUp: Resets the user sequence, increments the level, updates the <h2> element to show the current level, generates a random color, adds it to the game sequence, logs the game sequence, and flashes the randomly chosen button.
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`; // Updates the <h2> element's text to display the current level.

  let randomIndex = Math.floor(Math.random() * 4); // Math.floor(Math.random() * 4): Generates a random index between 0 and 3 (inclusive).

  let randomColor = btns[randomIndex]; // randomColor: Gets the button color using the random index.

  let randomButton = document.querySelector(`.${randomColor}`); // randomButton: Selects the button element with the corresponding class name.

  gameSeq.push(randomColor);
  console.log(gameSeq);
  gameFlash(randomButton); // Calls gameFlash(randombutton) to flash the selected button.
}

// checkAns: Compares the user's input sequence with the game sequence.
// If the user's input is correct:
// If the user's sequence is complete, calls levelUp after 500 milliseconds.
// If the user's input is incorrect:
// Updates the highest score if the current level is greater than the highest score.
// Stores the new highest score in localStorage.
// Displays a game over message with the current score and highest score.
// Flashes the background red briefly, then resets the game.

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    if (level > highestScore) {
      highestScore = level;
      localStorage.setItem("highestScore", highestScore); // Store the new highest score in localStorage.
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Highest score: <b>${highestScore}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

// btnPress: Handles the user's button press.
// Logs the button object.
// Flashes the button with the userflash function.
// Gets the button's ID (color) and adds it to the user sequence.
// Checks the user's answer by calling checkAns.

function btnPress() {
  console.log(this);
  let btn = this;
  userflash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// Adds an event listener to each button that calls btnPress when the button is clicked.

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// reset: Resets the game variables to their initial states.

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
