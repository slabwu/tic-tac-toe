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

    const playMove = (square,player) => {
        let row = Math.floor(square/columns);
        let column = square % columns;
        if (!values[row][column]) {
            values[row][column] = player;
            moves++;
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

    return { getBoard, playMove, printBoard, getMoves };
})();

const game = (function() {
    const players = [
        { name: "Player One", mark: "❌" },
        { name: "Player Two", mark: "⭕" },
    ];

    let currentPlayer = players[0];

    const changePlayer = () => {
        currentPlayer = (currentPlayer === players[0])? players[1]: players[0];
    };

    const getCurrentPlayer = () => currentPlayer;

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
            changePlayer();
            alert(`${getCurrentPlayer().name} wins!`);
        }
        if (board.getMoves() === 9) {
            alert("It's a tie!");
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


    return { changePlayer, getCurrentPlayer, promptPlayer, playRound };
})();

const screen = (function() {
    const turnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = "";
        const boardState = board.getBoard();
        const activePlayer = game.getCurrentPlayer();
        turnDiv.textContent = `${activePlayer.name}'s turn...`;

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
        if (!selectedCell && selectedCell !== 0) return;
        game.playRound(selectedCell);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandler);
    updateScreen();
})();