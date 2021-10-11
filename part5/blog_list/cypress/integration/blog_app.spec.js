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
  const blog2 = {
    title: 'New title2',
    author: 'Test author2',
    url: 'www.testurl2.fi',
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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
    })

    it('a blog can be created', function () {
      cy.contains('Create a blog').click()
      cy.get('#title-input').type(blog.title)
      cy.get('#author-input').type(blog.author)
      cy.get('#url-input').type(blog.url)
      cy.get('#create-blog-btn').click()

      cy.contains(blog.title)
    })

    describe('and when a blog exist', function () {
      it('the blog can be liked', function () {
        cy.createBlog(blog)

        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('the blog can be deleted', function () {
        cy.createBlog(blog)

        cy.contains('Remove blog').click()
        cy.get('html').should('not.contain', 'New title')
        cy.get('html').should('contain', 'You deleted a blog')
      })
    })
  })
})
