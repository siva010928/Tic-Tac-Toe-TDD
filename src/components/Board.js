import {calculateWinner} from "../helpers/calculateWinner"
import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares);
    }


    const renderSquare = (i) => {
        return (
            <Square 
                key={i}
                index={i}
                value={squares[i]} 
                onSquareClick={() => handleClick(i)}
            />
        );
    };

    const renderRow = (rowIndex) => {
        return (
            <div className="board-row" key={rowIndex}>
                {renderSquare(rowIndex * 3)}
                {renderSquare(rowIndex * 3 + 1)}
                {renderSquare(rowIndex * 3 + 2)}
            </div>
        );
    };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner is ${winner}`;
    } else if (squares.every(square => square !== null)) {
        status = 'Game is a draw';
    } else {
        status = `Next Player: ${xIsNext ? "X" : "O"}`;
    }

    return (
        <>
            <div data-testid="status">
                {status}
            </div>
            {Array.from({ length: 3 }, (_, rowIndex) => renderRow(rowIndex))}
        </>
    );
}

