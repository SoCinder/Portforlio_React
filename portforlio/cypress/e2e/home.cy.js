describe('Home Page', () => {
  it('should render the welcome message and navigate to About', () => {
    cy.visit('https://portforlio-react-front-end.onrender.com');

    cy.contains('Welcome to My Portfolio');
    cy.contains('Learn More About Me').click();

    cy.url().should('include', '/about');
  });
});
