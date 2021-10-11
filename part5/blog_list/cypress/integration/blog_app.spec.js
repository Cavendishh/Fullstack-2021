describe('Blog app', function () {
  const user = {
    name: 'Cavendish',
    username: 'test',
    password: 'test',
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('Login page')
    cy.get('#login-form')
    cy.get('#login-button').should('contain', 'Log in')
  })

  describe('Login', function () {
    it('succesful with right credentials', function () {
      cy.get('#username-input').type(user.username)
      cy.get('#password-input').type(user.password)
      cy.get('#login-button').click()

      cy.get('html').should('contain', 'Succesfully logged in')
    })

    it('fails with false credentials', function () {
      cy.get('#username-input').type('wrongUser')
      cy.get('#password-input').type('wrongPass')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Username or password is invalid')
      cy.get('html').should('not.contain', 'Succesfully logged in')
    })
  })
})
