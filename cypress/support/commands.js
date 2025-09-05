// cypress/support/commands.js

Cypress.Commands.add('login', () => {
  cy.log('⏱️ Fazendo login...');
  // Adiciona um atraso de 3 segundos para simular uma requisição de login lenta
  cy.wait(3000); 
  cy.api({
    method: 'POST',
    url: 'https://api.escuelajs.co/api/v1/auth/login',
    body: {
      email: 'john@mail.com',
      password: 'changeme'
    },
  }).then((response) => {
    const accessToken = response.body.access_token;
    Cypress.env('token', accessToken);
    cy.log('✅ Login bem-sucedido!');
  });
});