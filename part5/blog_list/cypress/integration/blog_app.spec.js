describe('Blog app', function () {
  const user = {
    name: 'Cavendish',
    username: 'test',
    password: 'test',
  }
  const blog = {
    title: 'New title',
    author: 'Test author',
    url: 'www.testurl.fi',
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: user.username,
        password: user.password,
      }).then((res) => {
        localStorage.setItem('loggedUser', JSON.stringify(res.body))
        cy.visit('http://localhost:3000')
      })
    })

    it.only('a blog can be created', function () {
      cy.contains('Create a blog').click()
      cy.get('#title-input').type(blog.title)
      cy.get('#author-input').type(blog.author)
      cy.get('#url-input').type(blog.url)
      cy.get('#create-blog-btn').click()

      cy.contains(blog.title)
    })
  })
})
