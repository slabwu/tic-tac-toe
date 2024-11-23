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
        board.printBoard();
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
})();