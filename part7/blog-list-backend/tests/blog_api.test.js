const mongoose = require('mongoose')
const helper = require('./test_helper')
const { initialBlogs, newUser, blogsInDb, usersInDb } = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('Blogs GET', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(initialBlogs.length)
  })

  test('blogs have id field in blog objects', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body[0].id).toBeDefined()
  })
})

describe('Blogs POST', () => {
  let headers

  beforeEach(async () => {
    await User.deleteMany({})

    // prettier-ignore
    await api
      .post('/api/users')
      .send(newUser)

    // prettier-ignore
    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  })

  test('add a new blog', async () => {
    const blogsAtStart = await blogsInDb()
    const usersAtStart = await usersInDb()
    const userId = usersAtStart[0].id

    const newBlog = {
      title: 'A new blog',
      author: 'Cavendishh',
      url: 'https://fullstackopen.com/',
      likes: 0,
      userId,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const blogTitles = blogsAtEnd.map((b) => b.title)
    expect(blogTitles).toContain(newBlog.title)
  })

  test('if no likes defined default to 0', async () => {
    const usersAtStart = await usersInDb()
    const userId = usersAtStart[0].id

    const newBlog = {
      title: 'A new blog',
      author: 'Cavendishh',
      url: 'https://fullstackopen.com/',
      userId,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    const savedBlog = blogsAtEnd.find(
      (b) => b.title === newBlog.title && b.author === newBlog.author
    )

    expect(savedBlog.likes).toBe(0)
  })

  test('if title and url are missing throw status code 400', async () => {
    const newBlog = {
      author: 'Cavendishh',
      likes: 0,
    }

    // prettier-ignore
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

describe('Blogs PUT', () => {
  test('editing amount of likes on a blog post', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToEdit = blogsAtStart[0]

    const newBlog = {
      ...blogToEdit,
      likes: 10,
    }

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const foundBlog = blogsAtEnd.find((blog) => blog.likes === 10)
    expect(foundBlog.likes).toBe(10)
  })
})

describe('Blogs DELETE', () => {
  let headers

  beforeEach(async () => {
    await User.deleteMany({})

    // prettier-ignore
    await api
      .post('/api/users')
      .send(newUser)

    // prettier-ignore
    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      Authorization: `bearer ${result.body.token}`,
    }
  })

  test('deletes with status code of 204 if id is valid', async () => {
    const newBlog = {
      title: 'This blog will be deleted',
      author: 'Tester32',
      url: 'www.testingIsImportant.com',
      likes: '321',
    }

    // prettier-ignore
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)

    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

    // prettier-ignore
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const blogTitles = blogsAtEnd.map((b) => b.title)

    expect(blogTitles).not.toContain(blogToDelete.title)
  })
})

describe('Users GET', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('Users POST', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('SECRET', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('new user created', async () => {
    const usersAtStart = await usersInDb()

    const newUser2 = {
      username: 'Cavendishh',
      name: 'Janne Kavander',
      password: 'fullStack',
    }

    await api
      .post('/api/users')
      .send(newUser2)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser2.username)
  })

  test('if username exists already throw status code 400', async () => {
    const usersAtStart = await usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('if username and/or password is shorter than the minimum allowed length (3)', async () => {
    const usersAtStart = await usersInDb()

    const newUser2 = {
      username: 'rt',
      name: 'Tester man',
    }

    const result = await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('minimum allowed length is three (3)')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => mongoose.connection.close())
