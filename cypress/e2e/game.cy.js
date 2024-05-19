describe('Tic-Tac-Toe Game', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001');
    });
  
    it('two players playing a full game until one wins and stops the game - full flow check', () => {
      const positions = [0, 1, 4, 5, 8]; // moves for X to win
      positions.forEach(pos => {
        cy.get(`[data-testid="square-${pos}"]`).click();
      });
  
      cy.get('[data-testid="status"]').should('contain', 'Winner is X');
  
      // no additional moves hereafter
      cy.get('[data-testid="square-6"]').click();
      cy.get('[data-testid="square-6"]').should('contain', '');
    });
  
    it('resetting the game when move-0 clicked', () => {
      const positions = [0, 1, 4, 5, 8]; // moves for X to win
      positions.forEach(pos => {
        cy.get(`[data-testid="square-${pos}"]`).click();
      });
  
      // going to move - 0, which is resetting the game
      cy.get('[data-testid="move-0"]').click();
      cy.get('[data-testid^="square-"]').each(($el) => {
        expect($el).to.be.empty;
      });
    });
  
    it('going back to move-2 to check whether going back working correctly for specfic move', () => {
      const positions = [0, 1, 4, 5, 8]; // moves for X to win
      positions.forEach(pos => {
        cy.get(`[data-testid="square-${pos}"]`).click();
      });
  
      // going back to move-2 to check
      cy.get('[data-testid="move-2"]').click();
      cy.get('[data-testid="square-4"]').should('be.empty');
      cy.get('[data-testid="status"]').should('contain', 'Next Player: X');
    });
  });
  