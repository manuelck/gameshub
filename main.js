import lobbyTemplate from './src/lobby/lobby.js';
import rpsTemplate from './src/rps/rps.js';
import { setupRpsGame } from './src/rps/rpsfunction.js';
import ticTacToeTemplate from './src/3dot/3dot.js';
import { setupTicTacToeGame } from './src/3dot/3dotfunction.js';
import quizTemplate from './src/trivial/trivial.js';
import { setupQuizGame } from './src/trivial/trivialfunction.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    insertLobbyTemplate();
});

export function insertLobbyTemplate() {
    const gameLobbyDiv = document.getElementById('gameLobby');
    if (gameLobbyDiv) {
        console.log('Inserting lobby template');
        gameLobbyDiv.innerHTML = lobbyTemplate;
        gameLobbyDiv.style.display = 'block';
        setupLobbyListeners();
    } else {
        console.error('Game lobby div not found.');
    }
}

function setupLobbyListeners() {
    const startRpsBtn = document.getElementById('startRps');
    if (startRpsBtn) {
        startRpsBtn.addEventListener('click', startRpsGame);
    } else {
        console.error('Button with ID "startRps" not found.');
    }

    const startTicTacToeBtn = document.getElementById('startTicTacToe');
    if (startTicTacToeBtn) {
        startTicTacToeBtn.addEventListener('click', startTicTacToe);
    } else {
        console.error('Button with ID "startTicTacToe" not found.');
    }

    const startQuizBtn = document.getElementById('startQuiz');
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuizGame);
    } else {
        console.error('Button with ID "startQuiz" not found.');
    }
}

function startRpsGame() {
    console.log('Starting RPS game');
    const gameLobbyDiv = document.getElementById('gameLobby');
    const gamehubDiv = document.getElementById('gamehub');
    if (gameLobbyDiv && gamehubDiv) {
        gameLobbyDiv.style.display = 'none';
        gamehubDiv.innerHTML = rpsTemplate;
        setupRpsGame();
    } else {
        console.error('Element with ID "gameLobby" or "gamehub" not found.');
    }
}

function startTicTacToe() {
    console.log('Starting Tic Tac Toe game');
    const gameLobbyDiv = document.getElementById('gameLobby');
    const gamehubDiv = document.getElementById('gamehub');
    if (gameLobbyDiv && gamehubDiv) {
        gameLobbyDiv.style.display = 'none';
        gamehubDiv.innerHTML = ticTacToeTemplate;
        setupTicTacToeGame();
    } else {
        console.error('Element with ID "gameLobby" or "gamehub" not found.');
    }
}

function startQuizGame() {
    console.log('Starting Quiz game');
    const gameLobbyDiv = document.getElementById('gameLobby');
    const gamehubDiv = document.getElementById('gamehub');
    if (gameLobbyDiv && gamehubDiv) {
        gameLobbyDiv.style.display = 'none';
        gamehubDiv.innerHTML = quizTemplate;
        setupQuizGame();
    } else {
        console.error('Element with ID "gameLobby" or "gamehub" not found.');
    }
}
