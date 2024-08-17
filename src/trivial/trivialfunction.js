import { questions } from './trivialquestions.js';
import { insertLobbyTemplate } from '../../main.js';

export function setupQuizGame() {
    let currentQuestionIndex = 0;
    let score = 0;

    const checkElementsAndStart = () => {
        const questionContainer = document.getElementById('questionContainer');
        const questionElement = document.getElementById('question');
        const answerButtonsElement = document.getElementById('answerButtons');
        const nextButton = document.getElementById('nextButton');
        const resultContainer = document.getElementById('resultContainer');
        const resultElement = document.getElementById('result');
        const returnLobbyButton = document.getElementById('returnLobbyButtonn');
        const scoreElement = document.getElementById('score');

        if (!questionContainer || !questionElement || !answerButtonsElement || !nextButton || !resultContainer || !resultElement || !returnLobbyButton || !scoreElement) {
            console.error('One or more required elements are missing from the DOM.');
            setTimeout(checkElementsAndStart, 100); // Retry after 100ms
            return;
        }

        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                setNextQuestion();
            } else {
                showResults();
            }
        });

        returnLobbyButton.addEventListener('click', () => {
            document.getElementById('gamehub').innerHTML = '';
            insertLobbyTemplate();
        });

        function startGame() {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.style.display = 'none';
            resultContainer.style.display = 'none';
            questionContainer.style.display = 'block';
            setNextQuestion();
        }

        function setNextQuestion() {
            resetState();
            showQuestion(questions[currentQuestionIndex]);
        }

        function showQuestion(question) {
            questionElement.textContent = question.question;
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.textContent = answer.text;
                button.classList.add('btn');
                button.dataset.correct = answer.correct;
                button.addEventListener('click', selectAnswer);
                answerButtonsElement.appendChild(button);
            });
        }

        function resetState() {
            nextButton.style.display = 'none';
            while (answerButtonsElement.firstChild) {
                answerButtonsElement.removeChild(answerButtonsElement.firstChild);
            }
        }

        function selectAnswer(e) {
            const selectedButton = e.target;
            const correct = selectedButton.dataset.correct === 'true';
            if (correct) {
                score++;
            } else {
                score--;
            }
            Array.from(answerButtonsElement.children).forEach(button => {
                setStatusClass(button, button.dataset.correct === 'true');
                button.disabled = true;  // Disable the button after an answer is selected
            });
            scoreElement.textContent = `Score: ${score}`;
            nextButton.style.display = 'block';
        }

        function setStatusClass(element, correct) {
            clearStatusClass(element);
            if (correct) {
                element.classList.add('correct');
            } else {
                element.classList.add('wrong');
            }
        }

        function clearStatusClass(element) {
            element.classList.remove('correct');
            element.classList.remove('wrong');
        }

        function showResults() {
            questionContainer.style.display = 'none';
            nextButton.style.display = 'none';
            resultContainer.style.display = 'block';
            resultElement.textContent = `You scored ${score} out of ${questions.length}!`;
        }

        startGame();
    };

    checkElementsAndStart();
}
