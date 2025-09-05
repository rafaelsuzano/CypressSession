# CypressSession

Este projeto demonstra o uso do comando `cy.session()` do Cypress para otimizar testes de API, reutilizando sessões de autenticação entre diferentes testes.

## 📋 Sobre o Projeto

O `cy.session()` é uma funcionalidade poderosa do Cypress que permite:
- **Reutilizar sessões de login** entre diferentes testes
- **Reduzir o tempo de execução** dos testes
- **Evitar múltiplas requisições de autenticação** desnecessárias
- **Melhorar a performance** dos testes de API

## 🚀 Funcionalidades

- ✅ Testes de API com autenticação
- ✅ Reutilização de sessões de login
- ✅ Comando customizado para login
- ✅ Testes de produtos e usuários
- ✅ Comparação entre testes com e sem `cy.session()`

## 🛠️ Tecnologias Utilizadas

- **Cypress 15.1.0** - Framework de testes end-to-end
- **cypress-plugin-api** - Plugin para testes de API
- **Platzi Store API** - API utilizada nos testes

## 📁 Estrutura do Projeto

```
CypressSession/
├── cypress/
│   ├── e2e/
│   │   ├── products-session.cy.js    # Testes de produtos com cy.session()
│   │   ├── products.cy.js            # Testes de produtos sem cy.session()
│   │   ├── users-session.cy.js       # Testes de usuários com cy.session()
│   │   └── users.cy.js               # Testes de usuários sem cy.session()
│   ├── fixtures/
│   │   └── example.json              # Dados de exemplo
│   └── support/
│       ├── commands.js               # Comandos customizados
│       └── e2e.js                    # Configurações de suporte
├── cypress.config.js                 # Configuração do Cypress
└── package.json                      # Dependências do projeto
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/rafaelsuzano/CypressSession.git
cd CypressSession
```

2. Instale as dependências:
```bash
npm install
```

### Executando os Testes

#### Executar todos os testes:
```bash
npx cypress run
```

#### Executar testes no modo interativo:
```bash
npx cypress open
```

#### Executar testes específicos:
```bash
# Testes com cy.session()
npx cypress run --spec "cypress/e2e/*-session.cy.js"

# Testes sem cy.session()
npx cypress run --spec "cypress/e2e/products.cy.js,cypress/e2e/users.cy.js"
```

## 📊 Comparação de Performance

### Com `cy.session()`:
- ✅ Login executado apenas uma vez
- ✅ Sessão reutilizada entre testes
- ✅ Tempo de execução reduzido
- ✅ Menos requisições à API

### Sem `cy.session()`:
- ❌ Login executado a cada teste
- ❌ Múltiplas requisições de autenticação
- ❌ Tempo de execução maior
- ❌ Maior carga na API

## 🔧 Comandos Customizados

### `cy.login()`
Comando customizado que realiza o login na API e armazena o token:

```javascript
Cypress.Commands.add('login', () => {
  cy.log('⏱️ Fazendo login...');
  cy.wait(3000); // Simula requisição lenta
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
```

## 📝 Exemplos de Uso

### Teste com `cy.session()`:
```javascript
describe('Testes de produtos (com cy.session)', () => {
  beforeEach(() => {
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
```

### Teste sem `cy.session()`:
```javascript
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
  // ... resto do teste
});
```

## 🎯 Benefícios do `cy.session()`

1. **Performance**: Reduz significativamente o tempo de execução dos testes
2. **Eficiência**: Evita requisições desnecessárias de autenticação
3. **Confiabilidade**: Mantém a consistência das sessões entre testes
4. **Manutenibilidade**: Centraliza a lógica de autenticação
5. **Escalabilidade**: Ideal para suítes de testes grandes

## 📚 Recursos Adicionais

- [Documentação oficial do Cypress](https://docs.cypress.io/)
- [Guia do cy.session()](https://docs.cypress.io/api/commands/session)
- [Platzi Store API](https://api.escuelajs.co/)

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Rafael Suzano**
- GitHub: [@rafaelsuzano](https://github.com/rafaelsuzano)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
