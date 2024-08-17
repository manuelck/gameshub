import { insertLobbyTemplate } from '../../main.js';
import rockImg from '/imgs/rps/rock.png';
import paperImg from '/imgs/rps/paper.png';
import scissorsImg from '/imgs/rps/scissor.png';

let userScore = 0;
let pcScore = 0;
let userChoice = '';
let pcChoice = '';

let userScoreSpan, pcScoreSpan, choicesDiv, resultDiv, pcChoiceImg, outcomeP, actionsDiv;
let choiceButtons;

const choices = ['rock', 'paper', 'scissors'];
const choiceImages = {
  rock: rockImg,
  paper: paperImg,
  scissors: scissorsImg,
};

function initializeElements() {
  userScoreSpan = document.getElementById('user-score');
  pcScoreSpan = document.getElementById('pc-score');
  choicesDiv = document.getElementById('choices');
  resultDiv = document.getElementById('result');
  pcChoiceImg = document.getElementById('pc-choice-img');
  outcomeP = document.getElementById('outcome');
  actionsDiv = document.getElementById('actions');

  choiceButtons = document.querySelectorAll('.choice');
}

export function setupRpsGame() {
  initializeElements(); // Initialize elements after DOM is fully loaded

  choiceButtons.forEach(button => button.addEventListener('click', handleUserChoice));

  document.getElementById('continue').addEventListener('click', continueGame);
  document.getElementById('reset').addEventListener('click', resetGame);
  document.getElementById('return-to-lobby').addEventListener('click', returnToLobby); // Add event listener for return to lobby button

  // Set the initial message to "Select an option."
  outcomeP.textContent = 'Select an option.';
}

function startGame() {
  console.log('Start Game button clicked.');
  choicesDiv.classList.remove('hidden');
  resultDiv.classList.add('hidden');
  actionsDiv.classList.add('hidden');
  outcomeP.textContent = 'Select an option.';
}

function handleUserChoice(event) {
  userChoice = event.currentTarget.id;
  console.log(`User chose: ${userChoice}`);
  // Hide all choice buttons
  choiceButtons.forEach(button => button.classList.add('hidden'));
  outcomeP.textContent = 'Waiting for PC...';
  showPCChoosing();
}

function showPCChoosing() {
  console.log('PC choosing function called.');
  pcChoiceImg.src = ''; // Clear previous image
  resultDiv.classList.remove('hidden');

  let i = 0;
  const interval = setInterval(() => {
    pcChoiceImg.src = choiceImages[choices[i]];
    console.log(`PC choosing: ${choices[i]}`);
    i = (i + 1) % 3;
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
    pcChoice = choices[Math.floor(Math.random() * 3)];
    pcChoiceImg.src = choiceImages[pcChoice];
    console.log(`PC chose: ${pcChoice}`);
    setTimeout(showResult, 1000); // Delay showing result to display PC choice
  }, 2000); // Adjust delay as needed
}

function showResult() {
  console.log('Show result function called.');
  resultDiv.classList.remove('hidden');
  actionsDiv.classList.remove('hidden');
  const outcome = getOutcome(userChoice, pcChoice);
  outcomeP.textContent = outcome;
  if (outcome === 'You win!') {
    userScore++;
  } else if (outcome === 'You lose!') {
    pcScore++;
  }
  updateScore();
}

function getOutcome(user, pc) {
  if (user === pc) {
    return "It's a tie!";
  } else if ((user === 'rock' && pc === 'scissors') ||
             (user === 'paper' && pc === 'rock') ||
             (user === 'scissors' && pc === 'paper')) {
    return 'You win!';
  } else {
    return 'You lose!';
  }
}

function updateScore() {
  userScoreSpan.textContent = userScore;
  pcScoreSpan.textContent = pcScore;
}

function continueGame() {
  console.log('Continue button clicked.');
  resultDiv.classList.add('hidden');
  actionsDiv.classList.add('hidden');
  // Show all choice buttons again
  choiceButtons.forEach(button => button.classList.remove('hidden'));
  outcomeP.textContent = 'Select an option.';
}

function resetGame() {
  console.log('Reset button clicked.');
  userScore = 0;
  pcScore = 0;
  updateScore();
  continueGame();
}

function returnToLobby() {
  console.log('Return to Lobby button clicked.');
  const gamehubDiv = document.getElementById('gamehub');
  if (gamehubDiv) {
    // Clear game UI
    gamehubDiv.innerHTML = '';

    // Reset game state
    userScore = 0;
    pcScore = 0;
    userChoice = '';
    pcChoice = '';

    // Reinsert lobby template or perform necessary actions to return to lobby UI
    insertLobbyTemplate();
  } else {
    console.error('Element with ID "gamehub" not found.');
  }
}
