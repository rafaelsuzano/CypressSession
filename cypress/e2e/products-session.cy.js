describe('Testes de produtos (com cy.session)', () => {
  beforeEach(() => {
    // O Cypress vai salvar essa sessão após o login
    cy.session('loginPlatziAPI', () => {
      cy.login();
    });
  });

  it('Deve listar os produtos autenticado', () => {
    cy.api({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/products',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
    }).its('status').should('eq', 200);
  });
});