// Set Background Color 
let stopColor = 'red';
let startColor = 'green';
let pauseColor = 'yellow';

// Set initial values for the Pomodoro timer
const pomodoroMinutes = 25;
const shortBreakMinutes = 5;
const longBreakMinutes = 15;

// Get references to the DOM elements
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const container = document.getElementById("container");
const boucle = document.getElementById("boucle");
const comment = document.getElementById("comment");

// Initialize the Pomodoro timer
let pomodorosCompleted = 0;
let timerType = "pomodoro";
let timeRemaining = pomodoroMinutes * 60;
let intervalId = null;
boucle.innerHTML = pomodorosCompleted + " of 4";

// Update the timer display with the current time remaining
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (timeRemaining % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

// Start the timer
function startTimer() {
  intervalId = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    if (timeRemaining === 0) {
      clearInterval(intervalId);
      handleTimerCompletion();
    }
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
  container.style.backgroundColor = startColor;
}

// Stop the timer
function stopTimer() {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
    container.style.backgroundColor = stopColor;

}

// Reset the timer
function resetTimer() {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
  container.style.backgroundColor = stopColor;

  // Reset the timer values
  pomodorosCompleted = 0;
  timerType = "pomodoro";
  timeRemaining = pomodoroMinutes * 60;

  // Update the timer display
  updateTimerDisplay();
}

// Handle completion of the timer
function handleTimerCompletion() {
  if (timerType === "pomodoro") {
    pomodorosCompleted ++;
    boucle.innerHTML =pomodorosCompleted + " of 4"
    if (pomodorosCompleted >= 4) {
        timerType = "longbreak";
        timeRemaining = longBreakMinutes * 60;
        container.style.backgroundColor = pauseColor;
        comment.innerHTML = "Do a long break ! "
    } else {
        timerType = "short-break";
        timeRemaining = shortBreakMinutes * 60;
        container.style.backgroundColor = pauseColor;
        comment.innerHTML = "Do a short break ! ";
    }
  } else if (timerType === "short-break") {
    timerType = "pomodoro";
    timeRemaining = pomodoroMinutes * 60;
    comment.innerHTML = "";
  } else if (timerType === "long-break") {
    pomodorosCompleted = 0;
    timerType = "pomodoro";
    timeRemaining = pomodoroMinutes * 60;
    container.style.backgroundColor = stopColor;
    comment.innerHTML = "";

  }
  updateTimerDisplay();
  startButton.disabled = false;
  stopButton.disabled = true;
}

// Add event listeners to the start and stop buttons
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
