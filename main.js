
let currentPlayer = 'X';
const board = document.querySelector('.gameBoard');
const gameArray = ['', '', '', '', '', '', '', '', ''];
const resetButton = document.querySelector('.reset');
const gameSquare = document.querySelector('.gameSquare');
const gridCells = document.querySelectorAll('.gameSquare');


const gameBoard = (() => {
    gridCells.forEach((cell) => {
        cell.addEventListener('click', () => 
            checkGridClick(cell.dataset.index));
            // console.log('dataset index:'+cell.dataset.index);
    })

    function checkGridClick(index) {
        if (gameArray[index] === '' && !checkWinner()) {
            gameArray[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                alert (`PLayer ${currentPlayer} wins!`);
                reset();
            } else if (gameArray.every(cell => cell != '')) {
                alert('It\'s a draw!');
                reset();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function renderBoard() {
        gridCells.forEach((cell, index) => {
            cell.textContent = gameArray[index];
            cell.classList.remove('playerX', 'playerO');
            if (gameArray[index] === 'X'){
                cell.classList.add('playerX');
            } else if (gameArray[index] === 'O'){
                cell.classList.add('playerO');
            }
            // console.log('whatthis index:'+gameArray[index]);
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
            renderBoard();
        }
    }

    resetButton.addEventListener('click', () => {
        reset();
        console.log("game reset");
    })

})();
