const board = (function () {
    const rows = 3;
    const columns = 3;
    const values = [];
    let moves = 0;

    for (let i = 0; i < rows; i++) {
        values[i] = [];
        for (let j = 0; j < columns; j++) {
            values[i].push("");
        }
    }

    const getBoard = () => values;
    const getMoves = () => moves;
    const resetMoves = () => moves = 0;

    const playMove = (square,player) => {
        let row = Math.floor(square/columns);
        let column = square % columns;
        if (!values[row][column]) {
            values[row][column] = player;
            moves++;
        }
    }

    const clearBoard = () => {
        for (let i = 0; i < 3; i++) {
            values[i] = [];
            for (let j = 0; j < 3; j++) {
                values[i][j] = "";
            }
        }
    }

    const printBoard = () => {
        let string = "";
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                cell = values[i][j] || "_";
                string += cell + " ";
                if (j === 2) string += "\n";
            }
        }
        console.log(string);
    };

    return { getBoard, playMove, printBoard, getMoves, resetMoves, clearBoard };
})();

const game = (function() {
    const players = [
        { name: "X", mark: "❌" },
        { name: "O", mark: "⭕" },
    ];

    let currentPlayer = players[0];
    let gameState = 'active';

    const changePlayer = () => {
        currentPlayer = (currentPlayer === players[0])? players[1]: players[0];
    };

    const getCurrentPlayer = () => currentPlayer;
    const getGameState = () => gameState;

    const promptPlayer = () => {
        answer = prompt(`${getCurrentPlayer().name}'s turn`);
        if (/[012345678]/.test(answer) && board.getBoard()[Math.floor(answer/3)][answer % 3] === "") {
            playRound(answer);
        } else {
            alert("This move is invalid!");
            promptPlayer();
        }
    }

    const playRound = (square) => {
        board.playMove(square, getCurrentPlayer().mark);
        changePlayer();
        board.printBoard();
        if (checkWin()) {
            game.changePlayer();
            activePlayer = game.getCurrentPlayer();
            gameState = 'win';
            screen.updateScreen();
        } else if (board.getMoves() === 9) {
            gameState = 'tie'
            screen.updateScreen();
        }
    }

    const checkWin = () => {
        let b = board.getBoard();
        if (b[1][1] && b[0][0] === b[1][1] && b[1][1] === b[2][2] || 
            b[1][1] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
                return true;
            }
        for (let i = 0; i < 3; i ++) {
            if (b[i][i] && b[i][0] === b[i][1] && b[i][1] === b[i][2] || 
                b[i][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
                return true;
            }
        };
        return false;
    }

    const restartGame = () => {
        board.clearBoard();
        board.resetMoves();
        game.changePlayer();
        gameState = 'active'
        screen.updateScreen();
    }

    return { changePlayer, getCurrentPlayer, promptPlayer, playRound, getGameState, restartGame };
})();

const screen = (function() {
    const turnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const againButton = document.querySelector('.again');
    againButton.style.display = "none";

    const updateScreen = () => {
        boardDiv.textContent = "";
        const boardState = board.getBoard();
        const winState = game.getGameState();
        let activePlayer = game.getCurrentPlayer();

        if (winState === 'win') {
            turnDiv.textContent = `${activePlayer.name} wins!`;
            againButton.style.display = "block";
        } else if (winState === 'tie') {
            turnDiv.textContent = `It's a tie!`;
            againButton.style.display = "block";
        } else {
            turnDiv.textContent = `${activePlayer.name}'s turn...`;
            againButton.style.display = "none";
        }

        boardState.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.index = columnIndex + rowIndex * 3;
                cellButton.textContent = cell;
                boardDiv.appendChild(cellButton);
            })
        })
    }

    const clickHandler = (e) => {
        const selectedCell = e.target.index;
        if (!selectedCell && selectedCell !== 0 || 
            game.getGameState() === "win" ||
            !(e.target.textContent === "")) return;
        game.playRound(selectedCell);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandler);
    againButton.addEventListener("click", game.restartGame);
    updateScreen();

    return { updateScreen }
})();