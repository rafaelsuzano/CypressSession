describe('Teste de Produto', () => {
  beforeEach(() => {
    cy.session('login-session', () => {
      cy.log('Fazendo login e salvando a sessão...');
      cy.api({
        method: 'POST',
        url: 'https://api.escuelajs.co/api/v1/auth/login',
        body: {
          email: 'john@mail.com',
          password: 'changeme',
        },
      }).then((response) => {
        const token = response.body.access_token;
        Cypress.env('token', token);
      });
    });
  });

  it('deve listar os produtos', () => {
    cy.api({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/products',
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`,
      },
    }).its('status').should('eq', 200);
  });
});