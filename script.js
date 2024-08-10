document.addEventListener('DOMContentLoaded', () => {
    const singlePlayerBtn = document.getElementById('singlePlayerBtn');
    const multiPlayerBtn = document.getElementById('multiPlayerBtn');
    const gameDiv = document.getElementById('game');
    const playerChoicesDiv = document.getElementById('playerChoices');
    const resultsDiv = document.getElementById('results');
    const resultMessage = document.getElementById('resultMessage');
    const playAgainBtn = document.getElementById('playAgainBtn');

    const choices = ['rock', 'paper', 'scissors'];
    let isSinglePlayer = true;
    let player1Choice = '';
    let player2Choice = '';

    singlePlayerBtn.addEventListener('click', () => {
        isSinglePlayer = true;
        startGame();
    });

    multiPlayerBtn.addEventListener('click', () => {
        isSinglePlayer = false;
        startGame();
    });

    document.querySelectorAll('.choice').forEach(button => {
        button.addEventListener('click', (event) => {
            const choice = event.target.getAttribute('data-choice');
            if (isSinglePlayer) {
                player1Choice = choice;
                player2Choice = choices[Math.floor(Math.random() * choices.length)];
                showResult();
            } else {
                if (!player1Choice) {
                    player1Choice = choice;
                    resultMessage.textContent = 'Player 2, make your choice.';
                } else {
                    player2Choice = choice;
                    showResult();
                }
            }
        });
    });

    playAgainBtn.addEventListener('click', () => {
        player1Choice = '';
        player2Choice = '';
        resultMessage.textContent = '';
        resultsDiv.classList.add('hidden');
        playerChoicesDiv.classList.remove('hidden');
        if (!isSinglePlayer) {
            resultMessage.textContent = 'Player 1, make your choice.';
        }
    });

    function startGame() {
        gameDiv.classList.remove('hidden');
        playerChoicesDiv.classList.remove('hidden');
        resultsDiv.classList.add('hidden');
        resultMessage.textContent = isSinglePlayer ? 'Make your choice.' : 'Player 1, make your choice.';
    }

    function showResult() {
        playerChoicesDiv.classList.add('hidden');
        resultsDiv.classList.remove('hidden');
        const winner = determineWinner(player1Choice, player2Choice);
        resultMessage.textContent = `Player 1 chose ${player1Choice}. Player 2 chose ${player2Choice}. ${winner}`;
    }

    function determineWinner(choice1, choice2) {
        if (choice1 === choice2) {
            return 'It\'s a tie!';
        }
        if (
            (choice1 === 'rock' && choice2 === 'scissors') ||
            (choice1 === 'paper' && choice2 === 'rock') ||
            (choice1 === 'scissors' && choice2 === 'paper')
        ) {
            return 'Player 1 wins!';
        } else {
            return 'Player 2 wins!';
        }
    }
});
