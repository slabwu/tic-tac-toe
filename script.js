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
        console.log({square, row, column});
        //console.log(board.getBoard());
    }

    return { getBoard, playMove };
})();
