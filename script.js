const board = (function () {
    const rows = 3;
    const columns = 3;
    const values = [];

    for (let i = 0; i < rows; i++) {
        values[i] = [];
        for (let j = 0; j < columns; j++) {
            values[i].push("");
        }
    }

    const getBoard = () => values;

    const playMove = (square,player) => {
        let row = Math.floor(square/columns);
        let column = square % columns;
        if (!values[row][column]) values[row][column] = player;
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

    return { getBoard, playMove, printBoard };
})();

const game = (function() {
    const players = [
        { name: "Player One", mark: "X" },
        { name: "Player Two", mark: "O" },
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
            //promptPlayer();
        }
    }

    const playRound = (square) => {
        console.log('Playing move...')
        board.playMove(square, getCurrentPlayer().mark);
        changePlayer();
        board.printBoard();
        promptPlayer();
    }

    return { changePlayer, getCurrentPlayer, promptPlayer, playRound };
})();

alert("Welcome to Tic Tac Toe!");
game.promptPlayer();