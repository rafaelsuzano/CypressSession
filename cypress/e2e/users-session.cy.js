describe('Testes de usuários (com cy.session)', () => {
  beforeEach(() => {
    // O Cypress vai reutilizar a sessão 'loginPlatziAPI' já criada
    cy.session('loginPlatziAPI', () => {
      cy.login();
    });
  });

  it('Deve listar os usuários autenticado', () => {
    cy.api({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/users',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
    }).its('status').should('eq', 200);
  });
});