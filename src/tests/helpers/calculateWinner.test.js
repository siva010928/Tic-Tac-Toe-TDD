import { calculateWinner } from "../../helpers/calculateWinner";


describe('calculateWinner', () => {
    it('when "X" wins', () => {
        const squares = ['X', 'X', 'X', null, null, null, null, null, null];
        expect(calculateWinner(squares)).toBe('X');
    });

    it('when "O" wins', () => {
        const squares = ['O', null, null, 'O', null, null, 'O', null, null];
        expect(calculateWinner(squares)).toBe('O');
    });

    it('when "X" wins again', () => {
        const squares = ['X', null, null, null, 'X', null, null, null, 'X'];
        expect(calculateWinner(squares)).toBe('X');
    });

    it('when "O" wins again', () => {
        const squares = [null, null, 'O', null, 'O', null, 'O', null, null];
        expect(calculateWinner(squares)).toBe('O');
    });

    it('when no one wins', () => {
        const squares = ['X', 'X', null, 'O', 'O', null, null, null, null];
        expect(calculateWinner(squares)).toBeNull();
    });

    it('when they draw', () => {
        const squares = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
        expect(calculateWinner(squares)).toBeNull();
    });
});
