describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tester Cavendish',
      username: 'TesterCav',
      password: 'test123',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('Login page')
    cy.get('#login-form')
    cy.get('button').should('contain', 'Log in')
  })
})
