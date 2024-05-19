import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Square from '../../components/Square';

describe('<Square />', () => {
    it('displaying the passed props value', () => {
        render(<Square value="X" onSquareClick={() => {}} />);
        expect(screen.getByRole('button')).toHaveTextContent('X');
    });

    it('calling onSquareClick when clicked', () => {
        const handleClick = jest.fn().mockName('handleClick');;
        render(<Square value="X" onSquareClick={handleClick} />);
        userEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
