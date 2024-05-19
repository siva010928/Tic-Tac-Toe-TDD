import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Board from '../../components/Board';

describe('<Board />', () => {
  const setup = (squares, xIsNext = true) => {
    const handlePlay = jest.fn().mockName('handlePlay');;
    const utils = render(<Board squares={squares} onPlay={handlePlay} xIsNext={xIsNext} />);
    const buttons = utils.getAllByRole('button');
    return {
      buttons,
      handlePlay,
      ...utils,
    };
  };

  it('renders 9 squares', () => {
    const { buttons } = setup(Array(9).fill(null));
    expect(buttons).toHaveLength(9);
  });

  it('calling onPlay with the correct new squares state when a square is clicked', () => {
    const squares = Array(9).fill(null);
    const { handlePlay } = setup(squares);
    userEvent.click(screen.getByTestId('square-0')); // Click the first square
    expect(handlePlay).toHaveBeenCalledWith(['X', ...squares.slice(1)]);
  });

  it('not calling onPlay if the square is already filled', () => {
    const squares = Array(9).fill(null);
    squares[0] = 'X';
    const { handlePlay } = setup(squares);
    userEvent.click(screen.getByTestId('square-0'));
    expect(handlePlay).not.toHaveBeenCalled();
  });

  it('not calling onPlay if there anyone wins', () => {
    const squares = ['X', 'X', 'X', null, null, 'O', null, 'O', null];  // X wins
    const { handlePlay } = setup(squares);
    userEvent.click(screen.getByTestId('square-3')); // Trying to play on the fourth square
    expect(handlePlay).not.toHaveBeenCalled();
  });

  it('the game stoped After anyone win', () => {
    const squares = ['X', 'X', 'X', null, null, 'O', null, 'O', null];  // X wins
    setup(squares);
    userEvent.click(screen.getByTestId('square-3')); // Trying to play on the fourth square
    expect(screen.getByTestId('square-3').textContent).toBe(''); // moves are not allowed after winner
  });

  
  it('show status when X wins', () => {
    const squares = ['X', 'O', null, null, 'X', 'O', null, null, 'X'];  // X wins
    setup(squares);
    expect(screen.getByTestId('status')).toHaveTextContent('Winner is X');
  });

  it('show status when no one wins', () => {
    const squares = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O']; // Game draw
    setup(squares);
    expect(screen.getByTestId('status')).toHaveTextContent('Game is a draw');
  });

});
