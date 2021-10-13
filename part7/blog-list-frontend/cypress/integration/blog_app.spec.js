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
    author: 'Test author3',
    url: 'www.testurl2.fi',
  }
  const blog3 = {
    title: 'New title3',
    author: 'Test author2',
    url: 'www.testurl3.fi',
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
      beforeEach(function () {
        cy.createBlog(blog)
        cy.contains(blog.title).parent().find('button').as('show-button')
      })

      it('the blog can be liked', function () {
        cy.get('@show-button').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('the blog can be deleted', function () {
        cy.get('@show-button').click()
        cy.contains('Remove blog').click()
        cy.get('html').should('not.contain', 'New title')
        cy.get('html').should('contain', 'You deleted a blog')
      })
    })

    describe('and when many blogs exist', function () {
      beforeEach(function () {
        cy.createBlog(blog)
        cy.createBlog(blog2)
        cy.createBlog(blog3)

        cy.contains(blog.title).parent().parent().as('blog1')
        cy.contains(blog2.title).parent().parent().as('blog2')
        cy.contains(blog3.title).parent().parent().as('blog3')
      })

      it('blogs are arranged by most likes', function () {
        cy.get('@blog1').contains('Show').click()
        cy.get('@blog2').contains('Show').click()
        cy.get('@blog3').contains('Show').click()
        cy.get('@blog1').contains('like').as('like1')
        cy.get('@blog2').contains('like').as('like2')
        cy.get('@blog3').contains('like').as('like3')

        cy.get('@like3').click()
        cy.get('@blog3').contains('likes: 1')

        cy.get('@like2').click()
        cy.get('@blog2').contains('likes: 1')
        cy.get('@like2').click()
        cy.get('@blog2').contains('likes: 2')

        cy.get('.blog-post').then((blogs) => {
          cy.wrap(blogs[0]).contains('likes: 2')
          cy.wrap(blogs[0]).contains(blog2.title)

          cy.wrap(blogs[1]).contains('likes: 1')
          cy.wrap(blogs[1]).contains(blog3.title)

          cy.wrap(blogs[2]).contains('likes: 0')
          cy.wrap(blogs[2]).contains(blog.title)
        })
      })
    })
  })
})
