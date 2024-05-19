import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from '../../components/Game';


describe('<Game />', () => {
  const setup = () => {
    render(<Game />);
  };

  const playSequence = (moves) => {
    moves.forEach(index => {
      const square = screen.getByTestId(`square-${index}`);
      userEvent.click(square);
    });
  };


  it('allows to going back in time', () => {
    setup();
    playSequence([0, 1, 4, 5, 8]); // X wins
    userEvent.click(screen.getByTestId('move-3')); // Go back to move after, when X played on square 4
    expect(screen.getByTestId('square-1').textContent).toBe('O');
    expect(screen.getByTestId('square-4').textContent).toBe('X');
    expect(screen.getByTestId('square-5').textContent).toBe('');
    expect(screen.getByTestId('status')).toHaveTextContent('Next Player: O');
  });

  it('resets the game when move-0 is clicked', () => {
    setup();
    playSequence([0, 1, 4, 5, 8]); // X wins
    userEvent.click(screen.getByTestId('move-0')); // Go back to move-0
    screen.getAllByTestId(/^square-/).forEach(square => {
      expect(square.textContent).toBe('');
    });
  });
});
