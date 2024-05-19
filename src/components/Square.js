export default function Square({ value, onSquareClick, index }) {
    return (
        <button className="square" data-testid={`square-${index}`} onClick={onSquareClick}>
            {value}
        </button>
    );
}