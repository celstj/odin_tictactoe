let currentPlayer = 'X';
const board = document.querySelector('.gameBoard');
const gameArray = ['', '', '', '', '', '', '', '', ''];
const resetButton = document.querySelector('.reset');
const gameSquare = document.querySelector('.gameSquare');
const gridCells = document.querySelectorAll('.gameSquare');
const resultDiv = document.querySelector('.result-modal');
const boxOkay = document.querySelector('.okay');
const resultBox = document.querySelector('.result-box');
const resultP = document.querySelector('.result-box p');
let resultMsg = "";

const gameBoard = (() => {
    gridCells.forEach((cell) => {
        cell.addEventListener('click', () => 
            checkGridClick(cell.dataset.index));
    })

    function checkGridClick(index) {
        const playerNow = document.querySelector('.player-now p');
        if (gameArray[index] === '' && !checkWinner()) {
            gameArray[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                resultMsg = `Player ${currentPlayer} wins!`;
                resultDiv.style.display = "flex";
                resultP.append(resultMsg);
                reset();
            } else if (gameArray.every(cell => cell != '')) {
                resultMsg = 'It\'s a draw!';
                resultDiv.style.display = "flex";
                resultP.append(resultMsg);
                reset();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                playerNow.textContent = `Now Playing as: Player ${currentPlayer}`;
            }
        }
    }

    boxOkay.addEventListener('click', () => {
        if(resultDiv.style.display = "block") {
            resultDiv.style.display = "none";
        }
    });

    boxOkay.addEventListener('click', () => {
        resultP.textContent = "";
    });

    function renderBoard() {
        gridCells.forEach((cell, index) => {
            cell.textContent = gameArray[index];
            cell.classList.remove('playerX', 'playerO');
            if (gameArray[index] === 'X'){
                cell.classList.add('playerX');
            } else if (gameArray[index] === 'O'){
                cell.classList.add('playerO');
            }
        });
    }

    const checkWinner = () => {
        const winningMoves = 
            [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
        
        // return win condition
        for (const combo of winningMoves) {
            const [a,b,c] = combo;
            if (gameArray[a] !== '' && gameArray[a] === gameArray[b] 
                && gameArray[a] === gameArray[c]) {
                    return true;
                }
        }
        return false;
    }

    function reset() {
        for (let i = 0; i < 9; i++){
            gameArray[i] = "";
            currentPlayer = 'X';
            renderBoard();
        }
    }

    resetButton.addEventListener('click', () => {
        reset();
        console.log("game reset");
    })

})();
