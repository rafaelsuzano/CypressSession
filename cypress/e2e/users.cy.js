describe('Teste de Usuário', () => {
  beforeEach(() => {
    cy.session('login-session', () => {
      // Este código NÃO será executado se a sessão já existir
      cy.log('Tentando fazer login novamente...');
    });
  });

  it('deve listar os usuários', () => {
    cy.api({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/users',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
    }).its('status').should('eq', 200);
  });
});